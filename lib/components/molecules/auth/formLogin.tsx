"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginValidations } from "@/lib/utils/validations/form";
import Button from "../../atoms/buttons/button";
import { InputValidate } from "../form/inputValidate";
import Link from "next/link";
import Alert from "../../atoms/alert";
import { LoginFormData } from "@/lib/types/client/auth";
import { loginUser } from "@/lib/services/client/auth";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Capturamos el mensaje de éxito si viene del registro
  const message = searchParams.get("message");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true);
    setError("");

    const result = await loginUser(data);

    if (result.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(result.error || "Error al entrar");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Iniciar sesión
        </h2>

        {/* Mensaje de éxito del registro */}
        {message && <Alert message={message} variant="success" />}

        {/* Campo: Email */}
        <InputValidate
          {...register("email", loginValidations.email)}
          type="email"
          label="Correo electrónico"
          disabled={loading}
          placeholder="ejemplo@correo.com"
          error={errors.email}
        />

        {/* Campo: Password */}
        <InputValidate
          {...register("password", loginValidations.password)}
          type="password"
          label="Contraseña"
          disabled={loading}
          placeholder="••••••••"
          error={errors.password}
        />

        {/* Errores de Autenticación */}
        {error && <Alert message={error} variant="error" />}

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full flex justify-center items-center"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <Link
            href={"/auth/register"}
            className="text-[var(--color-light-blue)] hover:underline font-semibold"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}
