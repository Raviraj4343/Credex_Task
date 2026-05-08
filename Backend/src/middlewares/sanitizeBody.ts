import { NextFunction, Request, Response } from "express";

const sanitizeValue = (value: unknown): unknown => {
  if (typeof value === "string") {
    return value.replace(/[<>]/g, "").trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>(
      (accumulator, [key, nestedValue]) => {
        accumulator[key] = sanitizeValue(nestedValue);
        return accumulator;
      },
      {}
    );
  }

  return value;
};

export const sanitizeBody = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }
  next();
};
