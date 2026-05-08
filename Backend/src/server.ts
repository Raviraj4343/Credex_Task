import { createApp } from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const app = createApp();

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`Backend listening on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  logger.error("Failed to start backend", error);
  process.exit(1);
});
