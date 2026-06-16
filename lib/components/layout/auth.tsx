export default function AuthLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen flex sm:items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-10 sm:p-4 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="max-w-md w-full z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
