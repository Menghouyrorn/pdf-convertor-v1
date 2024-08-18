import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/provider";
import NextTopLoader from 'nextjs-toploader'
import React from "react";
import { I18nProviderClient } from "@/locales/client";
import { Noto_Sans_Khmer } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });
const khmerfont = Noto_Sans_Khmer({ subsets: ['khmer'], weight: '300', style: "normal" });

export const metadata: Metadata = {
  title: "CAM-PDF-CONVERTOR",
  description: "CAM-PDF-CONVERTOR",
};

export default async function RootLayout({ params: { locale }, children }: { params: { locale: string }, children: React.ReactElement }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={locale == 'kh' ? khmerfont.className : inter.className}>
        <NextTopLoader color="#ef4444" showSpinner={false} />
          <I18nProviderClient locale={locale}>
            <AppProvider>{children}</AppProvider>
          </I18nProviderClient>
      </body>
    </html>
  );
}
