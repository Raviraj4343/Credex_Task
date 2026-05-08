import slugify from "slugify";
import { TOOL_CATALOG } from "../constants/pricing";
import { HttpError } from "../lib/httpError";
import { AuditReportDocument, AuditReportModel } from "../models/AuditReport";
import { AuditRecommendationResult, CreateAuditInput } from "../types/audit";
import { createPublicId } from "../utils/id";
import { auditEngine } from "./auditEngine";
import { summaryService } from "./summaryService";

export const auditService = {
  async createAudit(input: CreateAuditInput) {
    const calculation = auditEngine.runAudit(input);
    const { summary, usedFallback } = await summaryService.generateSummary({
      input,
      calculation
    });

    const publicId = createPublicId();
    const slug = slugify(`${publicId}-${input.teamName || "startup-audit"}`, {
      lower: true,
      strict: true
    });

    const report = await AuditReportModel.create({
      publicId,
      slug,
      summary,
      fallbackSummaryUsed: usedFallback,
      totalMonthlySpend: calculation.totalMonthlySpend,
      totalProjectedSpend: calculation.totalProjectedSpend,
      monthlySavings: calculation.monthlySavings,
      annualSavings: calculation.annualSavings,
      teamSize: input.teamSize,
      entries: calculation.toolEntries.map((entry) => ({
        toolKey: entry.toolKey,
        toolName: entry.toolName,
        planKey: entry.planKey,
        planName: entry.planName,
        monthlySpend: entry.monthlySpend,
        seats: entry.seats,
        primaryUseCase: entry.primaryUseCase
      })),
      recommendations: calculation.recommendations.map((recommendation) => ({
        toolKey: recommendation.toolKey,
        title: recommendation.title,
        reasoning: recommendation.reasoning,
        recommendationType: recommendation.recommendationType,
        severity: recommendation.severity,
        currentCost: recommendation.currentCost,
        projectedCost: recommendation.projectedCost,
        monthlySavings: recommendation.monthlySavings,
        annualSavings: recommendation.annualSavings
      }))
    });

    return {
      id: report._id.toString(),
      publicId: report.publicId,
      slug: report.slug,
      summary: report.summary,
      fallbackSummaryUsed: report.fallbackSummaryUsed,
      totalMonthlySpend: report.totalMonthlySpend,
      totalProjectedSpend: report.totalProjectedSpend,
      monthlySavings: report.monthlySavings,
      annualSavings: report.annualSavings,
      teamSize: report.teamSize,
      entries: report.entries.map((entry: {
        toolKey: string;
        toolName: string;
        planKey: string;
        planName: string;
        monthlySpend: number;
        seats: number;
        primaryUseCase: string;
      }) => ({
        ...entry,
        sourceUrl: TOOL_CATALOG.find((tool) => tool.key === entry.toolKey)?.url ?? ""
      })),
      recommendations: report.recommendations,
      shareUrl: `${process.env.FRONTEND_BASE_URL ?? "http://localhost:3000"}/share/${report.slug}`
    };
  },

  async getPublicAuditBySlug(slug: string) {
    const report = await AuditReportModel.findOne({ slug }).lean<AuditReportDocument | null>();

    if (!report) {
      throw new HttpError(404, "Audit report not found");
    }

    return {
      publicId: report.publicId,
      slug: report.slug,
      summary: report.summary,
      fallbackSummaryUsed: report.fallbackSummaryUsed,
      totalMonthlySpend: report.totalMonthlySpend,
      totalProjectedSpend: report.totalProjectedSpend,
      monthlySavings: report.monthlySavings,
      annualSavings: report.annualSavings,
      teamSize: report.teamSize,
      createdAt: report.createdAt,
      entries: report.entries.map((entry: {
        toolKey: string;
        toolName: string;
        planName: string;
        monthlySpend: number;
        seats: number;
        primaryUseCase: string;
      }) => ({
        toolKey: entry.toolKey,
        toolName: entry.toolName,
        planName: entry.planName,
        monthlySpend: entry.monthlySpend,
        seats: entry.seats,
        primaryUseCase: entry.primaryUseCase,
        sourceUrl: TOOL_CATALOG.find((tool) => tool.key === entry.toolKey)?.url ?? ""
      })),
      recommendations: report.recommendations.map((recommendation: {
        toolKey: string;
        title: string;
        reasoning: string;
        severity: string;
        monthlySavings: number;
        annualSavings: number;
        currentCost: number;
        projectedCost: number;
      }) => ({
        toolKey: recommendation.toolKey,
        title: recommendation.title,
        reasoning: recommendation.reasoning,
        severity: recommendation.severity as AuditRecommendationResult["severity"],
        monthlySavings: recommendation.monthlySavings,
        annualSavings: recommendation.annualSavings,
        currentCost: recommendation.currentCost,
        projectedCost: recommendation.projectedCost
      }))
    };
  }
};
