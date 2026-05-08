import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_ORIGIN: z.string().default("http://localhost:3000"),
  MONGODB_URL: z.string().min(1, "MONGODB_URL is required"),
  LLM_PROVIDER: z.enum(["openai", "groq"]).default("openai"),
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL: z.string().default("llama-3.1-8b-instant"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini"),
  FRONTEND_BASE_URL: z.string().default("http://localhost:3000")
});

export const env = envSchema.parse(process.env);
