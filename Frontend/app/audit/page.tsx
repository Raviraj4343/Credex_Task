"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuditResults } from "@/components/audit/results";
import { SiteShell } from "@/components/layout/site-shell";
import { Header } from "@/components/marketing/header";
import { api } from "@/lib/api";
import type { AuditReport } from "@/types/audit";

function AuditPageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Missing audit slug.");
      return;
    }

    api
      .getPublicAudit(slug)
      .then(setReport)
      .catch((auditError) => {
        setError(auditError instanceof Error ? auditError.message : "Could not load audit.");
      });
  }, [slug]);

  return (
    <SiteShell>
      <Header />
      <main>
        {!report && !error ? <div className="mx-auto max-w-3xl px-6 py-20 text-center text-lg">Loading audit...</div> : null}
        {error ? <div className="mx-auto max-w-3xl px-6 py-20 text-center text-lg text-coral">{error}</div> : null}
        {report ? <AuditResults report={report} /> : null}
      </main>
    </SiteShell>
  );
}

export default function AuditPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-20 text-center text-lg">Loading audit...</div>}>
      <AuditPageContent />
    </Suspense>
  );
}
