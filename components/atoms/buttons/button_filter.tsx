import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ButtonFilter = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`p-2 hover:bg-gray-300 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonFilter;
