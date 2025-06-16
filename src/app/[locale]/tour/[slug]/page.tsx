import {
  IconCar,
  IconClock,
  IconMobile,
  IconPhone,
  IconRocketChat,
  IconStar,
} from "@/components/icons";
import BreadCrumbTour from "@/components/tours/bread-crumb";
import TourForm from "@/app/[locale]/tour/[slug]/tour-form";
import TourInformation from "@/app/[locale]/tour/[slug]/tour-information";
import TourReviews from "@/components/tours/reviews/tour-reviews";
import TourShare from "@/app/[locale]/tour/[slug]/tour-share";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NextIntlProvider from "@/components/providers/NextIntlProvider";
import { CurrencyFormatter } from "@/lib/utils";
import TourGallery from "./tour-gallery";
import { Link } from "@/navigation";
import tourData from "@/data/tourData";
import TourOption from "./tour-option";
export interface ITourDetailProps {}
function removeHTMLTags(str: string) {
  return str.replace(/<[^>]+>/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  
  const tour = tourData.data.find((p) => p.slug.endsWith(slug));


  if (!tour)
    return {
      title: "Post Not Found",
    };

  const {
    title,
    description,
    
  } = tour || {};
  
  const metadata: Metadata = {
    title: title,
    description: removeHTMLTags(description),
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
   
  };

  
  return metadata;
}

export default async function TourDetail({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const t = await getTranslations("tour");
  const tour = tourData.data.find((p) => p.slug.endsWith(slug));
  if (!tour)
    return (
      <div className="py-32 bg-white z-100 h-3/4">
        <div className="mx-auto text-center">Service is unavailable</div>
      </div>
    );

  const breadcrumb_data = [{ title: "France / Paris / Tours",href:"#" }];


  
  let total_price_final = CurrencyFormatter("en-US", tour.price.amount).replace(/\s*USD\s*/, '$');
  return (
    <>
      <div className="container pt-5 pb-10 lg:py-10">
        <div className="flex flex-col justify-between md:flex-row">
          <BreadCrumbTour data={breadcrumb_data} />
          <div className="flex-col hidden gap-2 mb-3 text-sm md:mb-0 md:flex">
            <div
              // href="tel:+84912348149"
              className="flex items-center justify-start gap-2 "
            >
              <IconPhone className="w-4 h-4 fill-secondary" />
              <span>
                Whatsapp:{" "}
                <a
                  title="Contact us by Whatsapp"
                  href="https://api.whatsapp.com/send?phone=114855098222"
                  target="_blank"
                >
                  +84 855098222
                </a>
              </span>
            </div>
            <Link
              href={"/support"}
              className="flex items-center gap-2 underline"
            >
              <IconRocketChat className="w-4 h-4 fill-secondary" />
              Chat now
            </Link>
          </div>
        </div>
        <h1 className="mb-3 text-xl font-bold text-text1 lg:text-[1.6rem]">
          {tour ? tour.title : ""}
        </h1>

        <div className="flex flex-col items-start justify-between mb-3 lg:mb-0 lg:flex-row lg:items-center">
          <div className="flex items-center mb-2">
            <div className="relative flex items-center">
              {[1, 2, 3, 4, 5].map((i) => {
                return <IconStar key={i} className="w-4 h-4 fill-yellow-400" />;
              })}
              <div
                className={`absolute right-0 top-0 h-full overflow-hidden bg-white mix-blend-color`}
                style={{
                  width: `${(
                    100 -
                    (Number(tour?.rating) * 100) / 5
                  ).toFixed(0)}%`,
                }}
              ></div>
            </div>
            <span className="ml-2 text-sm text-text1">
              {t("reviews", { number: tour?.reviews || 0 })}
            </span>
            <div className="mx-2 w-px bg-slate-300 py-2"></div>
            <span className="text-sm">{tour?.locations}</span>
          </div>
          <div className="flex flex-col gap-2 text-sm md:hidden">
            <div
              // href="tel:+84912348149"
              className="flex items-center justify-start gap-2 "
            >
              <IconPhone className="w-4 h-4 fill-secondary" />
              <span>
                Whatsapp:{" "}
                <a
                  title="Contact us by Whatsapp"
                  href="https://api.whatsapp.com/send?phone=114855098222"
                  target="_blank"
                >
                  +164 855098222
                </a>
              </span>
            </div>
            <Link
              href={"/support"}
              className="flex items-center gap-2 underline"
            >
              <IconRocketChat className="w-4 h-4 fill-secondary" />
              Chat now
            </Link>
          </div>
          <div className="hidden lg:block">
            <NextIntlProvider>
              <TourShare />
            </NextIntlProvider>
          </div>
        </div>
        <div className="pt-5 lg:pt-0">
          <div className="flex flex-col gap-5 pb-5 lg:flex-row">
            <div className="h-60 w-full md:h-100 lg:h-130.25 lg:w-2/3">
              <TourGallery
                images_small={tour.gallery}
                images_medium={tour.gallery}
                title={tour.title}
              />
            </div>
            <div className=" h-full w-full rounded-lg bg-gray-100 p-5 lg:h-130.25 lg:w-1/3">
              <div>
                {tour.featured && (
                  <span className="inline-block px-3 py-2 mb-1 text-xs font-semibold text-white bg-red-500 rounded shadow">
                    {t("sell_out")}
                  </span>
                )}
                <div className="flex justify-between gap-1 mb-5 item-center">
                  <div className="flex items-end gap-2">
                    <span>{t("from")}</span>
                    <span className="text-2xl font-bold text-text1">
                      {total_price_final}
                    </span>
                  </div>
                  
                  
                </div>
                  <NextIntlProvider>
                    <TourForm
                      data={tour}
                      
                    />
                  </NextIntlProvider>
              </div>
            </div>
          </div>
          <div className="block py-5 border-t border-slate-300 lg:hidden">
            <NextIntlProvider>
              <TourShare />
            </NextIntlProvider>
          </div>
          <div className="w-full py-5 mx-auto border-t border-slate-300 lg:w-3/4">
            <div className="flex flex-row items-start gap-4 lg:items-center lg:gap-8">
              <div className="flex items-center gap-1 md:gap-3">
                <IconClock className="w-4 h-4 fill-secondary lg:h-6 lg:w-6" />
                <span className="font-medium">{`${tour?.duration} ${tour?.duration_unit}s`}</span>
              </div>
              
                <div className="flex items-center gap-1 md:gap-3">
                  <IconCar className="w-4 h-4 fill-secondary md:h-6 md:w-6" />
                  <span className="font-medium">{t("pickup_offered")}</span>
                </div>
              
              <div className="flex items-center gap-1 md:gap-3 ">
                <IconMobile className="w-4 h-4 fill-secondary md:h-6 md:w-6" />
                <span className="font-medium">{t("mobile_ticket")}</span>
              </div>
            </div>
          </div>
            <NextIntlProvider>
              <div className="mx-auto w-full py-2 lg:w-3/4 ">
                <TourOption
                  data={tour.options || []}

                />

              </div>
            </NextIntlProvider>
        </div>

        <TourInformation data={tour} />
        <TourReviews data={tour} />
      </div>
    </>
  );
}
