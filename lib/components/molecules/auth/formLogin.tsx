"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
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
      window.location.href = "/dashboard";
    } else {
      setError(result.error || "Error al entrar");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-8 p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center tracking-wide">
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

        <p className="text-center text-sm text-gray-300 mt-4">
          ¿No tienes una cuenta?{" "}
          <Link
            href={"/auth/register"}
            className="text-white hover:text-purple-300 hover:underline font-semibold transition-colors"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
