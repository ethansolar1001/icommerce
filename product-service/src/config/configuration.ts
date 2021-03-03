import { LOG_LEVEL } from '../shared/constants'
import databaseConfig from './database.config'
import messageBrokerConfig from './message-broker.config'
import * as _ from 'lodash'

export default () => {
  return {
    logLevel: LOG_LEVEL[_.toUpper(process.env.LOG_LEVEL)] || LOG_LEVEL.INFO,
    port: +process.env.PORT || 3000,
    database: databaseConfig,
    messageBroker: messageBrokerConfig,
  }
}
