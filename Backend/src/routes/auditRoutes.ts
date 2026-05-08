import { Router } from "express";
import { auditController } from "../controllers/auditController";

export const auditRoutes = Router();

auditRoutes.post("/", auditController.createAudit);
auditRoutes.get("/public/:slug", auditController.getPublicAudit);
