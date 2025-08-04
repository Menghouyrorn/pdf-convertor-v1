"use client";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { useRouter } from "next/navigation";
import { CardSuccess, CardProcess, ButtonIcon } from "@/components/shared";
import { CheckLange } from "@/shared";
import { CARD_DATA } from "@/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { motion } from "framer-motion";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { Noto_Sans_Khmer } from "next/font/google";
import Tesseract from "tesseract.js";
import { ProgressComponent } from "@/components/shared";
import Image from "next/image";
import { Input } from "@/components/ui/input";

GlobalWorkerOptions.workerSrc = "/assets/js/pdf.worker.js";

const khmerfont = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: "300",
  style: "normal",
});

export const CardConvert = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [laoding, setLoading] = useState<{
    isConvert: boolean;
    isLoading: boolean;
  }>({
    isConvert: false,
    isLoading: false,
  });
  const router = useRouter();
  const currentLang = CheckLange();
  const cartdata = CARD_DATA[0];

  // message
  const message = (message: string) =>
    toast.success(message, {
      autoClose: 1500,
      icon: false,
      style: { fontWeight: "bold", fontSize: "14px", paddingLeft: "15px" },
    });

  // use for select file
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setPdfFile(file);
    setFilename(file.name.slice(0, -4));
    UrlUploader(file);
  };

  // use for open input file
  const handleOpenFIleInput = () => {
    let fileInputOpen = document.getElementById("fileinput");
    fileInputOpen?.click();
  };

  // convert image to text
  const ConvertImageTOText = async (file: any) => {
    let datatext = "";
    let texts: any = [];
    for (const images of file) {
      await Tesseract.recognize(images, "khm+eng", {
        logger: (m) => {
          if (m.status == "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      })
        .then((v) => {
          texts.push(v.data.text);
        })
        .catch((v) => {
          console.log(v);
        });
    }
    for (let i = 0; i < texts.length; i++) {
      datatext += texts[i];
    }
    setText(datatext);
    message("Convert is success.");
  };

  // get page from pdf file
  const getPageImage = async (data: any) => {
    const imageList = [];
    const canvas = document.createElement("canvas");
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
        viewport: viewport,
      }).promise;
      let img = canvas.toDataURL("image/png");
      imageList.push(img);
    }
    ConvertImageTOText(imageList);
  };

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
      });
    });
  };

  // get size of file
  const sizeFile = (file: File) => {
    const fileSizeInBytes = file.size;
    let fileSize;

    if (fileSizeInBytes >= 1048576) {
      fileSize = (fileSizeInBytes / 1048576).toFixed(2) + " MB";
    } else {
      fileSize = (fileSizeInBytes / 1024).toFixed(2) + " KB";
    }
    return fileSize;
  };
  // cancel convert
  const handleCancel = async () => {
    router.refresh();
    setProgress(0);
    setText("");
    setPdfFile(null);
  };
  // download docx file
  const handleDownloadDocx = (datatext: string, filename: string) => {
    const textlast = () => {
      let lasttext = "";
      for (let i = 0; i < datatext.length; i++) {
        lasttext += datatext[i];
      }

      return lasttext;
    };
    const lastdatatext = textlast();
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: lastdatatext,
                  font: khmerfont.className,
                  size: 24,
                }),
              ],
            }),
          ],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${filename.slice(0, -4)}.docx`);
    });
    message("Download success.");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 pt-8">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            damping: 20,
            stiffness: 55,
          }}
        >
          <h1 className="font-extrabold uppercase text-3xl text-center">
            {currentLang ? cartdata.labelkh : cartdata.lable}
          </h1>
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
          <p className=" w-[60%] max-lg:w-[90%] max-md:w-[99%] m-auto text-center">
            {currentLang ? cartdata.deskh : cartdata.des}
          </p>
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
        {pdfFile ? (
          <div>
            {text ? (
              <CardSuccess
                onCancel={handleCancel}
                text={text}
                isKhmer={currentLang}
                filename={filename + ".doc"}
                image="icon1.svg"
                onDownload={() => handleDownloadDocx(text, filename)}
                filesize={sizeFile(pdfFile)}
              />
            ) : (
              <CardProcess
                image="icon1.svg"
                progress={progress}
                isKhmer={currentLang}
                onClose={handleCancel}
                fileName={
                  filename.length > 20
                    ? filename.slice(0, 10) + " ..."
                    : filename
                }
                size={sizeFile(pdfFile)}
              />
            )}
          </div>
        ) : (
          <Card className=" p-2 flex flex-col justify-center items-center w-[500px] max-md:w-[98%] m-auto">
            <CardHeader className="text-center">
              <div className="space-y-4">
                <Image
                  className="m-auto"
                  src={"/icon1.svg"}
                  width={38}
                  height={38}
                  alt="logo"
                />
                <CardTitle className="text-lg">
                  {currentLang ? cartdata.labelkh : cartdata.lable}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid justify-center">
                <Input
                  type="file"
                  id="fileinput"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleSelectFile}
                />
                <ButtonIcon
                  size="sm"
                  title={currentLang ? "ជ្រើសរើសឯកសារ" : "Select File"}
                  className="py-2 w-56"
                  onClick={handleOpenFIleInput}
                ></ButtonIcon>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};
