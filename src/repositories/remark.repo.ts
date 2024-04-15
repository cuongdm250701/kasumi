import { AppDataSource } from '@config/app-datasource';
import { RemarkEntity } from '@entities/remark.entity';

export const remarkRepo = AppDataSource.getRepository(RemarkEntity).extend({});
