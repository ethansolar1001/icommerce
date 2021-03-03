import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ApiError } from '../dtos/api-error.dto'
import { ErrorDto } from '../dtos/error.dto'
import { ERROR_DTO } from '../constants'
import { HttpLoggerService } from '../logger/http-logger.service'
import * as _ from 'lodash'
import { plainToClass } from 'class-transformer'
import { ValidationErrorDto } from '../dtos/validation-error.dto'

@Catch()
export class HttpAllExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const logger = new HttpLoggerService(request)

    let errors
    if (exception instanceof ApiError) {
      const apiError = exception as ApiError
      errors = apiError.errors
      return response.status(apiError.statusCode).json({
        errors: errors,
      })
    }

    const httpException =
      exception instanceof HttpException ? (exception as HttpException) : null

    if (httpException) {
      const status = httpException.getStatus()
      const message = httpException.message
      const errorRes = httpException.getResponse()
      if (!_.isString(errorRes)) {
        const validationError = plainToClass(ValidationErrorDto, errorRes)
        const outMsg = _.isArray(validationError.message)
          ? _.first(validationError.message)
          : validationError.message
        response.status(status).json({
          errors: [new ErrorDto(HttpStatus[status], outMsg)],
        })
      } else {
        response.status(status).json({
          errors: [new ErrorDto(HttpStatus[status], message)],
        })
      }
    } else {
      const error = this.isExceptionObject(exception)
        ? (exception as Error)
        : { message: null, stack: exception }
      logger.error(error.message, error.stack)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: [ERROR_DTO.INTERNAL_SERVER_ERROR],
      })
    }
  }
}
