"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CardProcess } from './card-process';
import { useRouter } from 'next/navigation';
import { CardSuccess } from './card-success';
import { CheckLange } from '@/shared';
import { CARD_DATA } from '@/constants';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import { motion } from 'framer-motion';

export const CardConvert = () => {
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [filename, setFilename] = useState("");
    const [text, setText] = useState("");
    const router = useRouter();
    const currentLang = CheckLange();
    const cartdata = CARD_DATA[2];
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
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            ConvertImageTOText(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    // use for open input file
    const handleOpenFIleInput = () => {
        let fileInputOpen = document.getElementById('fileinput');
        fileInputOpen?.click();
    }

    const ConvertImageTOText = async (file: any) => {
        const convert_to_data_url = file.replace("data:", "").replace(/^.+,/, "");
        const text = await fetch(`/${currentLang ? 'kh':'en'}/api`, {
            method: 'POST',
            body: JSON.stringify({
                url_image: convert_to_data_url
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        setText(text.data)
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
        const name = filename.slice(0, -4);
        const element = document.createElement('a');
        const file = new Blob([text], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = name + '.txt';
        document.body.appendChild(element);
        element.click();
        handleCancel();
        message('Download is success.');
    }
    return (
        <div className='space-y-10'>
            <ToastContainer />
            <div className='space-y-4 pt-28'>
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        delay: 0.1,
                        type: "spring",
                        damping: 20,
                        stiffness: 55
                    }}
                >
                    <h1 className='font-extrabold text-3xl text-center'>{currentLang ? cartdata.labelkh : cartdata.lable}</h1>
                </motion.div>
                <motion.div
                    initial={{ y: 70, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                        delay: 0.1,
                    }}
                >
                    <p className='w-[60%] max-lg:w-[90%] max-md:w-[99%] m-auto text-center'>{currentLang ? cartdata.deskh : cartdata.des}</p>
                </motion.div>
            </div>
            <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 80,
                    delay: 0.3,
                }}
            >
                {
                    imgFile ? (
                        <div>
                            {
                                text ? <CardSuccess isKhmer={currentLang} filename={filename} onDownload={() => handleDownload(text, filename)} filesize={sizeFile(imgFile)} /> : <CardProcess isKhmer={currentLang} onClose={handleCancel} fileName={filename.length > 20 ? filename.slice(0, 10) + ' ...' : filename} size={sizeFile(imgFile)} />
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
                                <Button className='py-2 w-56' onClick={handleOpenFIleInput}>{currentLang ? 'ជ្រើសរើសឯកសារ' : 'Select File'}</Button>
                            </div>
                        </CardContent>
                    </Card>
                }
            </motion.div>
        </div>
    )
}