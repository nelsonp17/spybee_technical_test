import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface ButtonLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href: string;
}

const ButtonLink = ({ children, className, href }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`text-[var(--color-light-blue)] hover:text-[var(--color-dark-grey)] cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
};
export default ButtonLink;
