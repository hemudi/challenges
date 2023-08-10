import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="h-full w-20 rounded p-3 text-white enabled:bg-blue-400 enabled:hover:bg-blue-600 enabled:active:bg-blue-500"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
