import { CARD_DATA } from "@/constants"
import { CardProduct } from "./_components"
import Image from "next/image"

export default function HomePage() {
    return (
        <div className="grid gap-y-6 pt-5">
            <div className="grid gap-y-4 justify-center">
                <Image src={'/logo.jpg'} alt="logo" width={125} height={125} className="rounded-lg m-auto" />
                <p className="w-[60%] max-md:w-[98%] text-center m-auto font-semibold">CAM PDF CONVERTER is an PDF Converter project Used to convert pdf
                    files to editable text files that we focus on the text recognition
                    system in Khmer.</p>
            </div>
            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-10 gap-y-10">
                {CARD_DATA.map((item, index) => {
                    return <CardProduct {...item} key={index} />
                })}
            </div>
        </div>
    )
}