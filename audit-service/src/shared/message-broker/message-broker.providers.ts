import { ConfigService } from '@nestjs/config'
import { ENV } from '../constants'
import { MessageBrokerOptions } from './message-broker-options'

export const providers = [
  {
    provide: MessageBrokerOptions,
    useFactory: (configService: ConfigService): MessageBrokerOptions => {
      const config = configService.get<MessageBrokerOptions>(ENV.MESSAGE_BROKER)
      return config
    },
    inject: [ConfigService],
  },
]
