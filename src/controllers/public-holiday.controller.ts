import Router from '@koa/router';
import { ResponseBuilder } from '@src/ultis/response-builder';
import { Context, ParameterizedContext } from 'koa';
import { PublicHolidayService } from '@services/public-holiday.service';
import Container from 'typedi';
import { transformAndValidate } from '@models/validator/validator';
import { DeletePublicHolidayRequest } from '@models/public-holiday/delete-public-holiday.requrest';
import { CreatePublicHolidayRequest } from '@models/public-holiday/create-public-holiday.request';

// const router = new Router();

const publicHolidayRouter = new Router();
publicHolidayRouter.post(
  '/init-public-holiday',
  async (ctx: ParameterizedContext<Context>) => {
    const publicHolidayService = Container.get(PublicHolidayService);
    await publicHolidayService.initPublicHoliday().then((rs) => {
      ctx.body = new ResponseBuilder<any>(rs).build();
    });
  },
);

publicHolidayRouter.get(
  '/public-holiday',
  async (ctx: ParameterizedContext<Context>) => {
    const publicHolidayService = Container.get(PublicHolidayService);
    const list = await publicHolidayService.list();
    return (ctx.body = new ResponseBuilder<any>(list).build());
  },
);

// publicHolidayRouter.post(
//   '/public-holiday',
//   async (ctx: ParameterizedContext<Context>) => {
//     // validate
//     const deletePublicHoliday =
//       await transformAndValidate<DeletePublicHolidayRequest>(
//         DeletePublicHolidayRequest,
//         ctx.request.body,
//       );
//     const publicHolidayService = Container.get(PublicHolidayService);
//     return await publicHolidayService
//       .destroy(deletePublicHoliday)
//       .then((rs) => {
//         ctx.body = new ResponseBuilder<any>(rs).build();
//       });
//   },
// );

publicHolidayRouter.post(
  '/public-holiday',
  async (ctx: ParameterizedContext<Context>) => {
    // validate
    const createPublicHoliday =
      await transformAndValidate<CreatePublicHolidayRequest>(
        CreatePublicHolidayRequest,
        ctx.request.body,
      );
    const publicHolidayService = Container.get(PublicHolidayService);
    const create = await publicHolidayService.create(createPublicHoliday);
    return (ctx.body = new ResponseBuilder<any>(create).build());
  },
);
export { publicHolidayRouter };
