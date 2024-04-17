import { AppDataSource } from '@config/app-datasource';
import { ApiError } from '@models/api.error';
import { CreateBusinessSettingRequest } from '@models/business-setting/create-business-setting.request';
import { DeleteBusinessSettingRequest } from '@models/business-setting/delete-business-setting.request';
import { ResponseCodeEnum } from '@models/enum/response-code.enum';
import { businessSettingRepo } from '@repositories/business-setting.repo';
import { Service } from 'typedi';
import { In } from 'typeorm';

@Service()
export class BusinessSettingService {
  async initBusinessSetting(
    businessSettings: CreateBusinessSettingRequest,
  ): Promise<any> {
    const storeCode = 'KSM01';
    const currentMonth = new Date().getMonth() + 1;
    const businessSettingExists = await businessSettingRepo.find({
      where: { storeCode: storeCode },
    });
    if (businessSettingExists.length) {
      throw new ApiError(
        ResponseCodeEnum.BAD_REQUEST,
        'Business setting of this store already exists',
      );
    }
    const listBusinessSettings = businessSettings.listBusinessSetting.map(
      (item) => {
        return {
          ...item,
          processMonth: currentMonth,
          storeCode: storeCode,
        };
      },
    );
    const businessSettingInstances =
      businessSettingRepo.create(listBusinessSettings);
    await businessSettingRepo.insert(businessSettingInstances);
    return await this.list(storeCode);
  }

  async list(storeCode: string): Promise<any> {
    const businessSettings = await businessSettingRepo.find({
      select: [
        'id',
        'businessCode',
        'attendanceStatus',
        'salaryStatus',
        'businessName',
        'timeCategory',
        'rate',
        'businessType',
      ],
      where: {
        storeCode: storeCode,
      },
    });
    return businessSettings;
  }

  async destroy(
    deletePublicHoliday: DeleteBusinessSettingRequest,
  ): Promise<any> {
    const ids = deletePublicHoliday.ids;
    const storeCode = 'KSM01';
    const findAllId = await businessSettingRepo.find({
      where: { id: In([...ids]), storeCode: storeCode },
    });
    const isExistsId = findAllId.length === ids.length ? true : false;
    if (!isExistsId) {
      throw new ApiError(ResponseCodeEnum.BAD_REQUEST, 'Id is not exists');
    }
    await businessSettingRepo.delete(ids);
    return true;
  }

  async create(businessSettings: CreateBusinessSettingRequest): Promise<any> {
    const currentYear = new Date().getFullYear();
    const storeCode = 'KSM01';
    //   const payload = createPublicHoliday.list_of_holiday;
    //   const listPublicHoliday = payload.map((item) => {
    //     return {
    //       ...item,
    //       eventDetails: item.event_details,
    //       year: currentYear,
    //       storeCode: 'KSM01',
    //       holidays: `${currentYear}-${
    //         item.month > 9 ? item.month : '0' + item.month
    //       }-${item.date > 9 ? item.date : '0' + item.date}`,
    //     };
    //   });
    // validate dupicate and convert business type to '00'
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    // check transaction
    await queryRunner.startTransaction();
    try {
      await businessSettingRepo.delete({});
      await businessSettingRepo.insert([]);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return await this.list(storeCode);
  }
}
