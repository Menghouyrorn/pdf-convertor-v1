"use client"
import { saveAs } from 'file-saver';
import Tesseract from 'tesseract.js'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CardProcess } from './card-procress';
import { useRouter } from 'next/navigation';
import { CardSuccess } from './card-success';
import { CheckLange } from '@/shared';
import { CARD_DATA } from '@/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export const CardConvert = () => {
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [filename, setFilename] = useState("");
    const [text, setText] = useState("");
    const [jobId, setJobId] = useState<any>(null);
    const router = useRouter();
    const currentLang = CheckLange();
    const cartdata = CARD_DATA[3];
    const message = (message: string) => toast.success(message, {
        autoClose: 1500,
        icon: false,
        style: { fontWeight: 'bold', fontSize: '14px', paddingLeft: '15px' }
    });

    // use for select file
    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setImgFile(file);
        setFilename(file.name);
        ConvertImageTOText(URL.createObjectURL(file));
    }

    // use for open input file
    const handleOpenFIleInput = () => {
        let fileInputOpen = document.getElementById('fileinput');
        fileInputOpen?.click();
    }

    const ConvertImageTOText = async (file: any) => {
        const data = Tesseract.recognize(file, "khm+eng", { logger: (e) => console.log(e) });
        const text = (await data).data.text;
        setJobId((await data).jobId);
        setText(text);
        message('Convert is success.');
    }

    const sizeFile = (file: File) => {
        const fileSizeInBytes = file.size;
        let fileSize;

        if (fileSizeInBytes >= 1048576) {
            fileSize = (fileSizeInBytes / 1048576).toFixed(2) + " MB";
        } else {
            fileSize = (fileSizeInBytes / 1024).toFixed(2) + " KB"
        }
        return fileSize
    }
    const handleCancel = async () => {
        router.refresh();
        setText("");
        setImgFile(null);
    }

    const handleDownload = (text: string, filename: string) => {
        const blob = new Blob(["\uFEFF" + text], { type: "application/msword" });
        const name = filename.slice(0, -4);
        saveAs(blob, `${name}.doc`);
        handleCancel();
        message('Download is success');
    }
    return (
        <div className='space-y-10'>
            <ToastContainer />
            <div className='space-y-4 pt-28'>
                <h1 className='font-extrabold text-3xl text-center'>{currentLang ? cartdata.labelkh : cartdata.lable}</h1>
                <p className='w-[60%] max-lg:w-[90%] max-md:w-[99%] m-auto text-center'>{currentLang ? cartdata.deskh : cartdata.des}</p>
            </div>
            {
                imgFile ? (
                    <div>
                        {
                            jobId ? <CardSuccess isKhmer={currentLang} filename={filename} onDownload={() => handleDownload(text, filename)} filesize={sizeFile(imgFile)} /> : <CardProcess isKhmer={currentLang} onClose={handleCancel} fileName={filename.length > 20 ? filename.slice(0, 10) + ' ...' : filename} size={sizeFile(imgFile)} />
                        }
                    </div>
                ) : <Card className='p-6 flex flex-col justify-center items-center w-[600px] max-md:w-[98%] m-auto'>
                    <CardHeader className='text-center'>
                        <div className='space-y-4'>
                            <Image className='m-auto' src={'/icon4.svg'} width={48} height={48} alt='logo' />
                            <CardTitle className='text-xl'>{currentLang ? cartdata.labelkh : cartdata.lable}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='grid justify-center'>
                            <Input type='file' id='fileinput' accept='image/*' className='hidden' onChange={handleSelectFile} />
                            <Button className='py-2 w-56' onClick={handleOpenFIleInput}>{currentLang ? 'ជ្រើសរើសឯកសារ' : "Select File"}</Button>
                        </div>
                    </CardContent>
                </Card>
            }

        </div>
    )
}