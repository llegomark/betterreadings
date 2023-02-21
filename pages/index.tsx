import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import type { GradelevelType } from "../components/DropDown";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Balancer from "react-wrap-balancer";
import React from "react";
import SocialIcon from "../components/SocialIcon";

// This defines the types of data that the API response should have
interface ResponseType {
  status: number;
  body: string;
  headers: {
    "X-Ratelimit-Limit": string;
    "X-Ratelimit-Remaining": string;
    "X-Ratelimit-Reset": string;
  };
}

// This extends the ResponseType interface to include an optional error message
interface ApiResponse extends ResponseType {
  error?: string;
}

// This defines the Home component, which is a functional component with no props
const Home: NextPage = () => {
  // These states store the component's data and whether it is currently loading
  const [, setResponse] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [gradelevel, setGradelevel] = useState<GradelevelType>("Kindergarten");
  const [generatedTopics, setGeneratedTopics] = useState<string>("");
  const [ratelimitRemaining, setRatelimitRemaining] = useState<string>("");

  type WordCountRanges = {
    [key in string]: [number, number];
  };

  const wordCountRanges: WordCountRanges = {
    Kindergarten: [50, 100],
    "Grade 1": [100, 200],
    "Grade 2": [100, 200],
    "Grade 3": [150, 300],
    "Grade 4": [150, 300],
    "Grade 5": [200, 350],
    "Grade 6": [200, 350],
    "Grade 7": [250, 450],
    "Grade 8": [250, 450],
    "Grade 9": [300, 450],
    "Grade 10": [300, 450],
    "Grade 11": [300, 600],
    "Grade 12": [300, 600],
  };

  const getPrompt = (topic: string, gradelevel: string) => {
    const [min, max] = wordCountRanges[gradelevel] || [];
    if (!min || !max) return "Invalid Category";

    let prompt = `Write a ${min}-${max} word reading passage on "${topic}" for a ${gradelevel} student. `;
    if (gradelevel === "Kindergarten") {
      prompt += `Following the adventures of a fictional character, use a fun and engaging title that is easy to remember and relevant to the story, and use clear and engaging language with simple vocabulary and sentence structures. Incorporate colorful visuals, such as illustrations or photographs, to hold students' attention and reinforce key concepts. Use basic vocabulary words that are familiar to Kindergarten students. Include 3-5 comprehension questions at the end, focused on basic concepts like identifying objects or matching words to pictures. The goal is to introduce Kindergarten students to the joy of reading and develop basic reading skills for future success.`;
    } else if (gradelevel === "Grade 1" || gradelevel === "Grade 2") {
      prompt += `Use a catchy title that is informative, attention-grabbing, and relevant to the topic. Use clear and simple language with short sentences, avoiding technical terms or complex structures. Use illustrations and images to aid understanding, and examples or analogies to make concepts easier to understand. Highlight important vocabulary words with definitions, and include 4-5 comprehension questions at the end, covering various topics and using multiple-choice and interactive elements to build critical thinking and analysis skills for future coursework.`;
    } else {
      prompt += `Cover a wider range of topics and use more complex language and structure. Use a catchy title that is informative, attention-grabbing, and relevant to the topic. Use clear and engaging language with technical terms when appropriate. Reinforce key concepts with examples, analogies, and visuals, and highlight important vocabulary words with definitions. Include 5-8 comprehension questions at the end, covering various topics and using multiple-choice, short answer, and interactive elements. The questions should develop critical thinking and analysis skills, including interpretation and evaluation for future higher level coursework.`;
    }
    return prompt;
  };

  const prompt = getPrompt(topic, gradelevel);

  // Define an asynchronous function that sends a POST request to an API route and displays the response
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    generateTopic().catch((error) => {
      // Handle errors here
      console.error(error);
      alert("An error occurred. Please try again.");
    });
  };

  const generateTopic = async (): Promise<void> => {
    setGeneratedTopics(""); // Clear any previous generated topics
    setLoading(true); // Set the loading state to true

    // Send a POST request to the API route with the prompt in the request body
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    // Handle errors when the response status is outside the 200-299 range
    if (response.status < 200 || response.status >= 300) {
      // Construct an error object with details about the response
      const error: ApiResponse = {
        status: response.status,
        body: await response.text(),
        headers: {
          "X-Ratelimit-Limit": response.headers.get(
            "X-Ratelimit-Limit"
          ) as string,
          "X-Ratelimit-Remaining": response.headers.get(
            "X-Ratelimit-Remaining"
          ) as string,
          "X-Ratelimit-Reset": response.headers.get(
            "X-Ratelimit-Reset"
          ) as string,
        },
        error: `Request failed with status code ${response.status}`,
      };

      // Set the response state to the error and show an alert to the user
      setResponse(error);
      setLoading(false);
      alert(
        `You have no API requests remaining today. Try again after 24 hours.`
      );
      return;
    }

    // Set the ratelimitRemaining state to the value of the X-Ratelimit-Remaining header
    setRatelimitRemaining(response.headers.get("X-Ratelimit-Remaining") || "");

    // Read the response body as a stream and update the generated topics state with each chunk of data
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedTopics((prev) => prev + chunkValue);
    }

    setLoading(false); // Set the loading state to false once the response is fully received
  };

  // This function limits the number of characters in a text area input
  const limitCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const maxCharacters = 100; // Set the maximum number of characters allowed
    const currentCharacters = e.target.value.length; // Get the current number of characters

    // Check if the current number of characters exceeds the maximum
    if (currentCharacters > maxCharacters) {
      // If it does, truncate the input value to the maximum number of characters
      e.target.value = e.target.value.slice(0, maxCharacters);
      // Show an error message to the user using a toast notification
      toast.error("You have reached the maximum number of characters.");
    }
  };

  // This line splits a string into an array of strings, with each element representing a line in the original string
  const lines: string[] = generatedTopics.split("\n");

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <Head>
        <title>
          Personalized Reading Passages for Improved Student Learning - Better
          Readings
        </title>
      </Head>

      <Header href="/" />
      <main className="sm:mt-15 mt-12 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <a
          className="mb-10 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-md transition-colors hover:bg-gray-100"
          href="/github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Mark Anthony Llego's Github profile"
          aria-describedby="github-link"
        >
          <SocialIcon platform="github" size={25} />
          <p>Star on Github</p>
        </a>
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-6xl md:text-7xl">
          <Balancer>
            Take Your Students&apos; Reading Skills to the Next Level
          </Balancer>
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-normal text-slate-900 sm:mt-12 sm:text-lg lg:text-lg"
          aria-label="Reading Passages"
        >
          <Balancer>
            Our reading passages are tailored to each student&apos;s grade level
            and designed to improve their reading skills, comprehension, and
            confidence. Say goodbye to generic reading materials and hello to
            personalized, engaging content that will inspire your students to
            read and learn. Get started today and give your students the tools
            they need to succeed.
          </Balancer>
        </p>
        <div className="w-full max-w-xl px-6">
          <div className="align-items-center mt-10 flex items-center">
            <span className="leading-zero flex h-6 w-6 items-center justify-center rounded-full bg-black p-2 text-center text-white">
              1
            </span>
            <p className="ml-3 text-left text-base leading-normal text-slate-900 sm:text-lg lg:text-lg">
              <Balancer>
                Enter a theme, subject matter, or content focus. (Leave blank to
                generate a random passage.)
              </Balancer>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onInput={limitCharacters}
              rows={4}
              className="focus:shadow-outline mt-5 w-full rounded-lg shadow-sm focus:outline-none"
              placeholder={
                "For example, the topics could be: The Impact of Climate Change on Our Planet, Shakespeare's Romeo and Juliet, The Life Cycle of a Butterfly, Saving Water and Energy, Planet Mars, or Orange Fruit."
              }
              aria-label="Enter a theme, subject matter, or content focus. (Leave blank to generate a random passage.)"
            />
            <p className="mt-2 text-right text-sm text-gray-500">
              {topic.length}/100
            </p>
            <div className="align-items-center mt-10 flex items-center">
              <span className="leading-zero flex h-6 w-6 items-center justify-center rounded-full bg-black p-2 text-center text-white">
                2
              </span>
              <p className="ml-3 text-left text-base leading-normal text-slate-900 sm:text-lg lg:text-lg">
                <Balancer>Select a grade level.</Balancer>
              </p>
            </div>
            <div className="mt-3 block">
              <DropDown
                gradelevel={gradelevel}
                setGradelevel={(newGradelevel) => setGradelevel(newGradelevel)}
              />
            </div>
            {!loading && (
              <button
                className="mt-10 w-full rounded-lg bg-black px-4 py-2 text-base font-bold text-white transition-colors hover:bg-black/80"
                type="submit"
              >
                Generate Passage &rarr;
              </button>
            )}
            {loading && (
              <button
                className="mt-10 w-full rounded-lg bg-black px-4 py-2 text-base text-white"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
          </form>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="my-10 space-y-10">
              {generatedTopics && (
                <>
                  <div>
                    <h2 className="mx-auto max-w-4xl px-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
                      <Balancer>Generated Passage</Balancer>
                    </h2>
                  </div>
                  <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8 px-3">
                    <div
                      className="relative transform cursor-pointer rounded-xl border bg-sky-200 p-4 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-sky-100 hover:shadow-lg"
                      onClick={() => {
                        const passage = `\nAuthor: Mark Anthony Llego \n\n${generatedTopics}`;
                        navigator.clipboard
                          .writeText(passage)
                          .then(() => {
                            toast("Generated Passage Copied!", {
                              icon: "✂️",
                            });
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                    >
                      <p className="text-start text-base leading-normal text-slate-900 sm:text-lg lg:text-lg">
                        <span className="font-bold">Limit: </span>
                        <span>
                          You have {ratelimitRemaining} requests remaining
                          today.
                        </span>
                        <br />
                        <span className="font-bold">Author: </span>
                        <a
                          href="https://www.facebook.com/markllego/"
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          Mark Anthony Llego
                        </a>
                        <br />
                        <span className="font-bold">Email: </span>
                        <a
                          href="mailto:markllego@gmail.com"
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          markllego@gmail.com
                        </a>
                        <br />
                        <span className="font-bold">Level: </span>
                        <span>{gradelevel}</span>
                        <br />
                        {lines.map((line, index) => (
                          <React.Fragment key={index}>
                            {index === 0 ? (
                              <span className="font-bold">{line}</span>
                            ) : (
                              line
                            )}
                            <br />
                          </React.Fragment>
                        ))}
                        <br />
                        <span className="font-bold">Hint: </span>
                        <span>
                          Ready to copy the generated passage? Simply click it!
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 rounded-lg bg-yellow-200 p-4 text-start text-base text-slate-900 sm:text-lg lg:text-lg">
                      <h2 className="mb-2 font-bold">Usage Guidelines:</h2>
                      <p className="mb-4">
                        The generated reading passages are intended for
                        educational use only. They are not to be used for
                        commercial purposes or distributed for profit.
                      </p>
                      <p className="mb-4">
                        Users are not allowed to remove the author title from
                        the reading passages. This ensures that credit is given
                        to the creators of the content and helps to protect
                        their intellectual property rights.
                      </p>
                      <p className="mb-4">
                        The reading passages may be used by teachers, students,
                        or parents for non-commercial educational purposes. They
                        may be used in the classroom, for homeschooling, or for
                        personal study.
                      </p>
                      <p className="mb-4">
                        Users are encouraged to use the reading passages
                        creatively, incorporating them into lesson plans,
                        activities, or assessments. However, the passages should
                        not be altered in a way that changes their original
                        meaning or intent.
                      </p>
                      <p className="mb-4">
                        The reading passages are not to be used for any illegal,
                        unethical, or inappropriate activities. Users should
                        respect copyright law, plagiarism guidelines, and other
                        relevant ethical considerations.
                      </p>
                      <p className="mb-4">
                        The reading passages are licensed under a{" "}
                        <a
                          href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-600 hover:text-blue-800"
                        >
                          Creative Commons
                          Attribution-NonCommercial-NoDerivatives 4.0
                          International License
                        </a>
                        . This means that users are free to share, copy, and
                        redistribute the material in any medium or format, as
                        long as they give appropriate credit to the creators, do
                        not use the material for commercial purposes, and do not
                        modify or adapt the material in any way.
                      </p>
                      <p>
                        In addition to these guidelines, users are granted a
                        creative license to use the generated reading passages
                        in their own unique and creative ways. However, users
                        should always respect the original intent and meaning of
                        the passages, and avoid using them in any way that could
                        be harmful, inappropriate, or unethical.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
