import { DATABASE_CONNECTION } from '../../shared/constants'
import { Connection } from 'typeorm'
import { ProductRepository } from './product.repository'
import { ProductEventHandler } from './product-event.handler'

export const providers = [
  ProductEventHandler,
  {
    provide: ProductRepository,
    useFactory: (connection: Connection): ProductRepository => {
      return connection.getCustomRepository(ProductRepository)
    },
    inject: [DATABASE_CONNECTION],
  },
]
