import { AppDataSource } from '@config/app-datasource';
import { ApiError } from '@models/api.error';
import { ResponseCodeEnum } from '@models/enum/response-code.enum';
import { CreateTasksRequest } from '@models/tasks/create-tasks.request';
import { DeleteTasksRequest } from '@models/tasks/delete-tasks.request';
import { ListTasksResponse } from '@models/tasks/list-tasks.response';
import { tasksRepo } from '@repositories/tasks.repo';
import { Service } from 'typedi';
import { In } from 'typeorm';

@Service()
export class TasksService {
  async initBusinessSetting(
    tasks: CreateTasksRequest,
  ): Promise<ListTasksResponse[]> {
    const storeCode = 'KSM01';
    const currentMonth = new Date().getMonth() + 1;
    const tasksExists = await tasksRepo.find({
      where: { storeCode: storeCode },
    });
    if (tasksExists.length) {
      throw new ApiError(
        ResponseCodeEnum.BAD_REQUEST,
        'Tasks of this store already exists',
      );
    }
    const listTasks = tasks.listTasks.map((item) => {
      return {
        ...item,
        taskName: item.taskName.trim(),
        taskCode: item.taskCode.trim(),
        remark: item.remark.trim(),
        processMonth: currentMonth,
        storeCode: storeCode,
      };
    });
    const tasksInstances = tasksRepo.create(listTasks);
    await tasksRepo.insert(tasksInstances);
    return await this.list(storeCode);
  }

  async list(storeCode: string): Promise<ListTasksResponse[]> {
    const tasks = await tasksRepo.find({
      select: ['id', 'taskCode', 'taskName', 'type', 'remark', 'minutes'],
      where: {
        storeCode: storeCode,
      },
    });
    return tasks;
  }

  async destroy(deleteTasks: DeleteTasksRequest): Promise<boolean> {
    const ids = deleteTasks.ids;
    const storeCode = 'KSM01';
    const findAllId = await tasksRepo.find({
      where: { id: In([...ids]), storeCode: storeCode },
    });
    const isExistsId = findAllId.length === ids.length ? true : false;
    if (!isExistsId) {
      throw new ApiError(ResponseCodeEnum.BAD_REQUEST, 'Id is not exists');
    }
    await tasksRepo.delete(ids);
    return true;
  }

  //   async create(businessSettings: CreateBusinessSettingRequest): Promise<any> {
  //     const currentYear = new Date().getFullYear();
  //     const storeCode = 'KSM01';
  //     //   const payload = createPublicHoliday.list_of_holiday;
  //     //   const listPublicHoliday = payload.map((item) => {
  //     //     return {
  //     //       ...item,
  //     //       eventDetails: item.event_details,
  //     //       year: currentYear,
  //     //       storeCode: 'KSM01',
  //     //       holidays: `${currentYear}-${
  //     //         item.month > 9 ? item.month : '0' + item.month
  //     //       }-${item.date > 9 ? item.date : '0' + item.date}`,
  //     //     };
  //     //   });
  //     // validate dupicate and convert business type to '00'
  //     const queryRunner = AppDataSource.createQueryRunner();
  //     await queryRunner.connect();
  //     // check transaction
  //     await queryRunner.startTransaction();
  //     try {
  //       await businessSettingRepo.delete({});
  //       await businessSettingRepo.insert([]);
  //       await queryRunner.commitTransaction();
  //     } catch (err) {
  //       await queryRunner.rollbackTransaction();
  //     } finally {
  //       await queryRunner.release();
  //     }
  //     return await this.list(storeCode);
  //   }
}
