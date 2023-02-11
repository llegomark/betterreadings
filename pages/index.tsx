import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { BibleType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import { useRouter } from "next/router";
import React from "react";

const Home: NextPage = () => {
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [verse, setVerse] = useState("");
  const [bible, setBible] = useState<BibleType>("Grade 1");
  const [generatedVerses, setGeneratedVerses] = useState<String>("");

  const router = useRouter();
  useEffect(() => {}, []);

  const prompt = `Write a complete, coherent, and detailed reading passage on the topic of ${verse} for a ${bible} audience. Suggest a catchy title on the beginning. The passage should be between 300-600 words, and include a variety of vocabulary words appropriate for the grade level. Use clear and simple language, with short and simple sentences, and avoid using complex sentence structures or technical terms. To help students understand the material, use visuals such as images or diagrams. Highlight important vocabulary words and provide definitions or explanations. At the end of the passage, include 5-10 comprehension questions that will test the students' ability to understand and analyze the material. These questions should include a mix of multiple choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should also cover a variety of topics, such as vocabulary, sequencing, cause and effect relationships, identifying main ideas, and making inferences. In addition, provide a summary of the passage to help reinforce the main ideas and concepts. Encourage students to ask questions and participate in discussions about the material, to help them better understand and retain the information, as well as provide opportunities for critical thinking and analysis. The passage should be written in a natural, clear, flowing, and engaging style, as if it were written by a human.
  }`;

  switch (bible) {
    case "Grade 1":
    case "Grade 2":
    case "Grade 3":
    case "Grade 4":
    case "Grade 5":
    case "Grade 6":
    case "Grade 7":
    case "Grade 8":
    case "Grade 9":
    case "Grade 10":
    case "Grade 11":
    case "Grade 12":
      break;
    default:
      throw new Error("Invalid Category");
  }

  const generateVerse = async (e: any) => {
    e.preventDefault();
    setGeneratedVerses("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      setResponse({
        status: response.status,
        body: await response.text(),
        headers: {
          "X-Ratelimit-Limit": response.headers.get("X-Ratelimit-Limit"),
          "X-Ratelimit-Remaining": response.headers.get(
            "X-Ratelimit-Remaining"
          ),
          "X-Ratelimit-Reset": response.headers.get("X-Ratelimit-Reset"),
        },
      });
      setLoading(false);
      alert(`Rate limit reached, try again after one minute.`);
      return;
    }

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
      setGeneratedVerses((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  const isDisabled = () => {
    const trimmedVerse = verse.trim();
    if (trimmedVerse.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const limitCharacters = (e: any) => {
    if (e.target.value.length > 1500) {
      e.target.value = e.target.value.substr(0, 1500);
      toast.error("You have reached the maximum number of characters.");
    }
  };

  const lines = generatedVerses.split("\n");

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>
          Your Child's Personal AI Reading Companion - Better Reading
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="sm:mt-15 mt-12 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-6xl md:text-7xl">
          Unlock Your Child's Reading Potential with AI-Created Passages for
          Every Grade Level!
        </h2>
        <p className="mx-auto mt-12 max-w-xl text-lg leading-7 text-slate-900 sm:text-base lg:text-lg">
          Our website harnesses the power of AI to generate reading passages
          that are tailored to your child's grade level. Whether they are just
          starting out or ready for a challenge, our passages are designed to
          help improve their reading skills, comprehension, and confidence.
        </p>
        <div className="max-w-xl w-full px-6">
          <div className="flex mt-10 items-center align-items-center">
            <span className="text-white bg-black rounded-full w-8 h-8 text-center flex items-center justify-center leading-zero p-0">
              1
            </span>
            <p className="ml-3 text-left text-base">
              Enter a topic for the passage.
            </p>
          </div>
          <textarea
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
            onInput={limitCharacters}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled()) {
                e.preventDefault();
                generateVerse(e);
              }
            }}
            rows={4}
            className="w-full mt-5 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
            placeholder={
              "For example, 'The Impact of Climate Change on Our Planet', 'Shakespeare's Romeo and Juliet: Love, Tragedy, and Fate', 'The Life Cycle of a Butterfly', or 'Saving Water: Why Conservation Matters'."
            }
          />
          <div className="flex mt-10 items-center align-items-center">
            <span className="text-white bg-black rounded-full w-8 h-8 text-center flex items-center justify-center leading-zero p-0">
              2
            </span>
            <p className="ml-3 text-left text-base">Select a grade level.</p>
          </div>
          <div className="block mt-3">
            <DropDown
              bible={bible}
              setBible={(newBible) => setBible(newBible)}
            />
          </div>
          {!loading && (
            <button
              className="bg-black rounded-lg text-white text-base px-4 py-2 mt-10 hover:bg-black/80 w-full"
              onClick={(e) => generateVerse(e)}
              disabled={isDisabled()}
            >
              Generate Passage &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-lg text-white text-base px-4 py-2 mt-10 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedVerses && (
                <>
                  <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mx-auto px-3">
                      Generated Passage
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto px-3">
                    <div
                      className="bg-sky-200 rounded-xl shadow-md p-4 hover:bg-sky-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-copy border"
                      onClick={() => {
                        navigator.clipboard.writeText(`${generatedVerses}`);
                        toast("Generated Passage Copied!", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <p className="text-base leading-normal text-justify">
                        {lines.map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                    <p className="flex bg-yellow-200 p-3 text-justify text-yellow-800 font-light tracking-normal leading-normal rounded-lg text-base mt-2">
                      <span>
                        If you desire a different version of the same topic or
                        are unsatisfied with the generated passage, simply click
                        the "Generate Passage" button again. To copy the current
                        generated passage to your clipboard, click it.
                      </span>
                    </p>
                    <p className="flex bg-yellow-200 p-3 text-justify text-yellow-800 font-light tracking-normal leading-normal rounded-lg text-base mt-2">
                      <span>
                        Disclaimer: The AI-generated reading passages on our
                        website are intended to be used as a supplementary tool
                        for learning and should not replace traditional
                        educational materials. The passages are not intended to
                        be used for diagnostic or assessment purposes, and the
                        accuracy and reliability of the information contained in
                        the passages should be independently verified. Our
                        website and its creators are not responsible for any
                        inaccuracies or errors in the passages, and the use of
                        the website and its content is at the user's own risk.
                      </span>
                    </p>
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