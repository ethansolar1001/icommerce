import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../shared/database/database.module'
import { UserActivityRpcController } from './user-activity.rpc.controller'
import { providers } from './user-activity.providers'
import { UserActivityService } from './user-activity.service'

@Module({
  imports: [DatabaseModule],
  controllers: [UserActivityRpcController],
  providers: [UserActivityService, ...providers],
  exports: [UserActivityService],
})
export class UserActivityModule {}
