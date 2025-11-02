// Global layout: header, footer, metadata, and cloud-themed background.
import "@/styles/globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devin Carmichael — Portfolio",
  description: "Cloud, software, and intelligence projects.",
  openGraph: {
    title: "Devin Carmichael — Portfolio",
    description: "Cloud, software, and intelligence projects.",
    url: "https://example.com",
    siteName: "Devin Carmichael",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devin Carmichael — Portfolio",
    description: "Cloud, software, and intelligence projects.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen text-gray-100 bg-black"}>
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:p-2">
          Skip to content
        </a>

        <header className="border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
          <nav className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold">Devin Carmichael</Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/experience">Experience</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/about">About</Link>
              <Link href="/travel" className="hover:underline">Travel</Link>
              <Link href="/contact" className="underline">Contact</Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main id="content">{children}</main>

        <footer className="border-t border-white/10 bg-black/40 backdrop-blur">
          <div className="container mx-auto max-w-6xl px-4 py-6 text-sm text-gray-400">
            © {new Date().getFullYear()} Devin Carmichael — Open to roles in Cloud, Software, and DevOps (Development and Operations).
          </div>
        </footer>
      </body>
    </html>
  );
}
