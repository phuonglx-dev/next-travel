import { IconCalendar } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLocalStorage from "@/hooks/useLocalStorage";
import { convertToAnyTimezone } from "@/lib/time-helper";
import { format } from "date-fns";
import { enUS, zhCN } from "date-fns/locale";
import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";

export interface IModalDatepickerProps {
  handleChangeDate?: (date: Date | undefined) => void;
  value?: Date | undefined;
  is_value_global?: boolean;
}

export default function ModalDatePicker({
  handleChangeDate,
  is_value_global = false,
  value,
}: IModalDatepickerProps) {
  const t = useTranslations("index");
  const t_common = useTranslations("common");
  const [valueD, setValue] = useLocalStorage("date", "");
  const locale = useLocale();
  let locale_d;
  switch (locale) {
    case "zh":
      locale_d = zhCN;
      break;
    default:
      locale_d = enUS;
  }

  const [date, setDate] = React.useState<Date | undefined>(undefined);

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
    if (valueD && is_value_global) {
      let date_local_string = convertToAnyTimezone(valueD).toISOString();

      if (date_local_string.endsWith("Z")) {
        date_local_string = date_local_string.slice(0, -1); // Cắt bỏ ký tự 'Z'
      }
      const date_localStore = new Date(
        dayjs().isAfter(convertToAnyTimezone(valueD))
          ? new_date
          : date_local_string,
      );
      setDate(date_localStore);

      handleChangeDate && handleChangeDate(date_localStore);
      return;
    }
  }, [valueD, value, is_value_global]);
  const [openModal, setOpen] = React.useState<boolean>(false);
  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSelectDate = () => {
    date && handleChangeDate && handleChangeDate(date);
    onClose();
  };
  const handleResetDate = () => {
    setDate(undefined);
    handleChangeDate && handleChangeDate(undefined);
  };
  return (
    <>
      <Dialog open={openModal} onOpenChange={onOpenChange}>
        <DialogTrigger>
          {" "}
          <div className="flex w-full items-center gap-5 rounded-full border border-gray-300 bg-white px-6 py-3 ">
            <IconCalendar className="w-4 h-4 fill-text1" />
            <span className=" text-text1">
              {date
                ? format(date, "MMM dd", { locale: locale_d })
                : t("select_date")}
            </span>
          </div>
        </DialogTrigger>
        {/* max-w-full max-h-full inset-0 translate-x-0 translate-y-0 */}
        <DialogContent
          className={`inset-0 sm:max-h-full sm:max-w-full md:h-auto
          md:w-auto
         `}
        >
          <DialogHeader>
            <DialogTitle className="w-full mb-5">
              {" "}
              {t("select_date")}
            </DialogTitle>

            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              locale={locale_d}
              className={"modal-date-picker w-full"}
              disabled={(date) => {
                const today = new Date();
                return (
                  date <
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                  )
                );
              }}
              defaultMonth={new Date(dayjs(date).year(), dayjs(date).month())}
            />
            <div className="flex w-full pb-5 gap-x-3">
              <Button
                variant={"outline"}
                className="w-1/2 text-primary hover:text-primary"
                onClick={handleResetDate}
              >
                {t_common("reset")}
              </Button>
              <Button className="w-1/2 text-white" onClick={handleSelectDate}>
                {t_common("apply")}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
