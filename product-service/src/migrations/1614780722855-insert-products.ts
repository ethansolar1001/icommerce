import { MigrationInterface, QueryRunner } from 'typeorm'

export class insertProducts1614780722855 implements MigrationInterface {
  name = 'insertProducts1614780722855'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into('product')
      .values([
        {
          id: 1,
          name: 'iPhone 12 Plus',
          brand: 'Apple',
          color: 'Black',
          unitPrice: 30000000,
        },
        {
          id: 7,
          name: 'iPhone 11',
          brand: 'Apple',
          color: 'Gray',
          unitPrice: 15990000,
        },
        {
          id: 3,
          name: 'Samsung galaxy s21',
          brand: 'Samsung',
          color: 'Gray',
          unitPrice: 26500000,
        },
        {
          id: 4,
          name: 'Samsung A10',
          brand: 'Samsung',
          color: 'White',
          unitPrice: 8000000,
        },
        {
          id: 5,
          name: 'Xiaomi blackshark 3',
          brand: 'Xiaomi',
          color: 'Black',
          unitPrice: 12000000,
        },
        {
          id: 6,
          name: 'Vsmart Joy 4',
          brand: 'Vsmart',
          color: 'Blue',
          unitPrice: 11500000,
        },
      ])
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'DELETE FROM `product` WHERE `id` IN (1, 2, 3, 4, 5, 6)',
    )
  }
}
