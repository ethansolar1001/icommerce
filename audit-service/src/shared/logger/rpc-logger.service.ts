import * as _ from 'lodash'
import * as winston from 'winston'
import { Injectable, Optional, Inject, Scope } from '@nestjs/common'
import { LOG_LEVEL } from '../constants'
import { RequestContext, CONTEXT } from '@nestjs/microservices'
import { LogDto } from '../dtos/log.dto'

@Injectable({ scope: Scope.REQUEST })
export class RpcLoggerService {
  public logLevel: string
  private correlationId: string
  private logger: winston.Logger

  constructor(
    @Optional() @Inject(CONTEXT) private readonly ctx?: RequestContext,
  ) {
    this.correlationId = ctx?.data?.correlationId
    this.logger = winston.createLogger({
      format: winston.format.printf(({ message }) => message),
      transports: [new winston.transports.Console()],
    })
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
