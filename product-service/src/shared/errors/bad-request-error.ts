import { LOG_LEVEL } from '../constants'
import { ApiError } from '../dtos/api-error.dto'
import { ErrorDto } from '../dtos/error.dto'

export class BadRequestError extends ApiError {
  constructor(errorDto: ErrorDto | Array<ErrorDto>, originError?: Error) {
    super(400, LOG_LEVEL.INFO, errorDto, originError)
  }
}
