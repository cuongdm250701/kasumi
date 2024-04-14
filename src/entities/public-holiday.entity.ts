import { TableEnum } from '@models/enum/table.enum';
import { BaseEntity } from '@src/ultis/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: TableEnum.PUBLIC_HOLIDAY })
export class PublicHolidayEntity extends BaseEntity {
  @Column({ name: 'type' })
  type: number;

  @Column({ name: 'month' })
  month: number;

  @Column({ name: 'date' })
  date: number;

  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'event_details' })
  eventDetails: string;

  @Column({ name: 'holidays' })
  holidays: string;

  @ManyToOne(() => StoreEntity, (storeEntity) => storeEntity.publicHolidays, {})
  @JoinColumn({ name: 'store_code' })
  @Column({ name: 'store_code' })
  storeCode: string;
}
