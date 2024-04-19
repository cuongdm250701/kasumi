import { TableEnum } from '@models/enum/table.enum';
import { BaseEntity } from '@src/ultis/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: TableEnum.BUSINESS_SETTING })
export class BusinessSetingEntity extends BaseEntity {
  @Column({ name: 'process_month' })
  processMonth: number;

  @Column({ name: 'business_code' })
  businessCode: string;

  @Column({ name: 'attendance_status' })
  attendanceStatus: number;

  @Column({ name: 'salary_status' })
  salaryStatus: number;

  @Column({ name: 'time_category' })
  timeCategory: number;

  @Column({ name: 'rate' })
  rate: number;

  @Column({ name: 'business_type' })
  businessType: string;

  @Column({ name: 'business_name' })
  businessName: string;

  @ManyToOne(
    () => StoreEntity,
    (storeEntity) => storeEntity.businessSettings,
    {},
  )
  @JoinColumn({ name: 'store_code' })
  @Column({ name: 'store_code' })
  storeCode: string;
}
