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
import { useLocale, useTranslations } from "next-intl";
import { enUS, zhCN } from "date-fns/locale";
import { convertToAnyTimezone } from "@/lib/time-helper";
import dayjs from "dayjs";

interface Props {
  className?: string;
  name?: string;
  control?: any;
  children?: React.ReactNode;
  value?: Date | undefined;
  placeholder?: string;
  clear?: boolean;
  autoFocus?: boolean;
  // Rest properties
  [key: string]: any;
  keyD?: number;
}

export function DatePicker({
  className,
  name,
  control,
  children,
  value,
  clear,
  autoFocus = false,
  keyD,
  placeholder = "Pick a date",
  ...props
}: Props) {
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

  const [valueD, setValue] = useLocalStorage("date", "");

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    !date && setOpen(autoFocus);
  }, [autoFocus, keyD, date]);

  React.useEffect(() => {
    const new_date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    );
    if (value) {
      setDate(value);
      return;
    }
    if (valueD) {
      if (dayjs().isAfter(convertToAnyTimezone(valueD))) {
        setDate(new Date(new_date));
        return;
      } else {
        let date_local = convertToAnyTimezone(valueD).toISOString();

        if (date_local.endsWith("Z")) {
          date_local = date_local.slice(0, -1); // Cắt bỏ ký tự 'Z'
        }
        setDate(new Date(date_local));
        return;
      }
    }
  }, [valueD, value]);
  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };
  const onSelectDepartDate = (value: Date | undefined) => {
    console.log("valueeeeee", value);
    if (value) {
      setDate(value);
    }
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "PopoverContent [ nc-hero-field-padding ] relative w-[280px] shrink-0 justify-start text-left font-normal hover:bg-transparent ",
            !date && "text-muted-foreground",

            className,
          )}
        >
          <IconCalendar className="mr-2 h-5 w-5 fill-primary lg:h-6 lg:w-6" />
          <input
            type="text"
            value={String(date)}
            name={name}
            readOnly={true}
            className="hidden"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-text1">{t("when")}</span>
            {date ? (
              format(date, "MMM dd", { locale: locale_d })
            ) : (
              <span className="text-[#000000a8]">{t_index("select_date")}</span>
            )}
          </div>
          {date && clear && (
            <ClearDataButton
              className="md:right-20"
              onClick={() => setDate(undefined)}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent autoFocus={true} className="w-full p-0 lg:w-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => onSelectDepartDate(value)}
          initialFocus
          className={"w-full"}
          locale={locale_d}
          disabled={(date) => {
            const today = new Date();
            return (
              date <
              new Date(today.getFullYear(), today.getMonth(), today.getDate())
            );
          }}
          defaultMonth={new Date(dayjs(date).year(), dayjs(date).month())}
        />
        <div className="flex w-full gap-x-3 px-5 pb-5">
          <Button
            variant={"outline"}
            className="w-1/2 text-primary hover:text-primary"
            onClick={() => setDate(undefined)}
          >
           Reset
          </Button>
          <Button className="w-1/2 text-white" onClick={() => setOpen(false)}>
            {t("apply")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
