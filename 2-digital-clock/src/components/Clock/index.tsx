import { FormEvent, useState } from 'react';
import TimePanel from '../TimePanel';
import ToggleButton from '../ToggleButton';
import Button from '../Button';

type ClockMode = 'CLOCK' | 'TIMER';

const CLOCK_MODE = 'CLOCK';
const TIMER_MODE = 'TIMER';

const Clock = () => {
  const [mode, setMode] = useState<ClockMode>(CLOCK_MODE);

  const modeToggleHandler = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>) => {
    currentTarget.checked ? setMode(TIMER_MODE) : setMode(CLOCK_MODE);
  };

  return (
    <div className="flex w-fit flex-col items-center justify-center rounded-xl border-2 bg-cyan-50 p-6">
      <TimePanel hours={24} minutes={24} description={['PM']} />
      <div className="flex w-full justify-between p-2">
        <div className="flex w-fit flex-col">
          <div className="flex w-full justify-between">
            <span>{CLOCK_MODE}</span>
            <span>{TIMER_MODE}</span>
          </div>
          <ToggleButton onChange={modeToggleHandler} />
        </div>
        <div className="flex w-fit gap-2 rounded text-xl">
          <Button>12</Button>
          <Button>24</Button>
        </div>
      </div>
    </div>
  );
};

export default Clock;
