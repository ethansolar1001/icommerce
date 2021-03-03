import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { CustomStrategy } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { ENV } from './shared/constants'
import { HttpLoggerService } from './shared/logger/http-logger.service'
import { RpcLoggerService } from './shared/logger/rpc-logger.service'
import { MessageBrokerOptions } from './shared/message-broker/message-broker-options'
import { MessageBrokerServer } from './shared/message-broker/message-broker-server'

async function bootstrap() {
  const httpLogger = new HttpLoggerService()
  const app = await NestFactory.create(AppModule, {
    logger: httpLogger,
  })
  const configService = app.get(ConfigService)
  const logLevel = configService.get(ENV.LOG_LEVEL)
  httpLogger.setLogLevel(logLevel)

  //Create nats-streaming listener
  const microservice = app.connectMicroservice<CustomStrategy>({
    strategy: new MessageBrokerServer(
      configService.get<MessageBrokerOptions>(ENV.MESSAGE_BROKER),
    ),
  })
  const rpcLogger = new RpcLoggerService()
  rpcLogger.setLogLevel(logLevel)
  microservice.useLogger(rpcLogger)

  await app.startAllMicroservicesAsync().then(() => {
    rpcLogger.log(`Service is listening nats-streaming`)
  })

  const port = configService.get<number>(ENV.PORT)
  await app
    .listen(port)
    .then(() => httpLogger.log(`Service is listening port ${port}`))
}
bootstrap()
