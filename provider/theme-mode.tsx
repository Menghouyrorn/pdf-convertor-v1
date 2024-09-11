import { ThemeProvider as NextThemeProvider } from "next-themes";
import React from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return <NextThemeProvider attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>{children}</NextThemeProvider>
}