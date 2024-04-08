export const YearFormat = 'YYYY';
export const MonthFormat = 'MM';
export const DayFormat = 'DD';

export const Hour12Format = 'hh12';
export const Hour24Format = 'hh24';
export const MinuteFormat = 'mm';
export const SecondFormat = 'ss';

export const SeparatePrimary = '/';
export const SeparateSecondary = '-';
export const SeparateThird = ':';

export const DateFormat = `${YearFormat}${SeparatePrimary}${MonthFormat}${SeparatePrimary}${DayFormat}`;
export const DateReverseFormat = `${DayFormat}${SeparatePrimary}${MonthFormat}${SeparatePrimary}${YearFormat}`;
export const Time12Format = `${Hour12Format}${SeparateThird}${MinuteFormat}${SeparateThird}${SecondFormat}`;
export const Time24Format = `${Hour24Format}${SeparateThird}${MinuteFormat}${SeparateThird}${SecondFormat}`;
