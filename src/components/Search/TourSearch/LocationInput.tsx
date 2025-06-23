"use client";
import { IconCarLight, IconCheck, IconMapPin } from "@/components/icons";
import { Combobox, Transition } from "@headlessui/react";
import React, { useState, FC, Fragment } from "react";
import ClearDataButton from "./ClearDataButton";
import useDebounce from "@/hooks/useDebounce";
import { useTranslations } from "next-intl";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  name?: string;
  handleSelect?: (item: ValueProps) => void;
  data?: ValueProps[];
  value?: ValueProps | null;
  error?: boolean;
}

export interface ValueProps {
  id?: number;
  title?: string;
  type?: "destination" | "tour";
  slug?: string;
}

const LocationInput: FC<LocationInputProps> = ({
  placeHolder = "Search for a place or activity",
  desc = "Where to?",
  className = "nc-flex-1.5",
  name,
  data,
  value: valueLocation,
  error = false,
  handleSelect = (ValueProps: ValueProps) => ValueProps,
}) => {
  const t = useTranslations("index");
  const [selected, setSelected] = useState<ValueProps | null>();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);
  let dataSearch =
    data &&
    data?.length > 0 &&
    data.filter((person) => {
      return (
        person.title &&
        person.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    });

  const handleSelection = (value: ValueProps) => {
    setSelected(value);
    handleSelect(value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const value = e.target.value;
    if (value.trim() !== "") {
      setQuery(value);
    }
  };
  return (
    <div className={`relative flex ${className}`}>
      <div
        className={`relative z-10 flex flex-1 shrink-0 cursor-pointer items-center space-x-3 text-left focus:outline-hidden`}
      >
        <div className="grow">
          <Combobox value={selected || ""} onChange={handleSelection}>
            <div>
              <Combobox.Button className="PopoverContent w-full cursor-pointer">
                <div className="[ nc-hero-field-padding ] relative flex w-full cursor-default items-center gap-x-1 overflow-hidden rounded-full bg-white text-left sm:text-base">
                  <div className="text-neutral-300 dark:text-neutral-400">
                    <IconMapPin className="fill-primary h-5 w-5 lg:h-7 lg:w-7" />
                  </div>

                  <div className="flex w-full flex-col items-start justify-start gap-1 pr-2">
                    <span
                      className={`font-semibold ${
                        error ? "text-red-500" : "text-text1"
                      }`}
                    >
                      {t("where_to")}
                    </span>
                    <Combobox.Input
                      className="placeholder-color w-full text-base leading-5 text-gray-900 outline-hidden focus:ring-0"
                      placeholder={t("search_for_place")}
                      autoComplete="off"
                      displayValue={(person: ValueProps) => person?.title || ""}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                {selected && (
                  <ClearDataButton onClick={() => setSelected(null)} />
                )}
                <input
                  type="text"
                  name={name}
                  id={name}
                  value={JSON.stringify(selected) || ""}
                  readOnly={true}
                  placeholder={placeHolder}
                  className="hidden"
                />
              </Combobox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="ring-opacity-5 absolute mt-1 max-h-96 w-full list-none! overflow-auto rounded-md bg-white p-0! text-base shadow-lg ring-1 ring-black focus:outline-hidden sm:text-base lg:w-[200%]">
                  {dataSearch &&
                    debouncedQuery === "" &&
                    dataSearch.map((person) => (
                      <Combobox.Option
                        key={`${person.id}${person.title}`}
                        className={({ active }) =>
                          `relative mb-0! cursor-pointer py-3 pr-4 pl-10 select-none ${
                            active ? "text-text1 bg-slate-100" : "text-text1"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center gap-5">
                              <span>
                                {person.type === "destination" ? (
                                  <IconMapPin className="fill-secondary" />
                                ) : (
                                  <IconCarLight className="fill-secondary" />
                                )}
                              </span>
                              <span className={`block truncate font-bold`}>
                                {person.title}
                              </span>
                            </div>
                            {selected ? (
                              <span
                                className={`text-primary absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <IconCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
