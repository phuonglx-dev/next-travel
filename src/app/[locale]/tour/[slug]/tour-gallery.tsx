"use client";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImageCustom from "../../../../components/image-custom";
export interface ITourGalleryProps {
  images_small: string[];
  images_medium: string[];
  title: string;
}

type TImage = {
  id: number;
  url: string;
};

export default function TourGallery({
  images_small,
  images_medium,
  title,
}: any) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  const handleSetImage = (swiper: any) => {
    setThumbsSwiper(swiper);
  };

  let data_small = images_small.map((item:any, index:any) => {
    return {
      id: index,
      url: item,
    };
  });

  let data_medium = images_medium.map((item:any, index:any) => {
    return {
      id: index,
      url: item,
    };
  });

  return (
    <div className="flex items-center h-full gap-5">
      <Swiper
        onSwiper={handleSetImage}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-left hidden! w-1/5 lg:block!"
      >
        {data_small.map((item:any) => {
          if (item.url) {
            return (
              <SwiperSlide key={item.id} className="relative">
                <ImageCustom src={item.url} image_alt={title} />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        speed={1000}
        slidesPerView={1}
        className="w-full h-full swiper-right lg:w-4/5"
      >
        {data_medium.map((item:any) => {
          if (item.url) {
            return (
              <SwiperSlide key={item.id}>
                <img
                  src={item.url}
                  alt={title}
                  style={{ objectFit: "cover" }}
                />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
}
