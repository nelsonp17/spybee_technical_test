import { client } from "@/http/client";

class ProjectsService {
  private static instance: ProjectsService;
  private constructor() {}

  public static getInstance(): ProjectsService {
    if (!ProjectsService.instance) {
      ProjectsService.instance = new ProjectsService();
    }
    return ProjectsService.instance;
  }

  async getAllProjects() {
    const data = await client.get("/projects");
    return data;
  }
}

export const projectService = ProjectsService.getInstance();
