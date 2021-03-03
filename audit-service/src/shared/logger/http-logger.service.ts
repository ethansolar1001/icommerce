import { Inject, Injectable, Scope, Optional } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { LOG_LEVEL } from '../constants'
import * as _ from 'lodash'
import * as winston from 'winston'
import { LogDto } from '../dtos/log.dto'

@Injectable({ scope: Scope.REQUEST })
export class HttpLoggerService {
  public logLevel: string
  private correlationId: string
  private logger: winston.Logger

  constructor(@Optional() @Inject(REQUEST) private request?: Request) {
    this.correlationId = request && request?.res?.locals?.correlationId
    this.logger = winston.createLogger({
      format: winston.format.printf(({ message }) => message),
      transports: [new winston.transports.Console()],
    })
  }

  get CorrelationId() {
    return (
      this.request &&
      this.request.res &&
      this.request.res.locals &&
      this.request.res.locals.correlationId
    )
  }

  setLogLevel(logLevel: LOG_LEVEL) {
    this.logLevel = _.toLower(LOG_LEVEL[logLevel])
    this.logger.level = this.logLevel
  }

  getCorrelationId(): string {
    return this.correlationId
  }

  isDebugEnabled(): boolean {
    return this.logger.levels[this.logLevel] >= this.logger.levels['debug']
  }

  error(message: any, context?: any): void {
    this.write('error', message, context)
  }

  warn(message: any, context?: any): void {
    this.write('warn', message, context)
  }

  log(message: any, context?: any): void {
    this.write('info', message, context)
  }

  verbose(message: any, context?: any): void {
    this.write('verbose', message, context)
  }

  debug(message: any, context?: any): void {
    this.write('debug', message, context)
  }

  write(level, message: any, context?: any): void {
    const localeStringOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    }
    const timestamp = new Date(Date.now()).toLocaleString(
      undefined,
      localeStringOptions,
    )
    const log = new LogDto()
    log.time = timestamp
    log.message = this.format(message)
    log.level = level
    if (this.correlationId) {
      log.correlationId = this.correlationId
    }
    log.context = this.format(context)
    this.logger.log(level, JSON.stringify(log))
  }

  private format(message: any) {
    if (message instanceof Error) {
      return {
        name: message.name,
        message: message.message,
        stack: message.stack,
      }
    }
    return _.isObject(message) ? message : { detail: message }
  }
}
