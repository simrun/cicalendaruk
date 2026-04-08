export const runtime = "edge";

import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { fetchWithKVCache } from "@/lib/ics-cache";

const icsPathToEnvVar: Map<string, string> = new Map([
  // These feeds are inputs to the calendar that we are proxying:
  ["brighton-movingstillness.ics", "ICS_URL_BRIGHTON_MOVINGSTILLNESS"],
  ["bristol-manual.ics", "ICS_URL_BRISTOL_MANUAL"],
  ["ricknodine.ics", "ICS_URL_RICKNODINE"],
  ["cigoldsmiths.ics", "ICS_URL_CIGOLDSMITHS"],
  ["mariechabert.ics", "ICS_URL_MARIECHABERT"],
  ["markrietema.ics", "ICS_URL_MARKRIETEMA"],
  ["london-movingstillness.ics", "ICS_URL_LONDON_MOVINGSTILLNESS"],
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
      "Cache-Control": "max-age=0",
      "Content-Type": "text/calendar; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-ICS-Cache-Status": cacheStatus,
    },
  });
}
