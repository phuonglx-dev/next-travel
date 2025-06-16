"use client";

import { ITourCalendarPrice, TourProps } from "@/types";
import React, { useEffect, useState } from "react";
import { DatePicker } from "../../../../components/Form/DatePicker";
import GuestsInput from "../../../../components/Form/GuestsInput";
import { Button } from "../../../../components/ui/button";
import LoadingSpinner from "../../../../components/loading/loadingSpiner";
import { useLocale, useTranslations } from "next-intl";
import dayjs from "dayjs";

const _ = require("lodash");
export interface ITourFormProps {
  data: TourProps;
}

export default function TourForm({ data }: { data: any }) {
  const t = useTranslations("tour");
  const locale = useLocale();
  const [datePickerKey, setDatePickerKey] = React.useState<number>(0);
  const [focus, setFocus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [calendar, setCalendar] = useState<ITourCalendarPrice[] | undefined>([]);
  const [calendarLoading, setCalendarLoading] = useState<boolean>(false);


  useEffect(() => {
    const generateMockCalendar = () => {
      setCalendarLoading(true);
      try {
        // Generate mock data for 30 items over 3 months
        const mockCalendar = [];
        const startDate = dayjs(); // Current date at runtime
        const totalItems = 30;

        for (let i = 0; i < totalItems; i++) {
          const currentDate = startDate.add(i, "day"); // Increment by one day for each item
          const randomPrice = Math.floor(Math.random() * (100 - 20 + 1)) + 20; // Random price between 20 and 100

          mockCalendar.push({
            date: currentDate.format("YYYY-MM-DD"), // Format date as YYYY-MM-DD
            adult_price: randomPrice.toString(), // Convert price to string
          });
        }

        setCalendar(mockCalendar); // Set the generated mock calendar data
      } catch (error) {
        console.error("Failed to generate mock calendar data:", error);
      } finally {
        setCalendarLoading(false);
      }
    };

    generateMockCalendar();
  }, [data.id]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
  };

  const handleSelect = (date: Date | undefined) => {
   
  };
  


  return (
    <>
      <h2 className="mb-3 text-xl font-bold text-text1">
        {t("date_traveler")}
      </h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="relative mb-3">
          <DatePicker
            keyD={datePickerKey}
            autoFocus={focus}
            name="date"
            className="h-full w-full rounded-md border border-gray-400 py-2! text-base font-medium text-text1"
            placeholder={t("select_date")}
            formatDate="EEEE, MMM dd, yyyy"
            is_value_global
            is_value_default
           
            handleSelect={handleSelect}
            prices={calendar}
          ></DatePicker>
        </div>
        <div className="mb-5 rounded-lg">
          <GuestsInput
            name="guest"
            IsShowInfants={data.group ? false : true}
            IsShowChildren={data.group ? false : true}
            IsShowAdults={data.group ? false : true}
            IsShowTravel={data.group ? true : false}
            // max={data.max_person}
            // min={data.min_person}
            max={20}
            min={1}
            fieldClassName="bg-white py-2! border border-gray-400"
          ></GuestsInput>
        </div>
        <Button
          type="submit"
          className="w-full py-6 mb-5 font-bold text-white gtm-check-avail"
        >
          {loading ? (
            <>
              <LoadingSpinner />
            </>
          ) : (
            t("check_availability")
          )}
        </Button>
      </form>
      <div className="flex flex-col gap-2 text-sm text-text1">
        <span className="font-semibold">{t("free_cancellation")}</span>
        
        <span className="font-semibold">{t("reserve_pay_late")}</span>
        <span>{t("secure_your_spot")}</span>
      </div>
      <div ref={scrollRef}></div>
      
    </>
  );
}
