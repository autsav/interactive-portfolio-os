import Link from "next/link";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#how", label: "How I work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-6">
        <Link href="#top" className="flex items-baseline gap-2" aria-label="Utsab Adhikari, home">
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Utsab Adhikari
          </span>
          <span className="label hidden sm:inline">/ engineer</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden rounded px-3 py-2 text-sm text-graphite transition-colors hover:text-ink sm:inline-block"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-blueprint"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
