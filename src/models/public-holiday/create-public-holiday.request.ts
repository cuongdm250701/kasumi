import { IsNotEmpty, IsArray } from 'class-validator';

interface ItemPublicHoliday {
  type: number;
  month: number;
  date: number;
  event_details: string;
}

export class CreatePublicHolidayRequest {
  @IsArray()
  @IsNotEmpty()
  list_of_holiday: ItemPublicHoliday[];
}
