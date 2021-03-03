import { Module } from '@nestjs/common'
import { providers } from './message-broker.providers'
import { NatsStreamingClient } from './nats-streaming-client'

@Module({
  imports: [],
  providers: [...providers, NatsStreamingClient],
  exports: [NatsStreamingClient],
})
export class MessageBrokerModule {}
