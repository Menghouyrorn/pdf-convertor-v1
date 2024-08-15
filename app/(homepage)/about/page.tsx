import { ListCard } from "./_components";


const Page = () => {
    return (
        <div className="space-y-24 pt-14">
            <div className="space-y-8 text-center">
                <h1 className="uppercase text-3xl font-extrabold text-[#201a67]">About US</h1>
                <p className="w-[80%] max-lg:w-[90%] max-md:w-[99%] m-auto">A CAM PDF CONVERTER is a website that can take a PDF file, which typically contains text that is not easily editable, and convert it into a format where the text can be edited, such as a Word document or a plain text file. This conversion process often involves using OCR (Optical Character Recognition) technology to recognize the text in the PDF and then save it in a format that allows for editing.And it support khmer language.</p>
            </div>
            <ListCard />
        </div>
    )
}

export default Page;