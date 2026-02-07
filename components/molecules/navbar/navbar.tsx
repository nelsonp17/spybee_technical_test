import Link from "next/link";
import Image from "next/image";
import UserMenu from "../dropdown/userMenuDropdown";

const Navbar = () => {
  return (
    <header className="bg-[var(--color-dark-grey)] h-[70px] w-full">
      <nav className="flex items-center justify-between px-[3%] py-[10px] text-[var(--color-white)]">
        <div>
          <Link href="/dashboard" className="flex items-center">
            <Image
              width={90}
              height={50}
              src="/img/spybee_logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Spybee Logo"
            />
          </Link>
        </div>
        <div className="mt-1">
          <UserMenu name="Marco" role="Administrador" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
