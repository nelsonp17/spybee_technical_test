import Button from "@/lib/components/atoms/buttons/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-yellow-600 tracking-widest">
          404
        </h1>
        <div className="bg-white px-2 text-sm rounded rotate-12 absolute border border-yellow-600 text-yellow-600 font-semibold shadow-sm">
          Página no encontrada
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          ¡Ups! Parece que te has perdido.
        </h2>
        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida. No te preocupes,
          puedes volver al panel principal.
        </p>

        <div className="mt-8">
          <Link href="/">
            <Button variant="primary" className="px-6 py-3 inline-block">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>

      {/* Decoración visual opcional */}
      <div className="mt-12 opacity-20">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
    </div>
  );
}
