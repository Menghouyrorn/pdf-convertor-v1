"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { CardProcess } from './card-process';
import { useRouter } from 'next/navigation';
import { CardSuccess } from './card-success';
import { CheckLange } from '@/shared';
import { CARD_DATA } from '@/constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { motion } from 'framer-motion'

GlobalWorkerOptions.workerSrc = "/assets/js/pdf.worker.js";

export const CardConvert = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [filename, setFilename] = useState("");
    const [text, setText] = useState("");
    const router = useRouter();
    const currentLang = CheckLange();
    const cartdata = CARD_DATA[1];
    // message
    const message = (message: string) => toast.success(message, {
        autoClose: 1500,
        icon: false,
        style: { fontWeight: 'bold', fontSize: '14px', paddingLeft: '15px' }
    });

    // use for select file
    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setPdfFile(file);
        setFilename(file.name);
        UrlUploader(file);
    }

    // use for open input file
    const handleOpenFIleInput = () => {
        let fileInputOpen = document.getElementById('fileinput');
        fileInputOpen?.click();
    }
    // convert image to text
    const ConvertImageTOText = async (file: any) => {
        let datatext = '';
        let texts: any = [];
        for (const images of file) {
            const convert_to_data_url = images.replace("data:", "").replace(/^.+,/, "");

            const text = await fetch(`/${currentLang ? 'kh' : 'en'}/api`, {
                method: 'POST',
                body: JSON.stringify({
                    url_image: convert_to_data_url
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            texts.push(text.data);
        }
        for (let i = 0; i < texts.length; i++) {
            datatext += texts[i];
        }
        setText(datatext);
        message('Convert is success.');
    }
    // get page as image from file pdf
    const getPageImage = async (data: any) => {
        const imageList = [];
        const canvas = document.createElement('canvas');
        canvas.setAttribute("className", "canv");
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
            var page = await pdf.getPage(i);
            var viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var CanvasRenderingContext2D = canvas.getContext("2d");
            if (!CanvasRenderingContext2D) return;
            await page.render({
                canvasContext: CanvasRenderingContext2D,
                viewport: viewport
            }).promise;
            let img = canvas.toDataURL("image/png");
            imageList.push(img);
        }
        ConvertImageTOText(imageList)

    }
    // convert pdf file to base64
    const UrlUploader = (file: File) => {
        let pdfUrl = URL.createObjectURL(file);
        fetch(pdfUrl).then((res) => {
            res.blob().then((blob) => {
                let render = new FileReader();
                render.onload = (e) => {
                    const result = e.target?.result as string;
                    const data = atob(result.replace(/.*base64,/, ""));
                    getPageImage(data);
                };
                render.readAsDataURL(blob);
            })
        })
    }
    // get size from file
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
        setPdfFile(null);
    }
    // donwload
    const handleDownload = (text: string, filename: string) => {
        const name = filename.slice(0, -4);
        const element = document.createElement('a');
        const file = new Blob([text], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = name + '.txt';
        document.body.appendChild(element);
        element.click();
        handleCancel();
        message('Download success.')
    }
    return (
        <div className='space-y-10'>
            <ToastContainer />
            <div className='space-y-4 pt-28'>
                <motion.div
                    initial={{ x: 200, opacity: 0 }}
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
                    pdfFile ? (
                        <div>
                            {
                                text ? <CardSuccess isKhmer={currentLang} filename={filename} onDownload={() => handleDownload(text, filename)} filesize={sizeFile(pdfFile)} /> : <CardProcess isKhmer={currentLang} onClose={handleCancel} fileName={filename.length > 20 ? filename.slice(0, 10) + ' ...' : filename} size={sizeFile(pdfFile)} />
                            }
                        </div>
                    ) : <Card className='p-6 flex flex-col justify-center items-center w-[600px] max-md:w-[98%] m-auto'>
                        <CardHeader className='text-center'>
                            <div className='space-y-4'>
                                <Image className='m-auto' src={'/icon5.svg'} width={48} height={48} alt='logo' />
                                <CardTitle className='text-xl'>{currentLang ? cartdata.labelkh : cartdata.lable}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='grid justify-center'>
                                <Input type='file' id='fileinput' accept='.pdf' className='hidden' onChange={handleSelectFile} />
                                <Button className='py-2 w-56' onClick={handleOpenFIleInput}>{currentLang ? 'ជ្រើសរើសឯកសារ' : "Select File"}</Button>
                            </div>
                        </CardContent>
                    </Card>
                }
            </motion.div>
        </div>
    )
}