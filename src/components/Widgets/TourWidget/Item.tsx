import { IconGlobe, IconStar } from "@/components/icons";
import ImageCustom from "@/components/image-custom";
import { CurrencyFormatter } from "@/lib/utils";
import { Link } from "@/navigation";
import * as React from "react";

export interface ITourPreviewProps {
  item?: any;
}

export default function TourItem({ item }: { item: any }) {
  let total_price_final = CurrencyFormatter("en-US", item.price.amount).replace(
    /\s*USD\s*/,
    "$",
  );

  return (
    <div className="group relative flex flex-col rounded-b-md shadow-md">
      <Link
        href="#"
        aria-label={item?.title}
        className="relative h-[300px] w-full overflow-hidden md:h-[240px]"
      >
        {/* Image with hover zoom effect */}
        <ImageCustom
          src={`${item?.image?.src}`}
          image_alt={item?.title ? item.title : ""}
          className="transform rounded-t-md transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {item?.featured && (
          <div className="bg-primary absolute top-2 left-2 rounded px-3 py-[2px] shadow">
            <span className="text-xs font-semibold text-white">
              Likely to Sell Out
            </span>
          </div>
        )}
      </Link>

      <div className="flex-1 p-4 sm:p-5">
        {/* Location */}
        <div className="mb-2 flex items-center">
          <IconGlobe className="fill-text1 h-4 w-4" />
          <span className="text-text1 ml-2 text-sm">{item?.locations}</span>
        </div>

        {/* Title */}
        <div className="mb-3">
          <Link
            href="#"
            aria-label={item?.title}
            className="text-text1 inline-block w-full text-base font-semibold hover:underline sm:text-lg"
          >
            {item?.title}
          </Link>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center">
          <div className="relative flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <IconStar key={i} className="h-4 w-4 fill-yellow-400" />
            ))}
            <div
              className="absolute top-0 right-0 h-full overflow-hidden bg-white mix-blend-color"
              style={{
                width: `${(100 - (Number(item?.rating) * 100) / 5).toFixed(
                  0,
                )}%`,
              }}
            ></div>
          </div>
          <span className="text-text1 ml-2 text-sm">{item?.reviews || 0}</span>
        </div>
      </div>

      {/* Price */}
      <div className="absolute right-3 bottom-3 text-right">
        <span className="text-text1 text-xs">from</span>
        <span className="text-primary ml-1 text-lg font-bold">
          {total_price_final}
        </span>
      </div>
    </div>
  );
}
