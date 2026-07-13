const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  console.log("Creating token for:", userId);

  try {
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("Token created successfully");
    return token;
  } catch (err) {
    console.error("JWT SIGN ERROR:", err);
    throw err;
  }
};

module.exports = generateToken;