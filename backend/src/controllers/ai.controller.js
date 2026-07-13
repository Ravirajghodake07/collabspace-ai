const aiService = require("../ai/ai.service");
const ApiResponse = require("../utils/ApiResponse");

const generateAIResponse = async (req, res, next) => {
  try {
    const { prompt, content } = req.body;

    const response = await aiService.generateResponse(
      prompt,
      content
    );

    return res.status(200).json(
      new ApiResponse(
        true,
        "AI response generated successfully",
        response
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateAIResponse,
};