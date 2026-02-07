"use client";
import ButtonFilter from "@/components/atoms/buttons/button_filter";
import { useViewStore } from "@/store/viewStore";
import { Grid, List, MapPin } from "lucide-react";

const FilterGroupButton = () => {
  const { view, setView } = useViewStore();
  const classActive = "bg-gray-200";
  const classBase = "border-r border-gray-200";

  return (
    <div className="flex bg-white border border-gray-200 rounded-md">
      <ButtonFilter
        className={`${classBase} ${view === "list" ? classActive : ""}`}
        onClick={() => setView("list")}
      >
        <List size={18} />
      </ButtonFilter>

      <ButtonFilter
        className={`${classBase} ${view === "grid" ? classActive : ""}`}
        onClick={() => setView("grid")}
      >
        <Grid size={18} />
      </ButtonFilter>

      <ButtonFilter
        className={`${view === "map" ? classActive : ""}`}
        onClick={() => setView("map")}
      >
        <MapPin size={18} />
      </ButtonFilter>
    </div>
  );
};

export default FilterGroupButton;
