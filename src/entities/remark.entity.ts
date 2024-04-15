import { TableEnum } from '@models/enum/table.enum';
import { BaseEntity } from '@src/ultis/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: TableEnum.REMARK })
export class RemarkEntity extends BaseEntity {
  @Column({ name: 'process_month' })
  processMonth: number;

  @Column({ name: 'remark_code' })
  remarkCode: string;

  @Column({ name: 'remark_name' })
  remarkName: string;

  @Column({ name: 'monday' })
  monday: string;

  @Column({ name: 'tuesday' })
  tuesday: string;

  @Column({ name: 'wednesday' })
  wednesday: string;

  @Column({ name: 'thursday' })
  thursday: string;

  @Column({ name: 'friday' })
  friday: string;

  @Column({ name: 'saturday' })
  saturday: string;

  @Column({ name: 'sunday' })
  sunday: string;

  @ManyToOne(() => StoreEntity, (storeEntity) => storeEntity.remarks, {})
  @JoinColumn({ name: 'store_code' })
  @Column({ name: 'store_code' })
  storeCode: string;
}
