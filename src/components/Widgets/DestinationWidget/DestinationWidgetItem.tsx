import ImageCustom from '@/components/image-custom';
import { Link } from '@/navigation';
import * as React from 'react';

export interface IDestinationWidgetItemProps {
  item: any;
}

export default function DestinationWidgetItem({
  item,
}: IDestinationWidgetItemProps) {
  return (
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
  );
}
