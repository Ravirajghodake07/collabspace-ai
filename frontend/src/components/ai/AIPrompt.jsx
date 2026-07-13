import { useState } from "react";

function AIPrompt({ onSend,disabled, }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    onSend(prompt);

    setPrompt("");
  };

  return (
    <div>

      <textarea
        disabled={disabled}
        rows={2}
        value={prompt}
        placeholder="Ask AI anything..."
        onChange={(e) =>
          setPrompt(e.target.value)
        }
        className="w-full border rounded-lg p-3 resize-none outline-none"
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <button
        disabled={disabled}
        onClick={handleSubmit}
        // className="mt-3 w-full bg-black text-white rounded-lg py-3 hover:bg-gray-900"
        className={`mt-3 w-full rounded-lg py-3 text-white transition ${
        disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-900"
        }`}
      >
        Send
      </button>

    </div>
  );
}

export default AIPrompt;