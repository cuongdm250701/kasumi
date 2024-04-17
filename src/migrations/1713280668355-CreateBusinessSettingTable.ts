import { TableEnum } from '@models/enum/table.enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBusinessSettingTable1713280668355
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableEnum.BUSINESS_SETTING,
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
            name: 'business_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'business_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'attendance_status',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'salary_status',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'time_category',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'rate',
            type: 'numeric',
          },
          {
            name: 'business_type',
            type: 'varchar',
            isNullable: false,
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
      TableEnum.BUSINESS_SETTING,
      new TableForeignKey({
        columnNames: ['store_code'],
        referencedTableName: TableEnum.STORE,
        referencedColumnNames: ['store_code'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableEnum.BUSINESS_SETTING, true);
  }
}
