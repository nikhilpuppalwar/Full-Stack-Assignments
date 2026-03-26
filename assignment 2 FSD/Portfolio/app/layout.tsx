import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhil Puppalwar - Portfolio",
  description: "Computer Engineering Student | Android Developer | AI/ML Enthusiast - Transforming ideas into apps and intelligent solutions",
  keywords: ["portfolio", "android developer", "mobile app development", "machine learning", "data science", "computer engineering"],
  authors: [{ name: "Nikhil Puppalwar" }],
  creator: "Nikhil Puppalwar",
    verification: {
    google: "TjF9xycBjgvjO8NFOksKHpLCkCGAOjHVUuZy1Vwd4Fk",
  },
  openGraph: {
    title: "Nikhil Puppalwar - Portfolio",
    description: "Computer Engineering Student | Android Developer | AI/ML Enthusiast",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Puppalwar - Portfolio",
    description: "Computer Engineering Student | Android Developer | AI/ML Enthusiast",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
