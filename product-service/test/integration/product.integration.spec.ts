import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { ProductModule } from '../../src/modules/product/product.module'
import { ProductRepository } from '../../src/modules/product/product.repository'
import configuration from '../../src/config/configuration'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { LoggerModule } from '../../src/shared/logger/logger.module'
import { ContextModule } from '../../src/shared/context/context.module'
import { ProductService } from '../../src/modules/product/product.service'
import { ContextIdFactory } from '@nestjs/core'
import { HttpContextService } from '../../src/shared/context/http-context.service'

describe('Products', () => {
  let app: INestApplication
  let productService: ProductService
  let repository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findOneIncludeClientType: jest.fn(),
    findIncludeClientType: jest.fn(),
    saveAndReturn: jest.fn(),
  }

  const contextService = new HttpContextService(null)
  beforeAll(async () => {
    const contextId = ContextIdFactory.create()
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId)
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          cache: true,
        }),
        ProductModule,
        LoggerModule,
        ContextModule,
        EventEmitterModule.forRoot({
          wildcard: true,
          delimiter: '.',
        }),
      ],
    })
      .overrideProvider(ProductRepository)
      .useValue(repository)
      .overrideProvider(HttpContextService)
      .useValue(contextService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()

    productService = await moduleRef.resolve(ProductService, contextId)
  })

  it(`GET /api/v1/products/:productId`, async (done) => {
    jest.spyOn(contextService, 'requestContext', 'get').mockReturnValue({
      ip: '127.0.0.1',
      method: 'GET',
      url: 'api/v1/products/1',
      userAgent: 'PostmanRuntime/7.26.8',
    })
    const product = { id: 1, name: 'iPhone', brand: 'apple' }
    repository.findOne.mockReturnValueOnce(product)
    request(app.getHttpServer())
      .get('/api/v1/products/1')
      .expect(200)
      .expect(product)
    done()
  })

  afterAll(async () => {
    await app.close()
  })
})
