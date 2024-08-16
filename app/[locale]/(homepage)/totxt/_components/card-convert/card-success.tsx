import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { TiDeleteOutline } from "react-icons/ti"
import { RotatingLines } from "react-loader-spinner"

interface CardSuccessProps {
    filename: string;
    filesize: string;
    onDownload: () => void;
    isKhmer:boolean;
}

export const CardSuccess = ({ filename, filesize, onDownload,isKhmer }: CardSuccessProps) => {
    return (
        <div>
            <Card className='p-6 flex flex-col justify-center gap-y-6 items-center w-[600px] max-md:w-[98%] m-auto'>
                <CardHeader className="w-full shadow-md border py-5 rounded-md">
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-x-3">
                            <Image src={'/icon5.svg'} alt="icon" width={28} height={28} />
                            <p className="text-sm">{filename.slice(0,-4) + '.txt'}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm">{filesize}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='grid justify-center'>
                        <Button className='py-2 w-56 flex gap-x-3 items-center font-semibold' onClick={onDownload}>{isKhmer ? 'ទាញយក':'Download'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}