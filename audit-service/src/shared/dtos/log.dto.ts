export class LogDto {
  time: string
  message: any
  level: string
  context?: any
  url?: string
  path?: string
  correlationId?: string
}
