import { ConfigService } from '@nestjs/config'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { DATABASE_CONNECTION } from '../constants'

export const providers = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService): Promise<Connection> => {
      const dbConfig: ConnectionOptions = configService.get<ConnectionOptions>(
        'database',
      )
      return createConnection(dbConfig)
    },
    inject: [ConfigService],
  },
]
