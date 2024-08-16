"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { CheckLange } from "@/shared";

interface CardPersonProps {
    name: string;
    role: string;
    url: string;
}

export const CardPerson = ({ name, role, url }: CardPersonProps) => {
    const currentlang = CheckLange();
    return (
        <div className="w-full">
            <Card className="w-[90%] flex max-lg:w-full m-auto">
                <CardHeader>
                    <Image src={currentlang ? '/kh'+url:'/en'+url} alt="profile" width={100} height={10} className="rounded-lg shadow-xl" />
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="space-y-2">
                        <p className="font-bold text-center">{name}</p>
                        <p>{role}</p>
                    </div>
                    <div className="flex gap-x-4 justify-center">
                        <FaFacebookSquare size={26} />
                        <FaGithubSquare size={26} />
                        <FaLinkedin size={26} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}