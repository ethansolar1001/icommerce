import { Module, Global } from '@nestjs/common'
import { providers } from './database.providers'

@Global()
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
