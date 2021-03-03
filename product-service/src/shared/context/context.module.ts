import { Module } from '@nestjs/common'
import { HttpContextService } from './http-context.service'

@Module({
  providers: [HttpContextService],
  exports: [HttpContextService],
})
export class ContextModule {}
