import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

export function Field({ label, className, children }: FieldProps) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium text-ink/90", className)}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export function fieldInputClassName(className?: string) {
  return cn(
    "w-full rounded-xl border border-ink/10 bg-white px-3 py-2.5 text-sm text-ink shadow-sm transition-colors placeholder:text-ink/35 focus:border-ink/20",
    className
  );
}
