"use client";

import Button from "@/components/atoms/buttons/button";
import Input from "@/components/atoms/input";
import { Plus, Search } from "lucide-react";
import ButtonSortDropdown from "../dropdown/buttonSortDropdown";
import FilterGroupButton from "../group_button/filterGroupButton";
import { useProjectStore } from "@/store/projectStore";

interface HeaderProps {
  title: string;
  count: number;
}

const HeaderSection = ({ title, count }: HeaderProps) => {
  const { searchProjects } = useProjectStore();

  const changeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    searchProjects(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      {/* encabezado */}
      <div className="flex items-center gap-4 text-[var(--color-dark-letter-1)]">
        <h1 className="text-3xl font-bold">{title}</h1>
        <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
          {count} Proyectos
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Filtros */}
        <ButtonSortDropdown />

        {/* grupo de botones filtros */}
        <FilterGroupButton />

        {/* Buscador */}
        <Input
          icon={Search}
          placeholder="Buscar"
          type="search"
          onChange={changeInputSearch}
        />

        {/* Botón Crear */}
        <Button variant="primary" iconLeft={Plus}>
          Crear proyecto
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
