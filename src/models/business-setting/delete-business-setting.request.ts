import { Type } from 'class-transformer';
import { IsNotEmpty, IsArray } from 'class-validator';

export class DeleteBusinessSettingRequest {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  ids: number[];
}
