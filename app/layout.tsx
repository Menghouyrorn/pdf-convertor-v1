import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/provider";
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAM-PDF-CONVERTOR",
  description: "CAM-PDF-CONVERTOR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader color="#ef4444" showSpinner={false} />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
