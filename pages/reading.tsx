import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { GradelevelType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const Reading: NextPage = () => {
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [gradelevel, setGradelevel] = useState<GradelevelType>("Grade 1");
  const [generatedTopics, setGeneratedTopics] = useState<String>("");

  const router = useRouter();
  useEffect(() => {}, []);

  // const prompt = `Write a 300-600 word reading passage on the topic of ${topic} for a ${gradelevel} audience. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. It should accurately reflect the passage's content and encourage students to read. You aim to help students understand and analyze the material who are struggling with reading and comprehension. Use clear and simple language with short and simple sentences, and avoid using complex sentence structures or technical terms. To help students understand the information, provide clear and straightforward definitions or explanations for essential vocabulary words. Consider using examples or analogies to make the concepts easier to understand. Highlight essential vocabulary words and provide clear and straightforward definitions or explanations. At the end of the passage, including 5-10 comprehension questions to test students' understanding of the material. These questions should mix multiple choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, main ideas, and inferences. In addition to the questions, provide a brief and concise summary of the passage to reinforce the main ideas and concepts. Please encourage students to ask questions and participate in discussions about the material to further their understanding and promote critical thinking and analysis. Write the passage in a natural, clear, flowing, and engaging style, as if a human wrote it. Your goal is to create an enjoyable, informative reading experience that helps students develop their reading and comprehension skills.
  // }`;

  const prompt = `Act as an expert reading specialist or literacy specialist. Write a complete, coherent, and detailed reading passage for a ${gradelevel} audience. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. Ensure that the content is engaging and interesting for the selected grade level and aligns with their level of understanding. The topic should be related to a subject that is typically taught in the selected grade, such as science, social studies, history, language arts, or English. The passage should be written in a natural, clear, flowing, and engaging style, as if it were written by a human. Suggest a catchy title on the beginning, make sure that the title is both informative and attention-grabbing. The passage should be between 300-600 words, and include a variety of vocabulary words appropriate for the ${gradelevel} level. For Grade Levels 1-6: Use clear and simple language, with short and simple sentences, and avoid using complex sentence structures or technical terms. To help students understand the material, use visuals and consider using examples or analogies to make the concepts easier to understand. For Grade Levels 6-12: Use clear and engaging language, with a mix of simple and complex sentence structures, and consider using technical terms when appropriate. To help students understand the material, use examples and analogies, and consider using visuals to reinforce key concepts. Highlight important vocabulary words and provide definitions or explanations. At the end of the passage, include 5-10 comprehension questions that will test the students' ability to understand and analyze the material. These questions should include a mix of multiple choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should also cover a variety of topics, such as vocabulary, sequencing, cause and effect relationships, identifying main ideas, and making inferences.
  }`;

  switch (gradelevel) {
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

  const generateTopic = async (e: any) => {
    e.preventDefault();
    setGeneratedTopics("");
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
      setGeneratedTopics((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  const lines = generatedTopics.split("\n");

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>
          BetterReading: Discover the Magic of Reading with AI-Crafted Passages
          for Every Student
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="sm:mt-15 mt-12 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-6xl md:text-7xl">
          Let AI Choose the Perfect Reading Passage Topic for You
        </h2>
        <p className="mx-auto mt-12 max-w-xl text-lg leading-7 text-slate-900 sm:text-base lg:text-lg">
          Struggling to find a suitable topic for your next reading passage? Let
          our AI technology help you choose the perfect topic that will engage
          and challenge your students. Our AI-generated reading passages are
          tailored to meet the needs of your specific grade level and provide a
          comprehensive learning experience for your students. Take your
          students' reading skills to the next level with ease.
        </p>
        <div className="max-w-xl w-full px-6">
          <div className="flex mt-10 items-center align-items-center">
            <span className="text-white bg-black rounded-full w-8 h-8 text-center flex items-center justify-center leading-zero p-0">
              1
            </span>
            <p className="ml-3 text-left text-base">Select a grade level.</p>
          </div>
          <div className="flex mt-3 items-center align-items-center">
            <p>
              <span className="text-xs text-gray-500">
                Do you have a specific topic in mind?{" "}
                <Link href="/" className="text-black underline">
                  Click Here
                </Link>{" "}
              </span>
            </p>
          </div>
          <div className="block mt-3">
            <DropDown
              gradelevel={gradelevel}
              setGradelevel={(newGradelevel) => setGradelevel(newGradelevel)}
            />
          </div>
          {!loading && (
            <button
              className="bg-black rounded-lg text-white text-base px-4 py-2 mt-10 hover:bg-black/80 w-full font-bold"
              onClick={(e) => generateTopic(e)}
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
              {generatedTopics && (
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
                        navigator.clipboard.writeText(`${generatedTopics}`);
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

export default Reading;