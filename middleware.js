import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';


export async function middleware(request) {
  console.log("Middleware ejecutándose...");

  const jwt = request.cookies.get("jwtYuri");

  if (!jwt) {
    console.log("No se encontró token JWT. Redirigiendo a /login");
    return NextResponse.redirect(new URL("/login?error=access-denied", request.url));
  }

  // Tu clave secreta como una cadena
  const secretString = process.env.NEXT_PUBLIC_SECRET_TOKEN_SHET;
  const secret = new TextEncoder().encode(secretString);

  try {
    const { payload } = await jwtVerify(jwt.value, secret);

    console.log("Token JWT verificado. Rol ID:", payload.rol_id);

    // Verifica el rol del usuario y redirige según la ruta correspondiente
    switch (payload.rol_id) {
      case 1:
        if (!request.nextUrl.pathname.includes("/pages/adm")) {
          console.log("Redirigiendo a /login porque la ruta no incluye /pages/adm");
          return NextResponse.redirect(new URL("/login?error=access-denied", request.url));
        }
        break;
      case 2:
        if (!request.nextUrl.pathname.includes("/pages/rrhh")) {
          console.log("Redirigiendo a /login porque la ruta no incluye /pages/rrhh");
          return NextResponse.redirect(new URL("/login?error=access-denied", request.url));
        }
        break;
      case 3:
        if (!request.nextUrl.pathname.includes("/pages/emp")) {
          console.log("Redirigiendo a /login porque la ruta no incluye /pages/emp");
          return NextResponse.redirect(new URL("/login?error=access-denied", request.url));
        }
        break;
      default:
        console.error("Invalid role ID");
        console.log("Redirigiendo a /login debido a un ID de rol no válido");
        return NextResponse.redirect(new URL("/login?error=access-denied", request.url), {
          status: 401, // Código de estado no autorizado
        });
    }

    console.log("Redirigiendo a la próxima respuesta");
    return NextResponse.next();

  } catch (error) {
    console.error("Error al verificar el token JWT:", error);
    console.log("Redirigiendo a /login debido a un error en la verificación del token");
    return NextResponse.redirect(new URL("/login?error=access-denied", request.url), {
      status: 401, // Código de estado no autorizado
    });
  }
}


export const config = {
  // Modifica el matcher para que coincida con las rutas protegidas
  matcher: [
    "/pages/adm/:path*",
    "/pages/rrhh/:path*",
    "/pages/emp/:path*",
  ],
};