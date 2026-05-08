# Pricing Sources

The deterministic audit engine uses baseline public pricing references from official vendor pages. These values are stored in `src/constants/pricing.ts` and should be reviewed before production launch or whenever vendors update pricing.

- ChatGPT: https://openai.com/chatgpt/pricing/
- OpenAI API: https://openai.com/api/pricing/
- Claude: https://www.anthropic.com/pricing
- Anthropic API: https://docs.anthropic.com/en/docs/about-claude/pricing
- Cursor: https://www.cursor.com/pricing
- GitHub Copilot: https://github.com/features/copilot/plans
- Gemini: https://one.google.com/about/plans
- Windsurf: https://windsurf.com/pricing
- v0: https://v0.dev/pricing

The application keeps recommendation logic transparent by surfacing these source URLs in the report output.
