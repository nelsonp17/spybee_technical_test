import data from "@/data/mock_data.json";
import { ProjectData } from "@/lib/types/server/project";

export async function getProjects(): Promise<ProjectData[]> {
  return data as ProjectData[];
}
