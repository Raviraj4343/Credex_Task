"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { TOOL_CATALOG } from "@/lib/catalog";
import { api } from "@/lib/api";
import { useAuditStore } from "@/store/audit-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, fieldInputClassName } from "@/components/ui/form-field";

type ToolFormValue = {
  toolKey: string;
  planKey: string;
  monthlySpend: number;
  seats: number;
  primaryUseCase: string;
};

type ToolRowProps = {
  index: number;
  tool: ToolFormValue;
  canRemove: boolean;
  onChange: (index: number, field: string, value: string | number) => void;
  onRemove: (index: number) => void;
};

function ToolRow({ index, tool, canRemove, onChange, onRemove }: ToolRowProps) {
  const selectedTool = TOOL_CATALOG.find((item) => item.key === tool.toolKey) ?? TOOL_CATALOG[0];

  return (
    <Card className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <Field label="Tool">
        <select
          className={fieldInputClassName()}
          value={tool.toolKey}
          onChange={(event) => onChange(index, "toolKey", event.target.value)}
        >
          {TOOL_CATALOG.map((item) => (
            <option key={item.key} value={item.key}>
              {item.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Plan">
        <select
          className={fieldInputClassName()}
          value={tool.planKey}
          onChange={(event) => onChange(index, "planKey", event.target.value)}
        >
          {selectedTool.plans.map((plan) => (
            <option key={plan.key} value={plan.key}>
              {plan.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Monthly spend">
        <input
          className={fieldInputClassName()}
          value={tool.monthlySpend}
          onChange={(event) => onChange(index, "monthlySpend", Number(event.target.value) || 0)}
          min={0}
          type="number"
        />
      </Field>
      <Field label="Seats">
        <input
          className={fieldInputClassName()}
          value={tool.seats}
          onChange={(event) => onChange(index, "seats", Number(event.target.value) || 1)}
          min={1}
          type="number"
        />
      </Field>
      <Field label="Primary use case">
        <input
          className={fieldInputClassName()}
          value={tool.primaryUseCase}
          onChange={(event) => onChange(index, "primaryUseCase", event.target.value)}
          placeholder="Coding, support, research, design"
        />
      </Field>
      {canRemove ? (
        <div className="md:col-span-2 xl:col-span-5">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="inline-flex items-center gap-2 text-sm font-medium text-coral"
          >
            <Trash2 className="h-4 w-4" />
            Remove tool
          </button>
        </div>
      ) : null}
    </Card>
  );
}

export function AuditForm() {
  const router = useRouter();
  const { values, update, setTools } = useAuditStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTool = () => {
    const firstTool = TOOL_CATALOG[0];
    setTools([
      ...values.tools,
      {
        toolKey: firstTool.key,
        planKey: firstTool.plans[0].key,
        monthlySpend: 20,
        seats: 1,
        primaryUseCase: "General team productivity"
      }
    ]);
  };

  const updateTool = (index: number, field: string, value: string | number) => {
    const nextTools = [...values.tools];
    const nextTool = { ...nextTools[index], [field]: value };

    if (field === "toolKey") {
      const selectedTool = TOOL_CATALOG.find((tool) => tool.key === value);
      nextTool.planKey = selectedTool?.plans[0]?.key ?? "";
    }

    nextTools[index] = nextTool;
    setTools(nextTools);
  };

  const removeTool = (index: number) => {
    setTools(values.tools.filter((_, toolIndex) => toolIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const report = await api.createAudit(values);
      startTransition(() => {
        router.push(`/audit?slug=${report.slug}`);
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Audit failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="audit-form" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-ocean">Instant audit</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Show us your stack. We&apos;ll show you what looks expensive.</h2>
        <p className="mt-4 text-ink/70">
          Fill this out once. Your inputs persist locally, so you can tweak assumptions and rerun without losing work.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <Card className="grid gap-5 md:grid-cols-2">
          <Field label="Team name">
            <input
              className={fieldInputClassName()}
              value={values.teamName}
              onChange={(event) => update({ teamName: event.target.value })}
              placeholder="Acme Labs"
            />
          </Field>
          <Field label="Team size">
            <input
              className={fieldInputClassName()}
              value={values.teamSize}
              onChange={(event) => update({ teamSize: Number(event.target.value) || 1 })}
              min={1}
              type="number"
            />
          </Field>
        </Card>

        {values.tools.map((tool, index) => (
          <ToolRow
            key={`${tool.toolKey}-${index}`}
            index={index}
            tool={tool}
            canRemove={values.tools.length > 1}
            onChange={updateTool}
            onRemove={removeTool}
          />
        ))}

        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <Button type="button" variant="secondary" onClick={addTool}>
            <Plus className="mr-2 h-4 w-4" />
            Add another tool
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Running audit..." : "Generate audit"}
          </Button>
        </div>

        {error ? (
          <p className="rounded-xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>
        ) : null}
      </form>
    </section>
  );
}
