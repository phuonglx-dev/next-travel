"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IconCalendar } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ClearDataButton from "./ClearDataButton";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";
import { enUS, zhCN } from "date-fns/locale";
import { convertToAnyTimezone, formatAsISOString } from "@/lib/time-helper";
import { ITourCalendarPrice } from "@/types";


interface CalendarProps {
  className?: string;
  name?: string;
  control?: any;
  children?: React.ReactNode;
  value?: Date | undefined;
  placeholder?: string;
  handleSelect?: (date: Date | undefined) => void;
  keyFocus?: number;
  autoFocus?: boolean;
  formatDate?: string;
  clear?: boolean;
  is_footer?: boolean;
  is_value_global?: boolean;
  is_value_default?: boolean;
  [key: string]: any;
  is_cut_off_time?: boolean;
  prices?: ITourCalendarPrice[];
}

export function DatePicker({
  className,
  name,
 
  value,
  clear,
  autoFocus = false,
  keyFocus,
  formatDate,
  handleSelect,
  placeholder = "Pick a date",
  is_value_global = false,
  is_footer = false,
  is_value_default = false,
  is_cut_off_time = true,
  prices,
  ...props
}: CalendarProps) {
  const t = useTranslations("common");
  const t_index = useTranslations("index");
  const locale = useLocale();
  let locale_d;
  switch (locale) {
    case "zh":
      locale_d = zhCN;
      break;
    default:
      locale_d = enUS;
  }
  const [valueLocalStore, setValue] = useLocalStorage("date", "");

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState<boolean>(false);


  React.useEffect(() => {
    if (!prices || prices.length === 0) return;

    // Check if the current `date` is in `prices`
    const validDates = prices?.map((price) => dayjs(price.date).format("YYYY-MM-DD")) || [];
    const selectedDateKey = date ? dayjs(date).format("YYYY-MM-DD") : null;

    if (selectedDateKey && validDates.includes(selectedDateKey)) {
      // Date is valid, no need to update
      return;
    }

    // Assign to the first valid date in `prices`
    const firstValidDate = new Date(prices[0].date);
    setDate(firstValidDate);
    handleSelect && handleSelect(firstValidDate);
  }, [date, prices, handleSelect]);


  React.useEffect(() => {
    let new_date;
    if (is_cut_off_time) {
      new_date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      );
    } else {
      new_date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
      );
    }
    if (value) {
      setDate(value);
      return;
    }
    if (valueLocalStore && is_value_global) {
      let date_local_string =
        convertToAnyTimezone(valueLocalStore).toISOString();

      if (date_local_string.endsWith("Z")) {
        date_local_string = date_local_string.slice(0, -1); // Cắt bỏ ký tự 'Z'
      }
      const date_localStore = new Date(
        dayjs().isAfter(convertToAnyTimezone(valueLocalStore))
          ? new_date
          : date_local_string,
      );
      setDate(date_localStore);
      handleSelect && handleSelect(date_localStore);
      return;
    }
    // console.log("Date", dayjs());
    if (is_value_default) {
      setDate(new_date);
      handleSelect && handleSelect(new_date);
      return;
    }
  }, [valueLocalStore, value]);

  React.useEffect(() => {
    !date && setOpen(autoFocus);
  }, [autoFocus, keyFocus, date]);

  React.useEffect(() => {
    !clear && setOpen(false);
  }, [clear, date]);

  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };

  const handleClearDate = () => {
    setDate(undefined);
    handleSelect && handleSelect(undefined);
  };
  const handleApllyDate = () => {
    if (date && handleSelect) {
      const formattedValue = formatAsISOString(date);
      handleSelect(date);
      setValue(formattedValue);
      setOpen(false);
    }
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "!hover:bg-transparent [ nc-hero-field-padding ] relative w-[280px]  shrink-0 justify-start gap-x-2 text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <IconCalendar className="w-5 h-5 mr-2 fill-neutral-300 lg:h-6 lg:w-6" />
          <input
            type="text"
            value={String(date)}
            name={name}
            readOnly={true}
            className="hidden"
          />
          {date ? (
            formatDate ? (
              <span className="text-base font-medium">
                {format(date, formatDate, { locale: locale_d })}
              </span>
            ) : (
              <span className="text-base font-medium">
                {format(date, "MMM dd", { locale: locale_d })}
              </span>
            )
          ) : (
            <span className="text-text3 ">{placeholder}</span>
          )}
          {date && clear && (
            <ClearDataButton onClick={handleClearDate}></ClearDataButton>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={"start"}
        autoFocus={true}
        className="w-full p-0 lg:w-full"
      >
        <Calendar
          prices={prices}
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={locale_d}
          initialFocus
          className={"w-full "}
          // disabled={(date) => {
          //   const today = new Date();
          //   let new_date;
          //   if (is_cut_off_time) {
          //     new_date = new Date(
          //       today.getFullYear(),
          //       today.getMonth(),
          //       today.getDate(),
          //     );
          //   } else {
          //     new_date = new Date(
          //       today.getFullYear(),
          //       today.getMonth(),
          //       today.getDate() + 1,
          //     );
          //   }
          //   return date < new_date;
          // }
          
          // }
          defaultMonth={new Date(dayjs(date).year(), dayjs(date).month())}
        />
        {is_footer && (
          <div className="flex w-full px-5 pb-5 gap-x-3">
            <Button
              variant={"outline"}
              className="w-1/2 text-primary hover:text-primary"
              onClick={handleClearDate}
            >
              Reset
            </Button>
            <Button className="w-1/2 text-white" onClick={handleApllyDate}>
              Apply
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
