import PageHeader from "@/components/page-header";
import NextIntlProvider from "@/components/providers/NextIntlProvider";
import BreadCrumbTour from "@/components/tours/bread-crumb";
import TourFilter from "@/components/tours/tour-filter";
import { getTranslations } from "next-intl/server";

export interface IToursSearchProps {
  date: string | undefined;
  min_price: string | undefined;
  max_price: string | undefined;
  soft_by: string | undefined;
  page: string | undefined;
}
type Params = Promise<{ locale: string; slug?: string[] }>;

export default async function ToursLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const t = await getTranslations("tour");
  // if (!slug || slug.length < 0) return notFound();

  //const duration = await getDuration();
  //console.log("durations", durations);

  const breadcrumb_title = "France / Paris / Tours";

  return (
    <>
      {
        <PageHeader
          title="Paris Tours and Activities"
          sub_title="Paris Tours and Activities"
          img="https://res.cloudinary.com/drnf8u8vq/image/upload/v1738117985/nextravel/blog/pexels-jarod-17350906_wqirdn.jpg"
        />
      }
      <div className="pt-5 md:py-10">
        <div className="container">
          <BreadCrumbTour data={[{ title: breadcrumb_title }]} />
        </div>
        {/* <TourPreview destination={destination} /> */}

        <div className="container">
          <h1 className="text-text1 mb-5 text-xl font-bold md:text-[1.6rem]">
            All Tours and Activities in Paris
          </h1>

          <div className="flex flex-col items-start gap-5 lg:flex-row">
            <div className="w-full lg:w-1/4">
              <NextIntlProvider>
                <TourFilter duration={[]} />
              </NextIntlProvider>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
