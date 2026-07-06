import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrismaX Banner Generator | Premium Community Banners",
  description:
    "Generate a personalized, premium PrismaX community banner featuring verified quality, robotics-inspired graphics, and luxurious gold & brown aesthetics. Enter your Discord username and download your custom banner.",
  keywords: ["PrismaX", "banner generator", "community", "Web3", "Discord", "verified", "quality", "robotics"],
  openGraph: {
    title: "PrismaX Banner Generator",
    description:
      "Generate your personalized PrismaX community banner — premium gold & brown design, verified quality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen">
        {/* Animated Grid Background */}
        <div className="animated-grid" aria-hidden="true" />

        {/* Ambient Background Blobs - Gold & Brown */}
        <div className="ambient-blob blob-gold" aria-hidden="true" />
        <div className="ambient-blob blob-brown" aria-hidden="true" />
        <div className="ambient-blob blob-amber" aria-hidden="true" />

        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
