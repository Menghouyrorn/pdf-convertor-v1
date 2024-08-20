const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid">
            <main className="p-4 pb-10 min-h-screen">
                {children}
            </main>
        </div>

    )
}

export default Layout;