const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (
  instruction,
  documentContent
) => {
  const prompt = `
You are an AI writing assistant.

Instruction:
${instruction}

Document:
${documentContent}

Return only the requested result.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
  
  return response.text;
};

module.exports = {
  generateResponse,
};