import { FormEvent, FormEventHandler, useEffect, useState } from 'react';

interface ToggleButtonProps {
  defaultChecked?: boolean;
  onChange: FormEventHandler<HTMLInputElement>;
}

const ToggleButton = ({
  onChange,
  defaultChecked = false,
}: ToggleButtonProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  const onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    setIsChecked(!isChecked);
  };

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChangeHandler}
        className="peer sr-only"
      />
      <div className="peer h-11 w-32 rounded bg-cyan-500 after:absolute after:left-[3.5px] after:top-[4px] after:h-9 after:w-16 after:rounded after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-14 peer-focus:outline-none"></div>
    </label>
  );
};

export default ToggleButton;
