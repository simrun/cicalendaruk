export const runtime = "edge";

import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const icsPathToEnvVar: Map<string, string> = new Map([
  // These feeds are inputs to the calendar that we are proxying:
  ["ricknodine.ics", "ICS_URL_RICKNODINE"],
  ["cigoldsmiths.ics", "ICS_URL_CIGOLDSMITHS"],
  ["mariechabert.ics", "ICS_URL_MARIECHABERT"],
  ["london-misc.ics", "ICS_URL_LONDON_MISC"],

  // DO NOT CHANGE. Users subscribe to these URLs that proxy the auto-merger:
  ["london.ics", "ICS_URL_LONDON"],

  // These feeds are currently just inputs but might one day also be exposed for
  // users to subscribe to?
  ["uk.ics", "ICS_URL_UK"],
]);

export async function GET(
  request: NextRequest,
  { params: { feed } }: { params: { feed: string } },
): Promise<Response> {
  const envVar = icsPathToEnvVar.get(feed);
  if (!envVar) notFound();

  const targetUrl = process.env[envVar];
  if (!targetUrl) {
    return new NextResponse("Missing environment variable", {
      status: 500,
    });
  }

  const res = await fetch(targetUrl, {
    // Our proxy caches for up to 2 minutes (unless you have "Disable cache"
    // enabled in Chrome DevTools, presumably because that causes Chrome to send
    // `Cache-Control: no-cache` and `Pragma: no-cache` request headers.)
    next: { revalidate: 2 * 60 },
  });

  return new NextResponse(res.body, {
    headers: {
      // Let clients cache for a further 1 minute (unless you have "Disable cache"
      // enabled in Chrome DevTools, or whilst Chrome DevTools is open you
      // right-click the Reload button and select "Empty cache and hard reload".)
      "Cache-Control": "max-age=60",
      "Content-Type": "text/calendar; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
