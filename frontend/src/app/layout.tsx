import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "MVEMS | All-in-One Event Management Platform",
    template: "%s | MVEMS",
  },
  description: "Scale your events with the most powerful multivendor management system. Ticketing, seat booking, vendor ecosystem, and real-time analytics.",
  keywords: ["event management", "ticketing", "vendor management", "SaaS", "MVEMS"],
  authors: [{ name: "MVEMS Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mvems.com",
    siteName: "MVEMS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
