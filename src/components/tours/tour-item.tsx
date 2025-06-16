import { IconCircleCheck, IconClock, IconStar } from "../icons";
import { TourProps } from "@/types";
import LoadingSpinner from "../loading/loadingSpiner";
import ImageCustom from "../image-custom";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { CurrencyFormatter } from "@/lib/utils";

export interface ITourItemProps {
  data: TourProps;
}

export default function TourItem({ data }: any) {
  const t = useTranslations("tour");
  if (!data) return <LoadingSpinner />;
  
  let total_price_final = CurrencyFormatter("en-US", data.price.amount).replace(/\s*USD\s*/, '$');

  return (
    <div className="border-t border-slate-400 py-5 lg:rounded-lg lg:border lg:p-5">
      <div className="flex items-start gap-5">
        <div className="flex flex-row flex-1 gap-2 lg:gap-5">
          <Link
            href={`/tour/${data.slug}`}
            aria-label={data?.title}
            className="relative max-h-36 w-[45%] cursor-pointer rounded-lg text-center md:max-h-full lg:w-1/3"
          >
            {/* <Image
              src={data.img_small ? data.img_small : data.cover_image}
              className="object-cover w-full h-[70%] lg:h-full rounded-lg aspect-163/143"
              width={1000}
              height={1000}
              alt={data.title}
            /> */}
            {data?.image?.src && (
              <ImageCustom
                src={data?.image.src}
                image_alt={data?.title ? data?.title : ""}
                className="aspect-163/143 rounded-lg"
              />
            )}
          </Link>
          <div className="flex flex-col w-1/2 gap-2 lg:w-2/3 lg:flex-row">
            <div className="flex flex-col w-6/6 lg:w-5/6">
              {/* <span className="text-text1">{title}</span> */}
              <div className="mb-2 text-base font-semibold leading-6 text-text1 lg:text-lg">
                <Link href={`/tour/${data.slug}`} aria-label={data?.title}>
                  {data.title}
                </Link>
              </div>
              <div className="flex items-center mb-2">
                <div className="relative flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => {
                    return (
                      <IconStar key={i} className="w-4 h-4 fill-yellow-400" />
                    );
                  })}
                  <div
                    className={`absolute right-0 top-0 h-full overflow-hidden bg-white mix-blend-color`}
                    style={{
                      width: `${(
                        100 -
                        (Number(data?.rating) * 100) / 5
                      ).toFixed(0)}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-text1">
                  {data?.reviews || 0}
                </span>
              </div>
              <div className="hidden mt-1 mb-2 text-l lg:block">
                <div className="mb-5 content-des_tour-2">
                  {data.description && (
                    <div
                      className="content-des_tour-2"
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-1 text-sm lg:text-base">
                  <IconClock className="w-4 h-4 fill-text1" />
                  <span>{`${data.duration} ${data.duration_unit}s`}</span>
                </div>
                {!data.free_cancel && (
                  <div className="flex items-center gap-3 text-sm lg:text-base">
                    <IconCircleCheck className="w-4 h-4 fill-text1" />
                    <span>{t("free_cancellation")}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-end lg:w-1/6">
              <div className="flex flex-col items-end gap-0">
                {data.promotion && (
                  <div className="px-3 py-2 mb-2 text-white bg-red-400 rounded-lg">
                    - {data?.promotion?.discount || 0}%
                  </div>
                )}
                <div className="flex flex-col items-end gap-0 ">
                  <span className="text-xs">{t("from")}</span>
                  <span className="font-bold text-lg text-primary">{total_price_final}</span>
                </div>
                <span className="text-sm">
                  {data.group && t("price_group_size")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
