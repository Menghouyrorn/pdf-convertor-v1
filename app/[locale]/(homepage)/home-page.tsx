"use client"
import { CARD_DATA, DATAPAGE } from "@/constants"
import { CardProduct } from "./_components"
import Image from "next/image"
import { CheckLange } from "@/shared"
import { motion, useAnimate } from 'framer-motion'

export default function HomePage() {
    const currentLang = CheckLange();
    const controls = useAnimate()

    return (
        <div className="space-y-6 pt-5">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 70,
                    delay: 0.1,
                }}
            >
                <div className="grid gap-y-4 justify-center">
                    <Image src={currentLang ? '/kh/logo.jpg' : '/en/logo.jpg'} alt="logo" width={125} height={125} className="rounded-lg m-auto" />
                    {
                        DATAPAGE.map((item, index) => (
                            <motion.div
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.5,
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 70
                                }}
                            >
                                <p key={index} className="w-[60%] max-md:w-[98%] text-center m-auto font-semibold">{currentLang ? item.title : item.titleEn}</p>
                            </motion.div>

                        ))
                    }
                </div>
            </motion.div>

            <motion.div initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    delay: 0.8,
                }}>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-10 gap-y-10">
                    {CARD_DATA.map((item, index) => {
                        return <CardProduct {...item} lable={currentLang ? item.labelkh : item.lable} des={currentLang ? item.deskh : item.des} image={`/${currentLang ? 'kh' : 'en'}${item.image}`} key={index} />
                    })}
                </div>
            </motion.div>
        </div>
    )
}