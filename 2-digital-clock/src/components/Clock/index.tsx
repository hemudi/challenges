import { FormEvent, useEffect, useState } from 'react';
import TimePanel from '../TimePanel';
import ToggleButton from '../ToggleButton';
import Button from '../Button';
import { addOneSecond, getCurrentTime } from '../../utils/time';
import useInterval from '../../hooks/useInterval';
import {
  ClockMode,
  HOUR_FORMAT_12,
  HOUR_FORMAT_24,
  HourFormat,
  MODE_CLOCK,
  MODE_TIMER,
  STATUS_RESET,
  STATUS_START,
  STATUS_STOP,
  Time,
} from '../../constants/clock';

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

  const handleClockMode = () => {
    setTime(getCurrentTime(hourFormat));
  };

  const handleTimerMode = () => {
    setTime((prevTime) => addOneSecond(prevTime));
  };

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

  useInterval(
    mode === MODE_CLOCK ? handleClockMode : handleTimerMode,
    1000,
    !isStart,
  );

  const modeToggleHandler = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>) => {
    currentTarget.checked ? setMode(MODE_TIMER) : setMode(MODE_CLOCK);
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
          <ToggleButton onChange={modeToggleHandler} />
        </div>
        <div className="flex w-fit gap-2 rounded text-xl">
          {mode === MODE_CLOCK ? (
            <>
              <Button onClick={() => setHourFormat(HOUR_FORMAT_12)}>
                {HOUR_FORMAT_12}
              </Button>
              <Button onClick={() => setHourFormat(HOUR_FORMAT_24)}>
                {HOUR_FORMAT_24}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsStart(true)}>{STATUS_START}</Button>
              <Button onClick={() => setIsStart(false)}>{STATUS_STOP}</Button>
              <Button
                onClick={() => {
                  setTime(initTime);
                  setIsStart(false);
                }}
              >
                {STATUS_RESET}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
