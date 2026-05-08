import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-ink text-white shadow-soft hover:bg-ocean",
        variant === "secondary" &&
          "bg-white text-ink ring-1 ring-ink/10 hover:bg-sand/30",
        variant === "ghost" && "bg-transparent text-ink hover:bg-ink/5",
        className
      )}
      {...props}
    />
  );
}
