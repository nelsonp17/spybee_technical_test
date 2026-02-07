import IncidentMetric from "@/components/atoms/metrics/incidentMetric";
import { Incident } from "@/types/project";
import { getProjectIncidents } from "@/utils/projectUtils";

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
