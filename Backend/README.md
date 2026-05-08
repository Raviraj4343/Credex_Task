# Backend

Express and TypeScript backend for AI Spend Audit.

## Features

- Deterministic rule-based spend audit engine
- Optional OpenAI summary generation with fallback summary
- MongoDB persistence with Mongoose
- Share-safe public audit retrieval
- Lead capture after value delivery
- Security middleware, input validation, rate limiting, and centralized errors

## Run

1. Copy `.env.example` to `.env`
2. Install dependencies with `npm install`
3. Ensure `MONGODB_URL` points to your database
4. Start development server with `npm run dev`
