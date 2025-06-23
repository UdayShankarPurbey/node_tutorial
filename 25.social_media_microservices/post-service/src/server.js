require("dotenv").configDotenv();
const express = require("express");
const mongoose = require("mongoose");
const { Redis } = require("ioredis");
const logger = require("./utils/logger");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const postRouter = require("./routes/post");
const { clearLogFiles } = require("./utils/clearLog");

const app = express();
const port = process.env.PORT || 3002;

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("MongoDB connection failed", err));

//connect to redis
const redisClient = new Redis(process.env.REDIS_URL);

clearLogFiles(); // Clear logs at app startup

//middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

// *** HomeWork -  Implement Ip Based Rate Limiting ***

// routes
app.use(
  "/api/posts",
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  postRouter
);

//error handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Post service is running on port ${port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});
