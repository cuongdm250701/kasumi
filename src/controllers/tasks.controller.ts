import Router from '@koa/router';
import { ResponseBuilder } from '@src/ultis/response-builder';
import { Context, ParameterizedContext } from 'koa';
import Container from 'typedi';
import { transformAndValidate } from '@models/validator/validator';
import { TasksService } from '@services/tasks.service';
import { CreateTasksRequest } from '@models/tasks/create-tasks.request';
import { DeleteTasksRequest } from '@models/tasks/delete-tasks.request';

const tasksRouter = new Router();
tasksRouter.post('/init-tasks', async (ctx: ParameterizedContext<Context>) => {
  // validate
  const tasks = await transformAndValidate<CreateTasksRequest>(
    CreateTasksRequest,
    ctx.request.body,
  );
  const tasksService = Container.get(TasksService);
  await tasksService.initBusinessSetting(tasks).then((rs) => {
    ctx.body = new ResponseBuilder<any>(rs).build();
  });
});

tasksRouter.get('/tasks', async (ctx: ParameterizedContext<Context>) => {
  const tasksService = Container.get(TasksService);
  const storeCode = 'KSM01';
  const list = await tasksService.list(storeCode);
  return (ctx.body = new ResponseBuilder<any>(list).build());
});

tasksRouter.delete('/tasks', async (ctx: ParameterizedContext<Context>) => {
  // validate
  const deleteTasks = await transformAndValidate<DeleteTasksRequest>(
    DeleteTasksRequest,
    ctx.request.body,
  );
  const tasksService = Container.get(TasksService);
  return await tasksService.destroy(deleteTasks).then((rs) => {
    ctx.body = new ResponseBuilder<any>(rs).build();
  });
});

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
export { tasksRouter };
