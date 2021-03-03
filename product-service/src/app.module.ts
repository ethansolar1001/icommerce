import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { DatabaseModule } from './shared/database/database.module'
import { ProductModule } from './modules/product/product.module'
import { LoggerModule } from './shared/logger/logger.module'
import { ContextModule } from './shared/context/context.module'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    DatabaseModule,
    ProductModule,
    LoggerModule,
    ContextModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
