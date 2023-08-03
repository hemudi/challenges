import { FormEvent, useEffect, useState } from 'react';
import TimePanel from '../TimePanel';
import ToggleButton from '../ToggleButton';
import Button from '../Button';
import { HourFormat, Time, getCurrentTime } from '../../utils/time';
import useInterval from '../../hooks/useInterval';

type ClockMode = 'CLOCK' | 'TIMER';

const CLOCK_MODE = 'CLOCK';
const TIMER_MODE = 'TIMER';

const HOUR_FORMAT_12 = 12;
const HOUR_FORMAT_24 = 24;

const initTime: Time = {
  hours: 0,
  minutes: 0,
  period: null,
};

const Clock = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [mode, setMode] = useState<ClockMode>(CLOCK_MODE);
  const [hourFormat, setHourFormat] = useState<HourFormat>(HOUR_FORMAT_12);
  const [{ hours, minutes, period }, setTime] = useState<Time>(initTime);

  useEffect(() => {
    setTime(mode === CLOCK_MODE ? getCurrentTime(hourFormat) : initTime);
    setIsStart(true);
  }, [mode, hourFormat]);

  useInterval(
    () => {
      setTime(mode === CLOCK_MODE ? getCurrentTime(hourFormat) : initTime);
    },
    1000,
    !isStart,
  );

  const modeToggleHandler = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>) => {
    currentTarget.checked ? setMode(TIMER_MODE) : setMode(CLOCK_MODE);
  };

  return (
    <div className="flex w-fit flex-col items-center justify-center rounded-xl border-2 bg-cyan-50 p-6">
      <TimePanel hours={hours} minutes={minutes} period={period} />
      <div className="flex w-full justify-between p-2">
        <div className="flex w-fit flex-col">
          <div className="flex w-full justify-between">
            <span>{CLOCK_MODE}</span>
            <span>{TIMER_MODE}</span>
          </div>
          <ToggleButton onChange={modeToggleHandler} />
        </div>
        <div className="flex w-fit gap-2 rounded text-xl">
          <Button onClick={() => setHourFormat(HOUR_FORMAT_12)}>
            {HOUR_FORMAT_12}
          </Button>
          <Button onClick={() => setHourFormat(HOUR_FORMAT_24)}>
            {HOUR_FORMAT_24}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Clock;
