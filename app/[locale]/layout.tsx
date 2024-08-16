import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/provider";
import NextTopLoader from 'nextjs-toploader'
import React from "react";
import { I18nProviderClient } from "@/locales/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAM-PDF-CONVERTOR",
  description: "CAM-PDF-CONVERTOR",
};

export default async function RootLayout({ params: { locale }, children }: { params: { locale: string }, children: React.ReactElement }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader color="#ef4444" showSpinner={false} />
        <I18nProviderClient locale={locale}>
          <AppProvider>{children}</AppProvider>
        </I18nProviderClient>

      </body>
    </html>
  );
}
