'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { NAVIGATION_DATA } from "./contants"
import { ButtonLink } from "./button-link"
import { ButtonLanguage, ThemeButton } from "../button";
import { CheckLange } from "@/shared"
import Link from "next/link"

export const NavbarComputer = () => {
    const currentLang = CheckLange();
    return (
        <div className="flex h-16 pr-10 max-lg:hidden bg-gray-100 dark:bg-transparent border rounded-md items-center justify-between pl-10">
            <div className="flex gap-x-20 items-center">
                <Link href={'/'}>
                    <div className="flex gap-x-3 items-center">
                        <Image src={currentLang ? '/kh/logo.jpg' : '/en/logo.jpg'} width={55} height={55} className="rounded-md" alt="logo" />
                        <p className="font-extrabold text-sm text-[#1b1464] dark:text-white">CAM PDF CONVERTOR</p>
                    </div>
                </Link>
                <div className="flex">
                    {NAVIGATION_DATA.map((item, index) => {
                        return <ButtonLink isKhmer={currentLang} active={item.active} label={currentLang ? item.labelkh : item.label} path={item.path} key={index} />
                    })}
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <ButtonLanguage />
                <ThemeButton />
            </div>
        </div>
    )
}