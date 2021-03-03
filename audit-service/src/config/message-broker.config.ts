import { MessageBrokerOptions } from '../shared/message-broker/message-broker-options'

const {
  MESSAGE_BROKER_URL,
  MESSAGE_BROKER_CLUSTER_ID,
  QUEUE_NAME,
} = process.env

const messageBrokerConfig: MessageBrokerOptions = {
  url: MESSAGE_BROKER_URL,
  clusterId: MESSAGE_BROKER_CLUSTER_ID,
  queueGroup: QUEUE_NAME,
}
export default messageBrokerConfig
