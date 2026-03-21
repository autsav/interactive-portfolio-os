import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive Portfolio OS — AI Systems Architect",
  description:
    "Senior AI Systems Architect and creative developer. Explore production-grade AI orchestration and spatial computing through an interactive project operating system.",
  keywords: ["AI Engineer", "ML Systems", "Next.js", "Portfolio", "LLMs", "RAG", "MLOps"],
  openGraph: {
    title: "Interactive Portfolio OS",
    description: "A live demonstration of production-grade AI orchestration — not a static resume.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable} dark`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
