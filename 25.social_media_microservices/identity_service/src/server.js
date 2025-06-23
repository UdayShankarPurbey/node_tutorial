require("dotenv").configDotenv();
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const { Redis } = require("ioredis");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const identityRouter = require("./routes/identity-service");
const errorHandler = require("./middlewares/errorHandler");
const { clearLogFiles } = require("./utils/clearLog");

const app = express();
const port = process.env.PORT || 3001;

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

// ddos protection and rate limiter
const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 10,
  duration: 1,
});

app.use((req, res, next) => {
  limiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      logger.warn("Rate limit exceeded");
      res.status(429).json({
        success: false,
        message: "Rate limit exceeded",
      });
    });
});

const sensetiveEndPointLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  handler: (req, res) => {
    logger.warn("Sensetive endpoint rate limit exceeded for IP", req.ip);
    res.status(429).json({
      success: false,
      message: "Rate limit exceeded",
    });
  },
  // Redis store configuration
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

// applying `sensetiveEndPointLimiter` to a specific route
app.use("/api/auth/register", sensetiveEndPointLimiter);

// routes
app.use("/api/auth", identityRouter);

//error handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Identity service is running on port ${port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});
