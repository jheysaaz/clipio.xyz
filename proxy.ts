import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /api routes
  // - /_next (Next.js internals)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  // - Any file with an extension (e.g. images in /public)
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
