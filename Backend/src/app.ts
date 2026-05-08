import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { rateLimiter } from "./middlewares/rateLimiter";
import { sanitizeBody } from "./middlewares/sanitizeBody";
import { router } from "./routes";

export const createApp = () => {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" }
    })
  );
  app.use(
    cors({
      origin: env.APP_ORIGIN.split(",").map((origin) => origin.trim()),
      credentials: false
    })
  );
  app.use(rateLimiter);
  app.use(express.json({ limit: "500kb" }));
  app.use(sanitizeBody);
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

  app.use("/api", router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
