export class CreateUserActivityDto {
  ipAddress: string
  userAgent: string
  method: string
  url: string
  event: string

  constructor(data: CreateUserActivityDto) {
    const { ipAddress, userAgent, method, url, event } = data
    this.ipAddress = ipAddress
    this.userAgent = userAgent
    this.method = method
    this.url = url
    this.event = event
  }
}
