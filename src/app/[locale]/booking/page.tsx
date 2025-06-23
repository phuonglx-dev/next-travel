import { Link } from "@/navigation";
import * as React from "react";
import FormSearchBooking from "./FormSearchBooking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/util/authOptions";
import { redirect } from "next/navigation";

export interface ISearchBookingProps {}

export default async function SearchBooking(props: ISearchBookingProps) {
  const session = await getServerSession(authOptions);

  // console.log("session", session);
  if (session) {
    return redirect("/");
  }
  return (
    <div className="container py-10 ">
      <div className="mx-auto max-w-md">
        <div className="mb-5 px-5">
          <h2 className="mb-3 flex items-center justify-center text-xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-3xl md:leading-[115%]">
            Manage my booking
          </h2>
          <p className="text-center">
            View, Change or cancel your booking easily online
          </p>
        </div>
        <div className="mb-5 rounded-lg border border-secondary bg-transparent_secondary p-5">
          <h2 className="font-bold text-neutral-900">Have an account?</h2>
          <div className="text-left">
            Click to{" "}
            <Link
              href={"/login?callback=/booking"}
              className="font-medium text-secondary underline"
            >
              log in
            </Link>{" "}
            to review all your bookings with ease.
          </div>
        </div>
        <FormSearchBooking />
        <div className="mt-5">
          <div className="text-center font-semibold">
            Can’t find your booking information?
          </div>
          <div className="text-center">
            Don’t worry, we’re here to help. Feel free to{" "}
            <Link
              href={"/support"}
              className="font-medium text-secondary underline"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
