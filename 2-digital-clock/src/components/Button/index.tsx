import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="h-full w-20 rounded p-3 text-white enabled:bg-on enabled:hover:bg-on-dark enabled:active:bg-on"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
