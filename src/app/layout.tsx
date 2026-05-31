import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { SideNav } from "@/components/side-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { PropsWithChildren } from "react";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend-kurs",
  description: "Introduksjonskurs i frontend-utvikling med Next.js",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="no"
      className={`${roboto.variable} ${robotoMono.variable} text-md h-full antialiased`}
    >
      <body className="min-h-full">
        <SidebarProvider>
          <SideNav />
          <main className="flex-1 overflow-auto p-0">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
