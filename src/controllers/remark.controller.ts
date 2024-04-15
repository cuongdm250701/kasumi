import Router from '@koa/router';
import { ResponseBuilder } from '@src/ultis/response-builder';
import { Context, ParameterizedContext } from 'koa';
import Container from 'typedi';
import { transformAndValidate } from '@models/validator/validator';
import { RemarkService } from '@services/remark.service';
import { CreateRemarkRequest } from '@models/remark/create-remark.request';

const remarkRouter = new Router();
remarkRouter.post(
  '/init-remark',
  async (ctx: ParameterizedContext<Context>) => {
    // validate
    const remarks = await transformAndValidate<CreateRemarkRequest>(
      CreateRemarkRequest,
      ctx.request.body,
    );
    const remarkService = Container.get(RemarkService);
    const listRemark = await remarkService.initRemark(remarks);
    return (ctx.body = new ResponseBuilder<any>(listRemark).build());
  },
);

remarkRouter.get('/remarks', async (ctx: ParameterizedContext<Context>) => {
  const storeCode = 'KSM01';
  const remarkService = Container.get(RemarkService);
  const list = await remarkService.list(storeCode);
  return (ctx.body = new ResponseBuilder<any>(list).build());
});

remarkRouter.post('/remarks', async (ctx: ParameterizedContext<Context>) => {
  // validate
  const remarks = await transformAndValidate<CreateRemarkRequest>(
    CreateRemarkRequest,
    ctx.request.body,
  );
  const remarkService = Container.get(RemarkService);
  const listRemark = await remarkService.create(remarks);
  return (ctx.body = new ResponseBuilder<any>(listRemark).build());
});
export { remarkRouter };
