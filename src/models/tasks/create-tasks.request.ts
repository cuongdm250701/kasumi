import { ItemTasks } from '@src/constants/interface';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateTasksRequest {
  @IsArray()
  @IsNotEmpty()
  listTasks: ItemTasks[];
}
