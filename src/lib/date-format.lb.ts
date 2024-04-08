import {
  DateFormat,
  DayFormat,
  Hour12Format,
  Hour24Format,
  MinuteFormat,
  MonthFormat,
  SecondFormat,
  YearFormat,
} from '@/common/constant/date.constant';
import { DateFormatType } from '@/common/type/date.type';

class StringDate {
  private value: string;

  constructor(value: number) {
    this.value = value.toString();
  }
  padZero({ pad = 2, key = '0' }: { pad?: number; key?: string }) {
    if (pad <= this.value.length) return this.value;
    return `${key.repeat(pad - this.value.length)}${this.value}`;
  }
}

export default function FormatDate({ time, format = `${DateFormat}` as DateFormatType }: { time: Date; format?: DateFormatType }) {
  const date = new Date(time);

  const year = new StringDate(date.getFullYear()).padZero({ pad: 4 });
  const month = new StringDate(date.getMonth() + 1).padZero({});
  const day = new StringDate(date.getDate()).padZero({});
  const minutes = new StringDate(date.getMinutes()).padZero({});
  const seconds = new StringDate(date.getSeconds()).padZero({});

  const hour = date.getHours();
  const hour24 = new StringDate(hour).padZero({});

  let hourFix: number;
  if (hour % 12 === 0) {
    hourFix = 12;
  } else {
    hourFix = hour > 12 ? hour - 12 : hour;
  }

  const hour12 = new StringDate(hourFix).padZero({});

  return `${format
    .replace(YearFormat, year)
    .replace(MonthFormat, month)
    .replace(DayFormat, day)
    .replace(Hour12Format, hour12)
    .replace(Hour24Format, hour24)
    .replace(MinuteFormat, minutes)
    .replace(SecondFormat, seconds)} ${format.includes(Hour12Format) ? (hour >= 12 ? (hour === 24 ? 'AM' : 'PM') : 'AM') : ''}`;
}
