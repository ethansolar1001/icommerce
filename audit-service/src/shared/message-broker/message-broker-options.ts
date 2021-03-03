export class MessageBrokerOptions {
  url: string
  clusterId?: string
  queueGroup?: string
  maxReconnectAttempts?: number = -1
  reconnectTimeWait?: number = 2500
}
