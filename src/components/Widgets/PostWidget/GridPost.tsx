import ImageCustom from "@/components/image-custom";
import CoverImage from "@/components/post/cover-image";
import Link from "next/link";
import * as React from "react";

export interface IDestinationWidgetItemProps {
  widget: any;
}

export default function GridPost({ widget }: IDestinationWidgetItemProps) {
  const items = widget?.data;

  return (
    <>
      <div className="grid grid-cols-3 gap-x-6 gap-y-8">
        {" "}
        {/* Adjust spacing here */}
        {items.slice(0, 5).map((item: any, index: number) => {
          const isFirstItem = index === 0;

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isFirstItem ? "col-span-2" : ""
              } mb-4`} /* Adds bottom margin for spacing */
            >
              <div className="relative">
                <div className="relative min-h-88 w-full">
                  {item.image && (
                    <CoverImage
                      title={item.title}
                      image={item.image.src}
                      image_alt={item.image.image_alt}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 z-10 rounded-b-md bg-linear-to-t from-black/60 to-transparent p-4">
                    {" "}
                    {/* Adds padding and gradient */}
                    <div className="mt-1 text-lg font-semibold text-white">
                      <Link
                        href="#"
                        className="inline-block w-full hover:underline"
                        aria-label={item.title}
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                  <Link href="#" aria-label={item.title}>
                    <div className="z-5  cursor-pointer rounded-md"></div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
