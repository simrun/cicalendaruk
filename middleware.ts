import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Proxy ICS requests as Bookwhen don't allow cross origin
// We also need to set the Host header else Bookwhen returns 403

export const config = {
  matcher: "/feeds/:path*",
};

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  if (request.nextUrl.pathname === "/feeds/ricknodine.ics") {
    if (!process.env.ICS_URL_RICKNODINE) return NextResponse.error();
    request.nextUrl.href = process.env.ICS_URL_RICKNODINE;
    headers.set("Host", "feeds.bookwhen.com");
  } else if (request.nextUrl.pathname === "/feeds/cigoldsmiths.ics") {
    if (!process.env.ICS_URL_CIGOLDSMITHS) return NextResponse.error();
    request.nextUrl.href = process.env.ICS_URL_CIGOLDSMITHS;
    headers.set("Host", "feeds.bookwhen.com");
  }

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: headers,
    },
  });
}
