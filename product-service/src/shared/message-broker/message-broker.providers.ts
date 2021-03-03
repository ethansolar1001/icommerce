import { ConfigService } from '@nestjs/config'
import { ENV } from '../constants'
import { NatsStreamingClient } from './nats-streaming-client'

export const providers = [
  {
    provide: NatsStreamingClient,
    useFactory: async (
      configService: ConfigService,
    ): Promise<NatsStreamingClient> => {
      const { url, clusterId } = configService.get(ENV.MESSAGE_BROKER) || {}
      const client = new NatsStreamingClient({ url: url, clusterId: clusterId })
      await client.connect()
      return client
    },
    inject: [ConfigService],
  },
]
