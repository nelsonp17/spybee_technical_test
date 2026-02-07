import Navbar from "@/components/molecules/navbar/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      {/* Navbar */}
      <Navbar />

      {/* body */}
      <section className="max-w-[1400px] mx-auto p-8">{children}</section>
    </main>
  );
}
