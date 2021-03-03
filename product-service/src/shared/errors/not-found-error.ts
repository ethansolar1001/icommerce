import { LOG_LEVEL } from '../constants'
import { ApiError } from '../dtos/api-error.dto'
import { ErrorDto } from '../dtos/error.dto'

export class NotFoundError extends ApiError {
  constructor(errorDto: ErrorDto | Array<ErrorDto>, originError?: Error) {
    super(404, LOG_LEVEL.WARN, errorDto, originError)
  }
}
