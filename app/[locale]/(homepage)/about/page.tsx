"use client"
import { ListCard } from "./_components";
import { CheckLange } from "@/shared";
import { ABOUTPAGE } from "@/constants";

const Page = () => {
    const currentlang = CheckLange();
    return (
        <>
            {ABOUTPAGE.map((item, index) => (
                <div key={index} className="space-y-24 pt-14">
                    <div className="space-y-8 text-center">
                        <h1 className="uppercase text-3xl font-extrabold text-[#201a67]">{currentlang ? item.titleabout : item.titleabouten}</h1>
                        <p className="w-[80%] max-lg:w-[90%] max-md:w-[99%] m-auto">{currentlang ? item.titledes : item.titledesen}</p>
                    </div>
                    <ListCard titile={currentlang ? item.titleteam : item.titleteamen} isKhmer={currentlang} />
                </div>
            ))}

        </>


    )
}

export default Page;
