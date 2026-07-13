import api from "../lib/axios";

export const generateAIResponse = async ({
  prompt,
  content,
}) => {
  const response = await api.post("/ai/generate", {
    prompt,
    content,
  });

  return response.data;
};