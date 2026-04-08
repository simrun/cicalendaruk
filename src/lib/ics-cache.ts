import { getRequestContext } from "@cloudflare/next-on-pages";

interface CacheMetadata {
  fetchedAt: number;
}

export type CachedFetchResult =
  | { kind: "cached"; body: string; ageSec: number }
  | { kind: "fetched"; body: string }
  | { kind: "stale-fallback"; body: string; ageSec: number }
  | { kind: "error" };

const CACHE_MAX_AGE_SEC = 60;

/**
 * Fetches an ICS URL using Cloudflare KV as a cache layer.
 *
 * - Returns cached data if less than 60s old.
 * - Otherwise fetches upstream; if that fails (network error, non-2xx,
 *   wrong content-type, or response isn't valid ICS), falls back to
 *   stale cached data if available.
 * - Successful fetches are stored in KV for future requests (globally).
 */
export async function fetchWithKVCache(
  targetUrl: string,
): Promise<CachedFetchResult> {
  const { ctx, env } = getRequestContext();
  const kv = env.ICS_CACHE;

  // 1. Look up cache
  const { value: cached, metadata } = await kv.getWithMetadata<CacheMetadata>(
    targetUrl,
    { type: "text" },
  );
  const now = Date.now();
  const ageSec =
    cached !== null && metadata?.fetchedAt
      ? Math.round((now - metadata.fetchedAt) / 1000)
      : null;

  // 2. If cached and fresh (< 60s old), return immediately
  if (cached !== null && ageSec !== null && ageSec < CACHE_MAX_AGE_SEC) {
    return { kind: "cached", body: cached, ageSec };
  }

  // 3. Fetch from upstream
  let fetchedBody: string | undefined;
  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "CICalendarUK-Proxy/1.0 (+https://cicalendar.uk)",
      },
      next: { revalidate: 0 }, // Bypass Next.js cache; see https://github.com/cloudflare/workerd/issues/698
    });
    if (res.ok && res.headers.get("content-type")?.includes("text/calendar")) {
      const text = await res.text();
      if (text.includes("BEGIN:VCALENDAR")) {
        fetchedBody = text;
      }
    }
  } catch {
    // Network error — fall through to stale fallback
  }

  // 4. If fetch failed validation, fall back to stale cache
  if (!fetchedBody) {
    if (cached !== null && ageSec !== null) {
      return { kind: "stale-fallback", body: cached, ageSec };
    }
    return { kind: "error" };
  }

  // 5. Store in KV and return fresh data
  ctx.waitUntil(
    kv.put(targetUrl, fetchedBody, {
      metadata: { fetchedAt: now },
    }),
  );
  return { kind: "fetched", body: fetchedBody };
}
