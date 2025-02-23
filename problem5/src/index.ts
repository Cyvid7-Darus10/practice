import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";

/**
 * Start the server on the specified port.
 */
const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

/**
 * Gracefully shut down the server on termination signals.
 */
const onCloseSignal = () => {
  logger.info("SIGINT received, shutting down");
  server.close(() => {
    logger.info("Server closed");
    process.exit();
  });
  // Force shutdown if server doesn't close within 10 seconds.
  setTimeout(() => process.exit(1), 10000).unref();
};

// Listen for termination signals.
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
