import ImageCustom from "@/components/image-custom";
import { IconCalendar } from "@/components/icons";
import { DataFilter } from "@/types/filter";
import PostProps from "@/types/post";
import PostPreview from "@/components/post/post-preview";
import { Link } from "@/navigation";
import { notFound } from "next/navigation";

import Date from "@/components/common/date";
import SearchPost from "./search-post";
import EmptyResult from "@/components/emptyresult";
import NextIntlProvider from "@/components/providers/NextIntlProvider";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/page-header";
import blogData from "@/data/blogData";
import destinationData from "@/data/destinationData";
import Pagination from "@/components/common/pagination";

export interface ISearchProps {
  keyword: string | undefined;
  page: number | undefined;
}
interface IPostListProps {
  data: DataFilter<PostProps>;
  searchParams?: ISearchProps;
}

interface BlogPageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<ISearchProps>;
}
export default async function Blog({ params, searchParams }: BlogPageProps) {
  const t = await getTranslations("blog");
  const { keyword, page } = await searchParams;
  const { slug } = await params;
  if (!slug || slug.length < 0) return notFound();

  const posts = blogData;
  const destinations = destinationData;

  return (
    <>
      <PageHeader
        title="Write by traveler"
        sub_title="True local review by traveler"
        img="https://res.cloudinary.com/drnf8u8vq/image/upload/v1738662709/nextravel/vietnam_travel_sleynt.webp"
      >
        <NextIntlProvider>
          <SearchPost keyword={keyword} />
        </NextIntlProvider>
      </PageHeader>

      <div className="container py-10">
        {/* list category */}
        <div className="grid-layout--small mb-12">
          {destinations &&
            destinations.data.length > 0 &&
            destinations.data.map((destination: any) => (
              <Link
                key={destination.id}
                href={`/${`blog/${destination.title}`}`}
                className="relative min-h-32 w-full cursor-pointer rounded-lg bg-red-400 md:min-h-56"
                aria-label={destination?.title}
              >
                {destination.image && (
                  <ImageCustom
                    src={destination.image.src}
                    className="h-full w-full rounded-lg object-cover"
                    image_alt={destination?.title}
                  />
                )}
                <h1 className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-lg font-semibold text-white">
                  {destination.title}
                </h1>
              </Link>
            ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* list products */}
          <div className="col-span-8">
            <h2 className="before:bg-primary relative mb-26 h-8 border-b border-solid border-gray-300 text-xl leading-6 font-semibold before:absolute before:bottom-0 before:left-0 before:h-[4px] before:w-16 before:translate-y-1/2">
              {keyword ? (
                <>
                  {t("result_search")}{" "}
                  <span className="text-primary">{keyword}</span>
                </>
              ) : (
                t("newest_articles")
              )}
            </h2>

            <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
              {posts.data &&
                posts.data.length > 0 &&
                posts.data.map((post) => {
                  return <PostPreview key={post?.title} props={post} />;
                })}
              {(!posts || posts.data.length === 0) && <EmptyResult />}
            </div>
            <Pagination></Pagination>
          </div>
          {/* tab tim kiếm */}
          <div className="col-span-8 md:col-span-4">
            <div className="flex flex-col gap-5">
              <div className="hidden md:block">
                <h2 className="before:bg-primary relative mb-26 h-8 border-b border-solid border-gray-300 text-xl leading-6 font-semibold before:absolute before:bottom-0 before:left-0 before:h-[4px] before:w-16 before:translate-y-1/2">
                  {t("search")}
                </h2>
                <div className="relative w-full py-5">
                  <NextIntlProvider>
                    <SearchPost keyword={keyword} />
                  </NextIntlProvider>
                </div>
              </div>
              <div>
                <h2 className="before:bg-primary relative mb-26 h-8 border-b border-solid border-gray-300 text-xl leading-6 font-semibold before:absolute before:bottom-0 before:left-0 before:h-[4px] before:w-16 before:translate-y-1/2">
                  {t("articles_for_you")}
                </h2>
                <div className="flex flex-col gap-5 py-5">
                  {/* lisst item post */}
                  {posts.data &&
                    posts.data.length > 0 &&
                    posts.data.slice(0, 3).map((post, index) => (
                      <Link
                        href={`#`}
                        className="flex gap-2"
                        key={index}
                        aria-label={post?.title}
                      >
                        <div
                          className="relative h-16 w-28 overflow-hidden rounded-lg text-center"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="group h-full w-full rounded-lg">
                            {post?.image && (
                              <ImageCustom
                                src={post?.image.src}
                                className="h-full w-full object-cover"
                                image_alt={post?.title}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-text3 mt-auto flex items-center gap-1 text-sm">
                            {" "}
                            <IconCalendar className="h-2 w-2 fill-neutral-300 lg:h-3 lg:w-3" />
                            <Date dateString={post?.date} />
                          </p>
                          <h3 className="text-text1 mb-2 line-clamp-2 text-sm font-semibold hover:underline">
                            {post?.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
