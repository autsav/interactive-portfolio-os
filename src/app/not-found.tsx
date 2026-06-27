import Link from "next/link";

// Branded 404 — reuses the aurora motif + points at home + Cmd-K.
export default function NotFound() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 text-center"
      style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="aurora" aria-hidden="true" />

      <div className="relative z-10 max-w-lg">
        <span className="mono text-xs tracking-[0.35em] uppercase mb-4 block" style={{ color: "var(--orange)" }}>
          ◈ 404
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
          This page <span className="text-gradient-orange">drifted off orbit.</span>
        </h1>
        <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          The URL you followed doesn&apos;t exist. Head back to the portfolio,
          or hit <kbd className="mono px-2 py-0.5 rounded border text-xs" style={{ borderColor: "var(--border)", color: "var(--fg)" }}>⌘K</kbd>{" "}
          on the home page to jump anywhere.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-full transition-transform active:scale-95 glow-orange"
          style={{ backgroundColor: "var(--orange)" }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}