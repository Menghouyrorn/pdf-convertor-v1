"use client";
import { ListCard } from "./_components";
import { CheckLange } from "@/shared";
import { ABOUTPAGE } from "@/constants";
import { motion } from "framer-motion";

const Page = () => {
  const currentlang = CheckLange();
  return (
    <>
      {ABOUTPAGE.map((item, index) => (
        <div key={index} className="space-y-24 pt-14">
          <div className="space-y-8 text-center">
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
                damping: 15,
                stiffness: 55,
              }}
            >
              <h1 className="uppercase text-3xl font-extrabold text-[#201a67] dark:text-white">
                {currentlang ? item.titleabout : item.titleabouten}
              </h1>
            </motion.div>
            <motion.div
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.2,
              }}
            >
              <p className="w-[80%] max-lg:w-[90%] max-md:w-[99%] m-auto">
                {currentlang ? item.titledes : item.titledesen}
              </p>
            </motion.div>
          </div>
          {/* <ListCard titile={currentlang ? item.titleteam : item.titleteamen} isKhmer={currentlang} /> */}
        </div>
      ))}
    </>
  );
};

export default Page;
