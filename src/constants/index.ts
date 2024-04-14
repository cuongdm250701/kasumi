import {
  ItemPublicHolidayNotSpecific,
  ItemPublicHolidaySpecific,
} from './interface';

export const LIST_PUBLIC_HOLIDAY_SPECIFIC: Array<ItemPublicHolidaySpecific> = [
  {
    type: 1,
    month: 1,
    date: 1,
    eventDetails: '元旦',
  },
  {
    type: 1,
    month: 2,
    date: 11,
    eventDetails: '建国記念日',
  },
  {
    type: 1,
    month: 2,
    date: 23,
    eventDetails: '天皇誕生日',
  },
  {
    type: 1,
    month: 3,
    date: 20,
    eventDetails: '春分の日',
  },
  {
    type: 1,
    month: 4,
    date: 29,
    eventDetails: '昭和の日',
  },
  {
    type: 1,
    month: 5,
    date: 3,
    eventDetails: '憲法記念日',
  },
  {
    type: 1,
    month: 5,
    date: 4,
    eventDetails: 'みどりの日',
  },
  {
    type: 1,
    month: 5,
    date: 5,
    eventDetails: 'こどもの日',
  },
  {
    type: 1,
    month: 8,
    date: 11,
    eventDetails: '山の日',
  },
  {
    type: 1,
    month: 9,
    date: 22,
    eventDetails: '国民の休日',
  },
  {
    type: 1,
    month: 11,
    date: 3,
    eventDetails: '文化の日',
  },
  {
    type: 1,
    month: 11,
    date: 23,
    eventDetails: '勤労感謝の日',
  },
];

export const LIST_PUBLIC_HOLIDAY_NOT_SPECIFIC: Array<ItemPublicHolidayNotSpecific> =
  [
    {
      day: 1,
      week: 2,
      month: 0,
      type: 1,
      eventDetails: '成人の日',
    },
    {
      day: 0,
      week: 2,
      month: 4,
      type: 2,
      eventDetails: '母の日',
    },
    {
      day: 0,
      week: 3,
      month: 5,
      type: 2,
      eventDetails: '父の日',
    },
    {
      day: 1,
      week: 3,
      month: 6,
      type: 1,
      eventDetails: '海の日',
    },
    {
      day: 1,
      week: 3,
      month: 8,
      type: 1,
      eventDetails: '敬老の日',
    },
    {
      day: 1,
      week: 2,
      month: 9,
      type: 1,
      eventDetails: '体育の日',
    },
  ];

export const LIST_EVENT_SPECIFIC: Array<ItemPublicHolidaySpecific> = [
  {
    type: 2,
    month: 2,
    date: 3,
    eventDetails: '節分',
  },
  {
    type: 2,
    month: 2,
    date: 14,
    eventDetails: 'ﾊﾞﾚﾝﾀｲﾝﾃﾞｰ',
  },
  {
    type: 2,
    month: 2,
    date: 22,
    eventDetails: '猫の日',
  },
  {
    type: 2,
    month: 3,
    date: 3,
    eventDetails: 'ひなまつり',
  },
  {
    type: 2,
    month: 3,
    date: 14,
    eventDetails: 'ホワイトデー',
  },
  {
    type: 2,
    month: 7,
    date: 7,
    eventDetails: '七夕',
  },
  {
    type: 2,
    month: 8,
    date: 13,
    eventDetails: 'お盆入り',
  },
  {
    type: 2,
    month: 8,
    date: 15,
    eventDetails: 'お盆',
  },
  {
    type: 2,
    month: 10,
    date: 31,
    eventDetails: 'ハロウィン',
  },
  {
    type: 2,
    month: 11,
    date: 15,
    eventDetails: '七五三',
  },
  {
    type: 2,
    month: 12,
    date: 24,
    eventDetails: 'ｸﾘｽﾏｽ･ｲﾌﾞ',
  },
  {
    type: 2,
    month: 12,
    date: 25,
    eventDetails: 'クリスマス',
  },
  {
    type: 2,
    month: 12,
    date: 31,
    eventDetails: '大晦日',
  },
];
