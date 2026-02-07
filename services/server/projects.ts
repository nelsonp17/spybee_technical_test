/*
 * Lo ideal seria importar api/projects/route.ts según la documentación oficial de Next.js,
 * pero preferi usarlo asi para simular como seria el uso desde una api externa
 */

import { baseUrl } from "@/http/server";
import { ProjectData } from "@/types/project";

export async function getProjects(): Promise<ProjectData[]> {
  const res = await fetch(`${baseUrl}/api/projects`, {
    next: {
      revalidate: 3600,
      tags: ["projects"],
    },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}
