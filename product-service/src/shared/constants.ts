import { ErrorDto } from './dtos/error.dto'

export enum ENV {
  LOG_LEVEL = 'logLevel',
  PORT = 'port',
  DATABASE = 'database',
  QUEUE_NAME = 'queueName',
  MESSAGE_BROKER = 'messageBroker',
}

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION'
export const MESSAGE_BROKER_CONNECTION = 'MESSAGE_BROKER_CONNECTION'
export const SEARCH_OPERATORS = ['contains', 'starts_with', 'end_with']
export const FILTER_OPERATORS = ['gt', 'lt', 'gte', 'lte', 'btw']
export const SORT_TYPES = ['ASC', 'DESC']
export type SEARCH_OPERATOR = 'contains' | 'starts_with' | 'end_with'
export type ORDER_BY = 'ASC' | 'DESC'

export enum FILTER_OPERATOR {
  GT = 'gt',
  LT = 'lt',
  GTE = 'gte',
  LTE = 'lte',
  BTW = 'btw',
}

export enum LOG_LEVEL {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  VERBOSE = 'VERBOSE',
}

export const ERROR_DTO = {
  NOT_FOUND: (message?: string) => {
    return new ErrorDto('NOT_FOUND', message)
  },
  INTERNAL_SERVER_ERROR: new ErrorDto(
    'INTERNAL_SERVER_ERROR',
    `Internal server error`,
  ),
}

export const USER_ACTIVITY = 'USER_ACTIVITY'
export enum PRODUCT_EVENT {
  ALL = 'product.*',
  CREATED = 'product.created',
  VIEWED = 'product.viewed',
  SEARCHED = 'product.searched',
  UPDATED = 'product.updated',
  DELETED = 'product.updated',
}
