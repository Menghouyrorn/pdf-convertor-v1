import { ThemeProvider } from "./theme-mode";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>{children}</ThemeProvider>
    )
}