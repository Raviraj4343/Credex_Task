type LogLevel = "info" | "warn" | "error";

const log = (level: LogLevel, message: unknown, meta?: unknown) => {
  const payload = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString()
  };

  const serialized = JSON.stringify(payload);

  if (level === "error") {
    console.error(serialized);
    return;
  }

  console.log(serialized);
};

export const logger = {
  info: (message: unknown, meta?: unknown) => log("info", message, meta),
  warn: (message: unknown, meta?: unknown) => log("warn", message, meta),
  error: (message: unknown, meta?: unknown) => log("error", message, meta)
};
