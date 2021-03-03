import { Injectable, Inject, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { RequestContextDto } from '../dtos/request-context'

@Injectable({ scope: Scope.REQUEST })
export class HttpContextService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  get requestContext(): RequestContextDto {
    const { ip, method, url } = this.request
    return {
      ip: ip,
      userAgent: this.request.header('user-agent'),
      method: method,
      url: url,
    }
  }
}
