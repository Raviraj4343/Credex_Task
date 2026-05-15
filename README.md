# SpendSight AI

SpendSight AI is a free audit tool for founders and engineering managers who want a second opinion on their team’s AI tooling spend. It accepts current plans, seat counts, and monthly cost, then returns a deterministic savings audit with a shareable result page and optional post-value lead capture.

## Overview

This project is designed to help teams understand where their AI spend is going, what can be reduced, and how much money they could save without making the experience feel gated or overly sales-driven.

## Quick Start

1. Copy `Backend/.env.example` to `Backend/.env`
2. Copy `Frontend/.env.example` to `Frontend/.env.local`
3. Run `npm install` in `Backend/`
4. Run `npm install` in `Frontend/`
5. Start the backend with `npm run dev` in `Backend/`
6. Start the frontend with `npm run dev` in `Frontend/`

## Deploy

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas or another hosted MongoDB instance

## Deliverables

- Deterministic audit engine for finance-friendly reasoning
- Shareable public result pages
- Optional lead capture after the audit is shown
- Restrained UI that feels credible rather than promotional

## Key Decisions

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

## Submission Notes

- Deployed URL: Add your live URL before submission
- Screenshots / recording:
	- Add screenshot 1 or Loom link
	- Add screenshot 2
	- Add screenshot 3
