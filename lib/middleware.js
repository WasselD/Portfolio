import { NextResponse } from "next/server";


const ALLOWED_IPS = (process.env.ALLOWED_ADMIN_IP || "")
  .split(",")
  .map((ip) => ip.trim())
  .filter(Boolean);

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const xForwardedFor = request.headers.get("x-forwarded-for");
    const xRealIp = request.headers.get("x-real-ip");

    let clientIp = xForwardedFor
      ? xForwardedFor.split(",")[0].trim()
      : xRealIp || request.ip || "";


    if (clientIp.startsWith("::ffff:")) {
      clientIp = clientIp.replace("::ffff:", "");
    }

    
    const isLocalhost =
      process.env.NODE_ENV === "development" &&
      (clientIp === "127.0.0.1" || clientIp === "::1" || clientIp === "");

    
    const isAllowed = isLocalhost || ALLOWED_IPS.includes(clientIp);

    if (!isAllowed) {
      
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};