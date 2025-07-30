// components/ChatBot.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

// Define supported languages
const languages = [
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "it", label: "Italian" },
  { code: "hr", label: "Croatian" },
  { code: "ja", label: "Japanese" },
];

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [language, setLanguage] = useState("en"); // Default language is English

  // Handle language change
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);

    // Send the user message to the backend with selected language
    try {
      const response = await axios.post("http://localhost:5550/chat", {
        message: userMessage,
        language: language,
      });

      // Add bot's reply to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response.data.botMessage },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, I couldn't understand that." },
      ]);
    }

    // Clear input field after message is sent
    setUserMessage("");
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat with Server</h1>

      {/* Language Selector */}
      <div className="mb-4">
        <label htmlFor="language" className="block mb-2">
          Select Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-2 rounded-lg border border-gray-300"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div
        id="chatContainer"
        className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.role === "assistant" ? "text-left" : "text-right"}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.role === "assistant" ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center mt-4">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message"
          className="w-full p-2 rounded-lg border border-gray-300 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
