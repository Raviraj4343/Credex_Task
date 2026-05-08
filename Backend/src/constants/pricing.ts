import { ToolCatalogItem } from "../types/audit";

export const TOOL_CATALOG: ToolCatalogItem[] = [
  {
    key: "chatgpt",
    name: "ChatGPT",
    url: "https://openai.com/chatgpt/pricing/",
    plans: [
      { key: "plus", name: "Plus", monthlyPricePerSeat: 20, category: "chat" },
      { key: "team", name: "Team", monthlyPricePerSeat: 30, category: "chat" },
      { key: "enterprise", name: "Enterprise", monthlyPricePerSeat: 0, category: "chat" },
      { key: "api-direct", name: "API Direct", monthlyPricePerSeat: 0, category: "api" }
    ]
  },
  {
    key: "claude",
    name: "Claude",
    url: "https://www.anthropic.com/pricing",
    plans: [
      { key: "free", name: "Free", monthlyPricePerSeat: 0, category: "chat" },
      { key: "pro", name: "Pro", monthlyPricePerSeat: 20, category: "chat" },
      { key: "max", name: "Max", monthlyPricePerSeat: 100, category: "chat" },
      { key: "team", name: "Team", monthlyPricePerSeat: 30, category: "chat" },
      { key: "enterprise", name: "Enterprise", monthlyPricePerSeat: 0, category: "chat" },
      { key: "api-direct", name: "API Direct", monthlyPricePerSeat: 0, category: "api" }
    ]
  },
  {
    key: "cursor",
    name: "Cursor",
    url: "https://www.cursor.com/pricing",
    plans: [
      { key: "hobby", name: "Hobby", monthlyPricePerSeat: 0, category: "dev" },
      { key: "pro", name: "Pro", monthlyPricePerSeat: 20, category: "dev" },
      { key: "business", name: "Business", monthlyPricePerSeat: 40, category: "dev" },
      { key: "enterprise", name: "Enterprise", monthlyPricePerSeat: 0, category: "dev" }
    ]
  },
  {
    key: "github-copilot",
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot/plans",
    plans: [
      { key: "free", name: "Free", monthlyPricePerSeat: 0, category: "dev" },
      { key: "individual", name: "Individual", monthlyPricePerSeat: 10, category: "dev" },
      { key: "business", name: "Business", monthlyPricePerSeat: 19, category: "dev" },
      { key: "enterprise", name: "Enterprise", monthlyPricePerSeat: 39, category: "dev" }
    ]
  },
  {
    key: "gemini",
    name: "Gemini",
    url: "https://one.google.com/about/plans",
    plans: [
      { key: "pro", name: "Pro", monthlyPricePerSeat: 20, category: "chat" },
      { key: "ultra", name: "Ultra", monthlyPricePerSeat: 250, category: "chat" },
      { key: "api", name: "API", monthlyPricePerSeat: 0, category: "api" }
    ]
  },
  {
    key: "openai-api",
    name: "OpenAI API",
    url: "https://openai.com/api/pricing/",
    plans: [
      { key: "usage", name: "Usage-Based", monthlyPricePerSeat: 0, category: "api" }
    ]
  },
  {
    key: "anthropic-api",
    name: "Anthropic API",
    url: "https://docs.anthropic.com/en/docs/about-claude/pricing",
    plans: [
      { key: "usage", name: "Usage-Based", monthlyPricePerSeat: 0, category: "api" }
    ]
  },
  {
    key: "windsurf",
    name: "Windsurf",
    url: "https://windsurf.com/pricing",
    plans: [
      { key: "free", name: "Free", monthlyPricePerSeat: 0, category: "dev" },
      { key: "pro", name: "Pro", monthlyPricePerSeat: 20, category: "dev" },
      { key: "teams", name: "Teams", monthlyPricePerSeat: 40, category: "dev" }
    ]
  }
];

export const PLAN_BENCHMARKS = {
  enterpriseTeamThreshold: 50,
  heavyUsageSeatRatioThreshold: 0.8,
  lowUsageSeatRatioThreshold: 0.55,
  apiCommitThreshold: 800,
  duplicateCategoryPenaltyThreshold: 2
} as const;
