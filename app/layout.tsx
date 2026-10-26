import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PHBH Recs",
  description: "Years of friendship and recommendations available with ease.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "PHBH Recs",
    statusBarStyle: "default",
  },
  // This directory is for the group, not for search engines.
  // robots.txt blocks crawlers too — belt and braces.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="dot-grid min-h-full flex flex-col">{children}</body>
    </html>
  );
}
