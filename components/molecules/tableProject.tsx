import { Clock, Cloud, RotateCcw } from "lucide-react";
import Tag from "../atoms/tag";
import { useProjectStore } from "@/store/projectStore";
import { formatDate } from "@/utils/time";
import ProjectIncidents from "./metrics/incidents";
import StackedHexagonsTeam from "./metrics/stackedHexagonsTeam";
import { getProjectPlan, getProjectStatus } from "@/utils/projectUtils";
import Pagination from "./Pagination";

const TableProject = ({ openSummary }: { openSummary: boolean }) => {
  const { pageProjects: data } = useProjectStore();
  const errorImage = "https://cdn-icons-png.flaticon.com/512/9672/9672290.png";

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs tracking-wider">
            <th className="px-3 py-1 font-medium">Proyecto</th>
            <th className="px-3 py-1 font-medium">Plan</th>
            <th className="px-3 py-1 font-medium">Estado</th>
            <th className="px-3 py-1 font-medium">Equipo</th>
            <th className="px-3 py-1 font-medium">Items por vencer</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => {
            const plan = getProjectPlan(item.projectPlanData.plan);
            const status = getProjectStatus(item.status);
            return (
              <tr
                key={item._id}
                className="hover:bg-gray-200 cursor-pointer transition-colors group border-l border-[var(--color-dark-orange)] border-b-0"
              >
                {/* Info Proyecto */}
                <td className="px-2 py-3 min-w-[250px]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-300">
                      {/* Aqui uso img en vez de Image de next para las imagenes porque hay rutas como "xxx" que no son rutas válidas y crear un SafeImage adicional con useEffect no me parece lo más optimo */}
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-8 h-8 rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = errorImage;
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--color-dark-letter-1)]">
                          {item.title}
                        </span>
                        <Cloud size={14} className="text-blue-400" />
                      </div>
                      <div className="text-[10px] text-gray-400 flex gap-2 mt-1">
                        <Clock size={14} />
                        <span>{formatDate(item.createdAt)}</span>
                        <RotateCcw size={14} />
                        <span>{formatDate(item.lastUpdated)}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Plan */}
                <td className="px-2 py-3">
                  <Tag color={plan.color}>{plan.label}</Tag>
                </td>

                {/* Estado */}
                <td className="px-2 py-3 min-w-[200px]">
                  <Tag color={status.color}>{status.label}</Tag>
                </td>

                {/* Equipo (Hexágonos apilados) */}
                <td className="px-2 py-3 min-w-[200px]">
                  <div className="flex -space-x-1.5">
                    <StackedHexagonsTeam
                      users={item.users}
                      limit={openSummary ? 2 : 5}
                    />
                  </div>
                </td>

                {/* Indicadores numéricos */}
                <td className="px-2 py-3">
                  <ProjectIncidents
                    incidents={item.incidents}
                    variant="table"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
};

export default TableProject;
