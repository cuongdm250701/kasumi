import { getListPublicHoliday } from '@src/helpers/get-public-holiday';
import { Service } from 'typedi';
import { publicHolidayRepo } from '@repositories/public-holiday.repo';
import { DeletePublicHolidayRequest } from '@models/public-holiday/delete-public-holiday.requrest';
import { In } from 'typeorm';
import { CreatePublicHolidayRequest } from '@models/public-holiday/create-public-holiday.request';
import { AppDataSource } from '@config/app-datasource';
import { PublicHolidayEntity } from '@entities/public-holiday.entity';

@Service()
export class PublicHolidayService {
  async initPublicHoliday(): Promise<any> {
    const currentYear = new Date().getFullYear();
    const publicHolidays = getListPublicHoliday();
    const listPublicHoliday = publicHolidays.map((item) => {
      return {
        ...item,
        year: currentYear,
        holidays: `${currentYear}-${
          item.month > 9 ? item.month : '0' + item.month
        }-${item.date > 9 ? item.date : '0' + item.date}`,
        storeCode: 'KSM01',
      };
    });
    // new Entity difference create ?
    const list = publicHolidayRepo.create(listPublicHoliday);
    await publicHolidayRepo.insert(list);
    return list;
  }

  async list(): Promise<any> {
    const publicHolidays = await publicHolidayRepo.find({
      select: ['id', 'type', 'month', 'date', 'eventDetails'],
    });
    return publicHolidays;
  }

  async destroy(deletePublicHoliday: DeletePublicHolidayRequest): Promise<any> {
    const ids = deletePublicHoliday.ids;
    const findAllId = await publicHolidayRepo.find({
      where: { id: In([...ids]) },
    });
    const isExistsId = findAllId.length === ids.length ? true : false;
    if (isExistsId) {
      await publicHolidayRepo.delete(ids);
    } else {
      return 'Id is not exists';
    }
    return true;
  }

  async create(createPublicHoliday: CreatePublicHolidayRequest): Promise<any> {
    const currentYear = new Date().getFullYear();
    const payload = createPublicHoliday.list_of_holiday;
    const listPublicHoliday = payload.map((item) => {
      return {
        ...item,
        eventDetails: item.event_details,
        year: currentYear,
        storeCode: 'KSM01',
        holidays: `${currentYear}-${
          item.month > 9 ? item.month : '0' + item.month
        }-${item.date > 9 ? item.date : '0' + item.date}`,
      };
    });
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    // check transaction
    await queryRunner.startTransaction();
    try {
      await publicHolidayRepo.clear();
      await publicHolidayRepo.insert(listPublicHoliday);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return await this.list();
  }
}
