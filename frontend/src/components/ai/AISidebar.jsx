import { useState, useRef, useEffect } from "react";

import AIPrompt from "./AIPrompt";
import useAI from "../../hooks/useAI";

function AISidebar({ documentContent,onInsert, }) {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const aiMutation = useAI();
  const bottomRef = useRef(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isThinking]);
  const handleSend = (prompt) => {
  if (!prompt.trim()) return;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: prompt,
    },
  ]);

  setIsThinking(true);

  aiMutation.mutate(
    {
      prompt,
      content: documentContent,
    },
    {
      onSuccess: (data) => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.data,
          },
        ]);

        setIsThinking(false);
      },

      onError: () => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "❌ Failed to generate AI response.",
          },
        ]);

        setIsThinking(false);
      },
    }
  );
};

  return (
  <div
    className="
      h-[calc(100vh-120px)]
      bg-[#141b2d]
      border
      border-slate-700
      rounded-2xl
      shadow-xl
      flex
      flex-col
      overflow-hidden
    "
  >
    {/* Header */}

    <div
      className="
        px-6
        py-5
        border-b
        border-slate-700
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
      "
    >
      <h2 className="text-2xl font-bold text-white">
        ✨ AI Copilot
      </h2>

      <p className="text-blue-100 text-sm mt-1">
        Ask, summarize, improve or generate content.
      </p>
    </div>

    {/* Chat */}

    <div className="flex-1 overflow-y-auto p-5 space-y-5">

      {messages.length === 0 && (
        <div className="text-slate-400 text-center mt-20 leading-7">
          Ask questions about your document,
          improve writing,
          summarize content,
          or generate new ideas.
        </div>
      )}

      {messages.map((message, index) => (

        <div
          key={index}
          className={`flex ${
            message.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`max-w-[90%] rounded-2xl px-5 py-4 whitespace-pre-wrap break-words shadow ${
              message.role === "user"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-slate-800 text-slate-100"
            }`}
          >

            {message.content}

            {message.role === "assistant" && (

              <div className="flex gap-4 mt-4 text-sm">

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(message.content)
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  📋 Copy
                </button>

                <button
                  onClick={() =>
                    onInsert(message.content)
                  }
                  className="text-green-400 hover:text-green-300"
                >
                  ➕ Insert
                </button>

              </div>

            )}

          </div>

        </div>

      ))}

      {isThinking && (

        <div className="flex">

          <div className="bg-slate-800 rounded-2xl px-5 py-4">

            <div className="flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></div>

              <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce delay-100"></div>

              <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce delay-200"></div>

              <span className="ml-2 text-slate-300">
                AI is thinking...
              </span>

            </div>

          </div>

        </div>

      )}

      <div ref={bottomRef} />

    </div>

    {/* Prompt */}

    <div
      className="
        border-t
        border-slate-700
        bg-[#111827]
        p-4
      "
    >
      <AIPrompt
        onSend={handleSend}
        disabled={isThinking}
      />
    </div>

  </div>
);
}

export default AISidebar;