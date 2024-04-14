import { TableEnum } from '@models/enum/table.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1672891091572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableEnum.USER,
        columns: [
          {
            name: 'username',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'store_code',
            type: 'varchar',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_login',
            type: 'varchar',
            isNullable: true,
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
