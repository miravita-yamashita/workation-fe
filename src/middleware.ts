import { NextRequest, NextResponse } from "next/server";
import { setPublicToken } from "./components/feature/public-token";
import { auth } from "./app/auth";
export async function middleware(request: NextRequest) {
  // set first visit cookie if there is none
  await setPublicToken();
  const session = await auth();
  const url = new URL(request.url);
  const path = url.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isCreateEditRoute =
    ["create", "new", "edit"].some((keyword) => path.includes(keyword)) ===
    true;

  // Check if the path is the index URL, no validation needed
  if (path === "/") {
    return NextResponse.next();
  }

  // Handle unauthorized access to admin routes and redirect them to admin login
  if (session === null && isAdminRoute) {
    const loginRedirectPath = isAdminRoute ? "/admin/login" : "/login";
    console.warn("Session is null.");
    return NextResponse.rewrite(new URL(loginRedirectPath, request.url));
  }

  // Handle Admin with viewer role trying to access edit or create pates
  if (session && isAdminRoute && isCreateEditRoute) {
    if (!session.user.isAdmin) {
      console.warn("Current Admin user is Viewer only.");
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next({
    headers: {
      "current-url": request.url,
    },
  });
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!^/$|api|placeholder|_next/static|_next/image|_next|fonts|favicon.ico|admin/password-forgot|admin/password-reset).*)",
  ],
};
