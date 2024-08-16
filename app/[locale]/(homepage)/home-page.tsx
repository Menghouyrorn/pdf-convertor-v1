"use client"
import { CARD_DATA, DATAPAGE } from "@/constants"
import { CardProduct } from "./_components"
import Image from "next/image"
import { CheckLange } from "@/shared"

export default function HomePage() {
    const currentLang = CheckLange();

    return (
        <div className="grid gap-y-6 pt-5">
            <div className="grid gap-y-4 justify-center">
                <Image src={currentLang ? '/kh/logo.jpg' : '/en/logo.jpg'} alt="logo" width={125} height={125} className="rounded-lg m-auto" />
                {
                    DATAPAGE.map((item, index) => (
                        <p key={index} className="w-[60%] max-md:w-[98%] text-center m-auto font-semibold">{currentLang ? item.title : item.titleEn}</p>
                    ))
                }
            </div>
            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-10 gap-y-10">
                {CARD_DATA.map((item, index) => {
                    return <CardProduct {...item} lable={currentLang ? item.labelkh : item.lable} des={currentLang ? item.deskh : item.des} image={`/${currentLang ? 'kh' : 'en'}${item.image}`} key={index} />
                })}
            </div>
        </div>
    )
}