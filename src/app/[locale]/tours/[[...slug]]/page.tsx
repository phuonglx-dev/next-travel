import TourListComponent from "@/app/[locale]/tours/[[...slug]]/tour-list";
import TourGrid from "@/app/[locale]/tours/[[...slug]]/tour-grid";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import tourData from "@/data/tourData";

export const dynamic = "force-dynamic";

export interface IToursSearchProps {
  date: string | undefined;
  min_price: string | undefined;
  max_price: string | undefined;
  soft_by: string | undefined;
  page: string | undefined;
}

export default async function Tours({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<IToursSearchProps>;
}) {
  const t = await getTranslations("tour");

  const toursData = tourData;
  console.log("filter", params);
  const param = await params;

  // Check if the slug parameter's first element is "3".
  const isGridView = param.slug && param.slug[0] === "3";

  return (
    <div className="w-full lg:w-3/4">
      {isGridView ? (
        <TourGrid data={toursData.data} />
      ) : (
        <TourListComponent data={toursData.data} />
      )}
    </div>
  );
}
