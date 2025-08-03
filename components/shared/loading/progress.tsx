"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";

interface ProgressComponentProp {
  progress_value: number;
  className?: string;
}

const ProgressComponent = ({
  progress_value,
  className,
}: ProgressComponentProp) => {
  const classNames = clsx(className, "w-[100%]");
  return <Progress value={progress_value} className={className} />;
};

export { ProgressComponent };
