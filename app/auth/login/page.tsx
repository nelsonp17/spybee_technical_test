import AuthLayout from "@/lib/components/layout/auth";
import LoginForm from "@/lib/components/molecules/auth/formLogin";

export const metadata = {
  title: "Login - Prueba técnica",
  description: "Inicio de sesión para la prueba técnica",
};

export default function LoginPage() {
  return (
    <AuthLayout title="Spybee - Prueba técnica">
      <LoginForm />
    </AuthLayout>
  );
}
