// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ShopifyAppProvider from "@/components/ShopifyAppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glidia - AI-Powered WISMO",
  description: "Intelligent order tracking and customer support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Remove the meta tags - they're causing issues */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShopifyAppProvider>
          {children}
        </ShopifyAppProvider>
      </body>
    </html>
  );
}