export type ToolCatalogItem = {
  key: string;
  name: string;
  plans: Array<{
    key: string;
    name: string;
  }>;
};

export type AuditToolFormValue = {
  toolKey: string;
  planKey: string;
  monthlySpend: number;
  seats: number;
  primaryUseCase: string;
};

export type AuditFormValues = {
  teamName: string;
  teamSize: number;
  tools: AuditToolFormValue[];
};

export type AuditRecommendation = {
  toolKey: string;
  title: string;
  reasoning: string;
  severity: "low" | "medium" | "high";
  currentCost: number;
  projectedCost: number;
  monthlySavings: number;
  annualSavings: number;
};

export type AuditEntry = {
  toolKey: string;
  toolName: string;
  planName: string;
  monthlySpend: number;
  seats: number;
  primaryUseCase: string;
  sourceUrl: string;
};

export type AuditReport = {
  id?: string;
  publicId: string;
  slug: string;
  summary: string;
  fallbackSummaryUsed: boolean;
  totalMonthlySpend: number;
  totalProjectedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  teamSize: number;
  entries: AuditEntry[];
  recommendations: AuditRecommendation[];
  shareUrl?: string;
  createdAt?: string;
};

export type LeadCaptureValues = {
  publicId: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
};
