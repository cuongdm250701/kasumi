import { Expose } from 'class-transformer';

export class User {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  role: string;

  @Expose()
  ischangedpassword: number;

  @Expose()
  token: string;
}
