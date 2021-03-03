import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class UserActivity {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'ip_address',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  ipAddress: string

  @Column({
    name: 'user_agent',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  userAgent: string

  @Column({
    name: 'event',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  event: string

  @Column({
    name: 'method',
    type: 'varchar',
    nullable: true,
    length: 25,
  })
  method: string

  @Column({
    name: 'url',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  url: string

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
}
