"use client";
import { useCurrentLocale } from "@/locales/client";
import { useMemo } from "react";

function CheckLange() {
  const current = useCurrentLocale();
  const check = useMemo(() => current == "kh", [current]);

  return check;
}

export { CheckLange };
