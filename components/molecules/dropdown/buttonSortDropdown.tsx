"use client";

import ButtonFilter from "@/components/atoms/buttons/button_filter";
import { ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DropdownItem from "./dropdownItem";
import { useProjectStore } from "@/store/projectStore";
import { SortProjects } from "@/types/ui/sortProjects";

const ButtonSortDropdown = () => {
  const { sortProjects, currentSort } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: SortProjects) => {
    setIsOpen(false);
    sortProjects(option);
  };

  return (
    <div>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <ButtonFilter
          className="mr-1 rounded relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ListFilter size={18} />
          <div className="text-[10px] absolute right-0 text-gray-900 bg-gray-200 h-4 w-4 rounded-full">
            {currentSort == "alphabetically" && "A"}
            {currentSort == "incidents" && "I"}
            {currentSort == "rfi" && "R"}
            {currentSort == "task" && "T"}
          </div>
        </ButtonFilter>

        {/* Menú Desplegable */}
        {isOpen && (
          <div className="absolute right-0 z-2 mt-2 w-56 origin-top-right animate-fast rounded-md bg-white shadow-xl border border-gray-300">
            <div className="py-1">
              <DropdownItem
                onClick={() => handleOptionClick("alphabetically")}
                label="Orden alfabético"
              />
              <DropdownItem
                onClick={() => handleOptionClick("incidents")}
                label="Número de Incidencias"
              />
              <DropdownItem
                onClick={() => handleOptionClick("rfi")}
                label="Número de RFI"
              />
              <DropdownItem
                onClick={() => handleOptionClick("task")}
                label="Número de Tareas"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonSortDropdown;
