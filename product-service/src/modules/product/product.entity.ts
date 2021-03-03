import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { NumericTransformer } from '../../shared/utlils/numberic-transformer'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  name: string

  @Column({
    name: 'color',
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  color: string

  @Column({
    name: 'brand',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  brand: string

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
    transformer: new NumericTransformer(),
  })
  unitPrice?: number

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
  })
  deletedAt: Date
}
