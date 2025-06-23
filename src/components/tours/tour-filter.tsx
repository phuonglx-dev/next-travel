"use client";

import * as React from "react";

import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { SliderProps } from "@radix-ui/react-slider";
import { ToursFilterProps } from "@/types/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "../Form/DatePicker";
import { useTranslations } from "next-intl";
import { convertToAnyTimezone, formatAsISOString } from "@/lib/time-helper";
import RatingFilter from "./reviews/rating-filter";

const min_price = 0;
const max_price = 500;

export default function TourFilter({ duration }: ToursFilterProps) {
  const t = useTranslations("tour");
  const searchParams = useSearchParams();
  const router = useRouter();

  const [price, setPrice] = React.useState<number[]>([
    Number(searchParams.get("min_price")) || min_price,
    Number(searchParams.get("max_price")) || max_price,
  ]);

  const handleSelect = (date: Date | undefined) => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      if (date) {
        queryParams.set("date", formatAsISOString(date));
      } else {
        queryParams.delete("date");
      }
      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(`/${path.substring(1)}`, { scroll: false });
    }
  };

  const handlePrice = (value: number[]) => {
    setPrice([value[0], value[1]]);
  };

  const onValueCommit = (value: number[]) => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("min_price", String(value[0]));
      if (value[1] < max_price) {
        queryParams.set("max_price", String(value[1]));
      } else {
        queryParams.delete("max_price");
      }
      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(`/${path.substring(1)}`, { scroll: false });
    }
  };

  const onDurationChange = (value: number, checked: boolean) => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const existingDurations = queryParams.get("duration")?.split(",") || [];
      const updatedDurations = checked
        ? [...existingDurations, String(value)]
        : existingDurations.filter((item) => item !== String(value));

      if (updatedDurations.length > 0) {
        queryParams.set("duration", updatedDurations.join(","));
      } else {
        queryParams.delete("duration");
      }

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(`/${path.substring(1)}`, { scroll: false });
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="rounded-lg border border-slate-300 overflow-hidden">
          {/* Date Select Section */}
          

          {/* Price, Duration, and Rating Filter Section */}
          <div className="p-5">

            <div>
              <h2 className="mb-3 font-bold text-text1">{t("when_traveling")}</h2>
              <DatePicker
                name="date"
                className="w-full h-full  rounded-md text-text1"
                placeholder="Select Dates"
                value={
                  searchParams && searchParams.get("date")
                    ? new Date(
                      convertToAnyTimezone(
                        searchParams.get("date") || ""
                      ).toISOString()
                    )
                    : undefined
                }
                is_footer
                handleSelect={handleSelect}
                clear
              />
            </div>
            <div className="my-6 h-px bg-slate-300"></div>

            <div>
              <h2 className="mb-3 font-bold text-text1">{t("price")}</h2>
              <div className="flex items-center justify-between">
                <span>$0</span>
                <span>$500+</span>
              </div>
              <div className="py-5">
                <SliderRange
                  value={price}
                  onValueChange={handlePrice}
                  onValueCommit={onValueCommit}
                  className="px-2"
                />
              </div>
            </div>

            <div className="my-6 h-px bg-slate-300"></div>

            <div className="filter-spacing">
              <div className="header-container mb-5 mt-5">
                <h2 className="mb-3 font-bold text-text1">Duration</h2>
              </div>
              <div className="collapsible-content-container" data-automation="filter-panel-filter-set-DURATIONS">
                {[
                  { label: "Day Tour & Activities", value: 1 },
                  { label: "1 to 3 days", value: 3 },
                  { label: "More than 3 days", value: 4 },
                ].map((item) => (
                  <div className="one-column small-spacing-options last-visible-options-group" key={item.value}>
                    <label className="checkbox-item flex items-center space-x-2">
                      <input
                        name="duration"
                        className="checkbox md accent-primary"
                        type="checkbox"
                        value={item.value}
                        onChange={(e) => onDurationChange(Number(e.target.value), e.target.checked)}
                      />
                      <span>{item.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-6 h-px bg-slate-300"></div>
            <RatingFilter />
          </div>
        </div>
      </div>
    </>
  );
}

function SliderRange({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[min_price, max_price]}
      max={max_price}
      className={cn("w-full", className)}
      {...props}
    />
  );
}
