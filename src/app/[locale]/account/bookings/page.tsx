"use client";
import { OrderProps, UserSession } from "@/types";
import * as React from "react";
import { useSession } from "next-auth/react";

import ImageCustom from "@/components/image-custom";
import {
  IconCalendar,
  IconCartShopping,
  IconMark,
  IconUser,
} from "@/components/icons";
import { usePathname, useRouter } from "next/navigation";
import { dataSidebar } from "../sidebar";
import { Link } from "@/navigation";
import { convertToAnyTimezone } from "@/lib/time-helper";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types/enum";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import orders from "@/data/orderData";

export interface IBookingsProps {}

export default function Bookings(props: IBookingsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  let user = session && (session.user as UserSession | null);
  let token = user && user.access_token;
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const bookings = orders;

  return (
    <div
      className={`${
        dataSidebar.findIndex((data) => data.href === pathname.slice(1)) === -1
          ? "hidden"
          : ""
      } w-full lg:block lg:w-3/4`}
    >
      <div
        className="flex justify-end lg:hidden"
        onClick={() => router.push(`/account`)}
      >
        <IconMark />
      </div>
      <h2 className="mb-5 text-xl font-semibold">My bookings</h2>
      <div
        className="flex flex-col gap-5 rounded-lg border border-slate-300 p-5"
        ref={scrollRef}
      >
        {bookings &&
          bookings.data &&
          bookings?.data.length > 0 &&
          bookings?.data.map((booking, index) => {
            return (
              <div key={booking.id}>
                <BookingDetail booking={booking} />
                {index + 1 !== bookings.data.length && (
                  <div className="my-2 border-b border-slate-300" />
                )}
              </div>
            );
          })}
        {bookings && bookings?.total <= 0 && (
          <div className="mt-10 flex flex-col items-center justify-center gap-2 lg:gap-5">
            <h1 className="text-2xl font-bold">No Active Bookings</h1>
            <Link href={"/"} className="underline">
              Find your next unforgettable experience with us.
            </Link>
          </div>
        )}
        {/* pagination  */}
      </div>
    </div>
  );
}

const BookingDetail = ({ booking }: { booking: any }) => {
  let tour = booking.tour || {};
  const t = useTranslations("tour");
  const router = useRouter();
  const handleViewOrderDetail = () => {
    router.push(`#`);
  };
  return (
    <div className="flex flex-col items-start gap-5 md:flex-row">
      <div className="flex flex-1 items-start gap-5">
        <Link
          href={`#`}
          aria-label={tour?.title}
          className="relative h-20 w-1/3 rounded-lg md:h-36"
        >
          <ImageCustom
            src={tour?.image || ""}
            image_alt={tour?.title ? tour.title : ""}
            className="aspect-163/143 h-full rounded-lg"
          />
        </Link>
        <div className="w-2/3">
          <div className="flex items-center gap-5">
            <span
              className={cn(
                "w-max rounded-xs border px-2 py-0.5 text-sm uppercase",
                booking.order_status === OrderStatus.CONFIRMED
                  ? "text-green-500"
                  : "text-red-500",
              )}
            >
              {booking.order_status === OrderStatus.CONFIRMED && "CONFIRMED"}
              {booking.order_status === OrderStatus.CANCELLED && "CANCELLED"}
            </span>
            <div className="text-text1 text-sm">{booking.order_no}</div>
          </div>
          <Link
            href={`#`}
            className="text-text1 mb-3 line-clamp-2 flex-1 text-left font-bold"
            aria-label={tour?.title ? tour.title : ""}
          >
            {tour?.title ? tour.title : ""}
          </Link>
          <div className="flex flex-col gap-2 pb-5">
            <div className="flex items-center gap-2 text-sm">
              <IconUser className="fill-secondary h-4 w-4" />
              <span>
                {booking?.adults}{" "}
                {booking?.option?.tour?.group ? t("travels") : t("adults")}{" "}
                {booking?.children > 0
                  ? ", " +
                    String(booking?.children) +
                    " " +
                    t("children") +
                    ", "
                  : ""}
                {booking?.infants > 0
                  ? booking?.infants + " " + t("infants")
                  : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconCalendar className="fill-secondary h-4 w-4" />
              <span>
                {convertToAnyTimezone(booking.depart_date).format(
                  "dddd, MMMM DD, YYYY • hh:mm A",
                )}{" "}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconCartShopping className="fill-secondary h-4 w-4" />
              <span>Luxury sedan car</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconMark className="fill-primary h-4 w-4" />
              <span>
                Free cancellation before{" "}
                {convertToAnyTimezone(booking.free_cancel_date).format(
                  "dddd, MMMM DD, YYYY • hh:mm A",
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4">
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            onClick={handleViewOrderDetail}
            className="bg-primary hover:bg-primary-dark h-auto w-full text-sm font-normal text-white"
          >
            View detail
          </Button>
        </div>
      </div>
    </div>
  );
};
