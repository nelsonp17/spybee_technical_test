import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Definimos si estamos en una página de auth o en la raíz
    const isAuthPage = pathname.startsWith("/auth");
    const isRootPage = pathname === "/";

    // Lógica para usuarios AUTENTICADOS
    // Si están en auth o en la raíz "/", los mandamos al dashboard
    if (token && (isAuthPage || isRootPage)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Lógica para usuarios NO AUTENTICADOS en la raíz
    // Si intentan entrar a "/" y no hay token, los mandamos al login
    if (!token && isRootPage) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Permitimos el acceso a /auth y / para que nuestra función
        // personalizada de arriba maneje la redirección manualmente
        if (pathname.startsWith("/auth") || pathname === "/") {
          return true;
        }

        // Para dashboard y otras rutas protegidas, requiere token
        return !!token;
      },
    },
  },
);

export const config = {
  // MUY IMPORTANTE: Agregamos "/" al matcher para que el proxy intercepte la raíz
  matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
};
