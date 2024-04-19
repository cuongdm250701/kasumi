import { TableEnum } from '@models/enum/table.enum';
import { BaseEntity } from '@src/ultis/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: TableEnum.TASKS })
export class TasksEntity extends BaseEntity {
  @Column({ name: 'process_month' })
  processMonth: number;

  @Column({ name: 'task_code' })
  taskCode: string;

  @Column({ name: 'task_name' })
  taskName: string;

  @Column({ name: 'type' })
  type: number;

  @Column({ name: 'minutes' })
  minutes: number;

  @Column({ name: 'remark' })
  remark: string;

  @ManyToOne(() => StoreEntity, (storeEntity) => storeEntity.tasks, {})
  @JoinColumn({ name: 'store_code' })
  @Column({ name: 'store_code' })
  storeCode: string;
}
