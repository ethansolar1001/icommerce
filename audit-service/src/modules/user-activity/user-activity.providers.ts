import { DATABASE_CONNECTION } from '../../shared/constants'
import { Connection } from 'typeorm'
import { UserActivityRepository } from './user-activity.repsitory'

export const providers = [
  {
    provide: UserActivityRepository,
    useFactory: (connection: Connection): UserActivityRepository => {
      return connection.getCustomRepository(UserActivityRepository)
    },
    inject: [DATABASE_CONNECTION],
  },
]
