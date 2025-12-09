import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AppShell from "@/components/AppShell";
import { Analytics } from "@vercel/analytics/react"; // ✅ ADD THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bible Buddy",
  description: "Your guided Bible reading companion",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Your full app shell */}
        <AppShell>{children}</AppShell>

        {/* ✅ VERCEL ANALYTICS */}
        <Analytics />
      </body>
    </html>
  );
}
