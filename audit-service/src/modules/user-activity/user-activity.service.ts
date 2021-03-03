import * as _ from 'lodash'
import { Injectable, Scope } from '@nestjs/common'
import { RpcLoggerService } from '../../shared/logger/rpc-logger.service'
import { UserActivityRepository } from './user-activity.repsitory'
import { CreateUserActivityDto } from './dtos/create-user-activity.dto'

@Injectable({ scope: Scope.REQUEST })
export class UserActivityService {
  constructor(
    private readonly logger: RpcLoggerService,
    private readonly repository: UserActivityRepository,
  ) {}

  public async createUserActivity(dto: CreateUserActivityDto): Promise<void> {
    const { event, userAgent, ipAddress, method, url } = dto
    this.logger.log(`Create user activity: ${event}`)
    const userActivity = this.repository.create()
    userActivity.event = event
    userActivity.userAgent = userAgent
    userActivity.ipAddress = ipAddress
    userActivity.method = method
    userActivity.url = url
    await this.repository.save(userActivity)
  }
}
