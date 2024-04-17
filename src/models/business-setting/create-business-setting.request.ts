import { ItemBusinessSetting } from '@src/constants/interface';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateBusinessSettingRequest {
  @IsArray()
  @IsNotEmpty()
  listBusinessSetting: ItemBusinessSetting[];
}
