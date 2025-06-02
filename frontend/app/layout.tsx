import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "🐱 PawGuardians 🐶 - Decentralized Animal Support",
  description:
    "Stray animal support platform powered by Stellar & Soroban blockchain technology. Transparent donations, real-time tracking and decentralized management.",
  keywords: [
    "blockchain",
    "stellar",
    "soroban",
    "animal rights",
    "donation",
    "decentralized",
    "stray animals",
    "cat",
    "dog",
    "animal welfare",
    "crypto donation",
    "transparent donation",
  ].join(", "),
  authors: [{ name: "PawGuardians Team", url: "https://pawguardians.com" }],
  creator: "PawGuardians Team",
  publisher: "PawGuardians Platform",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pawguardians.com",
    title: "🐱 PawGuardians 🐶 - Animal Support with Blockchain",
    description:
      "Transparent and reliable stray animal support platform on Stellar blockchain",
    siteName: "PawGuardians",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PawGuardians - Blockchain Animal Support Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🐱 PawGuardians 🐶 - Blockchain Animal Support",
    description:
      "Transparent stray animal support platform with Stellar blockchain",
    images: ["/twitter-image.jpg"],
    creator: "@pawguardians",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8b5cf6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://pawguardians.com",
    languages: {
      "en-US": "https://pawguardians.com",
      "tr-TR": "https://pawguardians.com/tr",
    },
  },
  category: "technology",
  classification: "Blockchain Animal Welfare Platform",
  other: {
    "msapplication-TileColor": "#8b5cf6",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen bg-gray-50`}
      >
        {/* Ana içerik - footer'ın üstünde kalacak şekilde ayarlandı */}
        {/* main etiketi flex-1 ile tüm boşluğu dolduracak */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Yeni Footer (sayfanın EN ALTINDA sabit) */}
        <footer className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-bold mb-1 flex items-center justify-center gap-2">
              Powered by
              <span className="text-yellow-300">Stellar</span>&
              <span className="text-teal-300">Soroban</span>
              <span className="text-yellow-300">🌟</span>
            </p>
            <p className="text-sm opacity-90">
              Decentralized, transparent and secure animal support platform
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}