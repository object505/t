import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import React from 'react'
import MainLayout from '@/components/shared/MainLayout'

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
    process.env.NEXT_PUBLIC_SITE_URL || 'https://tzmk.netlify.app'
  ),
  title: 'ToolZone',
  description: 'The utility workbench for everything. Text, security, images, calculators, developer tools and more - fast, private, and free. Everything runs in your browser.',
  appleWebApp: {
    title: 'ToolZone',
  },
  // --- Open Graph ---
  openGraph: {
    title: 'ToolZone',
    description: 'The utility workbench for everything. Text, security, images, calculators, developer tools and more - fast, private, and free. Everything runs in your browser.',
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
    title: 'ToolZone',
    description: 'The utility workbench for everything. Text, security, images, calculators, developer tools and more - fast, private, and free. Everything runs in your browser.',
    // creator: '@yourhandle',
    images: ['https://tz.mk/og-image.jpg'],
  },
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
    </html>
  );
}
