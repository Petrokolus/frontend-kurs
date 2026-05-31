import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend-kurs",
  description: "Introduksjonskurs i frontend-utvikling med Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex">
        <aside className="w-60 shrink-0 border-r bg-muted/30 flex flex-col p-4 gap-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
            Frontend-kurs
          </p>
          <Link
            href="/"
            className="rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            Hjem
          </Link>
          <Link
            href="/saker"
            className="rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            Saker
          </Link>
          <div className="mt-4 border-t pt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
              Ressurser
            </p>
            <Link
              href="/oppgaver"
              className="rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors block"
            >
              Oppgaver
            </Link>
            <Link
              href="/api-docs"
              className="rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors block"
            >
              API-dokumentasjon
            </Link>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
