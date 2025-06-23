"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSession } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IconCheck, IconChevronDown, IconMark } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CountryData from "@/data/countryData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { dataSidebar } from "../sidebar";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export interface IAppProps {}
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, index) => currentYear - index,
);
const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  firstname: z.string().nonempty("This value is required."),
  lastname: z.string().nonempty("This value is required."),
  phone_code: z.string().nonempty("This value is required."),
  mobile: z.string().refine((value) => String(value).trim() !== "", {
    message: "This value must be a number.",
  }),
  day: z.string(),
  month: z.string(),
  year: z.string(),
});

export default function App(props: IAppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { update, data: session } = useSession();

  const axiosApi = useAxiosAuth();
  let user = session && (session.user as UserSession | null);
  let token = user && user.access_token;
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openDay, setOpenDay] = React.useState<boolean>(false);
  const [openMonth, setOpenMoth] = React.useState<boolean>(false);
  const [openYear, setOpenYear] = React.useState<boolean>(false);
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
   
  });
  // console.log('customer', customer);
  
  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };
  const onOpenChangeDay = (value: boolean) => {
    setOpenDay(value);
  };
  const onOpenChangeMonth = (value: boolean) => {
    setOpenMoth(value);
  };
  const onOpenChangeYear = (value: boolean) => {
    setOpenYear(value);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
  };
  return (
    <div
      className={`${
        dataSidebar.findIndex((data) => data.href === pathname.slice(1)) === -1
          ? "hidden "
          : ""
      } w-full lg:block lg:w-3/4`}
    >
      <div
        className="flex justify-end lg:hidden"
        onClick={() => router.push(`/account`)}
      >
        <IconMark />
      </div>
      <h2 className="mb-5 text-xl font-semibold">Personal Information</h2>
      <div className="flex flex-col gap-5 rounded-lg border border-slate-300 p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-x-5">
              <div>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem className="cursor-not-allowed">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email"
                        className="pointer-events-none cursor-not-allowed select-none bg-gray-200"
                        readOnly={true}
                        disabled={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className="flex items-end gap-1 md:gap-5">
              <div className="w-2/5 md:w-1/3">
                <FormField
                  control={form.control}
                  name="phone_code"
                  render={({ field }) => (
                    <FormItem className="flex h-full w-full flex-col">
                      <FormLabel
                        className={
                          field.value || !form.formState.errors.phone_code
                            ? "text-text1"
                            : "text-destructive"
                        }
                      >
                        Phone number
                      </FormLabel>
                      <Popover open={open} onOpenChange={onOpenChange}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "h-11 w-full justify-between ",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                (() => {
                                  let country = CountryData.find(
                                    (item) => `+${item.code}` === field.value,
                                  );
                                  return country ? (
                                    <span className="line-clamp-1 text-left">{`(+${country.code}) ${country.country}`}</span>
                                  ) : (
                                    <span className="line-clamp-1 text-left">
                                      Select phone code
                                    </span>
                                  );
                                })()
                              ) : (
                                <span className="line-clamp-1">
                                  Select phone code
                                </span>
                              )}
                              <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search phone code..." />
                            <CommandEmpty>No phone code found.</CommandEmpty>
                            <CommandGroup>
                              {CountryData.map((item, index) => {
                                let labelstr = "";
                                labelstr = `(+${item.code}) ${item.country}`;
                                return (
                                  <CommandItem
                                    key={index}
                                    value={labelstr}
                                    onSelect={() => {
                                      setOpen(false);
                                      form.setValue(
                                        "phone_code",
                                        `+${item.code}`,
                                      );
                                    }}
                                  >
                                    <IconCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        `+${item.code}` === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {labelstr}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage hidden={field.value ? true : false} />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-3/5 md:w-2/3">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </div>
            <div className="flex items-end gap-1 md:gap-5">
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem className="flex h-full w-full flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover open={openDay} onOpenChange={onOpenChangeDay}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "h-11 w-full justify-between ",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                (() => {
                                  let day = days.find(
                                    (item) => String(item) === field.value,
                                  );
                                  return day ? (
                                    <span className="line-clamp-1 text-left">{`${day}`}</span>
                                  ) : (
                                    <span className="line-clamp-1 text-left">
                                      Day{" "}
                                    </span>
                                  );
                                })()
                              ) : (
                                <span className="line-clamp-1">Day</span>
                              )}
                              <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search phone code..." />
                            <CommandEmpty>No day.</CommandEmpty>
                            <CommandGroup>
                              {days.map((item, index) => {
                                let labelstr = item;
                                return (
                                  <CommandItem
                                    key={index}
                                    value={String(labelstr)}
                                    onSelect={() => {
                                      setOpenDay(false);
                                      form.setValue("day", `${item}`);
                                    }}
                                  >
                                    <IconCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        String(item) === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {labelstr}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem className="flex h-full w-full flex-col">
                      <Popover
                        open={openMonth}
                        onOpenChange={onOpenChangeMonth}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "h-11 w-full justify-between ",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                (() => {
                                  let day = months.find(
                                    (item) => String(item) === field.value,
                                  );
                                  return day ? (
                                    <span className="line-clamp-1 text-left">{`${
                                      monthNames[day - 1]
                                    }`}</span>
                                  ) : (
                                    <span className="line-clamp-1 text-left">
                                      Month{" "}
                                    </span>
                                  );
                                })()
                              ) : (
                                <span className="line-clamp-1">Month</span>
                              )}
                              <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search phone code..." />
                            <CommandEmpty>No day.</CommandEmpty>
                            <CommandGroup>
                              {months.map((item, index) => {
                                let labelstr = monthNames[item - 1];
                                return (
                                  <CommandItem
                                    key={index}
                                    value={String(item)}
                                    onSelect={() => {
                                      setOpenMoth(false);
                                      form.setValue("month", `${item}`);
                                    }}
                                  >
                                    <IconCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        String(item) === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {labelstr}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem className="flex h-full w-full flex-col">
                      <Popover open={openYear} onOpenChange={onOpenChangeYear}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "h-11 w-full justify-between ",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                (() => {
                                  let day = years.find(
                                    (item) => String(item) === field.value,
                                  );
                                  return day ? (
                                    <span className="line-clamp-1 text-left">{`${day}`}</span>
                                  ) : (
                                    <span className="line-clamp-1 text-left">
                                      Year{" "}
                                    </span>
                                  );
                                })()
                              ) : (
                                <span className="line-clamp-1">Year</span>
                              )}
                              <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search phone code..." />
                            <CommandEmpty>No day.</CommandEmpty>
                            <CommandGroup>
                              {years.map((item, index) => {
                                let labelstr = item;
                                return (
                                  <CommandItem
                                    key={index}
                                    value={String(labelstr)}
                                    onSelect={() => {
                                      setOpenYear(false);
                                      form.setValue("year", `${item}`);
                                    }}
                                  >
                                    <IconCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        String(item) === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {labelstr}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              className="text-base font-bold text-white"
            >
              Save Changes
            </Button>
            {error && <p className="font-medium text-red-500">{error}</p>}{" "}
            {success && <p className="font-medium text-green-500">{success}</p>}{" "}
          </form>
        </Form>
      </div>
    </div>
  );
}
