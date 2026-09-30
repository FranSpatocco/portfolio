import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 renombró "middleware" a "proxy". Redirige "/" al idioma
// detectado (Accept-Language o cookie) y mantiene las rutas /es y /en.
export default createMiddleware(routing);

export const config = {
  // Todo menos API, archivos internos de Next y archivos con extensión
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
