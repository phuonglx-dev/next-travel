import ImageCustom from "@/components/image-custom";
import destinationData from "@/data/destinationData";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Destination() {

    const items = destinationData.data
   
    return (


        <div className="container">
         

          <div className="flex flex-col items-start gap-5 lg:flex-row">
            
                <div className="w-full">

                    <div className="container py-10">
                        <div className="mb-10 text-center">
                            <h2 className="text-2xl font-semibold text-text1">{"Explore Asia City"}</h2>
                
                        </div>  
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item: any) => (
                            <Link href="#" aria-label={item?.title}>
                                <div className="relative text-center cursor-pointer">
                                    <div className="w-full min-h-[300px] relative overflow-hidden rounded-md group">
                                        {item?.image ? (
                                            <ImageCustom
                                                src={`${item.image.src}`}
                                                image_alt={''}
                                                className="rounded-md transform transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-[200px] bg-slate-400"></div>
                                        )}
                                    </div>
                                    <div className="absolute z-10 -translate-x-1/2 translate-y-[-50%] top-1/2 left-1/2">
                                        <span className="font-bold text-white text-2xl drop-shadow shadow-black">
                                            {item?.title}
                                        </span>
                                        <div className="text-white text-sm mt-1 drop-shadow shadow-black">
                                            {item.count} tours
                                        </div>
                                    </div>
                                    <div className="z-5 rounded-md"></div>
                                </div>
                            </Link>
                        ))}
                            </div>
                    </div>


                </div>
          </div>
        </div>
        
    );
}
