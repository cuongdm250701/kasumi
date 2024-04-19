import { AppDataSource } from '@config/app-datasource';
import { TasksEntity } from '@entities/tasks.entity';

export const tasksRepo = AppDataSource.getRepository(TasksEntity).extend({});
