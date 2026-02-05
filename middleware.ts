import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the user is accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for admin session cookie
    const session = request.cookies.get("admin-session");

    if (!session || session.value !== "authenticated") {
      // Redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
