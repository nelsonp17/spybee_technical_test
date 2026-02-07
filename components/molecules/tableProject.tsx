import { Clock, Cloud, RotateCcw } from "lucide-react";
import Tag from "../atoms/tag";
import { useProjectStore } from "@/store/projectStore";
import { formatDate } from "@/utils/time";
import ProjectIncidents from "./metrics/incidents";
import StackedHexagonsTeam from "./metrics/stackedHexagonsTeam";
import { getProjectPlan, getProjectStatus } from "@/utils/projectUtils";
import Pagination from "./pagination";
import { useSelectionStore } from "@/store/selectionStore";

const TableProject = ({ openSummary }: { openSummary: boolean }) => {
  const { pageProjects: data } = useProjectStore();
  const { selectedProjectIds, toggleSelection } = useSelectionStore();
  const errorImage = "https://cdn-icons-png.flaticon.com/512/9672/9672290.png";

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left border-collapse lg:min-w-full">
          <thead>
            <tr className="text-xs tracking-wider border-b border-gray-100">
              <th className="px-3 py-3 font-medium">Proyecto</th>
              <th className={`px-3 py-3 font-medium`}>Plan</th>
              <th className={`px-3 py-3 font-medium`}>Estado</th>
              <th className="px-3 py-3 font-medium">Equipo</th>
              <th className="px-3 py-3 font-medium text-right md:text-left">
                Items por vencer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => {
              const plan = getProjectPlan(item.projectPlanData.plan);
              const status = getProjectStatus(item.status);
              const isSelected = selectedProjectIds.includes(item._id);

              return (
                <tr
                  key={item._id}
                  onClick={() => toggleSelection(item._id)}
                  className={`hover:bg-gray-200 cursor-pointer transition-colors group border-l-3 border-b-0 ${
                    isSelected
                      ? "border-orange-500 bg-orange-50/30"
                      : "border-transparent"
                  }`}
                >
                  {/* Info Proyecto */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {/* Aqui esto usando img de html en vez de Image de next/image porque hay imagenes con url
                          inválidas como "xxx" y usar un useEffect o hacer una SafeImage pienso que no es muy optimo en
                          este caso */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-7 h-7 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = errorImage;
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-bold text-[var(--color-dark-letter-1)] truncate">
                            {item.title}
                          </span>
                          {/* No se en que se basa para mostrar el icono de nubes asi que usara el mismo estado del isSelected */}
                          {isSelected && (
                            <Cloud
                              size={14}
                              className="text-blue-400 shrink-0"
                            />
                          )}
                        </div>
                        <div className="text-[10px] text-gray-400 flex items-center gap-2 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{formatDate(item.createdAt)}</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-1">
                            <RotateCcw size={12} />
                            <span>{formatDate(item.lastUpdated)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Plan */}
                  <td className={`px-3 py-4 `}>
                    <Tag color={plan.color}>{plan.label}</Tag>
                  </td>

                  {/* Estado */}
                  <td className={`px-3 py-4 min-w-50`}>
                    <Tag color={status.color}>{status.label}</Tag>
                  </td>

                  {/* Equipo */}
                  <td className="px-3 py-4 ">
                    <div className="flex items-center">
                      <StackedHexagonsTeam
                        users={item.users}
                        limit={openSummary ? 2 : 4}
                      />
                    </div>
                  </td>

                  {/* Indicadores numéricos */}
                  <td className="px-3 py-4 text-right md:text-left">
                    <ProjectIncidents incidents={item.incidents} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-auto border-t border-gray-100">
        <Pagination />
      </div>
    </div>
  );
};

export default TableProject;
