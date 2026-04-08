export const runtime = "edge";

import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { fetchWithKVCache } from "@/lib/ics-cache";

// DO NOT DROP SUPPORT FOR PREVIOUS URLS as users subscribe to these URLs.
export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  let envVar;

  if (searchParams.size === 1 && searchParams.has("brighton")) {
    // n.b. restofuk is not currently supported for Brighton.
    if (searchParams.get("brighton") !== "all") {
      notFound(); // We don't yet support more granular filtering.
    }
    // There is not yet a merged feed for Brighton.
    envVar = "ICS_URL_BRIGHTON_MOVINGSTILLNESS";
  } else if (searchParams.size === 1 && searchParams.has("bristol")) {
    // n.b. restofuk is not currently supported for Bristol.
    if (searchParams.get("bristol") !== "all") {
      notFound(); // We don't yet support more granular filtering.
    }
    // There is no merged feed for Bristol.
    envVar = "ICS_URL_BRISTOL_MANUAL";
  } else {
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

    if (searchParams.get("restofuk") === "multiday") {
      envVar = "ICS_URL_LONDON_UK";
    } else if (searchParams.get("restofuk") === null) {
      envVar = "ICS_URL_LONDON";
    } else {
      // Unsupported parameter value.
      notFound();
    }
  }

  const targetUrl = process.env[envVar];
  if (!targetUrl) {
    return new NextResponse("Missing environment variable", {
      status: 500,
    });
  }

  const result = await fetchWithKVCache(targetUrl);

  if (result.kind === "error") {
    return new NextResponse("Upstream feed unavailable", { status: 502 });
  }

  const cacheStatus =
    result.kind === "cached"
      ? `cached, age=${result.ageSec}s`
      : result.kind === "stale-fallback"
        ? `STALE-FALLBACK, age=${result.ageSec}s`
        : "fetched";

  return new NextResponse(result.body, {
    headers: {
      // Match other ICS providers in disallowing caching. Calendars still seem
      // to choose their own update intervals despite that.
      // TODO: Could support If-Modified-Since/If-None-Match to save bandwidth:
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#validation
      "Cache-Control": "max-age=0, private, must-revalidate",
      "Content-Type": "text/calendar; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-ICS-Cache-Status": cacheStatus,
    },
  });
}
