import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

/**
 * Initialize logger and Express app
 */
const logger = pino({ name: "server start" });
const app: Express = express();

/**
 * Trust reverse proxies for correct client IP detection
 */
app.set("trust proxy", true);

/**
 * Setup middlewares:
 * - Parse JSON and URL-encoded payloads
 * - Enable CORS and secure headers
 * - Apply rate limiting and log incoming requests
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);

/**
 * Define application routes
 */
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use(openAPIRouter); // Serve Swagger UI for API docs

/**
 * Global error handler
 */
app.use(errorHandler());

export { app, logger };