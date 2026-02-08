import { TagColors } from "@/lib/types/client/tagColor";
import { ProjectDataType } from "@/lib/types/server/datatype";
import {
  Incident,
  IncidentItemType,
  ProjectData,
  ProjectPlanType,
  ProjectStatusType,
} from "@/lib/types/server/project";

// función para obtener estadísticas de incidencias de un proyecto
export const getProjectIncidents = (incidents: Incident[] = []) => {
  const stats = {
    incidents: incidents.filter((i) => i.item === "incidents").length,
    rfi: incidents.filter((i) => i.item === "RFI").length,
    tasks: incidents.filter((i) => i.item === "task").length,
  };

  return stats;
};

// función para obtener el estatus de un proyecto basado en la propiedad status
export const getProjectStatus = (status: ProjectStatusType) => {
  const config: Record<ProjectStatusType, { label: string; color: TagColors }> =
    {
      active: { label: "Activo", color: "success-light" },
      inactive: { label: "Inactivo", color: "error-light" },
      pending_payment: { label: "Pendiente de Pago", color: "warning-light" },
      suspended: { label: "Suspendido", color: "secondary-light" },
    };

  return config[status] || { label: status, color: "secondary" };
};

// función para obtener el plan de un proyecto basado en la propiedad plan
export const getProjectPlan = (plan: ProjectPlanType) => {
  const config: Record<ProjectPlanType, { label: string; color: TagColors }> = {
    small: { label: "Pequeño", color: "amber-dark" },
    big: { label: "Grande", color: "warning-dark" },
  };

  return config[plan] || { label: plan, color: "secondary" };
};

// Esta función recorre todos los proyectos para obtener Totales y Abiertos.
export const getGlobalMetrics = (allProjects: ProjectData[]) => {
  // Aplanamos todos los incidentes de todos los proyectos en un solo array
  const allIncidents = allProjects.flatMap((p) => p.incidents || []);

  const metrics = {
    incidents: {
      total: allIncidents.filter((i) => i.item === "incidents").length,
      open: allIncidents.filter(
        (i) => i.item === "incidents" && i.status === "active",
      ).length,
    },
    rfi: {
      total: allIncidents.filter((i) => i.item === "RFI").length,
      open: allIncidents.filter(
        (i) => i.item === "RFI" && i.status === "active",
      ).length,
    },
    tasks: {
      total: allIncidents.filter((i) => i.item === "task").length,
      open: allIncidents.filter(
        (i) => i.item === "task" && i.status === "active",
      ).length,
    },
  };

  return metrics;
};

export const getItem = (item: IncidentItemType) => {
  const mapItems = {
    incidents: "Incidencia",
    RFI: "RFI",
    task: "Tarea",
  };

  return mapItems[item];
};

// Esta función es para filtrar los items que están activos y ordenarlos por su limitDate.
export const getUpcomingDeadlines = (
  allProjects: ProjectData[],
  limit: number,
) => {
  const upcoming = allProjects.flatMap((project) =>
    (project.incidents || [])
      .filter((incident) => incident.status === "active") // Solo los abiertos
      .map((incident) => {
        return {
          id: project._id,
          name: project.title,
          item: getItem(incident.item),
          desc: incident.description,
          limitDate: new Date(incident.limitDate),
          // Formateo para la UI
          date: new Date(incident.limitDate).toLocaleDateString("es-ES"),
          hour: new Date(incident.limitDate).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        } as ProjectDataType;
      }),
  );

  // Ordenar: los más cercanos a vencer primero
  return upcoming
    .sort((a, b) => a.limitDate.getTime() - b.limitDate.getTime())
    .slice(0, limit);
};

// Función para obtener eventos próximos
export const getUpcomingEvents = (
  allProjects: ProjectData[],
  limit: number,
) => {
  const events = allProjects.flatMap((project) =>
    (project.incidents || [])
      .filter((item) => item.status === "active") // Solo eventos pendientes
      .map((item) => {
        return {
          id: project._id,
          name: project.title,
          item: item.item, // "projects", "RFI", "task"
          desc: item.description,
          limitDate: new Date(item.limitDate),
          // Formateo para la UI
          date: new Date(item.limitDate).toLocaleDateString("es-ES"),
          hour: new Date(item.limitDate).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          team: project.users, // Pasamos el array completo para el componente de hexágonos
        } as ProjectDataType;
      }),
  );

  // Ordenamos cronológicamente: los más próximos primero
  return events
    .sort((a, b) => a.limitDate.getTime() - b.limitDate.getTime())
    .slice(0, limit);
};
