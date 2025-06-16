"use client";
import * as React from "react";

import { Link } from "@/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { UserSession } from "@/types";
import {
  IconArrowRightFromBracket,
  IconBookBookmark,
  IconChevronDown,
  IconCircleUser,
  IconUser,
} from "../icons";
import { useTranslations } from "next-intl";

export interface IAccountProps {
  openMenu?: () => void;
  session?: any;
}

export default function Account({ openMenu, session }: IAccountProps) {
  const t = useTranslations("account");
  // const { data: session } = useSession();
  let user = session && (session.user as UserSession | null);
  // console.log('account', user);
  let login = "login";
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={(user && user.firstname + user.lastname) || "Aria Name"}
          className="relative z-50 flex items-center gap-x-1 rounded-full border border-slate-300 fill-slate-200 p-2 text-base outline-hidden lg:px-2 lg:py-1"
        >
          {session ? (
            <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full text-white uppercase">
              {session && session?.user && session.user
                ? `${user && user.firstname.charAt(0)}${
                    user && user.lastname.charAt(0)
                  }`
                : ""}
            </div>
          ) : (
            <IconCircleUser className="h-8 w-8 rounded-full bg-slate-400 fill-inherit" />
          )}
          <IconChevronDown
            className="fill-text1 relative top-px ml-1 h-2 w-2 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="relative z-100 px-4 py-3">
          {!session && (
            <>
              <DropdownMenuItem className="p-0">
                <Link
                  href={`/${login}`}
                  className="flex items-center gap-x-2 rounded-lg p-2 font-medium hover:bg-slate-100"
                  passHref
                >
                  <IconUser className="fill-text1 h-4 w-4" />
                  <span> {t("login_signup")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link
                  href={`/booking`}
                  className="flex items-center gap-x-2 rounded-lg p-2 font-medium hover:bg-slate-100"
                  passHref
                >
                  <IconBookBookmark className="fill-text1 h-4 w-4" />
                  <span> {t("my_booking")}</span>
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
            </>
          )}
          {session && (
            <>
              <DropdownMenuItem className="p-0">
                <Link
                  href={`/account/bookings`}
                  className="flex items-center gap-x-2 rounded-lg p-2 font-medium hover:bg-slate-100"
                  passHref
                >
                  <IconBookBookmark className="fill-text1 h-4 w-4" />
                  <span>{t("my_bookings")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link
                  href={`/account/profile`}
                  className="flex items-center gap-x-2 rounded-lg p-2 font-medium hover:bg-slate-100"
                  passHref
                >
                  <IconUser className="fill-text1 h-4 w-4" />
                  <span> {t("profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex cursor-pointer items-center gap-x-2 rounded-lg p-2 hover:bg-slate-100">
                <IconArrowRightFromBracket className="fill-text1 h-4 w-4" />
                <span onClick={() => signOut()} className="ml-1 font-medium">
                  {t("logout")}
                </span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
