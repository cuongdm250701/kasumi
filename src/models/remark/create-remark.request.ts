import { IsNotEmpty, IsArray } from 'class-validator';

interface ItemRemark {
  remark_code: string;
  remark_name: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export class CreateRemarkRequest {
  @IsArray()
  @IsNotEmpty()
  list_remark: ItemRemark[];
}
