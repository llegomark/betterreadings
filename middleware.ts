import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Define an interface for the ratelimit information
interface RatelimitInfo {
  success: boolean;
  pending: Promise<unknown>;
  limit: number;
  reset: number;
  remaining: number;
}

// Create a new ratelimit instance with Upstash Redis and sliding window strategy
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, "24 h"),
  timeout: 2000, // 2 second
  analytics: true,
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
  // Get the user's IP address from the request, default to "127.0.0.1" if not present
  const ip = request.ip ?? "127.0.0.1";

  try {
    // Use the ratelimit library to get information about the user's request limit
    const ratelimitInfo: RatelimitInfo = await ratelimit.limit(`mw_${ip}`);
    event.waitUntil(ratelimitInfo.pending); // Wait for the ratelimit to be enforced

    // If the user has not exceeded the request limit, return a NextResponse.next() response
    const response = ratelimitInfo.success
      ? NextResponse.next()
      : // If the user has exceeded the request limit, redirect them to the "/api/blocked" endpoint
        NextResponse.redirect(new URL("/api/blocked", request.url), request);

    // Set headers in the response indicating the rate limit and remaining requests
    response.headers.set("X-RateLimit-Limit", ratelimitInfo.limit.toString());
    response.headers.set(
      "X-RateLimit-Remaining",
      ratelimitInfo.remaining.toString()
    );
    response.headers.set("X-RateLimit-Reset", ratelimitInfo.reset.toString());

    return response;
  } catch (err) {
    // Log any errors and allow the request to proceed
    console.error("Error in rate limiting middleware:", err);
    return NextResponse.next();
  }
}

// Specify that this middleware should be applied to requests matching the "/api/generate" path
export const config = {
  matcher: "/api/generate",
};
