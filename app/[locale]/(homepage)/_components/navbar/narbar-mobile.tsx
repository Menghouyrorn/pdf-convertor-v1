"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { ButtonLanguage, ThemeButton } from "../button";
import { NAVIGATION_DATA } from "./contants";
import { ButtonLink } from "./button-link";
import { CheckLange } from "@/shared";

export const NavbarMobile = () => {
  const currentLang = CheckLange();
  return (
    <div className="h-16 lg:hidden bg-gray-100 dark:bg-transparent border flex justify-between items-center pl-2 pr-2">
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <LuMenu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle className="flex items-center text-sm font-bold gap-x-3">
                <Image
                  width={45}
                  className="rounded-md"
                  height={45}
                  src={currentLang ? "/kh/logo.jpg" : "/en/logo.jpg"}
                  alt="logo"
                />
                <p>PDF CONVERTER</p>
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-y-4 pt-6">
              {NAVIGATION_DATA.map((item, index) => {
                return (
                  <ButtonLink
                    isKhmer={currentLang}
                    {...item}
                    label={currentLang ? item.labelkh : item.label}
                    key={index}
                  />
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-x-3">
        <ButtonLanguage />
        <ThemeButton />
      </div>
    </div>
  );
};
