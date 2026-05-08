import { Request, Response, NextFunction } from "express";
import { auditService } from "../services/auditService";
import { createAuditInputSchema } from "../validators/auditValidator";

export const auditController = {
  createAudit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createAuditInputSchema.parse(req.body);
      const report = await auditService.createAudit(payload);
      res.status(201).json({ data: report });
    } catch (error) {
      next(error);
    }
  },
  getPublicAudit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await auditService.getPublicAuditBySlug(req.params.slug);
      res.json({ data: report });
    } catch (error) {
      next(error);
    }
  }
};
