export const runtime = "edge";

import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// DO NOT DROP SUPPORT FOR PREVIOUS URLS as users subscribe to these URLs.
export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;

  const allowedParams = new Set(["london", "restofuk"]);
  for (const key of searchParams.keys()) {
    if (!allowedParams.has(key)) {
      // Unsupported parameters were used.
      notFound();
    }
  }

  if (searchParams.get("london") !== "all") {
    // We don't yet support more granular filtering. Nor do we support computing
    // UK-only (since that would require filtering the London feeds).
    notFound();
  }

  let envVar;
  if (searchParams.get("restofuk") === "multiday") {
    envVar = "ICS_URL_LONDON_UK";
  } else if (searchParams.get("restofuk") === null) {
    envVar = "ICS_URL_LONDON";
  } else {
    // Unsupported parameter value.
    notFound();
  }

  const targetUrl = process.env[envVar];
  if (!targetUrl) {
    return new NextResponse("Missing environment variable", {
      status: 500,
    });
  }

  const res = await fetch(targetUrl, {
    // For now, don't cache proxied ICS files server-side, though if we could
    // stop NextJS from using stale-while-revalidate semantics (see
    // https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation)
    // it would be nice to do so.
    next: { revalidate: 0 }, // Using this instead of the more idiomatic `cache: "no-store",` due to https://github.com/cloudflare/workerd/issues/698
  });

  return new NextResponse(res.body, {
    headers: {
      // Let calendars cache these feeds for 1 hour (though they'll probably
      // ignore that and pick their own update interval).
      "Cache-Control": "max-age=3600",
      "Content-Type": "text/calendar; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
