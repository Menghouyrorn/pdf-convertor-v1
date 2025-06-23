import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { TiDeleteOutline } from "react-icons/ti";

interface CardProcessProps {
  fileName: string;
  size: string;
  onClose: () => void;
  isKhmer: boolean;
}

export const CardProcess = ({
  fileName,
  size,
  onClose,
  isKhmer,
}: CardProcessProps) => {
  return (
    <div>
      <Card className="p-6 flex flex-col justify-center gap-y-6 items-center w-[600px] max-md:w-[98%] m-auto">
        <CardHeader className="w-full shadow-md border py-5 rounded-md">
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Image src={"/icon1.svg"} alt="icon" width={28} height={28} />
              <p className="text-sm">{fileName}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-sm">{size}</p>
              <Button
                size={"icon"}
                onClick={onClose}
                className="hover:bg-transparent"
                variant={"ghost"}
              >
                <TiDeleteOutline size={20} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid justify-center">
            <Button className="py-2 w-56 flex gap-x-3 items-center font-semibold">
              {isKhmer ? "កំពុងដំណើរការសូមរងចាំ..." : "Convert is process..."}
              <span>
                <RotatingLines
                  strokeColor="#ef4444"
                  visible={true}
                  width="24"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
