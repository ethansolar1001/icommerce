import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter'
import { HttpContextService } from '../../../../src/shared/context/http-context.service'
import { Test } from '@nestjs/testing'
import { ProductService } from '../../../../src/modules/product/product.service'
import { ProductRepository } from '../../../../src/modules/product/product.repository'
import { ProductDto } from '../../../../src/modules/product/dtos/product.dto'

describe('ProductService', () => {
  let repository = {
    save: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    findOneIncludeClientType: jest.fn().mockReturnThis(),
    findIncludeClientType: jest.fn().mockReturnThis(),
    saveAndReturn: jest.fn().mockReturnThis(),
  }
  let contextService: HttpContextService
  let eventEmitter: EventEmitter2
  let productService: ProductService

  beforeEach(async () => {
    eventEmitter = new EventEmitter2()
    contextService = new HttpContextService(null)
    const moduleRef = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot({
          wildcard: true,
          delimiter: '.',
        }),
      ],
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: repository,
        },
        {
          provide: HttpContextService,
          useValue: contextService,
        },
      ],
    }).compile()

    eventEmitter = await moduleRef.resolve<EventEmitter2>(EventEmitter2)
    productService = await moduleRef.resolve<ProductService>(ProductService)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getProductDetail', () => {
    it('should return 1 product and emit event', async () => {
      jest.spyOn(contextService, 'requestContext', 'get').mockReturnValue({
        ip: '127.0.0.1',
        method: 'GET',
        url: 'api/v1/products/1',
        userAgent: 'PostmanRuntime/7.26.8',
      })
      const result = {
        id: 1,
        brand: 'apple',
        color: 'black',
        name: 'iphone12',
      }
      jest.spyOn(repository, 'findOne').mockImplementation(() => result)
      const received = await await productService.getProductDetail(1)
      const resDto = new ProductDto()
      Object.assign(resDto, result)
      expect(received).toEqual(resDto)
      expect(eventEmitter.emit.call.length).toEqual(1)
    })
  })

  describe('getProductDetail', () => {
    it('should return 1 product and emit event', async () => {
      jest.spyOn(contextService, 'requestContext', 'get').mockReturnValue({
        ip: '127.0.0.1',
        method: 'GET',
        url: 'api/v1/products/1',
        userAgent: 'PostmanRuntime/7.26.8',
      })
      const result = {
        id: 1,
        brand: 'apple',
        color: 'black',
        name: 'iphone12',
      }
      jest.spyOn(repository, 'findOne').mockImplementation(() => result)
      const received = await await productService.getProductDetail(1)
      const resDto = new ProductDto()
      Object.assign(resDto, result)
      expect(received).toEqual(resDto)
      expect(eventEmitter.emit.call.length).toEqual(1)
    })
  })
})
