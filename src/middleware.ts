import { MiddlewareConfig, NextMiddleware } from "next/dist/server/web/types";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const icsPathToEnvVar: Map<string, string> = new Map([
  ["/feeds/ricknodine.ics", "ICS_URL_RICKNODINE"],
  ["/feeds/cigoldsmiths.ics", "ICS_URL_CIGOLDSMITHS"],
  ["/feeds/misc.ics", "ICS_URL_MISC"],
  ["/feeds/uk.ics", "ICS_URL_UK"],
]);

export const config: MiddlewareConfig = {
  matcher: "/feeds/:path*",
};

export const middleware: NextMiddleware = (request: NextRequest) => {
  const headers = new Headers(request.headers);

  const envVar = icsPathToEnvVar.get(request.nextUrl.pathname);
  if (envVar) {
    if (!process.env[envVar]) return NextResponse.error();
    // Proxy this ICS feed.
    request.nextUrl.href = process.env[envVar];
    headers.set("Host", new URL(process.env[envVar]).host);
    return NextResponse.rewrite(request.nextUrl, {
      request: {
        headers: headers,
      },
    });
  }
};
