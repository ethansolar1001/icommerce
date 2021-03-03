import { LOG_LEVEL } from '../constants'
import { ApiError } from '../dtos/api-error.dto'
import { ErrorDto } from '../dtos/error.dto'

export class InternalServerError extends ApiError {
  constructor(
    errorDto: ErrorDto | Array<ErrorDto>,
    originError?: Error,
    rawData?: any,
  ) {
    super(500, LOG_LEVEL.ERROR, errorDto, originError, rawData)
  }
}
