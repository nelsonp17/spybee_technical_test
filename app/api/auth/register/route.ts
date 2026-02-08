import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { username, email, password } = await req.json();

    // Validamos los campos requeridos
    if (!username || !email || !password) {
      return new Response("Faltan campos requeridos", { status: 400 });
    }

    // Verificamos que el email no exista
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return new Response("El email ya está registrado", { status: 409 });
    }

    // Verificamos que el username no exista
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return new Response("El nombre de usuario ya está registrado", {
        status: 409,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el nuevo usuario
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    const { password: _, ...user } = newUser;

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Error interno del servidor", { status: 500 });
  }
};
