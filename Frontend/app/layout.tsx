import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "SpendSight AI | Audit and optimize your startup's AI spend",
  description:
    "Instantly audit AI subscriptions and API spend across ChatGPT, Claude, Cursor, Copilot, Gemini, OpenAI API, Anthropic API, and Windsurf.",
  openGraph: {
    title: "SpendSight AI",
    description: "Audit your AI stack and uncover realistic monthly savings in minutes.",
    url: "/",
    siteName: "SpendSight AI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendSight AI",
    description: "Find savings across your startup's AI tools and API spend."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
