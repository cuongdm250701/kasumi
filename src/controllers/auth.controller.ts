import Router from '@koa/router';
import { Authorized } from '@middleware/auth.middleware';
import { AppState } from '@models/app.state';
import { AuthInfoRequest } from '@models/authorization/auth-info.request';
import { RegisterRequest } from '@models/user/user';
import { transformAndValidate } from '@models/validator/validator';
import { AuthService } from '@services/auth.service';
import { ResponseBuilder } from '@src/ultis/response-builder';
import { Context, ParameterizedContext } from 'koa';
import Container from 'typedi';
export const router = new Router();

const authRouter = new Router({ prefix: '/auth' });

authRouter.get(
  '/test',
  // Authorized(),
  async (ctx: ParameterizedContext<AppState, Context>) => {
    const userService = Container.get(AuthService);
    const data = await userService.test();

    ctx.body = new ResponseBuilder<any>(data).build();
  },
);

authRouter.post(
  '/register',
  async (ctx: ParameterizedContext<AppState, Context>) => {
    const userInfo = await transformAndValidate<RegisterRequest>(
      RegisterRequest,
      ctx.request.body,
    );

    const userService = Container.get(AuthService);
    const data = userService.register(userInfo);

    ctx.body = new ResponseBuilder<any>(data).build();
  },
);

authRouter.post(
  '/common',
  async (ctx: ParameterizedContext<AppState, Context>) => {
    const userInfo = await transformAndValidate<AuthInfoRequest>(
      AuthInfoRequest,
      ctx.request.body,
    );

    const userService = Container.get(AuthService);
    const data = userService.authenticate(userInfo);

    ctx.body = new ResponseBuilder<any>(data).build();
  },
);

export { authRouter };
