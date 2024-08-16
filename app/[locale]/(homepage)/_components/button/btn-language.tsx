"use client"

import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from "@/components/ui/select"
import { useCurrentLocale, useChangeLocale } from '@/locales/client';
import { useEffect, useState } from "react";


export const ButtonLanguage = () => {
    const [lange, setLange] = useState<string>('');
    const currentlocal = useCurrentLocale();
    const changeLocal = useChangeLocale();

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLange(e as any);
    }

    useEffect(() => {
        if (lange == 'en') {
            changeLocal('en')
        }
        if (lange == 'kh') {
            changeLocal('kh')
        }
    }, [lange])

    return (
        <div>
            <Select onValueChange={(e) => handleChangeValue(e as any)} defaultValue={currentlocal}>
                <SelectTrigger className="text-xs space-x-1 w-20 ring-0 focus:ring-0">
                    <SelectValue placeholder='KH' className="text-xs" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="kh" className="text-xs">KH</SelectItem>
                    <SelectItem value="en" className="text-xs">ENG</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}