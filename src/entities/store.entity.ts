import { TableEnum } from '@models/enum/table.enum';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PublicHolidayEntity } from './public-holiday.entity';
import { RemarkEntity } from './remark.entity';
import { BusinessSetingEntity } from './business-setting.entity';

@Entity({ name: TableEnum.STORE })
export class StoreEntity {
  @PrimaryColumn({ name: 'store_code' })
  storeCode: string;

  @Column({ name: 'store_name' })
  storeName: string;

  @Column({ name: 'description' })
  nameKanji: string;

  @Column({ name: 'is_closed' })
  is_closed: boolean;

  @OneToMany(
    () => PublicHolidayEntity,
    (publicHolidayEntity) => publicHolidayEntity.storeCode,
  )
  publicHolidays: PublicHolidayEntity[];

  @OneToMany(() => RemarkEntity, (remarkEntity) => remarkEntity.storeCode)
  remarks: RemarkEntity[];

  @OneToMany(
    () => BusinessSetingEntity,
    (businessSetingEntity) => businessSetingEntity.storeCode,
  )
  businessSetings: BusinessSetingEntity[];
}
