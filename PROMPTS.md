# Prompts

## Summary Prompt

System prompt:

```text
Write a crisp, founder-friendly 100-word audit summary. Be transparent, financially grounded, and avoid hype.
```

User payload:

```json
{
  "teamSize": "...",
  "totalMonthlySpend": "...",
  "monthlySavings": "...",
  "annualSavings": "...",
  "tools": "...",
  "recommendations": "top recommendations only"
}
```

## Why It Is Written This Way

- It keeps the model focused on tone and synthesis, not on inventing calculations.
- It passes structured inputs so the output stays tied to actual audit results.
- It explicitly avoids hype because the product is closer to a budget tool than a chatbot toy.

## What Did Not Work Well

- Broader prompts tended to produce generic “AI transformation” language.
- Asking the model to generate recommendations as well as the summary blurred accountability and made the output harder to trust.
