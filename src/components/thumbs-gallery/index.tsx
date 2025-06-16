"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { cn } from "@/lib/utils";
import { IconMark } from "../icons";

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
  images_small: string[];
  images_medium: string[];
};

const ThumbsGallery = ({
  open,
  onClose,
  images_medium,
  images_small,
  images,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 top-0 z-99999",
        open ? "block" : "hidden",
      )}
    >
      <div className="relative z-20 mx-auto flex max-w-[800px] justify-center">
        <div className="h-screen w-full">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="w-full">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {images_medium.map((image) => (
                  <SwiperSlide key={image}>
                    <div className="relative w-full">
                      <img
                        src={image}
                        alt=""
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-4 w-full">
              <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs-list"
              >
                {images_medium.map((image) => (
                  <SwiperSlide key={image}>
                    <div className="relative w-full">
                      <img
                        src={image}
                        alt=""
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-transparent_dark"
        onClick={() => onClose()}
      ></div>
      <span
        onClick={() => onClose()}
        className="absolute right-5 top-10 z-20 flex h-10 w-10 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-sm"
      >
        <IconMark className="h-8 w-8" />
      </span>
    </div>
  );
};

export default ThumbsGallery;
