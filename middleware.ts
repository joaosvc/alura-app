import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { DEFAULT_REDIRECT } from "@/routes";
import { API_AUTH_PREFIX } from "@/routes";
import { AUTH_ROUTES } from "@/routes";
import { AUTH_ROUTE_SIGNIN } from "@/routes";

async function middleware(request: NextRequestWithAuth) {
  const { nextUrl, nextauth } = request;
  const isAuthorized = !!nextauth?.token;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isAuthorized) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isAuthorized) {
    return Response.redirect(new URL(AUTH_ROUTE_SIGNIN, nextUrl));
  }
}

export default withAuth(middleware, { callbacks: { authorized: () => true } });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
