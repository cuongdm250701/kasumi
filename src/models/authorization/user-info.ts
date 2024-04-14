import { Expose } from 'class-transformer';

export class UserInfo {
  @Expose()
  name: string;

  @Expose()
  role: string;

  @Expose()
  username: string;

  @Expose()
  storeCode: string;

  @Expose()
  token: string;
}
