import { ButtonIcon } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { IoCopyOutline, IoCloseSharp } from "react-icons/io5";

interface CardSuccessProps {
  filename: string;
  image?: string;
  filesize: string;
  onDownload: () => void;
  isKhmer: boolean;
  text?: string;
  onCancel?: () => void;
}

export const CardSuccess = ({
  filename,
  filesize,
  onDownload,
  isKhmer,
  image,
  text = "",
  onCancel,
}: CardSuccessProps) => {
  const [isCopy, setIsCopy] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    } catch (e) {
      setIsCopy(false);
      console.log(e);
    }
  };
  return (
    <div>
      <Card className="p-6 flex flex-col justify-center gap-y-6 items-center w-[600px] max-md:w-[98%] m-auto">
        <CardHeader className="w-full shadow-md border py-5 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Image src={`/${image}`} alt="icon" width={28} height={28} />
              <p className="text-sm">{filename}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-sm">{filesize}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex gap-x-10 justify-center w-full">
            <ButtonIcon
              icon={<IoCloseSharp size={15} />}
              title="Cancel"
              size="sm"
              variant="outline"
              className="text-xs font-extrabold"
              onClick={onCancel}
            />
            <ButtonIcon
              icon={<IoMdDownload size={18} />}
              onClick={onDownload}
              className="text-xs font-extrabold"
              title={isKhmer ? "ទាញយក" : "Download"}
              size="sm"
            ></ButtonIcon>
            <ButtonIcon
              disabled={isCopy}
              className="bg-black/10 dark:bg-transparent text-xs font-extrabold"
              size="sm"
              title="Copy"
              icon={<IoCopyOutline size={15} />}
              onClick={copyText}
              variant="outline"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
