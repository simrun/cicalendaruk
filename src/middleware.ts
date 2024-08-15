import { MiddlewareConfig, NextMiddleware } from "next/dist/server/web/types";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const icsPathToEnvVar: Map<string, string> = new Map([
  // These feeds are inputs to the calendar that we are proxying:
  ["/feeds/ricknodine.ics", "ICS_URL_RICKNODINE"],
  ["/feeds/cigoldsmiths.ics", "ICS_URL_CIGOLDSMITHS"],
  ["/feeds/london-misc.ics", "ICS_URL_LONDON_MISC"],

  // DO NOT CHANGE. Users subscribe to these URLs that proxy the auto-merger:
  ["/feeds/london.ics", "ICS_URL_LONDON"],

  // These feeds are currently just inputs but might one day also be exposed for
  // users to subscribe to?
  ["/feeds/uk.ics", "ICS_URL_UK"],
]);

export const config: MiddlewareConfig = {
  matcher: "/feeds/:path*",
};

export const middleware: NextMiddleware = (request) => {
  const headers = new Headers(request.headers);

  const envVar = icsPathToEnvVar.get(request.nextUrl.pathname);
  if (!envVar) return NextResponse.next();

  const targetUrl = process.env[envVar];
  if (!targetUrl)
    return new Response("Missing environment variable", { status: 500 });

  request.nextUrl.href = targetUrl;
  headers.set("Host", new URL(targetUrl).host);
  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: headers,
    },
  });
};
