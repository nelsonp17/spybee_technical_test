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
    searchProjects(e.target.value);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-4 px-1">
      {/* Encabezado: Título y Contador */}
      <div className="flex items-center gap-4 text-[var(--color-dark-letter-1)]">
        <h1 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
          {title}
        </h1>
        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
          {count} Proyectos
        </span>
      </div>

      {/* Controles: Filtros, Buscador y Acción */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {/* Agrupamos filtros para que mantengan coherencia visual en móviles */}
        <div className="flex justify-end gap-2 grow sm:grow-0">
          <ButtonSortDropdown />
          <FilterGroupButton />
        </div>

        {/* Buscador: Crece para llenar espacio en tablets/móviles */}
        <div className="w-full sm:w-64 md:w-80 lg:w-96 grow">
          <Input
            icon={Search}
            placeholder="Buscar"
            type="search"
            onChange={changeInputSearch}
            className="w-full"
          />
        </div>

        {/* Botón Crear: En móvil muy pequeño puede ocupar todo el ancho si lo deseas */}
        <div className="w-full sm:w-auto">
          <Button
            variant="primary"
            iconLeft={Plus}
            className="w-full sm:w-auto justify-center"
          >
            Crear proyecto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
