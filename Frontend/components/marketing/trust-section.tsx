const points = [
  "Uses public pricing references from official vendor pages",
  "Keeps the calculations deterministic and explainable",
  "Lets teams share report links without exposing lead details",
  "Works well for founders, operators, and engineering managers"
];

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-ocean">Built to be useful</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            The report should feel credible the first time someone forwards it internally.
          </h2>
          <p className="mt-4 max-w-md text-ink/70">
            The goal is not to impress people with AI. It is to help them make a better spending decision quickly.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="rounded-2xl border border-ink/10 bg-white p-5">
              <p className="text-base leading-7 text-ink/80">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
