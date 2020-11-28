export interface CronOptionsInterface {
  includeMinutes?: boolean;
  includeHours?: boolean;
  includeDates?: boolean;
  includeMonths?: boolean;
  includeDays?: boolean;
  showHints?: boolean;
  defaultCron?: string;
}

export interface SelectOptionInterface {
  value: string | number;
  friendly: string;
}

export type CronIndex = 0| 1 | 2 | 3 | 4;

// export enum DaysOfWeekEnum {
//   SUN = 0,
//   MON,
//   TUE,
//   WED,
//   THU,
//   FRI,
//   SAT
// }

export const DaysOfWeek = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6
};

export const Months = {
  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12
};
