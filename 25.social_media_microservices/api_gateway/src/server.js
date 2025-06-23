require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const logger = require("./utils/logger");
const proxy = require("express-http-proxy");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

const redisClient = new Redis(process.env.REDIS_URL);

app.use(helmet());
app.use(cors());
app.use(express.json());

const rateLimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
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

app.use(rateLimitOptions);

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err, res, next) => {
    logger.error("Proxy error", err?.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err?.message,
    });
  },
};

// setting up proxy for our identity service.
app.use(
  "/v1/auth",
  proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Responsen Received from identity service: ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);


app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});