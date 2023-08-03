import { useState } from 'react';
import useInterval from '../../../hooks/useInterval';

const colorStyle = {
  on: 'bg-cyan-500',
  off: 'bg-slate-800',
};

const Separator = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  useInterval(() => setIsOn((prev) => !prev), 1000, false);

  return (
    <div className="flex h-full w-3 flex-col justify-around">
      <div
        className={`h-3 w-3 rounded ${isOn ? colorStyle.on : colorStyle.off}`}
      />
      <div
        className={`h-3 w-3 rounded ${isOn ? colorStyle.on : colorStyle.off}`}
      />
    </div>
  );
};

export default Separator;
