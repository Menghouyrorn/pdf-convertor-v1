import { DATA_PERSON } from "@/constants/data-person";
import { CardPerson } from "./card-person";
import { motion } from 'framer-motion'

interface ListCardProps {
    titile: string;
    isKhmer: boolean;
}

export const ListCard = ({ titile, isKhmer }: ListCardProps) => {
    return (
        <div className="w-full space-y-8">
            <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 80,
                    delay: 0.5,
                }}
            >
                <h1 className="text-3xl font-extrabold text-[#201a67] dark:text-white text-center">{titile}</h1>
            </motion.div>
            <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 80,
                    delay: 0.8,
                }}
            >
                <div className="grid grid-cols-3 gap-y-4 gap-x-4 max-lg:grid-cols-2 max-md:grid-cols-1 justify-center w-full">
                    {DATA_PERSON.map((item, index) => {
                        return <CardPerson key={index} name={isKhmer ? item.namekh : item.name} role={isKhmer ? item.rolekh : item.role} url={item.url} />
                    })}

                </div>
            </motion.div>
        </div>
    );
}