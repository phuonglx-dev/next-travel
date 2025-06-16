'use client';

import * as React from 'react';
import { IconCheck, IconChevronDown } from '../icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import china from '@/assets/images/country/china.png';
import english from '@/assets/images/country/english.png';
import ImageCustom from '../image-custom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';

export interface ILangageProps {
  ismobile?: boolean;
}

type Tlangage = {
  id: number;
  title: string;
  src: string;
  code: string;
};
let data: Tlangage[] = [
  {
    id: 1,
    title: 'English',
    src: english.src,
    code: 'en',
  },
  {
    id: 2,
    title: '简体中文',
    src: china.src,
    code: 'zh',
  },
];

export default function LanguageSwitcher({ ismobile = false }: ILangageProps) {
  const locale = useLocale();
  const pathname = usePathname()
  const router = useRouter();
  const [country, setCountry] = React.useState<Tlangage>(
    data.find((item) => item.code === locale) || data[0]
  );

  const switchLocale = (code: string) => {
    
  };

  return (
    <>
      <div className="hidden lg:flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-1">
              <div className="relative object-fill w-8 h-8 rounded-full">
                <ImageCustom
                  className="object-fill rounded-full"
                  image_alt={country.title}
                  src={country.src}
                />
              </div>
              <IconChevronDown
                className="top-px fill-text1 ml-1 h-2 w-2 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="hidden lg:block relative py-0 px-0 z-100 min-w-40 cursor-pointer ">
            <div className="flex flex-col">
              {data.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex justify-between ${country.id === item.id && 'bg-slate-200'
                    } hover:bg-slate-200 py-3 px-2`}
                  onClick={() => switchLocale(item.code)}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5">
                      {country.id === item.id && (
                        <IconCheck
                          className={`w-5 h-5 fill-secondary`}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span
                      className={`text-sm ${country.id === item.id && 'text-secondary'
                        }`}>
                      {item.title}
                    </span>
                  </div>
                  <div className="relative w-4 h-4">
                    <ImageCustom
                      className="object-fill rounded-full"
                      image_alt={item.title}
                      src={item.src}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {ismobile && (
        <div className="flex w-full lg:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={country.title}>
              <AccordionTrigger className="w-full">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full">
                      <ImageCustom
                        className="object-fill rounded-full"
                        image_alt={country.title}
                        src={country.src}
                      />
                    </div>
                    <span className={`text-sm`}>{country.title}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="relative py-0 px-0 z-100 min-w-40 cursor-pointer ">
                <div className="flex flex-col">
                  {data.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex justify-between ${country.id === item.id && 'bg-slate-200'
                        } hover:bg-slate-200 py-3 px-2`}
                      onClick={() => switchLocale(item.code)}
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5">
                          {country.id === item.id && (
                            <IconCheck
                              className={`w-5 h-5 fill-secondary`}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <span
                          className={`text-sm ${country.id === item.id && 'text-secondary'
                            }`}>
                          {item.title}
                        </span>
                      </div>
                      <div className="relative w-4 h-4">
                        <ImageCustom
                          className="object-fill rounded-full"
                          image_alt={item.title}
                          src={item.src}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  );
}
