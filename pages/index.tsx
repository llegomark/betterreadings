import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { DropDown, GradelevelType } from "../components/DropDown";
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
const Home: NextPage<{}> = () => {
  // These states store the component's data and whether it is currently loading
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [gradelevel, setGradelevel] = useState<GradelevelType>("Kindergarten");
  const [generatedTopics, setGeneratedTopics] = useState<string>("");

  useEffect(() => {}, []); // This useEffect hook runs once when the component mounts

  const prompt = topic
    ? gradelevel == "Kindergarten"
      ? `As a reading specialist or literacy expert, write a simple and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for ${gradelevel} students. The passage should be approximately 50-100 words in length, using simple vocabulary and sentence structures. The story should follow the adventures of a fictional character, such as a friendly animal or a whimsical creature. Suggest a fun and engaging title: The title should be easy to remember and relevant to the story. Consider using a character name, a simple action or event from the story, or a fun word that relates to the story. The title should be easy for Kindergarten students to understand and should encourage them to want to read the passage. In writing the passage, aim to use clear and engaging language that is accessible to Kindergarten students. Consider using colorful and engaging visuals such as illustrations, photographs, or clip art to help reinforce key concepts and to hold the students' attention. Make sure to incorporate basic vocabulary words that are familiar to Kindergarten students, such as "sun," "tree," "water," "flower," etc. At the end of the passage, include 3-5 comprehension questions that are simple and focused on basic concepts, such as identifying objects, recognizing basic shapes, or matching words to pictures. The goal of the passage is to introduce Kindergarten students to the joy of reading and to help them develop basic reading skills. By the end of the passage, students should have a basic understanding of the story and its characters, as well as a foundation for future reading success.`
      : gradelevel == "Grade 1"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 100-200 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use illustrations and images, and consider using examples or analogies to make the concepts easier to understand. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 4-5 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 2"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 100-200 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use illustrations and images, and consider using examples or analogies to make the concepts easier to understand. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 4-5 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 3"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 150-300 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 4"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 150-300 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 5"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 200-350 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 6"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 200-350 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and accessible introduction to "${topic}" and to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 7"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 250-450 words in length with a focus on developing higher-level thinking skills such as inference, synthesis, and evaluation. The passages should also be longer and cover a wider range of topics, including current events, science, and literature. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be introduced and explained, as appropriate, to help students build their vocabulary and understanding. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging introduction to "${topic}" and to help them develop their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 8"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 250-450 words in length with a focus on developing higher-level thinking skills such as inference, synthesis, and evaluation. The passages should also be longer and cover a wider range of topics, including current events, science, and literature. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be introduced and explained, as appropriate, to help students build their vocabulary and understanding. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging introduction to "${topic}" and to help them develop their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
      : gradelevel == "Grade 9"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 300-450 words in length and covering a wider range of topics and incorporating more complex language and structure. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills, including interpretation and evaluation as they prepare for higher level coursework in the future.`
      : gradelevel == "Grade 10"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 300-450 words in length and covering a wider range of topics and incorporating more complex language and structure. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills, including interpretation and evaluation as they prepare for higher level coursework in the future.`
      : gradelevel == "Grade 11"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 300-600 words in length and covering complex topics and incorporating advanced vocabulary and syntax. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies or context clues, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-10 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills and preparing students for college-level reading and writing.`
      : gradelevel == "Grade 12"
      ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage on the theme, subject matter, or content focus about "${topic}" for a ${gradelevel} student. The passage should be approximately 300-600 words in length and covering complex topics and incorporating advanced vocabulary and syntax. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies or context clues, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-10 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to provide students with a comprehensive and engaging overview of "${topic}" and to help them develop their critical thinking and analysis skills and preparing students for college-level reading and writing.`
      : "Invalid Category"
    : gradelevel == "Kindergarten"
    ? `As a reading specialist or literacy expert, write a simple and engaging reading passage for Kindergarten students. The passage should be approximately 50-100 words in length, using simple vocabulary and sentence structures. The story should follow the adventures of a fictional character, such as a friendly animal or a whimsical creature. Suggest a fun and engaging title: The title should be easy to remember and relevant to the story. Consider using a character name, a simple action or event from the story, or a fun word that relates to the story. The title should be easy for Kindergarten students to understand and should encourage them to want to read the passage. In writing the passage, aim to use clear and engaging language that is accessible to Kindergarten students. Consider using colorful and engaging visuals such as illustrations, photographs, or clip art to help reinforce key concepts and to hold the students' attention. Make sure to incorporate basic vocabulary words that are familiar to Kindergarten students, such as "sun," "tree," "water," "flower," etc. At the end of the passage, include 3-5 comprehension questions that are simple and focused on basic concepts, such as identifying objects, recognizing basic shapes, or matching words to pictures. The goal of the passage is to introduce Kindergarten students to the joy of reading and to help them develop basic reading skills. By the end of the passage, students should have a basic understanding of the story and its characters, as well as a foundation for future reading success.`
    : gradelevel == "Grade 1"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 100-200 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use illustrations and images, and consider using examples or analogies to make the concepts easier to understand. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 4-5 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 2"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 100-200 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use illustrations and images, and consider using examples or analogies to make the concepts easier to understand. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 4-5 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 3"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 150-300 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 4"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 150-300 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 5"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 200-350 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 6"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 200-350 words in length and include various appropriate vocabulary words for this grade level. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and simple language with short sentences and avoid using complex sentence structures or technical terms. To help students understand the material, use examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-6 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them build their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 7"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 250-450 words in length with a focus on developing higher-level thinking skills such as inference, synthesis, and evaluation. The passages should also be longer and cover a wider range of topics, including current events, science, and literature. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be introduced and explained, as appropriate, to help students build their vocabulary and understanding. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them develop their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 8"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 250-450 words in length with a focus on developing higher-level thinking skills such as inference, synthesis, and evaluation. The passages should also be longer and cover a wider range of topics, including current events, science, and literature. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be introduced and explained, as appropriate, to help students build their vocabulary and understanding. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them develop their critical thinking and analysis skills as they move towards more advanced coursework in the future.`
    : gradelevel == "Grade 9"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 300-450 words in length and covering a wider range of topics and incorporating more complex language and structure. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them develop their critical thinking and analysis skills, including interpretation and evaluation as they prepare for higher level coursework in the future.`
    : gradelevel == "Grade 10"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 300-450 words in length and covering a wider range of topics and incorporating more complex language and structure. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-8 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice, short answer, and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them develop their critical thinking and analysis skills, including interpretation and evaluation as they prepare for higher level coursework in the future.`
    : gradelevel == "Grade 11"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 300-600 words in length and covering complex topics and incorporating advanced vocabulary and syntax. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies or context clues, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-10 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them develop their critical thinking and analysis skills and preparing students for college-level reading and writing.`
    : gradelevel == "Grade 12"
    ? `As a reading specialist or literacy expert, write a comprehensive and engaging reading passage for a ${gradelevel} student. Choose a topic for the reading passage that is relevant and appropriate for students in ${gradelevel}. The passage should be approximately 300-600 words in length and covering complex topics and incorporating advanced vocabulary and syntax. Suggest a catchy title at the beginning; the title should be informative, attention-grabbing, and relevant to the topic. Consider using a question, a statistic, a quote, or a pun to make the title memorable and catchy. In writing the passage, use clear and engaging language with a mix of simple and complex sentence structures. Technical terms should be used when appropriate to challenge students and help them build their vocabulary. To reinforce key concepts, include examples and analogies or context clues, and consider incorporating visuals as well. Be sure to highlight important vocabulary words and provide definitions or explanations for these terms. At the end of the passage, include 5-10 comprehension questions to test students' understanding and ability to analyze the material. The questions should include a mix of multiple-choice and interactive elements, such as fill-in-the-blank exercises or matching exercises. The questions should cover various topics, including vocabulary, sequencing, cause-and-effect relationships, identifying main ideas, and making inferences. Overall, the goal of the passage is to help them develop their critical thinking and analysis skills and preparing students for college-level reading and writing.`
    : "Invalid Category";

  // Define an asynchronous function that sends a POST request to an API route and displays the response
  const generateTopic = async (e: any) => {
    e.preventDefault(); // Stop default form submission behavior
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
      alert(`Rate limit reached, try again after one minute.`);
      return;
    }

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
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>
          Personalized Reading Passages for Improved Student Learning - Better
          Readings
        </title>
      </Head>

      <Header href="/" />
      <main className="mt-12 sm:mt-15 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-md transition-colors hover:bg-gray-100 mb-10"
          href="https://github.com/llegomark/betterreading"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Mark Anthony Llego's Github profile"
        >
          <SocialIcon platform="github" size={25} />
          <p>Source Code on Github</p>
        </a>
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-6xl md:text-7xl">
          <Balancer>
            Take Your Students&apos; Reading Skills to the Next Level
          </Balancer>
        </h2>
        <p className="mx-auto mt-12 max-w-xl text-lg leading-7 text-slate-900 sm:text-base lg:text-lg">
          <Balancer>
            Our reading passages are tailored to each student's grade level and
            designed to improve their reading skills, comprehension, and
            confidence. Say goodbye to generic reading materials and hello to
            personalized, engaging content that will inspire your students to
            read and learn. Get started today and give your students the tools
            they need to succeed.
          </Balancer>
        </p>
        <div className="max-w-xl w-full px-6">
          <div className="flex mt-10 items-center align-items-center">
            <span className="text-white bg-black rounded-full text-center flex items-center justify-center leading-zero p-2 w-6 h-6">
              1
            </span>
            <p className="ml-3 text-left text-base">
              Enter a theme, subject matter, or content focus. (Leave blank to
              generate a random passage.)
            </p>
          </div>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onInput={limitCharacters}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                generateTopic(e);
              }
            }}
            rows={4}
            className="w-full mt-5 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
            placeholder={
              "For example, The Impact of Climate Change on Our Planet, Shakespeare's Romeo and Juliet, The Life Cycle of a Butterfly, Saving Water, Energy, Planet Mars, or Orange Fruit."
            }
          />
          <p className="text-gray-500 text-right mt-2 text-sm">
            {topic.length}/100
          </p>
          <div className="flex mt-10 items-center align-items-center">
            <span className="text-white bg-black rounded-full text-center flex items-center justify-center leading-zero p-2 w-6 h-6">
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
              className="w-full mt-10 px-4 py-2 text-base font-bold text-white bg-black rounded-lg hover:bg-black/80 transition-colors"
              onClick={(e) => generateTopic(e)}
            >
              Generate Passage &rarr;
            </button>
          )}
          {loading && (
            <button
              className="w-full mt-10 px-4 py-2 text-base text-white bg-black rounded-lg"
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
                    <h2 className="max-w-4xl mx-auto px-3 text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                      Generated Passage
                    </h2>
                  </div>
                  <div className="max-w-xl mx-auto px-3 space-y-8 flex flex-col items-center justify-center">
                    <div
                      className="relative bg-sky-200 rounded-xl shadow-md p-4 hover:bg-sky-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer border"
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
                            {index === 0 ? (
                              <span className="font-bold">{line}</span>
                            ) : (
                              <>{line}</>
                            )}
                            <br />
                            {index === 0 && (
                              <>
                                Author: Mark Anthony Llego
                                <br />
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                      {/* <p className="text-base leading-normal text-start">
                        {lines.map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p> */}
                    </div>
                    <div className="bg-yellow-200 p-3 rounded-lg mt-2 text-sm text-center md:text-left">
                      <h2 className="text-lg font-semibold mb-2">
                        Usage Guidelines:
                      </h2>
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
                        The reading passages are licensed under a Creative
                        Commons Attribution-NonCommercial-NoDerivatives 4.0
                        International License. This means that users are free to
                        share, copy, and redistribute the material in any medium
                        or format, as long as they give appropriate credit to
                        the creators, do not use the material for commercial
                        purposes, and do not modify or adapt the material in any
                        way.
                      </p>
                      <p className="text-sm">
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
