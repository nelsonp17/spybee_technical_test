export default function AuthLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        {children}
      </div>
    </div>
  );
}
