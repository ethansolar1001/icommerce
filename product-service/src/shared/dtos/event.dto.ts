import { RequestContextDto } from './request-context'

export class EventDto {
  name: string
  context: any
  payload?: any

  constructor(data: EventDto) {
    const { name, context, payload } = data || {}
    this.name = name
    this.context = context
    this.payload = payload
  }
}
