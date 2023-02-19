# Better Readings

Welcome to Better Readings, the revolutionary website designed to help students improve their reading skills, comprehension, and confidence. Better Readings provides teachers and educators with a platform that delivers custom reading passages tailored to each student's grade level. Our high-quality, engaging content is created by experienced educators who understand the needs of students and the importance of personalized learning.

Better Readings recognizes that every student is unique, and therefore, we strive to deliver personalized content that caters to their individual needs. Our custom reading passages are designed to challenge and inspire students, without overwhelming them. This approach keeps students engaged and motivated throughout their learning experience.

Our website is easy to navigate, with a user-friendly interface that makes it accessible for teachers who may not be familiar with technology. Teachers can generate reading passages that are appropriate for their students' level, track their students' progress, and adjust the content accordingly. This helps teachers to identify areas of strength and weakness and to adjust their teaching strategies to achieve the best possible outcomes.

Better Readings is committed to delivering a high-quality learning experience for students. Our content is developed with a focus on high-interest topics that students will find engaging and relevant. By doing so, we aim to instill a love of reading and encourage students to continue to read throughout their lives.

In conclusion, Better Readings is an effective and innovative tool for teachers and educators looking to help their students improve their reading skills, comprehension, and confidence. Our custom reading passages, personalized to each student's grade level, deliver high-quality content in an engaging and accessible format.

## Generating Reading Passages using OpenAI API

To generate reading passages using OpenAI API, the website makes use of a few key files: Generate.ts, Reading.ts, and Middleware.ts.

### Generate.ts

The Generate.ts file contains the code for generating reading passages using OpenAI API. The code is written in TypeScript.

First, the file defines a list of OpenAI API keys. If additional API keys are needed, they can be added to the list. The code then checks if all API keys are available, and if any are missing, an error is thrown.

```
const API_KEYS: string[] = [
  process.env.OPENAI_API_KEY1 as string,
  process.env.OPENAI_API_KEY2 as string,
  process.env.OPENAI_API_KEY3 as string,
  // add more API keys as necessary
];

if (!API_KEYS.every(Boolean)) {
  throw new Error("Missing env var(s) from OpenAI");
}
```

Next, the interface for the request body is defined. The request body must contain a prompt string for generating the reading passage.

```
interface RequestBody {
  prompt: string;
}
```

The configuration object for the Next.js API route is defined next. It specifies that the code should run on the "edge" runtime.

```
export const config = {
  runtime: "edge",
};
```

The main function in Generate.ts is an async function that handles the Next.js API request. The prompt is obtained from the request body, and if it is not provided, an error response is returned.
```
const handler = async (req: NextRequest): Promise<Response> => {
  const { prompt } = (await req.json()) as RequestBody;

  if (!prompt) {
    return new Response("No prompt in the request", {
      status: 400,
      statusText: "Bad Request",
    });
  }
  ```

The GPT3Tokenizer is used to count the number of tokens in the prompt, and the maximum number of tokens allowed for the prompt is set to 400. If the prompt exceeds the maximum number of tokens, an error response is returned.
```
const tokenizer = new gpt3Tokenizer({ type: 'gpt3' });
const tokens = tokenizer.encode(prompt);
const numTokens = tokens.bpe.length;
const MAX_PROMPT_TOKENS = 400;

if (numTokens > MAX_PROMPT_TOKENS) {
  return new Response(`The prompt has ${numTokens} tokens, which exceeds the maximum limit of ${MAX_PROMPT_TOKENS} tokens.`, {
    status: 400,
    statusText: "Bad Request",
  });
}
```
One of the API keys is randomly selected, and the API parameters for the OpenAI text completion request are set. The function then calls the OpenAI API to stream the generated text. If there is an error in the process, an error response is returned.
```
  try {
    // Call the OpenAI API to stream the generated text
    const stream = await OpenAIStream(payload, apiKey);
    // Return the response from the OpenAI stream as the response to the API request
    return new Response(stream);
  } catch (e) {
    console.error(e);
    // If there is any error in the process, return an error response
    return new Response("Failed to fetch stream from OpenAI", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
```
### Reading.ts
The Reading.ts file contains the function OpenAIStream that is called from Generate.ts to handle the streaming of data from the OpenAI API. The function takes in the payload object and an API key, and returns a readable stream that will continuously receive data from the OpenAI API until it returns the "[DONE]" message.

The function first creates a text encoder and decoder, and sets a counter to zero.
```
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let counter = 0;
```
The function then sends a POST request to the OpenAI API with the given payload and API key. If the response is not successful, an error is thrown.
```
const res = await fetch("https://api.openai.com/v1/completions", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  method: "POST",
  body: JSON.stringify(payload),
});

if (!res.ok) {
  throw new Error(`Failed to fetch stream from OpenAI: ${res.statusText}`);
}
```
A ReadableStream object is then created that will continuously receive data from the response.
```
const stream = new ReadableStream({
  async start(controller) {
    // Define a callback function to handle incoming data
    function onParse(event: ParsedEvent | ReconnectInterval) {
      if (event.type === "event") {
        const data = event.data;

        // Close the stream if the OpenAI API returns the "[DONE]" message
        if (data === "[DONE]") {
          controller.close();
          return;
        }

        //... Continue the rest of the code
      }
    }

    //... Continue the rest of the code
  },

  async cancel() {
    //... Continue the rest of the code
  },
});

return stream;
```
The start() method of the ReadableStream is an async function that is called when the stream is started. It defines a callback function onParse to handle incoming data. If the data is the "[DONE]" message, the stream is closed. If the data contains generated text, the text is extracted and enqueued as encoded binary data in the stream.
```
try {
  const parsedData = JSON.parse(data) as OpenAIResponse;
  if (parsedData.choices && parsedData.choices.length > 0) {
    const choice = parsedData.choices[0];
    if (choice && choice.text) {
      text = choice.text;
    }
  }
} catch (e) {
  console.error(e);
}
```
The cancel() method of the ReadableStream is an async function that is called when the stream is cancelled. It cancels the response if the stream is closed or an error occurs.
```
async cancel() {
  if (res.body && typeof res.body.cancel === "function") {
    try {
      await res.body.cancel();
    } catch (e) {
      console.error(e);
    }
  }
},
```
### Middleware.ts
The Middleware.ts file contains the middleware function that enforces rate limiting for requests to the "/api/generate" path. The function is exported as the default export.

The middleware function takes in the request and event objects, which represent the incoming HTTP request and Next.js fetch event, respectively. It returns a response or undefined.
```
export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  //... Continue the rest of the code
}
```
The function first gets the user's IP address from the request, defaulting to "127.0.0.1" if not present.
```
const ip = request.ip ?? "127.0.0.1";
```
It then uses the ratelimit library to get information about the user's request limit. If the user has not exceeded the request limit, a NextResponse.next() response is returned. Otherwise, the user is redirected to the "/api/blocked" endpoint.
```
const ratelimitInfo: RatelimitInfo = await ratelimit.limit(`mw_${ip}`);
event.waitUntil(ratelimitInfo.pending);

const response = ratelimitInfo.success
  ? NextResponse.next()
  : NextResponse.redirect(new URL("/api/blocked", request.url), request);
```
The response headers are then set to indicate the rate limit and remaining requests.
```
response.headers.set("X-RateLimit-Limit", ratelimitInfo.limit.toString());
response.headers.set(
  "X-RateLimit-Remaining",
  ratelimitInfo.remaining.toString()
);
response.headers.set("X-RateLimit-Reset", ratelimitInfo.reset.toString());
```
Finally, the function returns the response.
```
return response;
```
The config object is also exported, specifying that this middleware should be applied to requests matching the "/api/generate" path.
```
export const config = {
  matcher: "/api/generate",
};
```
