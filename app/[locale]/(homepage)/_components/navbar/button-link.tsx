"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useActiveLink } from "@/hooks";
import Link from "next/link";

type ButtonProps = {
  path: string;
  label: string;
  active: string;
  isKhmer: boolean;
};

export const ButtonLink = (props: ButtonProps) => {
  const [isActive] = useActiveLink({
    index: 2,
    path: props.active,
  });

  return (
    <Button
      className={clsx(
        "w-full justify-start hover:text-[#1b1464] dark:text-white text-black dark:hover:text-red-400 dark:bg-transparent",
        isActive &&
          isActive &&
          "text-[#1b1464] font-extrabold dark:text-red-500"
      )}
      variant={"ghost"}
      asChild
    >
      <Link
        className={
          props.isKhmer
            ? "px-3 text-[16px] py-2 transition-all rounded-lg"
            : "px-3 py-2 transition-all rounded-lg uppercase"
        }
        href={props.path}
      >
        {props.label}
      </Link>
    </Button>
  );
};
