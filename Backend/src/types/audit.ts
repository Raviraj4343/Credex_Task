export type ToolPlan = {
  key: string;
  name: string;
  monthlyPricePerSeat: number;
  category: "chat" | "dev" | "api";
};

export type ToolCatalogItem = {
  key: string;
  name: string;
  url: string;
  plans: ToolPlan[];
};

export type AuditToolInput = {
  toolKey: string;
  planKey: string;
  monthlySpend: number;
  seats: number;
  teamSize: number;
  primaryUseCase: string;
};

export type AuditInput = {
  teamSize: number;
  teamName?: string;
  tools: AuditToolInput[];
};

export type CreateAuditInput = AuditInput;

export type AuditRecommendationResult = {
  toolKey: string;
  title: string;
  reasoning: string;
  recommendationType: string;
  severity: "low" | "medium" | "high";
  currentCost: number;
  projectedCost: number;
  monthlySavings: number;
  annualSavings: number;
};

export type AuditCalculation = {
  totalMonthlySpend: number;
  totalProjectedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  toolEntries: Array<
    AuditToolInput & {
      toolName: string;
      planName: string;
      sourceUrl: string;
    }
  >;
  recommendations: AuditRecommendationResult[];
};
