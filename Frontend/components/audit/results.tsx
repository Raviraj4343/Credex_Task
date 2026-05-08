"use client";

import { useState } from "react";
import { CheckCircle2, Copy, ExternalLink, Mail } from "lucide-react";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import type { AuditReport } from "@/types/audit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, fieldInputClassName } from "@/components/ui/form-field";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 p-4">
      <p className="text-sm text-white/68">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export function AuditResults({ report, publicView = false }: { report: AuditReport; publicView?: boolean }) {
  const [leadStatus, setLeadStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [shareCopied, setShareCopied] = useState(false);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  const shareUrl = report.shareUrl ?? `${appUrl}/share/${report.slug}`;
  const consultationUrl = process.env.NEXT_PUBLIC_CREDEX_CONSULTATION_URL;
  const isHighSavings = report.monthlySavings > 500;
  const isLowSavings = report.monthlySavings < 100;
  const leadHeading = isLowSavings ? "Stay in the loop" : "Get this report delivered";
  const leadDescription = isHighSavings
    ? "You have a meaningful savings opportunity. Save the report and, if useful, book a Credex consultation to review next steps."
    : isLowSavings
      ? "Your stack looks fairly disciplined. Leave your email if you want updates when new optimization opportunities apply."
      : "Optional. Save the audit and make it easy to share internally.";

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setLeadStatus("saving");

    try {
      await api.createLead({
        publicId: report.publicId,
        email: String(formData.get("email") ?? ""),
        companyName: String(formData.get("companyName") ?? ""),
        role: String(formData.get("role") ?? ""),
        teamSize: Number(formData.get("teamSize") ?? report.teamSize)
      });
      setLeadStatus("saved");
      event.currentTarget.reset();
    } catch {
      setLeadStatus("error");
    }
  };

  const copyShare = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-ink text-white">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/68">Audit summary</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {formatCurrency(report.monthlySavings)} monthly savings identified
          </h1>
          <p className="mt-5 max-w-2xl text-white/80">{report.summary}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Metric label="Current monthly spend" value={formatCurrency(report.totalMonthlySpend)} />
            <Metric label="Projected monthly spend" value={formatCurrency(report.totalProjectedSpend)} />
            <Metric label="Annual savings" value={formatCurrency(report.annualSavings)} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={copyShare}>
              <Copy className="mr-2 h-4 w-4" />
              {shareCopied ? "Copied" : "Copy share link"}
            </Button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open public report
            </a>
            {isHighSavings && consultationUrl ? (
              <a
                href={consultationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-coral px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                Book Credex consultation
              </a>
            ) : null}
          </div>
        </Card>

        {!publicView ? (
          <Card>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-ocean" />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{leadHeading}</h2>
                <p className="text-sm text-ink/70">{leadDescription}</p>
              </div>
            </div>
            <form className="mt-6 grid gap-4" onSubmit={handleLeadSubmit}>
              <Field label="Email">
                <input name="email" type="email" required placeholder="you@company.com" className={fieldInputClassName()} />
              </Field>
              <Field label="Company name">
                <input name="companyName" placeholder="Acme Labs" className={fieldInputClassName()} />
              </Field>
              <Field label="Role">
                <input name="role" placeholder="Founder, ops, engineering manager" className={fieldInputClassName()} />
              </Field>
              <Field label="Team size">
                <input name="teamSize" type="number" min={1} defaultValue={report.teamSize} className={fieldInputClassName()} />
              </Field>
              <Button type="submit" disabled={leadStatus === "saving"}>
                {leadStatus === "saving" ? "Saving..." : isLowSavings ? "Notify me later" : "Save my report"}
              </Button>
              {leadStatus === "saved" ? (
                <p className="inline-flex items-center gap-2 text-sm text-ocean">
                  <CheckCircle2 className="h-4 w-4" />
                  Lead captured successfully.
                </p>
              ) : null}
              {leadStatus === "error" ? <p className="text-sm text-coral">Could not save your details.</p> : null}
            </form>
          </Card>
        ) : null}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <h2 className="text-2xl font-semibold tracking-tight">Recommendations</h2>
          {report.recommendations.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {report.recommendations.map((item, index) => (
                <div key={`${item.toolKey}-${item.title}-${index}`} className="rounded-xl border border-ink/10 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="rounded-lg bg-mint px-3 py-1 text-sm font-semibold text-ocean">
                      Save {formatCurrency(item.monthlySavings)}/mo
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink/70">{item.reasoning}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-ink/10 p-5">
              <p className="text-lg font-semibold text-ink">You&apos;re spending fairly well.</p>
              <p className="mt-2 text-sm leading-7 text-ink/70">
                The audit did not find a strong savings case from plan changes or tool consolidation. That is a good outcome, and it is better than forcing weak recommendations.
              </p>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold tracking-tight">Current stack</h2>
          <div className="mt-6 grid gap-4">
            {report.entries.map((entry, index) => (
              <div key={`${entry.toolKey}-${entry.planName}-${index}`} className="rounded-xl border border-ink/10 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{entry.toolName}</h3>
                    <p className="text-sm text-ink/60">
                      {entry.planName} - {entry.seats} seats - {entry.primaryUseCase}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">{formatCurrency(entry.monthlySpend)}/mo</p>
                </div>
                <a
                  href={entry.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ocean"
                >
                  Pricing source
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
