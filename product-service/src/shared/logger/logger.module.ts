import { Module, Global } from '@nestjs/common'
import { HttpLoggerService } from './http-logger.service'

@Global()
@Module({
  providers: [HttpLoggerService],
  exports: [HttpLoggerService],
})
export class LoggerModule {}
