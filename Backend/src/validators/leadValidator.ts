import { z } from "zod";

export const createLeadInputSchema = z.object({
  publicId: z.string().min(3).max(64),
  email: z.string().email(),
  companyName: z.string().max(120).optional(),
  role: z.string().max(120).optional(),
  teamSize: z.coerce.number().int().min(1).max(5000).optional()
});
