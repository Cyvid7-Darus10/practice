import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

/**
 * Validate and clean environment variables.
 * Additional variables are provided for database connectivity.
 */
export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  
  // Database configuration for data persistence
  DB_HOST: host({ devDefault: testOnly("localhost") }),
  DB_PORT: port({ devDefault: testOnly(5432) }),
  DB_USER: str({ devDefault: testOnly("user") }),
  DB_PASSWORD: str({ devDefault: testOnly("password") }),
  DB_NAME: str({ devDefault: testOnly("crude_server") }),
});