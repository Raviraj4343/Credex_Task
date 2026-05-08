import { randomBytes } from "crypto";

export const createPublicId = () => `audit_${randomBytes(4).toString("hex")}`;
