import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";

interface CardProductProps {
    image: string;
    lable: string;
    des: string;
    path: string;
}

export const CardProduct = (props: CardProductProps) => {
    const { image, lable, des, path } = props;
    return (
        <Link href={path} className="cursor-pointer transition-all hover:shadow-lg" >
            <Card className="min-h-48 w-full">
                <CardHeader>
                    <div className="flex gap-x-4 items-center">
                        <Image src={image} alt="word" width={45} height={45} />
                        <div className="text-xl font-bold">
                            {lable}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-sm">
                        {des}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}