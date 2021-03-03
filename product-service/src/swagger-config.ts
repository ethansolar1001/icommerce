import { DocumentBuilder } from '@nestjs/swagger'

const SwaggerConfig = new DocumentBuilder()
  .setTitle('Product service')
  .setDescription('Product service API description')
  .setVersion('1.0')
  .build()

export default SwaggerConfig
