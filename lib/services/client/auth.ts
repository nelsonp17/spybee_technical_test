import { LoginFormData, RegisterFormData } from "@/lib/types/client/auth";
import { signIn } from "next-auth/react";

export async function registerUser(data: RegisterFormData) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    }

    // Manejo de errores específicos por status
    const errorMessage = await response.text();

    if (response.status === 409) {
      return { success: false, error: errorMessage || "Usuario ya registrado" };
    }

    if (response.status === 400) {
      return { success: false, error: errorMessage || "Datos inválidos" };
    }

    return { success: false, error: "Error inesperado en el servidor." };
  } catch (err) {
    console.error("Registration error:", err);
    return { success: false, error: "Error de conexión con el servidor." };
  }
}

export async function loginUser(data: LoginFormData) {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: "Credenciales inválidas. Por favor, inténtalo de nuevo.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "Ocurrió un error inesperado al iniciar sesión.",
    };
  }
}
