import { TableEnum } from '@models/enum/table.enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRemarkTable1713200628468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableEnum.REMARK,
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
            name: 'remark_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'remark_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'monday',
            type: 'varchar',
          },
          {
            name: 'tuesday',
            type: 'varchar',
          },
          {
            name: 'wednesday',
            type: 'varchar',
          },
          {
            name: 'thursday',
            type: 'varchar',
          },
          {
            name: 'friday',
            type: 'varchar',
          },
          {
            name: 'saturday',
            type: 'varchar',
          },
          {
            name: 'sunday',
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
      TableEnum.REMARK,
      new TableForeignKey({
        columnNames: ['store_code'],
        referencedTableName: TableEnum.STORE,
        referencedColumnNames: ['store_code'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableEnum.REMARK, true);
  }
}
