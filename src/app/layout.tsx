import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Utsab Adhikari | Full-stack & AI Engineer",
  description:
    "Full-stack and backend engineer in London building AI agents, APIs and web apps with TypeScript/Node and Python. Open to visa-sponsored UK roles.",
  keywords: ["Utsab Adhikari", "Full-stack Developer", "Backend Developer", "AI Engineer", "Next.js", "Python", "TypeScript", "London"],
  openGraph: {
    title: "Utsab Adhikari — Full-stack & AI Engineer",
    description:
      "Real projects with live demos, and live GitHub stats. Full-stack & backend engineer in London.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable} dark`} suppressHydrationWarning>
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
