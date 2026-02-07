import { IconType } from "@/types/typeIcon";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: IconType;
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  icon: Icon,
  ...props
}: InputProps) => {
  const baseClassName =
    "pl-4 pr-10 py-2 border border-[var(--color-light-yellow-2)] rounded-md w-64 focus:outline-none";

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClassName} ${className}`}
        {...props}
      />
      {Icon && (
        <Icon size={18} className="absolute right-3 top-2.5 text-gray-400" />
      )}
    </div>
  );
};

export default Input;
