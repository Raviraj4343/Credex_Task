# Architecture Overview

## Frontend

- `app/`: App Router pages for landing, audit results, and public share pages
- `components/`: Reusable UI, marketing, and audit-specific components
- `store/`: Zustand store with persisted form state
- `lib/`: API client, shared formatting helpers, and tool catalog metadata

## Backend

- `src/controllers/`: Thin request handlers
- `src/routes/`: Route registration
- `src/services/`: Business logic, audit engine, lead persistence, summary generation
- `src/middlewares/`: Rate limiting, body sanitization, centralized errors
- `src/validators/`: Zod schemas and request validation
- `src/models/`: MongoDB document models
- `tests/`: Audit engine regression tests

## Audit Philosophy

- Savings logic is deterministic and explainable
- Pricing references are linked back to official sources
- AI is used only for the narrative summary layer
- Public share pages never expose lead capture data
