import IncidentMetric from "@/components/atoms/metrics/incidentMetric";
import { Incident } from "@/types/project";
import { getProjectIncidents } from "@/utils/projectUtils";

interface Props {
  incidents: Incident[];
  variant: "table" | "summary";
}

const ProjectIncidents = ({ incidents, variant }: Props) => {
  const { incidents: totalInc, rfi, tasks } = getProjectIncidents(incidents);

  // Diseño para la fila de la TABLA
  if (variant === "table") {
    return (
      // <div className="flex gap-8">
      <div className="flex gap-4">
        <IncidentMetric label="Incidencias" value={totalInc} />
        <IncidentMetric label="RFI" value={rfi} />
        <IncidentMetric label="Tareas" value={tasks} />
      </div>
    );
  }

  // Diseño para el DASHBOARD superior (Resumen)
  if (variant === "summary") {
    return <></>;
  }

  return null;
};

export default ProjectIncidents;

// Pequeño componente interno para la tabla (Átomo local)
