import {
  Server,
  CustomTransportStrategy,
  IncomingEvent,
} from '@nestjs/microservices'
import { MessageBrokerOptions } from './message-broker-options'
import { NatsStreamingClient } from './nats-streaming-client'

export class MessageBrokerServer
  extends Server
  implements CustomTransportStrategy {
  private client: NatsStreamingClient
  constructor(private readonly options: MessageBrokerOptions) {
    super()
  }

  private async init(): Promise<void> {
    try {
      this.client = new NatsStreamingClient(this.options)
      await this.client.connect()
      this.logger.log(`Connected to nats streaming server...`)
      this.bindEvents()
    } catch (error) {
      this.logger.log(`Failed to connect to nats streaming server!`)
      this.handleError(error)
    }
  }

  private bindEvents() {
    const registeredPatterns = [...this.messageHandlers.keys()]
    registeredPatterns.forEach((pattern) => {
      this.client.subscribe(
        pattern,
        (content) => this.handleMessage(pattern, content),
        (error) => this.handleError(error),
      )
    })
  }

  public async listen(callback: () => void) {
    await this.init()
    callback()
  }

  public close() {
    this.client && this.client.close()
    this.client = null
  }

  private async handleMessage(pattern, content: any): Promise<void> {
    this.logger.log(`Received a message ${content}`)
    const message = {
      pattern: pattern,
      data: content,
    }
    const packet = message as IncomingEvent
    await this.handleEvent(pattern, packet, null)
  }
}
