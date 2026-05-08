import OpenAI from "openai";
import { env } from "../config/env";
import { AuditCalculation, CreateAuditInput } from "../types/audit";
import { formatCurrency } from "../utils/currency";
import { logger } from "../utils/logger";

const client =
  env.LLM_PROVIDER === "groq" && env.GROQ_API_KEY
    ? new OpenAI({
        apiKey: env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1"
      })
    : env.LLM_PROVIDER === "openai" && env.OPENAI_API_KEY
      ? new OpenAI({ apiKey: env.OPENAI_API_KEY })
      : null;

const activeModel = env.LLM_PROVIDER === "groq" ? env.GROQ_MODEL : env.OPENAI_MODEL;

const createFallbackSummary = (input: CreateAuditInput, calculation: AuditCalculation) => {
  const topRecommendation = calculation.recommendations[0];

  return `Your team of ${input.teamSize} is currently spending ${formatCurrency(
    calculation.totalMonthlySpend
  )} per month across AI tooling. Our rule-based audit found realistic savings of ${formatCurrency(
    calculation.monthlySavings
  )} monthly, or ${formatCurrency(
    calculation.annualSavings
  )} annually, by reducing overlap, right-sizing seats, and downgrading plans that appear richer than your current usage. ${
    topRecommendation
      ? `The biggest immediate opportunity is ${topRecommendation.title.toLowerCase()}, which alone could save ${formatCurrency(
          topRecommendation.monthlySavings
        )} each month.`
      : "Your current stack is fairly lean, so the best next step is to monitor usage and prevent duplicate subscriptions."
  }`;
};

export const summaryService = {
  async generateSummary({
    input,
    calculation
  }: {
    input: CreateAuditInput;
    calculation: AuditCalculation;
  }) {
    const fallbackSummary = createFallbackSummary(input, calculation);

    if (!client || calculation.recommendations.length === 0) {
      return {
        summary: fallbackSummary,
        usedFallback: true
      };
    }

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const completion = await client.responses.create({
          model: activeModel,
          temperature: 0.4,
          max_output_tokens: 180,
          input: [
            {
              role: "system",
              content:
                "Write a crisp, founder-friendly 100-word audit summary. Be transparent, financially grounded, and avoid hype."
            },
            {
              role: "user",
              content: JSON.stringify({
                teamSize: input.teamSize,
                totalMonthlySpend: calculation.totalMonthlySpend,
                monthlySavings: calculation.monthlySavings,
                annualSavings: calculation.annualSavings,
                tools: input.tools,
                recommendations: calculation.recommendations.slice(0, 4)
              })
            }
          ]
        });

        const summary = completion.output_text?.trim();

        if (summary) {
          return {
            summary,
            usedFallback: false
          };
        }
      } catch (error) {
        logger.warn(`LLM summary generation attempt ${attempt} failed.`);
        logger.error(error);
      }

      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
      }
    }

    logger.warn("LLM summary generation failed, using fallback summary.");
    return {
      summary: fallbackSummary,
      usedFallback: true
    };
  }
};
