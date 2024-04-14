import { IsString, IsNotEmpty } from 'class-validator';

export class CommonInfoRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}
