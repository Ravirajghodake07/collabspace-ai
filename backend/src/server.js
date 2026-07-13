require("dotenv").config();

const http = require("http");

const app = require("./app");
const { initializeSocket } = require("./socket/socket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);
console.log("JWT_EXPIRES_IN:", JSON.stringify(process.env.JWT_EXPIRES_IN));
console.log("Type:", typeof process.env.JWT_EXPIRES_IN);
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const jwt = require("jsonwebtoken");

try {
  const token = jwt.sign(
    { id: "123" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  console.log("JWT test passed:", token);
} catch (err) {
  console.error("JWT test failed:", err);
}