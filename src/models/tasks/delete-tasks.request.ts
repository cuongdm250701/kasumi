import { Type } from 'class-transformer';
import { IsNotEmpty, IsArray } from 'class-validator';

export class DeleteTasksRequest {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  ids: number[];
}
