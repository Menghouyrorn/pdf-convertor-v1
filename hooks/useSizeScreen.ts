"use client";
import { useEffect, useState } from "react";

const useSizeScreen = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleGetHeightAndWidth = () => {
    setWidth(window.pageXOffset);
    setHeight(window.pageYOffset);
  };

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      handleGetHeightAndWidth();
    };
  }

  return { width, height };
};

export { useSizeScreen };
