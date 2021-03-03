import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ENV } from './shared/constants'
import { HttpLoggerService } from './shared/logger/http-logger.service'
import { HttpAllExceptionFilter } from './shared/middlewares/http-all-exception.filter'
import SwaggerConfig from './swagger-config'

async function bootstrap() {
  const logger = new HttpLoggerService()
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  })

  const configService = app.get(ConfigService)
  const logLevel = configService.get(ENV.LOG_LEVEL)
  logger.setLogLevel(logLevel)

  app.useGlobalFilters(new HttpAllExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
    }),
  )

  const document = SwaggerModule.createDocument(app, SwaggerConfig)
  SwaggerModule.setup('api', app, document)

  const port = configService.get<number>(ENV.PORT)
  await app.listen(port).then(() => {
    logger.log(`Service is listening port ${port}`)
  })
}
bootstrap()
