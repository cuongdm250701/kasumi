import { userRepo } from '@repositories/user.repo';
import { AppDataSource } from '@config/app-datasource';
import { RegisterRequest } from '@models/user/user';
import { Service } from 'typedi';
import { ApiError } from '@models/api.error';
import { ResponseCodeEnum } from '@models/enum/response-code.enum';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UserEntity } from '@entities/user.entity';
import moment from 'moment-timezone';
import { config } from '@config/app';
import { AuthInfoRequest } from '@models/authorization/auth-info.request';
import { plainToClass } from 'class-transformer';
import { UserInfo } from '@models/authorization/user-info';
import { storeRepo } from '@repositories/store.repo';

@Service()
export class AuthService {
  async test(): Promise<any> {
    console.log(1);
    return await storeRepo.find();
  }

  async register(data: RegisterRequest): Promise<any> {
    const user = await userRepo.findOne({ where: { username: data.username } });
    if (user) throw new ApiError(ResponseCodeEnum.BAD_REQUEST, 'Existing user');
    else {
      const salt = genSaltSync();
      const newUser = new UserEntity();

      newUser.username = data.username;
      newUser.password = hashSync(`${data.password}`, salt);
      newUser.isActive = true;
      newUser.role = data.role;
      newUser.storeCode = data.storeCode;
      newUser.createdAt = moment(new Date())
        .tz(config.timezone)
        .format('YYYYMMDD');

      return await userRepo.save(newUser);
    }
  }

  async authenticate(data: AuthInfoRequest): Promise<any> {
    const user = await userRepo.findOne({ where: { username: data.username } });

    if (!user) return;
    if (!compareSync(data.password, user.password)) return;

    const userInfo = plainToClass(UserInfo, user, {
      excludeExtraneousValues: true,
    });

    // userInfo.token = jwt.sign(classToPlain(userInfo), config.jwt_secret, {
    //   expiresIn: config.jwt_expires_in,
    // });

    return userInfo;
  }
}
