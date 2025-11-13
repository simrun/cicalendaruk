export const runtime = "edge";

import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const icsPathToEnvVar: Map<string, string> = new Map([
  // These feeds are inputs to the calendar that we are proxying:
  ["ricknodine.ics", "ICS_URL_RICKNODINE"],
  ["cigoldsmiths.ics", "ICS_URL_CIGOLDSMITHS"],
  ["mariechabert.ics", "ICS_URL_MARIECHABERT"],
  ["markrietema.ics", "ICS_URL_MARKRIETEMA"],
  ["bristol-manual.ics", "ICS_URL_BRISTOL_MANUAL"],
  ["brighton.ics", "ICS_URL_BRIGHTON"],
  ["london-manual.ics", "ICS_URL_LONDON_MANUAL"],
  ["uk-manual.ics", "ICS_URL_UK_MANUAL"],
]);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ feed: string }> },
): Promise<Response> {
  const { feed } = await params;

  const envVar = icsPathToEnvVar.get(feed);
  if (!envVar) notFound();

  const targetUrl = process.env[envVar];
  if (!targetUrl) {
    return new NextResponse("Missing environment variable", {
      status: 500,
    });
  }

  const res = await fetch(targetUrl, {
    // For now, don't cache proxied ICS files server-side, so that editors see
    // the results of their edits immediately. If we wanted to cache files for
    // e.g. 60 seconds we could instead use `next: { revalidate: 60 },` but note
    // that NextJS uses stale-while-revalidate semantics (see
    // https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation)
    // so the first request after it expires will see arbitrarily(?) stale data.
    // (For debugging server-side caching, note that enabling "Disable cache" in
    // Chrome DevTools bypasses this server-side cache, presumably because that
    // causes Chrome to send `Cache-Control: no-cache` and `Pragma: no-cache`
    // request headers.)
    next: { revalidate: 0 }, // Using this instead of the more idiomatic `cache: "no-store",` due to https://github.com/cloudflare/workerd/issues/698
  });

  return new NextResponse(res.body, {
    headers: {
      // Don't let browsers cache these feeds either. (If we did increase
      // max-age, you could bypass the client-side cache by enabling "Disable
      // cache" in Chrome DevTools, or whilst Chrome DevTools is open
      // right-click the Reload button & select "Empty cache and hard reload".)
      "Cache-Control": "max-age=0",
      "Content-Type": "text/calendar; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
