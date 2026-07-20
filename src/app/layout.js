import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import React from 'react'
import MainLayout from '@/components/shared/MainLayout'
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://tz.mk'
  ),
  title: 'ToolZone - Free Online Tools for Developers, Creators & Everyone',
  description: 'Free, fast, privacy-friendly tools that run in your browser.',
  appleWebApp: {
    title: 'ToolZone',
  },
  // --- Open Graph ---
  openGraph: {
    title: 'ToolZone - Free Online Tools for Developers, Creators & Everyone',
    description: 'Free, fast, privacy-friendly tools that run in your browser.',
    url: 'https://tz.mk',
    siteName: 'ToolZone',
    images: [
      {
        url: 'https://tz.mk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ToolZone OG Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // --- Twitter ---
  twitter: {
    card: 'summary_large_image',
    title: 'ToolZone - Free Online Tools for Developers, Creators & Everyone',
    description: 'Free, fast, privacy-friendly tools that run in your browser.',
    // creator: '@yourhandle',
    images: ['https://tz.mk/og-image.jpg'],
  },
  other: {
    'google-adsense-account': 'ca-pub-7682472904147708',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-SV868JKQ9S" />
    </html>
  );
}
