import { Service } from 'typedi';
import { remarkRepo } from '@repositories/remark.repo';
import { CreateRemarkRequest } from '@models/remark/create-remark.request';
import { ApiError } from '@models/api.error';
import { ResponseCodeEnum } from '@models/enum/response-code.enum';
import { AppDataSource } from '@config/app-datasource';

@Service()
export class RemarkService {
  async initRemark(remarks: CreateRemarkRequest): Promise<any> {
    const currentMonth = new Date().getMonth() + 1;
    const storeCode = 'KSM01';
    const remarksExists = await remarkRepo.find({
      where: { storeCode: storeCode },
    });
    if (remarksExists.length) {
      throw new ApiError(
        ResponseCodeEnum.BAD_REQUEST,
        'Remarks of this store already exists',
      );
    }
    const listRemark = remarks.list_remark.map((item) => {
      return {
        processMonth: currentMonth,
        storeCode: storeCode,
        remarkCode: item.remark_code,
        remarkName: item.remark_name,
        monday: item.monday,
        tuesday: item.tuesday,
        wednesday: item.wednesday,
        thursday: item.thursday,
        friday: item.friday,
        saturday: item.saturday,
        sunday: item.sunday,
      };
    });
    const remarkInstances = remarkRepo.create(listRemark);
    await remarkRepo.insert(remarkInstances);
    return await this.list(storeCode);
  }

  async list(storeCode: string): Promise<any> {
    const remarks = await remarkRepo.find({
      select: [
        'id',
        'remarkCode',
        'remarkName',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      where: { storeCode: storeCode },
    });
    return remarks;
  }

  async create(remarks: CreateRemarkRequest): Promise<any> {
    const currentMonth = new Date().getMonth() + 1;
    const storeCode = 'KSM01';
    const payload = remarks.list_remark;
    const listRemark = payload.map((item) => {
      return {
        processMonth: currentMonth,
        storeCode: storeCode,
        remarkCode: item.remark_code,
        remarkName: item.remark_name,
        monday: item.monday,
        tuesday: item.tuesday,
        wednesday: item.wednesday,
        thursday: item.thursday,
        friday: item.friday,
        saturday: item.saturday,
        sunday: item.sunday,
      };
    });
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    // check transaction
    await queryRunner.startTransaction();
    try {
      await remarkRepo.delete({});
      await remarkRepo.insert(listRemark);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return await this.list(storeCode);
  }
}
