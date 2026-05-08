import type { Metadata } from "next";
import { AuditResults } from "@/components/audit/results";
import { SiteShell } from "@/components/layout/site-shell";
import { Header } from "@/components/marketing/header";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const report = await api.getPublicAudit(params.slug);

    return {
      title: `AI Spend Audit: Save $${Math.round(report.monthlySavings)}/month`,
      description: report.summary,
      openGraph: {
        title: `AI Spend Audit: Save $${Math.round(report.monthlySavings)}/month`,
        description: report.summary,
        url: `/share/${params.slug}`
      },
      twitter: {
        card: "summary_large_image",
        title: `AI Spend Audit: Save $${Math.round(report.monthlySavings)}/month`,
        description: report.summary
      }
    };
  } catch {
    return {
      title: "AI Spend Audit report",
      description: "Shared AI spend audit results"
    };
  }
}

export default async function SharePage({ params }: { params: { slug: string } }) {
  const report = await api.getPublicAudit(params.slug);

  return (
    <SiteShell>
      <Header />
      <main>
        <AuditResults report={report} publicView />
      </main>
    </SiteShell>
  );
}
