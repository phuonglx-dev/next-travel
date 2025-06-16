import * as React from "react";
import {
  IconClock,
  IconHandHoldingHeart,
  IconMessageSmile,
  IconMoneyBillTransfer,
} from "../icons";
import { useTranslations } from "next-intl";

export interface IWhyChooseProps {
  className?: string;
}

export default function WhyChoose({ className }: IWhyChooseProps) {
  const t = useTranslations("index");
  return (
    <div className={`py-10 ${className}`}>
      <div className="text-text1 mb-10 text-center text-2xl font-semibold">
        <h2>{t("why_choose_us")}</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <IconMoneyBillTransfer className="fill-primary mx-auto h-8 w-8" />
          <h2 className="text-text1 p-2 text-xl font-semibold md:p-5">
            {t("why_choose_1")}
          </h2>
          <p>{t("why_choose_1_text")}</p>
        </div>
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <IconMessageSmile className="fill-primary mx-auto h-8 w-8" />
          <h2 className="text-text1 p-2 text-xl font-semibold md:p-5">
            {t("why_choose_2")}
          </h2>
          <p>{t("why_choose_2_text")}</p>
        </div>
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <IconHandHoldingHeart className="fill-primary mx-auto h-8 w-8" />
          <h2 className="text-text1 p-2 text-xl font-semibold md:p-5">
            {t("why_choose_3")}
          </h2>
          <p>{t("why_choose_3_text")}</p>
        </div>
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <IconClock className="fill-primary mx-auto h-8 w-8" />
          <h2 className="text-text1 p-2 text-xl font-semibold md:p-5">
            {t("why_choose_4")}
          </h2>
          <p>{t("why_choose_4_text")}</p>
        </div>
      </div>
    </div>
  );
}
