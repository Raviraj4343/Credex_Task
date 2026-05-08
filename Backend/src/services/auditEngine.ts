import { PLAN_BENCHMARKS, TOOL_CATALOG } from "../constants/pricing";
import {
  AuditCalculation,
  AuditInput,
  AuditRecommendationResult,
  ToolCatalogItem
} from "../types/audit";
import { formatCurrency } from "../utils/currency";

const getTool = (toolKey: string) => TOOL_CATALOG.find((tool) => tool.key === toolKey);

const getPlan = (catalogTool: ToolCatalogItem, planKey: string) =>
  catalogTool.plans.find((plan) => plan.key === planKey);

const buildRecommendation = (
  toolKey: string,
  title: string,
  reasoning: string,
  currentCost: number,
  projectedCost: number,
  recommendationType: string,
  severity: "low" | "medium" | "high"
): AuditRecommendationResult => ({
  toolKey,
  title,
  reasoning,
  currentCost,
  projectedCost,
  monthlySavings: Math.max(0, currentCost - projectedCost),
  annualSavings: Math.max(0, currentCost - projectedCost) * 12,
  recommendationType,
  severity
});

export const auditEngine = {
  runAudit(input: AuditInput): AuditCalculation {
    const totalMonthlySpend = input.tools.reduce((total, item) => total + item.monthlySpend, 0);
    const recommendations: AuditRecommendationResult[] = [];
    const toolEntries = input.tools.map((item) => {
      const catalogTool = getTool(item.toolKey);
      if (!catalogTool) {
        throw new Error(`Unknown tool key: ${item.toolKey}`);
      }

      const plan = getPlan(catalogTool, item.planKey);
      if (!plan) {
        throw new Error(`Unknown plan key: ${item.planKey}`);
      }

      const normalizedSeatCost = plan.monthlyPricePerSeat * item.seats;
      const seatsUsageRatio = item.seats / Math.max(item.teamSize, 1);

      if (
        item.planKey === "enterprise" &&
        item.teamSize < PLAN_BENCHMARKS.enterpriseTeamThreshold
      ) {
        const fallbackPlan =
          catalogTool.plans.find((candidate) => candidate.key === "team") ??
          catalogTool.plans.find((candidate) => candidate.key === "teams") ??
          catalogTool.plans.find((candidate) => candidate.key === "business") ??
          catalogTool.plans.find((candidate) => candidate.key === "premium") ??
          catalogTool.plans.find((candidate) => candidate.key === "pro");

        if (fallbackPlan) {
          recommendations.push(
            buildRecommendation(
              item.toolKey,
              `Downgrade ${catalogTool.name} from ${plan.name}`,
              `${catalogTool.name} ${plan.name} usually only pays off at larger seat counts or when advanced admin controls are heavily used. With ${item.teamSize} team members, ${fallbackPlan.name} is the more financially realistic baseline.`,
              item.monthlySpend,
              fallbackPlan.monthlyPricePerSeat * item.seats,
              "plan_downgrade",
              "high"
            )
          );
        }
      }

      if (seatsUsageRatio < PLAN_BENCHMARKS.lowUsageSeatRatioThreshold && item.seats > 3) {
        const optimizedSeats = Math.max(1, Math.ceil(item.teamSize * 0.65));
        const projectedCost = optimizedSeats * plan.monthlyPricePerSeat;

        recommendations.push(
          buildRecommendation(
            item.toolKey,
            `Reduce unused ${catalogTool.name} seats`,
            `You are paying for ${item.seats} seats across a ${item.teamSize}-person team. That suggests licenses are allocated more broadly than active usage requires. Tightening to about ${optimizedSeats} active seats preserves access while reducing waste.`,
            item.monthlySpend,
            projectedCost,
            "seat_optimization",
            "medium"
          )
        );
      }

      if (
        plan.category === "chat" &&
        normalizedSeatCost > 0 &&
        item.monthlySpend > normalizedSeatCost * 1.2
      ) {
        recommendations.push(
          buildRecommendation(
            item.toolKey,
            `Normalize ${catalogTool.name} spend`,
            `Your reported spend is materially above the standard per-seat baseline for ${plan.name}. This often indicates duplicate workspaces, unmanaged add-ons, or reimbursed personal subscriptions that should be consolidated.`,
            item.monthlySpend,
            normalizedSeatCost,
            "spend_normalization",
            "medium"
          )
        );
      }

      if (item.monthlySpend >= 500 && plan.category !== "api") {
        recommendations.push(
            buildRecommendation(
              item.toolKey,
              `Review discounted purchasing options for ${catalogTool.name}`,
              `At ${formatCurrency(item.monthlySpend)} per month, this line item is large enough to justify checking whether credits or negotiated purchasing would reduce effective cost without changing workflows.`,
              item.monthlySpend,
              item.monthlySpend * 0.9,
              "credit_optimization",
            "low"
          )
        );
      }

      return {
        ...item,
        toolName: catalogTool.name,
        planName: plan.name,
        sourceUrl: catalogTool.url
      };
    });

    const categoryGroups = toolEntries.reduce<Record<string, typeof toolEntries>>((accumulator, item) => {
      const category = getPlan(getTool(item.toolKey)!, item.planKey)!.category;
      accumulator[category] = accumulator[category] ? [...accumulator[category], item] : [item];
      return accumulator;
    }, {});

    Object.entries(categoryGroups).forEach(([category, items]) => {
      if (items.length > PLAN_BENCHMARKS.duplicateCategoryPenaltyThreshold) {
        const sorted = [...items].sort((left, right) => right.monthlySpend - left.monthlySpend);
        const secondary = sorted[1];

        if (secondary) {
          recommendations.push(
            buildRecommendation(
              secondary.toolKey,
              `Consolidate overlapping ${category} tooling`,
              `Your stack includes ${items.length} tools serving similar ${category} workflows. Startups usually capture more value by standardizing on one primary platform and reducing overlap. ${secondary.toolName} looks like the clearest candidate to consolidate.`,
              secondary.monthlySpend,
              secondary.monthlySpend * 0.35,
              "tool_consolidation",
              "medium"
            )
          );
        }
      }
    });

    const dedupedRecommendations = recommendations
      .filter((recommendation) => recommendation.monthlySavings > 0)
      .sort((left, right) => right.monthlySavings - left.monthlySavings)
      .filter(
        (recommendation, index, all) =>
          index ===
          all.findIndex(
            (candidate) =>
              candidate.toolKey === recommendation.toolKey &&
              candidate.recommendationType === recommendation.recommendationType
          )
      );

    const totalProjectedSpend = Math.max(
      totalMonthlySpend -
        dedupedRecommendations.reduce((total, recommendation) => total + recommendation.monthlySavings, 0),
      0
    );
    const monthlySavings = totalMonthlySpend - totalProjectedSpend;
    const annualSavings = monthlySavings * 12;

    return {
      totalMonthlySpend,
      totalProjectedSpend,
      monthlySavings,
      annualSavings,
      recommendations: dedupedRecommendations,
      toolEntries
    };
  }
};
