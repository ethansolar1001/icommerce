import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1614782384102 implements MigrationInterface {
  name = 'init1614782384102'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user_activity` (`id` bigint NOT NULL AUTO_INCREMENT, `ip_address` varchar(100) NOT NULL, `user_agent` varchar(100) NOT NULL, `event` varchar(255) NOT NULL, `method` varchar(25) NULL, `url` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user_activity`')
  }
}
