export type HourFormat = 12 | 24;

export interface Time {
  hours: number;
  minutes: number;
  period: 'AM' | 'PM' | null;
}

export const getCurrentTime = (hourFormat: HourFormat): Time => {
  const today = new Date();
  const hours = today.getHours() % hourFormat || 12;
  const minutes = today.getMinutes();
  const period = hourFormat === 12 ? (hours >= 12 ? 'PM' : 'AM') : null;
  return { hours, minutes, period };
};
