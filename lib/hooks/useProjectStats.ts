import { ProjectData, User } from "@/types/project";
import {
  getGlobalMetrics,
  getUpcomingDeadlines,
  getUpcomingEvents,
} from "@/lib/utils/projectUtils";
import { useMemo } from "react";

// hook para obtener las iniciales de los usuarios
export const useUserInitials = (users: User[] = [], limit: number = 2) => {
  return useMemo(() => {
    // 1. Obtenemos los usuarios que se van a mostrar
    const visibleUsers = users.slice(0, limit).map((user) => {
      const firstInitial = user.name?.charAt(0) || "";
      const lastInitial = user.lastName?.charAt(0) || "";
      return `${firstInitial}${lastInitial}`.toUpperCase();
    });

    // 2. Calculamos cuántos sobran
    const remainingCount = users.length > limit ? users.length - limit : 0;

    return {
      visibleUsers, // Ej: ["HS", "RO"]
      remainingCount, // Ej: 9
      hasMore: remainingCount > 0,
    };
  }, [users, limit]);
};

// hook para obtener las métricas globales de los proyectos
export const useMetrics = (allProjects: ProjectData[]) => {
  return useMemo(() => getGlobalMetrics(allProjects), [allProjects]);
};

// hook para obtener las fechas de vencimiento próximas de los proyectos
export const useUpcomingDeadlines = (
  allProjects: ProjectData[],
  limit: number = 5,
) => {
  return useMemo(
    () => getUpcomingDeadlines(allProjects, limit),
    [allProjects, limit],
  );
};

// hook para obtener los proximos eventos
export const useUpcomingEvents = (
  allProjects: ProjectData[],
  limit: number = 5,
) => {
  return useMemo(
    () => getUpcomingEvents(allProjects, limit),
    [allProjects, limit],
  );
};
