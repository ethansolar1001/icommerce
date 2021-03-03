import { EntityRepository } from 'typeorm'
import { BaseRepository } from '../../shared/base-respository'
import { Product } from './product.entity'

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {}
