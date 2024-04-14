import { AppDataSource } from '@config/app-datasource';
import { StoreEntity } from '@entities/store.entity';

export const storeRepo = AppDataSource.getRepository(StoreEntity).extend({});
