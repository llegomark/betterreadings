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
import Github from "../components/GitHub";
import Balancer from "react-wrap-balancer";

const Home: NextPage = () => {
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [gradelevel, setGradelevel] = useState<GradelevelType>("Grade 1");
  const [generatedTopics, setGeneratedTopics] = useState<String>("");

  const router = useRouter();
  useEffect(() => {}, []);

  // const prompt = `Write a 300-600 word reading passage on the topic of ${topic} for a ${gradelevel} audience. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. It should accurately reflect the passage's content and encourage students to read. You aim to help students understand and analyze the material who are struggling with reading and comprehension. Use clear and simple language with short and simple sentences, and avoid using complex sentence structures or technical terms. To help students understand the information, provide clear and straightforward definitions or explanations for essential vocabulary words. Consider using examples or analogies to make the concepts easier to understand. Highlight essential vocabulary words and provide clear and straightforward definitions or explanations. At the end of the passage, including 5-10 comprehension questions to test students' understanding of the material. These questions should mix multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, main ideas, and inferences. In addition to the questions, provide a brief and concise summary of the passage to reinforce the main ideas and concepts. Please encourage students to ask questions and participate in discussions about the material to further their understanding and promote critical thinking and analysis. Write the passage in a natural, clear, flowing, and engaging style, as if a human wrote it. Your goal is to create an enjoyable, informative reading experience that helps students develop their reading and comprehension skills.
  // }`;

  // const prompt = `Act as an expert reading specialist or literacy specialist. Write a complete, coherent, and detailed reading passage on the topic of ${topic} for a ${gradelevel} audience. The passage should be written in a natural, clear, flowing, and engaging style, as if it were written by a human. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. The passage should be between 300-600 words, and include various vocabulary words appropriate for the ${gradelevel} level. For Grade Levels 1-6: Use clear and simple language, with short and simple sentences, and avoid using complex sentence structures or technical terms. To help students understand the material, use visuals and consider using examples or analogies to make the concepts easier to understand. For Grade Levels 6-12: Use clear and engaging language, with a mix of simple and complex sentence structures, and consider using technical terms when appropriate. To help students understand the material, use examples and analogies, and consider using visuals to reinforce key concepts. Highlight important vocabulary words and provide definitions or explanations. At the end of the passage, include 5-10 comprehension questions that will test the students' ability to understand and analyze the material. These questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should also cover various topics, such as vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences.
  // }`;

  const prompt =
    gradelevel == "Grade 1"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 100-200 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use illustrations and images, and consider using examples or analogies to make the concepts easier to understand. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 4-5 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 2"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 100-200 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use illustrations and images, and consider using examples or analogies to make the concepts easier to understand. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 4-5 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 3"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 150-300 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 4"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 150-300 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 5"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 200-350 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 6"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 200-350 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 7"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 250-450 words in length with a focus on developing higher-level thinking skills such as inference, synthesis, and evaluation. The passages should also be longer and cover a wider range of topics, including current events, science, and literature. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be introduced and explained, as appropriate, to help students build their vocabulary and understanding. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging introduction to "${topic}" and to help them develop their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 8"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 250-450 words in length with a focus on developing higher-level thinking skills such as inference, synthesis, and evaluation. The passages should also be longer and cover a wider range of topics, including current events, science, and literature. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be introduced and explained, as appropriate, to help students build their vocabulary and understanding. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging introduction to "${topic}" and to help them develop their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 9"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 300-450 words in length and covering a wider range of topics and incorporating more complex language and structure. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills, including interpretation and evaluation as they prepare for higher level coursework in the future.`
      : gradelevel == "Grade 10"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 300-450 words in length and covering a wider range of topics and incorporating more complex language and structure. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills, including interpretation and evaluation as they prepare for higher level coursework in the future.`
      : gradelevel == "Grade 11"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 300-600 words in length and covering complex topics and incorporating advanced vocabulary and syntax. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-10 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills and preparing students for college-level reading and writing.`
      : gradelevel == "Grade 12"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the topic of "${topic}" for a ${gradelevel} student. The passage should be approximately 300-600 words in length and covering complex topics and incorporating advanced vocabulary and syntax. Suggest a catchy title at the beginning; make sure that the title is both informative and attention-grabbing. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-10 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills and preparing students for college-level reading and writing.`
      : "Invalid Category";

  // switch (gradelevel) {
  //   case "Grade 1":
  //   case "Grade 2":
  //   case "Grade 3":
  //   case "Grade 4":
  //   case "Grade 5":
  //   case "Grade 6":
  //   case "Grade 7":
  //   case "Grade 8":
  //   case "Grade 9":
  //   case "Grade 10":
  //   case "Grade 11":
  //   case "Grade 12":
  //     break;
  //   default:
  //     throw new Error("Invalid Category");
  // }

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

  const isDisabled = () => {
    if (topic === "") {
      return true;
    } else {
      return false;
    }
  };

  const limitCharacters = (e: any) => {
    if (e.target.value.length > 100) {
      e.target.value = e.target.value.substr(0, 100);
      toast.error("You have reached the maximum number of characters.");
    }
  };

  const lines = generatedTopics.split("\n");

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>
          BetterReading: Personalized Reading Passages for Improved Student
          Learning
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="sm:mt-15 mt-12 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-md transition-colors hover:bg-gray-100 mb-10"
          href="https://github.com/llegomark/betterreading"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Source Code on Github</p>
        </a>
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-6xl md:text-7xl">
          <Balancer>
            Take Your Students' Reading Skills to the Next Level
          </Balancer>
        </h2>
        <p className="mx-auto mt-12 max-w-xl text-lg leading-7 text-slate-900 sm:text-base lg:text-lg">
          <Balancer>
            Our AI-generated reading passages are tailored to each student's
            grade level and designed to improve their reading skills,
            comprehension, and confidence. Say goodbye to generic reading
            materials and hello to personalized, engaging content that will
            inspire your students to read and learn. Get started today and give
            your students the tools they need to succeed.
          </Balancer>
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
          <div className="flex mt-3 items-center align-items-center">
            <p>
              <span className="text-xs text-gray-500">
                Can't think of a topic?{" "}
                <Link href="reading" className="text-black underline">
                  Click Here!
                </Link>{" "}
              </span>
            </p>
          </div>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onInput={limitCharacters}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled()) {
                e.preventDefault();
                generateTopic(e);
              }
            }}
            rows={4}
            className="w-full mt-5 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
            placeholder={
              "For example, The Impact of Climate Change on Our Planet, Shakespeares Romeo and Juliet, The Life Cycle of a Butterfly, Saving Water, Energy, Planet Mars, or Orange Fruit."
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
              gradelevel={gradelevel}
              setGradelevel={(newGradelevel) => setGradelevel(newGradelevel)}
            />
          </div>
          {!loading && (
            <button
              className="bg-black rounded-lg text-white text-base px-4 py-2 mt-10 hover:bg-black/80 w-full font-bold"
              onClick={(e) => generateTopic(e)}
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
                      <p className="text-base leading-normal text-start">
                        {lines.map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                    <p className="flex bg-yellow-200 p-3 text-yellow-800 font-light tracking-normal leading-normal rounded-lg text-sm mt-2 text-start">
                      <span>
                        Did you encounter any issues generating a passage? Try
                        refreshing the page and generating a new passage. If the
                        issue persists, please email me at markllego@gmail.com.
                      </span>
                    </p>
                    <p className="flex bg-yellow-200 p-3 text-yellow-800 font-light tracking-normal leading-normal rounded-lg text-sm mt-2 text-start">
                      <span>
                        To get a different version of the same topic at a
                        different grade level, select the desired grade level
                        from the options and click the "Generate Passage" button
                        again. If you're not happy with the generated passage,
                        you can use the same button to get a new one. To copy
                        the current passage to your clipboard, simply click it.
                      </span>
                    </p>
                    <p className="flex bg-yellow-200 p-3 text-yellow-800 font-light tracking-normal leading-normal rounded-lg text-sm mt-2 text-start">
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