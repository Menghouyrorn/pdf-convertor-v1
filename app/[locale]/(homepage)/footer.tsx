"use client";
import { CheckLange } from "@/shared";

export default function Footer() {
  const currentLang = CheckLange();
  return (
    <div className="flex font-bold bg-gray-100 dark:bg-transparent border border-white rounded-md h-20 items-center justify-between pl-10 pr-10">
      <p>
        @{" "}
        {currentLang
          ? "បង្កើតឡើងនៅ ខែ មេសា ឆ្នាំ ២០២៤"
          : "Create on April 2024"}
      </p>
    </div>
  );
}
