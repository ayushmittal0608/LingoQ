// pages/index.tsx
import React from "react";
import ChatBot from "@/components/ChatBot"; // Adjust path if necessary

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold my-8">Welcome to the Chat App</h1>

      {/* Render the ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default HomePage;
