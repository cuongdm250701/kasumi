import { IsString, IsNotEmpty } from 'class-validator';

export class AuthInfoRequest {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
