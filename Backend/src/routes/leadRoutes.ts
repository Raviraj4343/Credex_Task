import { Router } from "express";
import { leadController } from "../controllers/leadController";

export const leadRoutes = Router();

leadRoutes.post("/", leadController.createLead);
