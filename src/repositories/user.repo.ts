import { AppDataSource } from '@config/app-datasource';
import { UserEntity } from '@entities/user.entity';

export const userRepo = AppDataSource.getRepository(UserEntity).extend({});
