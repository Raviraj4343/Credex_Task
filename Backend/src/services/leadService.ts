import { HttpError } from "../lib/httpError";
import { AuditReportModel } from "../models/AuditReport";
import { CreateLeadInput } from "../types/lead";

export const leadService = {
  async createLead(input: CreateLeadInput) {
    const report = await AuditReportModel.findOne({ publicId: input.publicId });

    if (!report) {
      throw new HttpError(404, "Audit report not found");
    }

    report.lead = {
      email: input.email,
      companyName: input.companyName,
      role: input.role,
      teamSize: input.teamSize
    };

    await report.save();

    return {
      id: report._id.toString(),
      email: report.lead.email,
      companyName: report.lead.companyName,
      role: report.lead.role,
      teamSize: report.lead.teamSize
    };
  }
};
