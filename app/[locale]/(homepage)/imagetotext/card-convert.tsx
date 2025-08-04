"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CardProcess, CardSuccess } from "@/components/shared";
import { CheckLange } from "@/shared";
import { CARD_DATA } from "@/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { motion } from "framer-motion";
import Tesseract from "tesseract.js";

export const CardConvert = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const currentLang = CheckLange();
  const cartdata = CARD_DATA[2];
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
    setImgFile(file);
    setFilename(file.name);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      ConvertImageTOText(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  // use for open input file
  const handleOpenFIleInput = () => {
    let fileInputOpen = document.getElementById("fileinput");
    fileInputOpen?.click();
  };
  // convert image to text
  const ConvertImageTOText = async (file: any) => {
    await Tesseract.recognize(file, "khm+eng", {
      logger: (m) => {
        if (m.status == "recognizing text") {
          setProgress(Math.round(m.progress * 100));
        }
      },
    })
      .then((v) => {
        setText(v.data.text);
      })
      .catch((e) => {
        console.log(e);
      });
    message("Convert is success.");
  };
  // get size of image
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
  const handleCancel = async () => {
    router.refresh();
    setText("");
    setProgress(0);
    setImgFile(null);
  };
  // download
  const handleDownload = (text: string, filename: string) => {
    const name = filename.slice(0, -4);
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name + ".txt";
    document.body.appendChild(element);
    element.click();
    handleCancel();
    message("Download is success.");
  };
  return (
    <div className="space-y-8">
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
          <p className="w-[60%] max-lg:w-[90%] max-md:w-[99%] m-auto text-center">
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
        {imgFile ? (
          <div>
            {text ? (
              <CardSuccess
                image="icon4.svg"
                onCancel={handleCancel}
                text={text}
                isKhmer={currentLang}
                filename={filename}
                onDownload={() => handleDownload(text, filename)}
                filesize={sizeFile(imgFile)}
              />
            ) : (
              <CardProcess
                image="icon4.svg"
                progress={progress}
                isKhmer={currentLang}
                onClose={handleCancel}
                fileName={
                  filename.length > 20
                    ? filename.slice(0, 10) + " ..."
                    : filename
                }
                size={sizeFile(imgFile)}
              />
            )}
          </div>
        ) : (
          <Card className="flex flex-col justify-center items-center w-[500px] max-md:w-[98%] m-auto">
            <CardHeader className="text-center">
              <div className="space-y-4">
                <Image
                  className="m-auto"
                  src={"/icon4.svg"}
                  width={38}
                  height={38}
                  alt="logo"
                />
                <CardTitle className="text-base">
                  {currentLang ? cartdata.labelkh : cartdata.lable}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid justify-center">
                <Input
                  type="file"
                  id="fileinput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSelectFile}
                />
                <Button
                  size={"sm"}
                  className="py-2 w-56"
                  onClick={handleOpenFIleInput}
                >
                  {currentLang ? "ជ្រើសរើសឯកសារ" : "Select File"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};
