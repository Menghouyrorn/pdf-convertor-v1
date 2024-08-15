import { DATA_PERSON } from "@/constants/data-person";
import { CardPerson } from "./card-person";

export const ListCard =()=>{
    return(
        <div className="w-full space-y-8">
            <h1 className="text-3xl font-extrabold text-[#201a67] text-center">OUR TEAM</h1>
            <div className="grid grid-cols-3 gap-y-4 gap-x-4 max-lg:grid-cols-2 max-md:grid-cols-1 justify-center w-full">
                {DATA_PERSON.map((item,index)=>{
                    return <CardPerson name={item.name} role={item.role} url={item.url}/>
                })}
                
            </div>
        </div>
    );
}