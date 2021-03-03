import { Controller } from '@nestjs/common'
import { Payload, MessagePattern } from '@nestjs/microservices'
import { USER_ACTIVITY } from '../../shared/constants'
import { EventDto } from '../../shared/dtos/event.dto'
import { RpcLoggerService } from '../../shared/logger/rpc-logger.service'
import { CreateUserActivityDto } from './dtos/create-user-activity.dto'
import { UserActivityService } from './user-activity.service'

@Controller()
export class UserActivityRpcController {
  constructor(
    private readonly userActivityService: UserActivityService,
    private readonly logger: RpcLoggerService,
  ) {}

  @MessagePattern(USER_ACTIVITY)
  async handleProductEvent(@Payload() dto: EventDto): Promise<void> {
    this.logger.log(`Received event: ${dto.name}`)
    const { name, context } = dto
    const { ip, method, url, userAgent } = context
    await this.userActivityService.createUserActivity(
      new CreateUserActivityDto({
        event: name,
        ipAddress: ip,
        method: method,
        userAgent: userAgent,
        url: url,
      }),
    )
  }
}
