import { NextResponse } from "next/server";


const ALLOWED_IP = process.env.ALLOWED_ADMIN_IP || "VOTRE_IP_ICI";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
  
    const xForwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = xForwardedFor
      ? xForwardedFor.split(",")[0].trim()
      : request.ip || "";

    
    if (clientIp !== ALLOWED_IP) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};