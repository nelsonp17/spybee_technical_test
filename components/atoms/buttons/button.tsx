import { IconType } from "@/types/typeIcon";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  iconLeft?: IconType;
  iconLeftSize?: number;
  iconRight?: IconType;
  iconRightSize?: number;
}

const Button = ({
  children,
  variant,
  iconLeft: IconLeft,
  iconLeftSize,
  iconRight: IconRight,
  iconRightSize,
  className,
  ...props
}: ButtonProps) => {
  const isPrimary =
    "bg-[var(--color-dark-yellow)] hover:bg-yellow-500 text-[var(--color-dark-letter-1)] ";
  const isSecondary = "";
  const baseClassName =
    "font-bold py-2 px-6 rounded-md flex items-center gap-2 transition-colors";
  let tm = "";

  if (variant === "primary") {
    tm = isPrimary;
  }
  if (variant === "secondary") {
    tm = isSecondary;
  }

  return (
    <button className={`${baseClassName} ${tm} ${className}`} {...props}>
      {IconLeft && <IconLeft size={iconLeftSize || 24} />}
      {children}
      {IconRight && <IconRight size={iconRightSize || 24} />}
    </button>
  );
};
export default Button;
