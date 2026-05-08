import { ToolCatalogItem } from "@/types/audit";

export const TOOL_CATALOG: ToolCatalogItem[] = [
  {
    key: "chatgpt",
    name: "ChatGPT",
    plans: [
      { key: "plus", name: "Plus" },
      { key: "team", name: "Team" },
      { key: "enterprise", name: "Enterprise" },
      { key: "api-direct", name: "API Direct" }
    ]
  },
  {
    key: "claude",
    name: "Claude",
    plans: [
      { key: "free", name: "Free" },
      { key: "pro", name: "Pro" },
      { key: "max", name: "Max" },
      { key: "team", name: "Team" },
      { key: "enterprise", name: "Enterprise" },
      { key: "api-direct", name: "API Direct" }
    ]
  },
  {
    key: "cursor",
    name: "Cursor",
    plans: [
      { key: "hobby", name: "Hobby" },
      { key: "pro", name: "Pro" },
      { key: "business", name: "Business" },
      { key: "enterprise", name: "Enterprise" }
    ]
  },
  {
    key: "github-copilot",
    name: "GitHub Copilot",
    plans: [
      { key: "free", name: "Free" },
      { key: "individual", name: "Individual" },
      { key: "business", name: "Business" },
      { key: "enterprise", name: "Enterprise" }
    ]
  },
  {
    key: "gemini",
    name: "Gemini",
    plans: [
      { key: "pro", name: "Pro" },
      { key: "ultra", name: "Ultra" },
      { key: "api", name: "API" }
    ]
  },
  {
    key: "openai-api",
    name: "OpenAI API",
    plans: [{ key: "usage", name: "Usage-Based" }]
  },
  {
    key: "anthropic-api",
    name: "Anthropic API",
    plans: [{ key: "usage", name: "Usage-Based" }]
  },
  {
    key: "windsurf",
    name: "Windsurf",
    plans: [
      { key: "free", name: "Free" },
      { key: "pro", name: "Pro" },
      { key: "teams", name: "Teams" }
    ]
  },
];
