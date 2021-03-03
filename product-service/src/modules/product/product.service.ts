import { Injectable } from '@nestjs/common'
import { IQuery } from '../../shared/interfaces/query.interface'
import { CreateProductReqDto, GetProductResDto } from './dtos'
import { ProductRepository } from './product.repository'
import { plainToClass } from 'class-transformer'
import { ProductDto } from './dtos/product.dto'
import { CriteriaBuilder } from '../../shared/utlils/criteria-builder'
import * as _ from 'lodash'
import { UpdateProductReqDto } from './dtos/update-product-req.dto'
import { BadRequestError } from '../../shared/errors/bad-request-error'
import { ERROR_DTO, PRODUCT_EVENT } from '../../shared/constants'
import { HttpContextService } from '../../shared/context/http-context.service'
import { EventDto } from '../../shared/dtos/event.dto'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly contextService: HttpContextService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getProductDetail(productId: number): Promise<ProductDto> {
    const product =
      (await this.repository.findOne({ where: { id: productId } })) || {}

    this.eventEmitter.emit(
      PRODUCT_EVENT.VIEWED,
      new EventDto({
        name: PRODUCT_EVENT.VIEWED,
        context: this.contextService.requestContext,
        payload: { id: productId },
      }),
    )

    return plainToClass(ProductDto, product)
  }

  async searchProducts(query: IQuery<ProductDto>): Promise<GetProductResDto> {
    const { filter, search, sort } = query
    const criteria = new CriteriaBuilder()
      .addSearch(search)
      .addFilter(filter)
      .addSort(sort)
      .build()
    const products = (await this.repository.find(criteria)) || []
    const res = new GetProductResDto()
    res.products = _.map(products, (prod) => {
      return plainToClass(GetProductResDto, prod)
    })

    this.eventEmitter.emit(
      PRODUCT_EVENT.SEARCHED,
      new EventDto({
        name: PRODUCT_EVENT.SEARCHED,
        context: this.contextService.requestContext,
      }),
    )

    return res
  }

  async createProduct(dto: CreateProductReqDto): Promise<ProductDto> {
    const { name, color, brand, unitPrice } = dto
    const product = this.repository.create({ name, color, brand, unitPrice })
    const result = await this.repository.save(product)

    this.eventEmitter.emit(
      PRODUCT_EVENT.CREATED,
      new EventDto({
        name: PRODUCT_EVENT.CREATED,
        context: this.contextService.requestContext,
        payload: product,
      }),
    )

    return plainToClass(ProductDto, result)
  }

  async updateProduct(
    productId: number,
    dto: UpdateProductReqDto,
  ): Promise<ProductDto> {
    const { name, color, brand, unitPrice } = dto
    const product = await this.repository.findOne({ id: productId })
    if (!product) {
      throw new BadRequestError(ERROR_DTO.NOT_FOUND(`Product not found`))
    }

    product.name = name
    product.color = color
    product.brand = brand
    product.unitPrice = unitPrice
    const result = await this.repository.save(product)

    this.eventEmitter.emit(
      PRODUCT_EVENT.UPDATED,
      new EventDto({
        name: PRODUCT_EVENT.UPDATED,
        context: this.contextService.requestContext,
        payload: product,
      }),
    )

    return plainToClass(ProductDto, result)
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.repository.softDelete(productId)
  }
}
