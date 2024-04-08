export type YearFormat = 'YYYY';
export type MonthFormat = 'MM';
export type DayFormat = 'DD';

export type Hour12Format = 'hh12';
export type Hour24Format = 'hh24';
export type MinuteFormat = 'mm';
export type SecondFormat = 'ss';

export type SeparatePrimary = '/';
export type SeparateSecondary = '-';
export type SeparateThird = ':';

export type DateFormat = `${YearFormat}${SeparatePrimary}${MonthFormat}${SeparatePrimary}${DayFormat}`;
export type DateReverseFormat = `${DayFormat}${SeparatePrimary}${MonthFormat}${SeparatePrimary}${YearFormat}`;
export type Time12Format = `${Hour12Format}${SeparateThird}${MinuteFormat}${SeparateThird}${SecondFormat}`;
export type Time24Format = `${Hour24Format}${SeparateThird}${MinuteFormat}${SeparateThird}${SecondFormat}`;

export type DateFormatType =
  | `${DateFormat} ${SeparateSecondary} ${Time12Format}`
  | `${DateFormat} ${SeparateSecondary} ${Time24Format}`
  | `${DateReverseFormat} ${SeparateSecondary} ${Time12Format}`
  | `${DateReverseFormat} ${SeparateSecondary} ${Time24Format}`
  | `${DateFormat}`
  | `${DateReverseFormat}`
  | `${Time12Format}`
  | `${Time24Format}`;
