import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";

// Three-tier type system (Refined Cosmos):
//   Inter          → body / UI       (weight 400/500/600, variable)
//   Space Grotesk  → display headings (weight 500/600)
//   JetBrains Mono → labels / code    (weight 400/500)
// Loaded via next/font so they self-host (no render-blocking Google request)
// and expose stable CSS variables consumed by globals.css.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://utsabadhikari.com"),
  title: "Utsab Adhikari | Full-stack & AI Engineer",
  description:
    "Full-stack and backend engineer in London building AI agents, APIs and web apps with TypeScript/Node and Python. Available for hire — London / remote.",
  keywords: ["Utsab Adhikari", "Full-stack Developer", "Backend Developer", "AI Engineer", "Next.js", "Python", "TypeScript", "London"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Utsab Adhikari — Full-stack & AI Engineer",
    description:
      "Real projects with live demos, and live GitHub stats. Full-stack & backend engineer in London.",
    url: "https://utsabadhikari.com",
    siteName: "Utsab Adhikari",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Utsab Adhikari — Full-stack & AI Engineer",
    description:
      "Real projects with live demos and live GitHub stats. Based in London.",
    creator: "@UtsabAdhikari5",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Utsab Adhikari",
              jobTitle: "Full-stack & Backend Engineer",
              knowsAbout: ["Full-Stack Development", "Backend Development", "AI Agents", "APIs", "Automation"],
              address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "UK" },
              url: "https://utsabadhikari.com",
              sameAs: ["https://github.com/autsav", "https://twitter.com/UtsabAdhikari5"],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>
          {children}
          {/* Ambient depth + cursor ring — all pointer-fine + motion-OK gated,
              pointer-events:none, behind content. */}
          <CustomCursor />
          <div className="grain" aria-hidden="true" />
          <div className="vignette" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
