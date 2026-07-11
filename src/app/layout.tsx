import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ff-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://utsabadhikari.com"),
  title: "Utsab Adhikari — Full-Stack Engineer (Python, React, AI systems) · London",
  description:
    "Full-stack engineer in London. I build and ship complete products — API to deploy — solo. FastAPI, React/Next.js, PostgreSQL, LLM APIs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Utsab Adhikari — Full-Stack Engineer · London",
    description:
      "I build and ship complete products — API to deploy — solo. FastAPI, React/Next.js, PostgreSQL, LLM APIs.",
    url: "https://utsabadhikari.com",
    siteName: "Utsab Adhikari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsab Adhikari — Full-Stack Engineer · London",
    description: "I build and ship complete products — API to deploy — solo.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
