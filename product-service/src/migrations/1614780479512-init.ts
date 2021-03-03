import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1614780479512 implements MigrationInterface {
  name = 'init1614780479512'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `color` varchar(20) NOT NULL, `brand` varchar(255) NOT NULL, `unit_price` decimal(14,2) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `IDX_22cc43e9a74d7498546e9a63e7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`',
    )
    await queryRunner.query('DROP TABLE `product`')
  }
}
