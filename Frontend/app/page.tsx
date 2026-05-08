import { AuditForm } from "@/components/audit/form";
import { SiteShell } from "@/components/layout/site-shell";
import { FaqSection } from "@/components/marketing/faq-section";
import { Header } from "@/components/marketing/header";
import { Hero } from "@/components/marketing/hero";
import { TrustSection } from "@/components/marketing/trust-section";

const steps = [
  {
    title: "List your current stack",
    description: "Add the tools, plans, seat counts, and rough monthly spend your team is carrying today."
  },
  {
    title: "Review the audit",
    description: "See where the stack looks oversized, duplicated, or simply harder to justify than it needs to be."
  },
  {
    title: "Share the report",
    description: "Use the public link to circulate the savings story without exposing lead capture details."
  }
];

export default function HomePage() {
  return (
    <SiteShell>
      <Header />
      <main>
        <Hero />
        <TrustSection />
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-ocean">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">A quick path from spend inputs to a shareable answer</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <p className="text-sm font-medium text-ocean">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-7 text-ink/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
        <AuditForm />
        <FaqSection />
      </main>
    </SiteShell>
  );
}
