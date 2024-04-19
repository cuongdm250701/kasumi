import { TableEnum } from '@models/enum/table.enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTaskTable1713369771265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableEnum.TASKS,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          {
            name: 'process_month',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'task_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'task_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'minutes',
            type: 'integer',
          },
          {
            name: 'remark',
            type: 'varchar',
          },
          {
            name: 'store_code',
            type: 'varchar',
            foreignKeyConstraintName: 'store_code',
          },
          {
            name: 'created_at',
            type: 'date',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'date',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      TableEnum.TASKS,
      new TableForeignKey({
        columnNames: ['store_code'],
        referencedTableName: TableEnum.STORE,
        referencedColumnNames: ['store_code'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableEnum.TASKS, true);
  }
}
