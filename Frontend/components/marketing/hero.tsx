import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const supportedTools = [
  "Cursor",
  "Copilot",
  "Claude",
  "ChatGPT",
  "OpenAI API",
  "Anthropic API",
  "Gemini",
  "Windsurf"
];

export function Hero() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-ocean">AI spend audit for startup teams</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            See where your AI budget is carrying too much weight.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Enter your tools, seat counts, and monthly spend. The audit flags plan mismatch, tool overlap, idle seats,
            and savings opportunities with simple reasoning you can actually use in a budget conversation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#audit-form">
              <Button className="w-full sm:w-auto">
                Run the audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#trust">
              <Button variant="secondary" className="w-full sm:w-auto">
                How it works
              </Button>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-sm text-ink/68">
            {supportedTools.map((item) => (
              <span key={item} className="rounded-full border border-ink/10 bg-white px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-ink/55">What the audit checks</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-ink/72">
            <div className="border-b border-ink/10 pb-4">
              <p className="font-medium text-ink">Plan fit</p>
              <p>Flags cases where enterprise or team plans look oversized for the number of seats and use case.</p>
            </div>
            <div className="border-b border-ink/10 pb-4">
              <p className="font-medium text-ink">Seat efficiency</p>
              <p>Highlights seat counts that appear broader than the active team footprint really needs.</p>
            </div>
            <div className="border-b border-ink/10 pb-4">
              <p className="font-medium text-ink">Tool overlap</p>
              <p>Surfaces duplicated chat or coding tools where one standard could reduce unnecessary spend.</p>
            </div>
            <div>
              <p className="font-medium text-ink">Savings summary</p>
              <p>Returns a clear monthly and annual savings estimate with reasoning that can stand up in a budget review.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
