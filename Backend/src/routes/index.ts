import { Router } from "express";
import { auditRoutes } from "./auditRoutes";
import { healthRoutes } from "./healthRoutes";
import { leadRoutes } from "./leadRoutes";

export const router = Router();

router.use("/health", healthRoutes);
router.use("/audit", auditRoutes);
router.use("/lead", leadRoutes);
