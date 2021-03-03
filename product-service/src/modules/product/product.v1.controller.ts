import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ProductService } from './product.service'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { CreateProductReqDto, GetProductResDto } from './dtos'
import { QueryParserPipe } from '../../shared/pipes/query-parser.pipe'
import { ProductDto } from './dtos/product.dto'
import { IQuery } from '../../shared/interfaces/query.interface'
import { UpdateProductReqDto } from './dtos/update-product-req.dto'

@ApiTags('Products')
@Controller('/api/v1/products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductV1Controller {
  constructor(private readonly service: ProductService) {}

  @ApiOperation({ summary: 'Search product' })
  @ApiOkResponse({
    type: [GetProductResDto],
  })
  @Get()
  async getProducts(
    @Query(new QueryParserPipe(ProductDto)) query: IQuery<ProductDto>,
  ): Promise<GetProductResDto> {
    return this.service.searchProducts(query)
  }

  @ApiOperation({ summary: 'Get product detail' })
  @ApiOkResponse({
    type: ProductDto,
  })
  @Get('/:productId')
  async getProductDetail(
    @Param('productId') productId: number,
  ): Promise<ProductDto> {
    return this.service.getProductDetail(productId)
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiCreatedResponse({
    type: ProductDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() dto: CreateProductReqDto): Promise<ProductDto> {
    return this.service.createProduct(dto)
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiOkResponse({
    type: ProductDto,
  })
  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body() dto: UpdateProductReqDto,
  ): Promise<ProductDto> {
    return this.service.updateProduct(productId, dto)
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiOkResponse()
  @Delete('/:productId')
  async deleteProduct(@Param('productId') productId: number): Promise<void> {
    return this.service.deleteProduct(productId)
  }
}
