import { AppDataSource } from '@config/app-datasource';
import { PublicHolidayEntity } from '@entities/public-holiday.entity';

export const publicHolidayRepo = AppDataSource.getRepository(
  PublicHolidayEntity,
).extend({});
