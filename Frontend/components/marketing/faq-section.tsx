const faqs = [
  {
    question: "Do I need to connect billing accounts?",
    answer: "No. The MVP is authentication-free and works from self-reported spend, plans, and seat counts."
  },
  {
    question: "Is the audit really deterministic?",
    answer: "Yes. All savings calculations come from fixed pricing data and rule-based logic. AI is only used for the short summary."
  },
  {
    question: "Can I share results with teammates or investors?",
    answer: "Yes. Every audit gets a public shareable URL that removes lead details but keeps the insights and savings breakdown."
  },
  {
    question: "What if the AI summary fails?",
    answer: "The product automatically falls back to a templated summary so the report still ships instantly."
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-ocean">FAQ</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">A few practical questions before you try it</h2>
      </div>
      <div className="mt-10 grid gap-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-2xl border border-ink/10 bg-white p-6">
            <summary className="cursor-pointer list-none text-base font-semibold">{faq.question}</summary>
            <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
