import {
  LIST_PUBLIC_HOLIDAY_SPECIFIC,
  LIST_PUBLIC_HOLIDAY_NOT_SPECIFIC,
  LIST_EVENT_SPECIFIC,
} from '@src/constants';

const getDate = (
  year: number,
  month: number,
  targetDay: number,
  targetWeek: number,
) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = firstDayOfMonth.getDay();
  let offset = targetDay - firstWeekday;
  if (offset < 0) {
    offset += 7;
  }
  const targetDate = 1 + offset + (targetWeek - 1) * 7;
  return targetDate;
};

const listPublicHolidayAndExtraDayOff = () => {
  const currentYear = new Date().getFullYear();
  const listPublicHoliday = [...LIST_PUBLIC_HOLIDAY_SPECIFIC];
  listPublicHoliday.forEach((item) => {
    const isSunday = new Date(currentYear, item.month - 1, item.date).getDay()
      ? false
      : true;
    if (isSunday) {
      const dayOff = {
        type: 1,
        month: item.month,
        date: item.date + 1,
        eventDetails: '振替休日',
      };
      listPublicHoliday.push(dayOff);
    }
  });
  return listPublicHoliday;
};

export const getListPublicHoliday = () => {
  const currentYear = new Date().getFullYear();
  const listPublicHolidayNotSpecific = [...LIST_PUBLIC_HOLIDAY_NOT_SPECIFIC];
  const specifiWeekdayOfMonth = listPublicHolidayNotSpecific.map((item) => {
    const date = getDate(currentYear, item.month, item.day, item.week);
    return {
      type: item.type,
      month: item.month + 1,
      date: date,
      eventDetails: item.eventDetails,
    };
  });
  const publicHolidayAndExtraDayOff = listPublicHolidayAndExtraDayOff();
  const eventSpecific = [...LIST_EVENT_SPECIFIC];
  const result = [
    ...specifiWeekdayOfMonth,
    ...publicHolidayAndExtraDayOff,
    ...eventSpecific,
  ];
  result.sort((a, b) => a.month - b.month);
  return result;
};
