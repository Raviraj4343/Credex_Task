import { describe, expect, it } from "vitest";
import { auditEngine } from "../src/services/auditEngine";

describe("auditEngine", () => {
  it("finds high-confidence enterprise downgrade savings", () => {
    const result = auditEngine.runAudit({
      teamSize: 12,
      teamName: "Acme",
      tools: [
        {
          toolKey: "chatgpt",
          planKey: "enterprise",
          monthlySpend: 720,
          seats: 12,
          teamSize: 12,
          primaryUseCase: "Research and GTM drafting"
        }
      ]
    });

    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.recommendations.some((item) => item.recommendationType === "plan_downgrade")).toBe(true);
  });

  it("flags overlapping tools across the same category", () => {
    const result = auditEngine.runAudit({
      teamSize: 20,
      tools: [
        {
          toolKey: "chatgpt",
          planKey: "team",
          monthlySpend: 600,
          seats: 20,
          teamSize: 20,
          primaryUseCase: "Company-wide writing"
        },
        {
          toolKey: "claude",
          planKey: "team",
          monthlySpend: 600,
          seats: 20,
          teamSize: 20,
          primaryUseCase: "Analysis"
        },
        {
          toolKey: "gemini",
          planKey: "pro",
          monthlySpend: 450,
          seats: 15,
          teamSize: 20,
          primaryUseCase: "Workspace assistance"
        }
      ]
    });

    expect(result.recommendations.some((item) => item.recommendationType === "tool_consolidation")).toBe(true);
  });

  it("flags seat optimization when licenses materially exceed likely active usage", () => {
    const result = auditEngine.runAudit({
      teamSize: 20,
      tools: [
        {
          toolKey: "github-copilot",
          planKey: "business",
          monthlySpend: 380,
          seats: 8,
          teamSize: 20,
          primaryUseCase: "Coding"
        }
      ]
    });

    expect(result.recommendations.some((item) => item.recommendationType === "seat_optimization")).toBe(true);
  });

  it("returns no forced savings for a lean single-tool setup", () => {
    const result = auditEngine.runAudit({
      teamSize: 3,
      tools: [
        {
          toolKey: "chatgpt",
          planKey: "plus",
          monthlySpend: 60,
          seats: 3,
          teamSize: 3,
          primaryUseCase: "Research and writing"
        }
      ]
    });

    expect(result.monthlySavings).toBe(0);
    expect(result.recommendations).toHaveLength(0);
  });

  it("surfaces credit optimization for large non-api retail spend", () => {
    const result = auditEngine.runAudit({
      teamSize: 25,
      tools: [
        {
          toolKey: "cursor",
          planKey: "business",
          monthlySpend: 1000,
          seats: 25,
          teamSize: 25,
          primaryUseCase: "Coding"
        }
      ]
    });

    expect(result.recommendations.some((item) => item.recommendationType === "credit_optimization")).toBe(true);
  });
});
