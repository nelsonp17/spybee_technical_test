import {
  ChevronRight,
  Calendar,
  BookOpenText,
  Filter,
  RotateCcw,
  Clock,
} from "lucide-react";
import ProgressCard from "@/components/atoms/progress_card";
import Hexagon from "@/components/atoms/hexagon";
import DataTable from "@/components/molecules/dataTable/dataTable";
import { ProjectDataType } from "@/types/datatype";
import TitleLinkIcon from "@/components/molecules/title/titleLinkIcon";
import { useProjectStore } from "@/store/projectStore";
import {
  useMetrics,
  useUpcomingDeadlines,
  useUpcomingEvents,
} from "@/hooks/useProjectStats";
import StackedHexagonsTeam from "@/components/molecules/metrics/stackedHexagonsTeam";

interface SummaryProps {
  onCloseSummary: () => void;
}

const Summary = ({ onCloseSummary }: SummaryProps) => {
  // No estoy seguro de que el summary sea por todos los proyectos (allProjects) o solo de la página actual (pageProjects)
  const { allProjects } = useProjectStore();
  const metrics = useMetrics(allProjects);
  const upcomingDeadlines = useUpcomingDeadlines(allProjects, 3);
  const upcomingEvents = useUpcomingEvents(allProjects, 3);

  // proyectos
  const templateUpcoming = [
    {
      header: "Proyecto",
      render: (row: ProjectDataType) => (
        <>
          <span className="font-bold text-gray-800">{row.name}</span>
          <span className="text-gray-500 truncate">
            {row.desc}
          </span>
        </>
      ),
    },
    {
      header: "Item",
      render: (row: ProjectDataType) => (
        <span className="text-gray-500">{row.item}</span>
      ),
    },
    {
      header: "Fecha Límite",
      render: (row: ProjectDataType) => (
        <div className="flex flex-col text-gray-500 font-medium">
          <span>{row.date}</span>
          <div className="flex items-center text-left">
            <Clock size={14} className="mr-1" />
            <span>{row.hour}</span>
          </div>
        </div>
      ),
    },
  ];

  // proximos eventos
  const templateUpcomingEvents = [
    {
      header: "Proyecto",
      render: (row: ProjectDataType) => (
        <>
          <span className="font-bold text-gray-800">{row.name}</span>
          <span className="text-gray-500 truncate">
            {row.desc}
          </span>
        </>
      ),
    },
    {
      header: "Equipo",
      render: (row: ProjectDataType) => (
        <div className="flex flex-wrap">
          {row.team && row.team.length > 0 ? (
            <StackedHexagonsTeam users={row.team} limit={2} />
          ) : (
            <Hexagon className="w-6 h-7 bg-gray-200" />
          )}
        </div>
      ),
    },
    {
      header: "Fecha Límite",
      render: (row: ProjectDataType) => (
        <div className="flex flex-col text-gray-500 font-medium">
          <span>{row.date}</span>
          <div className="flex items-center text-left">
            <Clock size={14} className="mr-1" />
            <span>{row.hour}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <aside className="p-4 flex flex-col gap-6 text-[var(--color-dark-letter-1)]">
      {/* Header con flecha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <BookOpenText size={20} />
          <span>Resumen</span>
        </div>
        <button className="p-1 rounded-full border border-gray-200 hover:bg-gray-50">
          <ChevronRight
            size={18}
            className="text-gray-500"
            onClick={onCloseSummary}
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 text-sm">
        <button className="px-4 py-2 text-gray-500 hover:text-gray-600 border-b-2 border-yellow-400 font-medium">
          General
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-600">
          Mis actualizaciones
        </button>
        <button className="ml-auto px-4 py-2 flex items-center gap-1 font-bold">
          <Filter size={14}></Filter>
          <span>Filtros</span>
        </button>
      </div>

      {/* Sección Próximos a vencer */}
      <div>
        <TitleLinkIcon
          href="/"
          icon={RotateCcw}
          title="Próximos a vencer"
          textLink="Ver todos"
        />

        <div className="grid grid-cols-3 gap-2">
          {/* Tarjeta de progreso */}
          <ProgressCard
            label="Incidencias"
            total={metrics.incidents.total}
            open={metrics.incidents.open}
          />
          <ProgressCard
            label="RFI"
            total={metrics.rfi.total}
            open={metrics.rfi.open}
          />
          <ProgressCard
            label="Tareas"
            total={metrics.tasks.total}
            open={metrics.tasks.open}
          />
        </div>
      </div>

      {/* Lista de Items */}
      <DataTable columns={templateUpcoming} data={upcomingDeadlines} />

      {/* Próximos Eventos */}
      <div>
        <TitleLinkIcon
          href="/"
          icon={Calendar}
          title="Próximos eventos"
          textLink="Ver todos"
        />
        <DataTable columns={templateUpcomingEvents} data={upcomingEvents} />
      </div>
    </aside>
  );
};

export default Summary;
