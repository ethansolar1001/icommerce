import { IsOptional } from 'class-validator'

export class ProductDto {
  @IsOptional()
  id: string

  @IsOptional()
  name: string

  @IsOptional()
  brand: string

  @IsOptional()
  color: string

  @IsOptional()
  unitPrice: number
}
