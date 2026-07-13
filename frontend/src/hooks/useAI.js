import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { generateAIResponse } from "../services/ai.service";

const useAI = () => {
  return useMutation({
    mutationFn: generateAIResponse,

    onSuccess: () => {
      toast.success("AI response generated!");
    },

    onError: () => {
      toast.error("Failed to generate AI response.");
    },
  });
};

export default useAI;