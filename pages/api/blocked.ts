import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Handler for blocked requests.
 * @param request - The incoming HTTP request.
 * @param response - The HTTP response object.
 */
export default function handler(request: NextApiRequest, response: NextApiResponse) {
  response.status(429);
  return response.end("Too many requests. Please try again later.");
}
