import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserActivityModule } from './modules/user-activity/user-activity.module'
import { LoggerModule } from './shared/logger/logger.module'
import configuration from './config/configuration'
import { MessageBrokerModule } from './shared/message-broker/message-broker.modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    LoggerModule,
    UserActivityModule,
    MessageBrokerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
