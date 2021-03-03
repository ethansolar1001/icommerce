import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ContextModule } from '../../shared/context/context.module'
import { MessageBrokerModule } from '../../shared/message-broker/message-broker.modules'
import { providers } from './product.providers'
import { ProductService } from './product.service'
import { ProductV1Controller } from './product.v1.controller'

@Module({
  imports: [ConfigModule, ContextModule, MessageBrokerModule],
  providers: [ProductService, ...providers],
  controllers: [ProductV1Controller],
  exports: [ProductService],
})
export class ProductModule {}
