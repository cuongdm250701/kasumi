import { TableEnum } from '@models/enum/table.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStoreTbl1712805406787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableEnum.STORE,
        columns: [
          {
            name: 'store_code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'store_name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'is_closed',
            type: 'boolean',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableEnum.USER, true);
  }
}
