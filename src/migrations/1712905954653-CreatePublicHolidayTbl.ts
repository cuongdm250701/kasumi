import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { TableEnum } from '@models/enum/table.enum';

export class CreatePublicHolidayTbl1712905954653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableEnum.PUBLIC_HOLIDAY,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          {
            name: 'type',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'month',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'event_details',
            type: 'varchar',
          },
          {
            name: 'holidays',
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
      TableEnum.PUBLIC_HOLIDAY,
      new TableForeignKey({
        columnNames: ['store_code'],
        referencedTableName: TableEnum.STORE,
        referencedColumnNames: ['store_code'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableEnum.PUBLIC_HOLIDAY, true);
  }
}
