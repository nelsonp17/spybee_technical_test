import IncidentMetric from "@/lib/components/atoms/metrics/incidentMetric";
import { Incident } from "@/lib/types/server/project";
import { getProjectIncidents } from "@/lib/utils/projectUtils";

interface Props {
  incidents: Incident[];
}

const ProjectIncidents = ({ incidents }: Props) => {
  const { incidents: totalInc, rfi, tasks } = getProjectIncidents(incidents);

  return (
    <div className="flex gap-4">
      <IncidentMetric label="Incidencias" value={totalInc} />
      <IncidentMetric label="RFI" value={rfi} />
      <IncidentMetric label="Tareas" value={tasks} />
    </div>
  );
};

export default ProjectIncidents;
