const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/error.middleware");
const workspaceRoutes = require("./routes/workspace.routes");
const documentRoutes = require("./routes/document.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express(); 

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to CollabSpace AI API",
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(errorHandler);
module.exports = app;