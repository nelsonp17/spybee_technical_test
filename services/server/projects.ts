import { baseUrl } from "@/http/server";
import { ProjectData } from "@/types/project";

export async function getProjects(): Promise<ProjectData[]> {
  const res = await fetch(`${baseUrl}/api/projects`, {
    next: {
      revalidate: 3600,
      tags: ["projects"], // Útil para revalidar bajo demanda después
    },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}
