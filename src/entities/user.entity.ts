import { TableEnum } from '../models/enum/table.enum';

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: TableEnum.USER })
export class UserEntity {
  @PrimaryColumn({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'store_code' })
  storeCode: string;

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'last_login' })
  lastLogin: string;
}
