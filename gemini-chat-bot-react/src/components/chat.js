import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, message: "Hello", type: "User" },
    { id: 2, message: "Hi How can I help you", type: "Bot" },
  ]);
  const [message, setMessage] = useState("");
  const genAI = new GoogleGenerativeAI("API_KEY");

  const sendMessage = async (e) => {
    if (message === "") return;
    e.preventDefault();

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(message);
      const newUserMessage = {
        id: messages.length + 1,
        message: message,
        type: "User",
      };
      setMessages((message) => [...message, newUserMessage]);
      setMessage("");
      const response = result.response;
      const text = response.text();
      const newBotMessage = {
        id: messages.length + 1,
        message: text,
        type: "Bot",
      };
      setMessages((message) => [...message, newBotMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  const clearMessage = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-[#4FAAFF] via-purple-500 to-[#DC5D83] h-screen">
      <main className="mb-auto rounded-lg clear-start p-4 bg-white m-4">
        <h1 className="text-4xl text-black font-black"> Chat with Gemini</h1>
      </main>
      {/* Message Area */}
      <div className="flex flex-col gap-2 w-full p-4 overflow-y-auto">
        {messages.map((message) =>
          message.type === "User" ? (
            <div key={message.id} className="flex w-full flex-row-reverse ">
              <div className="flex w-fit rounded-lg bg-white p-4">
                {message.message}
              </div>
            </div>
          ) : (
            <div
              key={message.id}
              className="flex flex-row-reverse w-fit bg-gray-400 rounded-lg p-4 text-white"
            >
              {message.message}
            </div>
          ),
        )}
      </div>
      {/* Input Area */}
      <div className="flex flex-row gap-2 w-full h-24 p-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 rounded-lg"
          type="text"
          placeholder="Talk with Gemini"
        />
        <button
          onClick={(e) => sendMessage(e)}
          className="bg-blue-400 text-white p-4 rounded-xl"
        >
          Send
        </button>
        <button
          onClick={clearMessage}
          className="bg-blue-400 text-white p-4 rounded-xl"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
