"use client"
import { saveAs } from 'file-saver';
import Tesseract from 'tesseract.js'
import { IoClose } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { CardProcess } from './card-procress';
import { useRouter } from 'next/navigation';
import { CardSuccess } from './card-success';

GlobalWorkerOptions.workerSrc = "/assets/js/pdf.worker.js";

export const CardConvert = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [filename, setFilename] = useState("");
    const [text, setText] = useState("");
    const [jobId, setJobId] = useState<any>(null);
    const router = useRouter();

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

    const ConvertImageTOText = async (file: any) => {
        const texts: any = [];
        for (const images of file) {
            const data = Tesseract.recognize(images, "khm+eng", { logger: (e) => console.log(e) });
            const text = (await data).data.text;
            setJobId((await data).jobId);
            texts.push(text);
        }
        texts.join("\n");
        setText(texts);
    }

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

    const handleDownload = (text: string, filename: string) => {
        const blob = new Blob(["\uFEFF" + text], { type: "application/msword" });
        const name = filename.slice(0, -4);
        saveAs(blob, `${name}.doc`);
        handleCancel();
    }
    return (
        <div className='space-y-10'>
            <div className='space-y-2 pt-28'>
                <h1 className='font-extrabold text-3xl text-center'>Convert To Word</h1>
                <p className='w-[60%] m-auto text-center'>Text recognition without software installation or download. This converter allows you to convert pdf to the Microsoft Word formats DOC and DOCX.</p>
            </div>
            {
                pdfFile ? (
                    <div>
                        {
                            jobId ? <CardSuccess filename={filename} onDownload={() => handleDownload(text, filename)} filesize={sizeFile(pdfFile)} /> : <CardProcess onClose={handleCancel} fileName={filename.length > 20 ? filename.slice(0, 10) + ' ...' : filename} size={sizeFile(pdfFile)} />
                        }
                    </div>
                ) : <Card className='p-6 flex flex-col justify-center items-center w-[600px] max-md:w-[98%] m-auto'>
                    <CardHeader className='text-center'>
                        <div className='space-y-4'>
                            <Image className='m-auto' src={'/icon1.svg'} width={48} height={48} alt='logo' />
                            <CardTitle className='text-xl'>Convert File To Word</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='grid justify-center'>
                            <Input type='file' id='fileinput' className='hidden' onChange={handleSelectFile} />
                            <Button className='py-2 w-56' onClick={handleOpenFIleInput}>Select File</Button>
                        </div>
                    </CardContent>
                </Card>
            }

        </div>
    )
}