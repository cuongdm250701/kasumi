import Router from '@koa/router';
import { ResponseBuilder } from '@src/ultis/response-builder';
import { Context, ParameterizedContext } from 'koa';
import { BusinessSettingService } from '@services/business-setting.service';
import Container from 'typedi';
import { transformAndValidate } from '@models/validator/validator';
import { CreateBusinessSettingRequest } from '@models/business-setting/create-business-setting.request';
import { DeleteBusinessSettingRequest } from '@models/business-setting/delete-business-setting.request';

const businessSettingRouter = new Router();
businessSettingRouter.post(
  '/init-business-setting',
  async (ctx: ParameterizedContext<Context>) => {
    // validate
    const businessSettings =
      await transformAndValidate<CreateBusinessSettingRequest>(
        CreateBusinessSettingRequest,
        ctx.request.body,
      );
    const businessSettingService = Container.get(BusinessSettingService);
    await businessSettingService
      .initBusinessSetting(businessSettings)
      .then((rs) => {
        ctx.body = new ResponseBuilder<any>(rs).build();
      });
  },
);

businessSettingRouter.get(
  '/business-setting',
  async (ctx: ParameterizedContext<Context>) => {
    const businessSettingService = Container.get(BusinessSettingService);
    const storeCode = 'KSM01';
    const list = await businessSettingService.list(storeCode);
    return (ctx.body = new ResponseBuilder<any>(list).build());
  },
);

businessSettingRouter.delete(
  '/business-setting',
  async (ctx: ParameterizedContext<Context>) => {
    // validate
    const deletePublicHoliday =
      await transformAndValidate<DeleteBusinessSettingRequest>(
        DeleteBusinessSettingRequest,
        ctx.request.body,
      );
    const businessSettingService = Container.get(BusinessSettingService);
    return await businessSettingService
      .destroy(deletePublicHoliday)
      .then((rs) => {
        ctx.body = new ResponseBuilder<any>(rs).build();
      });
  },
);

// publicHolidayRouter.post(
//   '/public-holiday',
//   async (ctx: ParameterizedContext<Context>) => {
//     // validate
//     const createPublicHoliday =
//       await transformAndValidate<CreatePublicHolidayRequest>(
//         CreatePublicHolidayRequest,
//         ctx.request.body,
//       );
//     const publicHolidayService = Container.get(PublicHolidayService);
//     const create = await publicHolidayService.create(createPublicHoliday);
//     return (ctx.body = new ResponseBuilder<any>(create).build());
//   },
// );
export { businessSettingRouter };
