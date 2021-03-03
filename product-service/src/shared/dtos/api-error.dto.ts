import { LOG_LEVEL } from '../constants'
import { ErrorDto } from './error.dto'

export class ApiError extends Error {
  statusCode: number
  logLevel: LOG_LEVEL
  errors: Array<ErrorDto>
  originError: Error
  rawData: any

  constructor(
    statusCode: number,
    logLevel: LOG_LEVEL,
    errorDto: ErrorDto | Array<ErrorDto>,
    originError?: Error,
    rawData?: any,
  ) {
    super()
    this.statusCode = statusCode
    this.logLevel = logLevel
    this.errors = Array.isArray(errorDto) ? errorDto : [errorDto]
    this.originError = originError
    this.rawData = rawData
  }
}
