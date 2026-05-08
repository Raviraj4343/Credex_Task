import { Request, Response, NextFunction } from "express";
import { leadService } from "../services/leadService";
import { createLeadInputSchema } from "../validators/leadValidator";

export const leadController = {
  createLead: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createLeadInputSchema.parse(req.body);
      const lead = await leadService.createLead(payload);
      res.status(201).json({ data: lead });
    } catch (error) {
      next(error);
    }
  }
};
