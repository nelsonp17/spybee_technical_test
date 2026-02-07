import DashboardContent from "@/components/organisms/content/dashboardContent";
import HeaderSection from "@/components/molecules/header/headerSection";
import { Suspense } from "react";
import { getProjects } from "@/services/server/projects";

export default async function Dashboard() {
  const [projectsData] = await Promise.all([getProjects()]);

  // console.log(projectsData);
  return (
    <>
      <Suspense fallback={<p>Cargando proyectos...</p>}>
        {/* header */}
        <HeaderSection title="Mis proyectos" count={projectsData.length} />

        {/* content */}
        <DashboardContent data={projectsData} />
      </Suspense>
    </>
  );
}
