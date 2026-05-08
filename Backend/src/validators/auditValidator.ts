import { z } from "zod";
import { TOOL_CATALOG } from "../constants/pricing";

const toolKeys = TOOL_CATALOG.map((tool) => tool.key) as [string, ...string[]];

export const createAuditInputSchema = z.object({
  teamSize: z.coerce.number().int().min(1).max(5000),
  teamName: z.string().max(80).optional(),
  tools: z
    .array(
      z.object({
        toolKey: z.enum(toolKeys),
        planKey: z.string().min(1).max(50),
        monthlySpend: z.coerce.number().min(0).max(1000000),
        seats: z.coerce.number().int().min(1).max(100000),
        teamSize: z.coerce.number().int().min(1).max(5000),
        primaryUseCase: z.string().min(2).max(120)
      })
    )
    .min(1)
    .max(20)
}).superRefine((input, ctx) => {
  input.tools.forEach((tool, index) => {
    const catalogTool = TOOL_CATALOG.find((item) => item.key === tool.toolKey);
    const planExists = catalogTool?.plans.some((plan) => plan.key === tool.planKey);

    if (!planExists) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selected plan does not match the selected tool",
        path: ["tools", index, "planKey"]
      });
    }
  });
});
