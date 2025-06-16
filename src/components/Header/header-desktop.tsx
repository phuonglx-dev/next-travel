
import Image from "next/image";
import Account from "./account";
import { SiteProps } from "@/types";
import NextIntlProvider from "../providers/NextIntlProvider";
import { NextAuthProvider } from "../providers";
import { menuData } from "@/data/menuData";
import NavItem from "./navitem";
export interface IHeaderProps {
  className?: string;
  site?: SiteProps;
  locale?: string;
  session?: any;
}
export default async function HeaderDesktop({
  className,
  site,
  locale,
  session,
}: IHeaderProps) {

  return (
   
    <>
      <header
        className={` left-0 top-0 z-50 w-full border-b border-slate-200  py-2 transition delay-100 ease-in-out lg:py-4`}
      >
        <div className="container ">
          <div className="flex h-full w-full items-center justify-between">
            {/* logo */}
            <div className="flex items-center gap-5">
              <div className="w-48">
                <a href={"/"} aria-label="kapanda" className="block">
                  <Image
                    width={200} height={100}
                    src="/img/logo-mix.png"
                    className="h-full w-full object-cover"
                    alt={site?.name || ""}
                  />
                </a>
              </div>
              
            </div>
            {/* nav menu and account */}
            <div className="flex items-center gap-x-4">
             
              <NavItem menuItem={menuData || []} />
              {/* <LanguageSwitcher /> */}
              <NextAuthProvider session={session}>
                <NextIntlProvider>
                  <Account session={session} />
                </NextIntlProvider>
              </NextAuthProvider>
            </div>
          </div>
        </div>

        {/* menu mobile */}

        {/* {isMobile && (
          <MenuMobile
            open={!!open}
            menuItem={menuItem || []}
            onClose={handleCloseMenu}
          />
        )} */}
      </header>
    </>
  );
}
