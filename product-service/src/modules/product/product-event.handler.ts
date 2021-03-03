import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { PRODUCT_EVENT, USER_ACTIVITY } from '../../shared/constants'
import { NatsStreamingClient } from '../../shared/message-broker/nats-streaming-client'

@Injectable()
export class ProductEventHandler {
  constructor(
    private eventEmitter: EventEmitter2,
    private messageBroker: NatsStreamingClient,
  ) {}

  @OnEvent(PRODUCT_EVENT.ALL)
  async handleProductEvent(payload: any) {
    await this.messageBroker.publish(USER_ACTIVITY, payload)
  }
}
