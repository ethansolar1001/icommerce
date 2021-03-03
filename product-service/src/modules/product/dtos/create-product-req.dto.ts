import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'

export class CreateProductReqDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: `Product's name`,
    example: 'Iphone 12',
    required: true,
  })
  name: string

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: `Product's brand`,
    example: 'Apple',
    required: true,
  })
  brand: string

  @ApiProperty({
    description: `Product's color`,
    example: 'Black',
    required: false,
  })
  @IsOptional()
  @MaxLength(255)
  color: string

  @ApiProperty({
    description: `Price per item unit`,
    example: '100',
    required: true,
  })
  @IsNumber()
  @IsPositive()
  unitPrice: number
}
