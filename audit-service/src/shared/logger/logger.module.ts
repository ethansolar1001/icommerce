import { Module, Global } from '@nestjs/common'
import { HttpLoggerService } from './http-logger.service'
import { RpcLoggerService } from './rpc-logger.service'

@Global()
@Module({
  providers: [RpcLoggerService, HttpLoggerService],
  exports: [RpcLoggerService, HttpLoggerService],
})
export class LoggerModule {}
