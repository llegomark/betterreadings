import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Handler for blocked requests.
 * @param request - The incoming HTTP request.
 * @param response - The HTTP response object.
 */
export default function handler(request: NextApiRequest, response: NextApiResponse) {
  // Set the response status to 429 (Too Many Requests)
  response.status(429);
  // Return a plain text message that indicates the user has exceeded the request limit and should try again later
  return response.end("Too many requests. Please try again later.");
}
