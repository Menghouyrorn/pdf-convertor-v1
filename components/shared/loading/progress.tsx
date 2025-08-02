"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressComponentProp {
  progress_value: number;
}

const ProgressComponent = ({ progress_value }: ProgressComponentProp) => {
  return <Progress value={progress_value} className="w-[100%]" />;
};

export { ProgressComponent };
