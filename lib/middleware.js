import { NextResponse } from "next/server";

export function middleware(request) {
  // Only apply to /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const allowedIp = process.env.ALLOWED_ADMIN_IP;

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "";

    if (allowedIp && clientIp !== allowedIp) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};