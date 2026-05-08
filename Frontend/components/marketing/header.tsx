import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/5 bg-cloud/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SpendSight AI
        </Link>
        <nav className="hidden gap-6 text-sm text-ink/65 md:flex">
          <a href="#how-it-works">How it works</a>
          <a href="#trust">Why founders use it</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#audit-form">
          <Button>Run free audit</Button>
        </a>
      </div>
    </header>
  );
}
