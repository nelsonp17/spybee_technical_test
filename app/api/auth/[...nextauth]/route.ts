// Ya tenia un archivo de auth con next-auth previamente desarrollad

import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions, User } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials) throw new Error("Credenciales inválidas");

        // Verificamos que el email no exista
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) throw new Error("Usuario o contraseña inválidas");

        // comparamos la contraseña
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          existingUser.password,
        );

        if (!isPasswordValid) throw new Error("Usuario o contraseña inválidas");

        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
          name: existingUser.username,
          role: existingUser.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Cuando el usuario inicia sesión, pasamos datos al token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos los datos del token a la sesión del cliente
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
