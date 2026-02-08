import AuthLayout from "@/lib/components/layout/auth";
import LoginForm from "@/lib/components/molecules/auth/formLogin";
import { Suspense } from "react";

export const metadata = {
  title: "Login - Prueba técnica",
  description: "Inicio de sesión para la prueba técnica",
};

export default function LoginPage() {
  return (
    <AuthLayout title="Spybee - Prueba técnica">
      <Suspense
        fallback={<div className="text-center">Cargando formulario...</div>}
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
