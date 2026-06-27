import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/lib/language";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "YTMP3Downloader",
  description: "Convert YouTube videos to MP3 instantly and download high-quality audio.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "YTMP3Downloader",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-background text-on-background font-body-md text-body-md antialiased`}
      >
        <LanguageProvider>
          <Link href="/" className="sr-only">
            Skip to content
          </Link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
