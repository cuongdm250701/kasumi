export interface ItemPublicHolidaySpecific {
  type: number;
  month: number;
  date: number;
  eventDetails: string;
}

export interface ItemPublicHolidayNotSpecific {
  type: number;
  day: number;
  week: number;
  month: number;
  eventDetails: string;
}

export interface ItemBusinessSetting {
  businessName: string;
  businessCode: string;
  attendanceStatus: number;
  salaryStatus: number;
  timeCategory: number;
  rate: number;
  businessType: string;
}

export interface ItemTasks {
  taskCode: string;
  taskName: string;
  minutes: number;
  remark: string;
  type: number;
}
