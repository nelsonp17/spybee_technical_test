interface DropdownItemProps {
  onClick: (label: string) => void;
  label: string;
  className?: string;
  isClassDefault?: boolean;
}

const DropdownItem = ({
  onClick,
  label,
  className = "",
  isClassDefault = true,
}: DropdownItemProps) => {
  const classes = !isClassDefault
    ? className
    : `block w-full px-4 py-2 text-left text-sm text-[var(--color-dark-letter-1)] hover:bg-gray-200 transition-colors cursor-pointer ${className}`;

  return (
    <div className={classes} onClick={() => onClick(label)}>
      {label}
    </div>
  );
};

export default DropdownItem;
