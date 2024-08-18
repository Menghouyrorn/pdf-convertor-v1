import Head from "next/head";
import { Navbar } from "./_components";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid">
            <div className="">
                <div>
                    <Navbar />
                </div>
            </div>
            <main className="p-4 pb-10 min-h-screen">
                {children}
            </main>
            <Footer/>
        </div>

    )
}

export default Layout;