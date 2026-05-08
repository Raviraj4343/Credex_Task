import { Request, Response } from "express";

export const healthController = {
  getHealth: (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      service: "ai-spend-audit-backend",
      timestamp: new Date().toISOString()
    });
  }
};
