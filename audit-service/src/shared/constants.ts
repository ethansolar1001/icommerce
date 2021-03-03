export enum ENV {
  PORT = 'port',
  LOG_LEVEL = 'logLevel',
  MESSAGE_BROKER = 'messageBroker',
  DATABASE = 'database',
}

export enum LOG_LEVEL {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  VERBOSE = 'VERBOSE',
}

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION'
export const MESSAGE_BROKER_CONNECTION = 'MESSAGE_BROKER_CONNECTION'

export const USER_ACTIVITY = 'USER_ACTIVITY'