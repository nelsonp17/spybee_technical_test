import AuthLayout from "@/lib/components/layout/auth";
import RegisterForm from "@/lib/components/molecules/auth/formRegister";

export const metadata = {
  title: "Registro - Prueba técnica",
  description: "Registro de usuario para la prueba técnica",
};

export default function RegisterPage() {
  return (
    <AuthLayout title="Spybee - Prueba técnica">
      <RegisterForm />
    </AuthLayout>
  );
}
