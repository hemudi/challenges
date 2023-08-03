import { FormEvent, useEffect, useState } from 'react';
import TimePanel from '../TimePanel';
import ToggleButton from '../ToggleButton';
import { addOneSecond, getCurrentTime } from '../../utils/time';
import useInterval from '../../hooks/useInterval';
import {
  ClockMode,
  HOUR_FORMAT_12,
  HourFormat,
  MODE_CLOCK,
  MODE_TIMER,
  STATUS_RESET,
  STATUS_START,
  Time,
  TimerStatus,
} from '../../constants/clock';
import ActionBox from './ActionBox';

const initTime: Time = {
  hours: 0,
  minutes: 0,
  period: null,
};

const Clock = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [mode, setMode] = useState<ClockMode>(MODE_CLOCK);
  const [hourFormat, setHourFormat] = useState<HourFormat>(HOUR_FORMAT_12);
  const [{ hours, minutes, period }, setTime] = useState<Time>(initTime);

  useEffect(() => {
    if (mode === MODE_CLOCK) {
      setTime(getCurrentTime(hourFormat));
      setIsStart(true);
      return;
    }
    if (mode === MODE_TIMER) {
      setTime(initTime);
      setIsStart(false);
      return;
    }
  }, [mode, hourFormat]);

  const runClockMode = () => {
    setTime(getCurrentTime(hourFormat));
  };

  const runTimerMode = () => {
    setTime((prevTime) => addOneSecond(prevTime));
  };

  useInterval(
    mode === MODE_CLOCK ? runClockMode : runTimerMode,
    1000,
    !isStart,
  );

  const handleModeToggle = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    currentTarget.checked ? setMode(MODE_TIMER) : setMode(MODE_CLOCK);
  };

  const handleHourFormat = (hourFormat: HourFormat) => {
    setHourFormat(hourFormat);
  };

  const handleStatus = (status: TimerStatus) => {
    if (status === STATUS_START) {
      setIsStart(true);
      return;
    }

    if (status === STATUS_RESET) {
      setTime(initTime);
    }

    setIsStart(false);
  };

  return (
    <div className="flex w-fit flex-col items-center justify-center rounded-xl border-2 bg-cyan-50 p-6">
      <TimePanel hours={hours} minutes={minutes} period={period} />
      <div className="flex w-full justify-between p-2">
        <div className="flex w-fit flex-col">
          <div className="flex w-full justify-between">
            <span>{MODE_CLOCK}</span>
            <span>{MODE_TIMER}</span>
          </div>
          <ToggleButton onChange={handleModeToggle} />
        </div>
        <ActionBox
          mode={mode}
          handleHourFormat={handleHourFormat}
          handleStatus={handleStatus}
        />
      </div>
    </div>
  );
};

export default Clock;
