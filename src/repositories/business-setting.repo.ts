import { AppDataSource } from '@config/app-datasource';
import { BusinessSetingEntity } from '@entities/business-setting.entity';

export const businessSettingRepo = AppDataSource.getRepository(
  BusinessSetingEntity,
).extend({});
