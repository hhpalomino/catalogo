import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the user is accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check for admin session cookie
    const session = request.cookies.get("admin-session");

    if (!session || session.value !== "authenticated") {
      // Redirect to home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
