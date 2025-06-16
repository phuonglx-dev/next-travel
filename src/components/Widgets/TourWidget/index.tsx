import * as React from "react";
import { notFound } from "next/navigation";
import tourData from "@/data/tourData";
import TourItem from "./Item";
export interface ITourWidgetProps {
  className?: string;
  type: string;
  locale?: string;
}

export default async function TourWidget({
  className,
  type,
  locale,
}: ITourWidgetProps) {
  const widget = tourData;

  return (
    <div className={`py-10 ${className}`}>
      <div className="mb-10 text-center">
        {/* Title */}
        <h2 className="text-text1 text-2xl font-semibold">{widget?.title}</h2>

        {/* Subtitle */}
        <div className="text-primary mt-2 flex cursor-pointer items-center justify-center">
          <span className="mr-2">View all tours</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <div className="grid-layout grid-layout--primary">
        {widget?.data &&
          widget.data.length > 0 &&
          widget?.data.map((item: any, index) => (
            <TourItem key={`item-${index}`} item={item} />
          ))}
      </div>
    </div>
  );
}
