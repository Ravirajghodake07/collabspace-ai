require("dotenv").config();

const http = require("http");

const app = require("./app");
const { initializeSocket } = require("./socket/socket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});