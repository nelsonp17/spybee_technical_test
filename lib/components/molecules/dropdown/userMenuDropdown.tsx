"use client";
import { ChevronDown, User } from "lucide-react"; // Usando Lucide para los iconos
import { useState, useRef, useEffect } from "react";
import Hexagon from "@/lib/components/atoms/hexagon";
import DropdownItem from "./dropdownItem";
import { useSession, signOut } from "next-auth/react";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
      >
        <Hexagon className="w-9 h-10 bg-yellow-400 text-[var(--color-dark-grey)]">
          <User size={20} strokeWidth={2.5} />
        </Hexagon>

        <div className="flex-col text-left hidden sm:flex">
          <span className="text-white text-sm font-semibold leading-tight">
            {session?.user?.name}
          </span>
          <span className="text-gray-400 text-xs font-medium">
            {session?.user?.role == "admin" ? "Administrator" : "Usuario"}
          </span>
        </div>

        <ChevronDown
          className={`text-gray-400 transition-colors transform ${
            open ? "rotate-180 text-white" : ""
          }`}
          size={18}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="User menu"
          className="absolute right-0 mt-2 w-48 bg-[var(--color-dark-grey)] text-white rounded-md shadow-xl py-1 z-50 origin-top-right animate-fast"
        >
          <DropdownItem
            onClick={() => {
              setOpen(false);
            }}
            label="Perfil"
            className="text-gray-100 hover:bg-[var(--color-dark-grey-2)] hover:text-[var(--color-dark-letter-1)]"
          />
          <DropdownItem
            onClick={() => {
              setOpen(false);
            }}
            label="Configuración"
            className="text-gray-100 hover:bg-[var(--color-dark-grey-2)] hover:text-[var(--color-dark-letter-1)]"
          />
          <DropdownItem
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/auth/login" });
            }}
            label="Cerrar sesión"
            className="text-gray-100 hover:bg-[var(--color-dark-grey-2)] hover:text-[var(--color-dark-letter-1)]"
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
