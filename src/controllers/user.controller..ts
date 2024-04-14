import Router from '@koa/router';
import { Authorized } from '@middleware/auth.middleware';
import { AppState } from '@models/app.state';
import { ResponseBuilder } from '@src/ultis/response-builder';
import { Context, ParameterizedContext } from 'koa';

export const router = new Router();

const userRouter = new Router({ prefix: '/user' });

userRouter.get(
  '/get',
  Authorized(),
  async (ctx: ParameterizedContext<AppState, Context>) => {
    const data = 'User 1';
    ctx.body = new ResponseBuilder<any>(data).build();
  },
);

export { userRouter };
