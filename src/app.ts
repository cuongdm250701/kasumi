import Koa, { Context } from 'koa';
import { AppState } from '@models/app.state';
import cors from '@koa/cors';
import koaBody, { HttpMethodEnum } from 'koa-body';
import { authRouter } from '@controllers/auth.controller';
import { publicHolidayRouter } from '@controllers/public-holiday.controller';
import Router from '@koa/router';
import { errorHandlerMiddleware } from '@middleware/error-handler.middleware';
import { loggerMiddleware } from '@middleware/logger.middleware';
import { config } from '@config/app';
import { AppDataSource } from '@config/app-datasource';
import { remarkRouter } from '@controllers/remark.controller';
import { businessSettingRouter } from '@controllers/business-setting.controller';
// import { Authorized } from '@middleware/auth.middleware';
const port = 3000;

const routers = [
  authRouter,
  publicHolidayRouter,
  remarkRouter,
  businessSettingRouter,
];

const app = new Koa<AppState, Context>();
app.use(cors());
app.use(
  koaBody({
    jsonLimit: '4mb',
    multipart: true,
    parsedMethods: [
      HttpMethodEnum.DELETE,
      HttpMethodEnum.GET,
      HttpMethodEnum.POST,
      HttpMethodEnum.GET,
    ],
  }),
);

const rootRouter = new Router();
routers.forEach((router) => {
  // url /workschedule/...
  rootRouter.use(config.api_prefix, router.routes());
});
app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);
// app.use(Authorized());
app.use(rootRouter.routes());

console.log(process.env.DATABASE_URL, 1234);

(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
  });
})();
