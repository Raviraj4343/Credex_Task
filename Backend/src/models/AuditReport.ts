import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const auditToolEntrySchema = new Schema(
  {
    toolKey: { type: String, required: true },
    toolName: { type: String, required: true },
    planKey: { type: String, required: true },
    planName: { type: String, required: true },
    monthlySpend: { type: Number, required: true },
    seats: { type: Number, required: true },
    primaryUseCase: { type: String, required: true }
  },
  { _id: false }
);

const auditRecommendationSchema = new Schema(
  {
    toolKey: { type: String, required: true },
    title: { type: String, required: true },
    reasoning: { type: String, required: true },
    recommendationType: { type: String, required: true },
    severity: { type: String, required: true },
    currentCost: { type: Number, required: true },
    projectedCost: { type: Number, required: true },
    monthlySavings: { type: Number, required: true },
    annualSavings: { type: Number, required: true }
  },
  { _id: false }
);

const leadCaptureSchema = new Schema(
  {
    email: { type: String, required: true },
    companyName: { type: String },
    role: { type: String },
    teamSize: { type: Number }
  },
  { _id: false }
);

const auditReportSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    fallbackSummaryUsed: { type: Boolean, default: false },
    totalMonthlySpend: { type: Number, required: true },
    totalProjectedSpend: { type: Number, required: true },
    monthlySavings: { type: Number, required: true },
    annualSavings: { type: Number, required: true },
    teamSize: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    entries: { type: [auditToolEntrySchema], default: [] },
    recommendations: { type: [auditRecommendationSchema], default: [] },
    lead: { type: leadCaptureSchema, default: null }
  },
  {
    timestamps: true
  }
);

export type AuditReportDocument = InferSchemaType<typeof auditReportSchema>;

export const AuditReportModel: Model<AuditReportDocument> =
  (models.AuditReport as Model<AuditReportDocument> | undefined) ||
  model<AuditReportDocument>("AuditReport", auditReportSchema);
