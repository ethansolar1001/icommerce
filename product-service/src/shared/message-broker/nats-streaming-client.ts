import * as NatsStreaming from 'node-nats-streaming'
import { Stan } from 'node-nats-streaming'
import { v4 } from 'uuid'
import { MessageBrokerOptions } from './message-broker-options'

export class NatsStreamingClient {
  private client: Stan = null
  constructor(private readonly options: MessageBrokerOptions) {}

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const { url, clusterId, queueGroup } = this.options
      const clientId = `${queueGroup}-${v4()}`
      this.client = NatsStreaming.connect(clusterId, clientId, {
        url: url,
        maxReconnectAttempts: this.options.maxReconnectAttempts,
        reconnectTimeWait: this.options.reconnectTimeWait,
      })
        .on('error', reject)
        .on('connect', resolve)
    })
  }

  public subscribe(
    channel: string,
    messageHandler: (message: any) => Promise<void>,
    errorHandler: (error: any) => void,
  ): void {
    const { queueGroup } = this.options
    const subscribeOpts = this.client
      .subscriptionOptions()
      .setStartWithLastReceived()
    subscribeOpts.setDurableName(channel)
    this.client
      .subscribe(channel, queueGroup, subscribeOpts)
      .on('message', async (rawMessage) => {
        const content = rawMessage.getData()
        await messageHandler(JSON.parse(content))
      })
      .on('error', errorHandler)
  }

  public async publish(channel: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(channel, JSON.stringify(data), (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }

  public close(): void {
    this.client && this.client.close()
    this.client = null
  }
}
