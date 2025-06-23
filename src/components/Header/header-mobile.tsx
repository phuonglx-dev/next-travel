"use client";
import { locales } from "@/navigation";
import { SiteProps, UserSession } from "@/types";
import { usePathname } from "next/navigation";
import * as React from "react";
import { IconBars3, IconChevronDown, IconCircleUser, IconMark } from "../icons";
import logo from "@/assets/images/resources/logo.png";
import Image from "next/image";
import MenuMobile from "./MenuMobile";
import useScroll from "@/hooks/useScroll";
import { menuData } from "@/data/menuData";
import TourSearchDesktop from "../Search/TourSearch/header-search/tour-search-desktop";

export interface IHeaderProps {
  className?: string;
  site?: SiteProps;
  locale?: string;
  session?: any;
}

export default function HeaderMobile({
  className,
  site,
  locale,
  session,
}: IHeaderProps) {
  // const { data: session } = useSession();
  // console.log("session 123", session);
  let user = session && (session.user as UserSession | null);
  const pathname = usePathname();
  const [open, setOpen] = React.useState<Boolean>(false);
  const handleToggleMenu = () => {
    setOpen(!open);
  };
  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };
  const scroll = useScroll(410);
  const localesRegex = new RegExp(`^\/(${locales.join("|")})(\/)?$`);
  const isHome = localesRegex.test(pathname) || pathname === "/";
  return (
    <>
      <header
        className={`top-0 left-0 z-40 w-full border-b py-2 transition delay-100 ease-in-out lg:py-4${
          className && className
        }`}
      >
        <div className="container">
          <div className="flex h-full w-full items-center justify-between">
            {/* menu bars */}
            <div
              className="z-60 w-10 cursor-pointer lg:hidden lg:w-0"
              onClick={handleToggleMenu}
            >
              {open ? (
                <IconMark className="fill-text1" />
              ) : (
                <IconBars3 className="fill-text1" />
              )}
            </div>
            {/* logo */}
            <div className="w-36">
              <a href={"/"} aria-label="kapanda">
                <Image
                  src="/img/logo-mix.png"
                  width={250}
                  height={70}
                  className="h-full w-full object-cover"
                  alt={site?.name || ""}
                />
              </a>
            </div>
            {/* nav menu and account */}
            <div className="flex items-center gap-x-4">
              {/* <NavItem menuItem={menuItem || []} /> */}
              {/* <LanguageSwitcher /> */}

              <div
                className="relative z-30 flex items-center gap-x-1 rounded-full border border-slate-400 fill-slate-200 p-2 text-base outline-hidden lg:px-2 lg:py-1"
                onClick={handleOpenMenu}
              >
                {session ? (
                  <div className="bg-secondary flex h-7 w-7 items-center justify-center rounded-full text-white uppercase lg:h-8 lg:w-8">
                    {session && session?.user && session.user
                      ? `${user && user.firstname.charAt(0)}${
                          user && user.lastname.charAt(0)
                        }`
                      : ""}
                  </div>
                ) : (
                  <IconCircleUser className="h-7 w-7 rounded-full bg-slate-400 fill-inherit lg:h-8 lg:w-8" />
                )}
                <IconChevronDown
                  className="relative top-px ml-1 hidden h-2 w-2 transition duration-200 group-data-[state=open]:rotate-180 lg:block"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          {!isHome && <TourSearchDesktop></TourSearchDesktop>}
        </div>
        {/* menu mobile */}
      </header>
      <MenuMobile
        open={!!open}
        menuItem={menuData || []}
        onClose={handleCloseMenu}
        session={session}
      />
    </>
  );
}
