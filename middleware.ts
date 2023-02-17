import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RatelimitInfo {
  success: boolean;
  pending: Promise<unknown>;
  limit: number;
  reset: number;
  remaining: number;
}

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  ephemeralCache: new Map(),
});

/**
 * Middleware that enforces rate limiting for requests.
 * @param request - The incoming HTTP request.
 * @param event - The Next.js fetch event.
 * @returns A response or undefined.
 */
export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  const ip = request.ip ?? "127.0.0.1";

  try {
    const ratelimitInfo: RatelimitInfo = await ratelimit.limit(`mw_${ip}`);
    event.waitUntil(ratelimitInfo.pending);

    const response = ratelimitInfo.success
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/api/blocked", request.url), request);

    response.headers.set("X-RateLimit-Limit", ratelimitInfo.limit.toString());
    response.headers.set(
      "X-RateLimit-Remaining",
      ratelimitInfo.remaining.toString()
    );
    response.headers.set("X-RateLimit-Reset", ratelimitInfo.reset.toString());

    return response;
  } catch (err) {
    console.error("Error in rate limiting middleware:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/api/generate",
};
