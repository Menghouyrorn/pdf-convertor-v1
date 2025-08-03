import { ButtonIcon } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { GrFormView } from "react-icons/gr";
import { IoMdDownload } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";

interface CardSuccessProps {
  filename: string;
  image?: string;
  filesize: string;
  onDownload: () => void;
  isKhmer: boolean;
  onCopyText: () => void;
}

export const CardSuccess = ({
  filename,
  filesize,
  onDownload,
  isKhmer,
  image,
  onCopyText,
}: CardSuccessProps) => {
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
          <div className="flex gap-x-12 justify-center w-full">
            <ButtonIcon
              icon={<IoMdDownload size={18} />}
              onClick={onDownload}
              title={isKhmer ? "ទាញយក" : "Download"}
              size="sm"
            ></ButtonIcon>
            <ButtonIcon
              className="bg-gray-200"
              size="sm"
              title="Copy"
              icon={<IoCopyOutline size={15} />}
              onClick={onCopyText}
              variant="outline"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
