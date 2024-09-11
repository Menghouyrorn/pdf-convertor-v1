"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Props = {
  index: number;
  path: string;
};

const useActiveLink = (props: Props) => {
  const { index, path } = props;
  const urlPathname = usePathname();
  const splitedPath = urlPathname.split("/");
  const isActive = useMemo(() => {
    if (
      path === "" &&
      (splitedPath[index] === "" || splitedPath[index] === undefined)
    )
      return true;

    if (path === splitedPath[index]) {
      return true;
    } else {
      return false;
    }
  }, [splitedPath, index, path]);

  return [isActive];
};

export { useActiveLink };
