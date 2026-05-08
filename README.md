# SpendSight AI

SpendSight AI is a free audit tool for founders and engineering managers who want a second opinion on their team’s AI tooling spend. It takes in current plans, seat counts, and monthly cost, then returns a deterministic savings audit with a shareable result page and optional post-value lead capture.

Deployed URL: `Add your live URL before submission`

Screenshots / recording:
- `Add screenshot 1 or Loom link`
- `Add screenshot 2`
- `Add screenshot 3`

## Quick Start

1. Create `Backend/.env` from `Backend/.env.example`
2. Create `Frontend/.env.local` from `Frontend/.env.example`
3. Run `npm install` in `Backend/`
4. Run `npm install` in `Frontend/`
5. Start the backend with `npm run dev` in `Backend/`
6. Start the frontend with `npm run dev` in `Frontend/`

## Deploy

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas or another hosted MongoDB instance

## Decisions

1. Deterministic audit engine over AI-generated math
Reason: the brief explicitly values finance-defensible reasoning, so AI is used only for the summary paragraph.

2. No login before value delivery
Reason: the product is meant to work as a top-of-funnel lead generator, so adding auth would reduce completion rate.

3. MongoDB over relational storage
Reason: audits are document-shaped, nested, and append-only enough that a single report document is simple to persist and share safely.

4. Separate public share view from lead data
Reason: the viral loop only works if reports are easy to share, but the public URL must not leak email or company details.

5. Restrained UI over flashy SaaS styling
Reason: the target user is making a budget decision, so the interface should feel credible and practical rather than marketing-heavy.
