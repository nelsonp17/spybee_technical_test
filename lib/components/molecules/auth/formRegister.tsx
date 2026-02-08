"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputValidate } from "../form/inputValidate";
import { registerValidations } from "@/lib/utils/validations/form";
import Link from "next/link";
import Alert from "../../atoms/alert";
import Button from "../../atoms/buttons/button";
import { RegisterFormData } from "@/lib/types/client/auth";
import { registerUser } from "@/lib/services/client/auth";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setLoading(true);
    setServerError("");

    const result = await registerUser(data);

    if (result.success) {
      router.push("/auth/login?message=Cuenta creada con éxito");
    } else {
      setServerError(result.error || "Algo salió mal");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Crear una cuenta
        </h2>

        {/* Campo: Username */}
        <InputValidate
          {...register("username", registerValidations.username)}
          type="text"
          label="Nombre de usuario"
          disabled={loading}
          placeholder="nelson_portillo"
          error={errors.username}
        />

        {/* Campo: Email */}
        <InputValidate
          {...register("email", registerValidations.email)}
          type="email"
          label="Correo electrónico"
          disabled={loading}
          placeholder="ejemplo@correo.com"
          error={errors.email}
        />

        {/* Campo: Contraseña */}
        <InputValidate
          {...register("password", registerValidations.password)}
          type="password"
          label="Contraseña"
          disabled={loading}
          placeholder="••••••••"
          error={errors.password}
        />

        {/* Error del Servidor */}
        {serverError && <Alert variant="error" message={serverError} />}

        {/* Botón de envío */}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full flex justify-center items-center"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href={"/auth/login"}
            className="text-[var(--color-light-blue)] hover:underline font-semibold"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
