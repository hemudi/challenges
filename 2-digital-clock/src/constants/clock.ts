export type HourFormat = 12 | 24;
export type ClockMode = 'CLOCK' | 'TIMER';
export type TimePeriod = 'AM' | 'PM' | null;

export interface Time {
  hours: number;
  minutes: number;
  period?: TimePeriod;
}

export const HOUR_FORMAT_12 = 12;
export const HOUR_FORMAT_24 = 24;

export const TIME_PERIOD_AM = 'AM';
export const TIME_PERIOD_PM = 'PM';

export const MODE_CLOCK = 'CLOCK';
export const MODE_TIMER = 'TIMER';

export const STATUS_START = 'START';
export const STATUS_STOP = 'STOP';
export const STATUS_RESET = 'RESET';
