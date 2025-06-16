"use client";

import React, { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";

import ClearDataButton from "./ClearDataButton";
import { IconUserPlus } from "@/components/icons";
import type { Route as NextRoute } from "next";
import NcInputNumber from "./NcInputNumber";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export type Route<T = string> = NextRoute;
export type PathName = Route;
export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
  guestTravels?: number;
}
export interface GuestsInputProps {
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
  name?: string;
  placeholder?: string;
  IsShowTravel?: boolean;
  IsShowAdults?: boolean;
  IsShowChildren?: boolean;
  IsShowInfants?: boolean;
  min?: number;
  max?: number;
}

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  buttonSubmitHref = "/listing-stay-map",
  hasButtonSubmit = true,
  name,
  placeholder,
  IsShowTravel = false,
  IsShowAdults = false,
  IsShowInfants = false,
  IsShowChildren = false,
  min = 1,
  max = 15,
}) => {
  const t = useTranslations("tour");
  const [guestTravelsInputValue, setGuestTravelsInputValue] = useState(
    IsShowTravel ? 1 : 0,
  );
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    IsShowTravel ? 0 : 1,
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);
  const [disabled, setDisabled] = useState({
    guestTravels: false,
    guestAdults: false,
    guestChildren: false,
    guestInfants: false,
  });
  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestTravels: guestTravelsInputValue,
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestTravels") {
      let total =
        newValue.guestChildren +
        newValue.guestInfants +
        newValue.guestAdults +
        value;
      if (total >= max) {
        setDisabled((prev) => {
          return {
            guestTravels: true,
            guestChildren: true,
            guestAdults: true,
            guestInfants: true,
          };
        });
      } else {
        setDisabled((prev) => {
          return {
            guestTravels: false,
            guestAdults: false,
            guestChildren: false,
            guestInfants: false,
          };
        });
      }
      setGuestTravelsInputValue(value);
      newValue.guestTravels = value;
    }
    if (type === "guestAdults") {
      let total =
        newValue.guestChildren +
        newValue.guestInfants +
        newValue.guestTravels +
        value;
      if (total >= max) {
        setDisabled((prev) => {
          return {
            guestTravels: true,
            guestChildren: true,
            guestAdults: true,
            guestInfants: true,
          };
        });
      } else {
        setDisabled((prev) => {
          return {
            guestTravels: false,
            guestAdults: false,
            guestChildren: false,
            guestInfants: false,
          };
        });
      }
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      let total =
        newValue.guestAdults +
        newValue.guestInfants +
        newValue.guestTravels +
        value;
      if (total >= max) {
        setDisabled((prev) => {
          return {
            guestTravels: true,
            guestChildren: true,
            guestAdults: true,
            guestInfants: true,
          };
        });
      } else {
        setDisabled((prev) => {
          return {
            guestTravels: false,
            guestAdults: false,
            guestChildren: false,
            guestInfants: false,
          };
        });
      }
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      let total =
        newValue.guestAdults +
        newValue.guestChildren +
        newValue.guestTravels +
        value;
      if (total >= max) {
        setDisabled((prev) => {
          return {
            guestTravels: true,
            guestChildren: true,
            guestAdults: true,
            guestInfants: true,
          };
        });
      } else {
        setDisabled((prev) => {
          return {
            guestTravels: false,
            guestAdults: false,
            guestChildren: false,
            guestInfants: false,
          };
        });
      }
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
  };

  const totalGuests =
    guestTravelsInputValue +
    guestChildrenInputValue +
    guestAdultsInputValue +
    guestInfantsInputValue;
  const valules: GuestsObject = {};
  if (IsShowTravel) {
    valules.guestTravels = guestTravelsInputValue;
  }
  if (IsShowAdults) {
    valules.guestAdults = guestAdultsInputValue;
  }
  if (IsShowChildren) {
    valules.guestChildren = guestChildrenInputValue;
  }
  if (IsShowInfants) {
    valules.guestInfants = guestInfantsInputValue;
  }

  return (
    <Popover className={`relative flex ${className}`}>
      {({ open, close }) => (
        <>
          <div className={`z-10 flex flex-1 items-center focus:outline-hidden`}>
            <Popover.Button
              className={`[ nc-hero-field-padding ] relative z-10 flex flex-1 items-center rounded-lg text-left ${fieldClassName} space-x-3 focus:outline-hidden`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <IconUserPlus className="h-5 w-5 fill-neutral-400 lg:h-7 lg:w-7" />
              </div>
              <div className="grow">
                <input
                  type="text"
                  value={JSON.stringify(valules) || ""}
                  name={name}
                  readOnly={true}
                  className="hidden"
                />
                <span className="line-clamp-1 font-normal xl:text-base">
                  {guestTravelsInputValue
                    ? guestTravelsInputValue + " " + t("travels")
                    : ""}
                  {guestAdultsInputValue
                    ? guestAdultsInputValue + " " + t("adults")
                    : ""}
                  {guestChildrenInputValue
                    ? ", " + guestChildrenInputValue + " " + t("children")
                    : ""}
                  {guestInfantsInputValue
                    ? ", " + guestInfantsInputValue + " " + t("infants")
                    : ""}
                </span>
                {placeholder && (
                  <span className="mt-1 block text-sm leading-none font-light text-neutral-400">
                    {totalGuests ? t("guests") : t("add_guests")}
                  </span>
                )}
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestTravelsInputValue(IsShowTravel ? min : 0);
                    setGuestAdultsInputValue(IsShowTravel ? 0 : min);
                    setGuestChildrenInputValue(0);
                    setGuestInfantsInputValue(0);
                  }}
                />
              )}
            </Popover.Button>
          </div>

          {open && (
            <div className="absolute top-1/2 right-0.5 -left-0.5 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute top-full right-0 z-10 mt-3 w-full max-w-sm rounded-lg bg-white px-4 py-5 shadow-xl sm:min-w-[340px] sm:px-8 sm:py-6 dark:bg-neutral-800">
              <div className="text-text1 mb-5 text-sm">
                {t("max_person", { max })}
              </div>
              {IsShowTravel && (
                <NcInputNumber
                  className="w-full"
                  defaultValue={guestTravelsInputValue}
                  onChange={(value) =>
                    handleChangeData(Number(value), "guestTravels")
                  }
                  isdisabled={disabled.guestTravels}
                  max={max}
                  min={min}
                  label={t("traveler")}
                  desc={t("travel_min_max", {
                    min_person: min,
                    max_person: max,
                  })}
                />
              )}
              {IsShowAdults && (
                <NcInputNumber
                  className="w-full"
                  defaultValue={guestAdultsInputValue}
                  onChange={(value) =>
                    handleChangeData(Number(value), "guestAdults")
                  }
                  isdisabled={disabled.guestAdults}
                  max={max}
                  min={min}
                  label={t("adults")}
                  desc={t("adult_age")}
                />
              )}
              {IsShowChildren && (
                <NcInputNumber
                  className="mt-6 w-full"
                  defaultValue={guestChildrenInputValue}
                  isdisabled={disabled.guestChildren}
                  onChange={(value) =>
                    handleChangeData(Number(value), "guestChildren")
                  }
                  max={max}
                  label={t("children")}
                  desc={t("child_age")}
                />
              )}
              {IsShowInfants && (
                <NcInputNumber
                  className="mt-6 w-full"
                  defaultValue={guestInfantsInputValue}
                  isdisabled={disabled.guestInfants}
                  onChange={(value) =>
                    handleChangeData(Number(value), "guestInfants")
                  }
                  max={max}
                  label={t("infants")}
                  desc={t("infant_age")}
                />
              )}
              <div className="mt-5 flex w-full">
                <Button className="w-full text-white" onClick={() => close()}>
                  {t("apply")}
                </Button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
