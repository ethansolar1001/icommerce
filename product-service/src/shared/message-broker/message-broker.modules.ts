import { Module } from '@nestjs/common'
import { providers } from './message-broker.providers'
import { NatsStreamingClient } from './nats-streaming-client'

@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers, NatsStreamingClient],
})
export class MessageBrokerModule {}
