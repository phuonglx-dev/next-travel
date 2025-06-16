"use client";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Date from "../common/date";
import PostProps from "@/types/post";
import Link from "next/link";

import dynamic from "next/dynamic";
import { IconBookBookmark } from "../icons";
import BreadCrumb from "./breadcrumb";

const ShareButton = dynamic(() => import("../common/share"), {
  ssr: false,
});
export default  function PostHeader({ data }: { data: any }) {
  const { title, image, short, created_at, created_by, user_slug } = data;
  // let category_ids =
  //   categories && categories.length > 0 && categories.map((item) => item.id);

  // const menu: MenuItemProps =
  //   category_ids &&
  //   category_ids.length > 0 &&
  //   (await getMenuByCategories(category_ids));
  const breadcrumb_data = [];

  if (data && data.destination && data.destination.country) {
    breadcrumb_data.push({
      title: data.destination.country.title,
      href: `blog/${data.destination.alias.toLocaleLowerCase()}`,
    });
  }

  if (data && data.destination) {
    breadcrumb_data.push({
      title: data.destination.title,
      href: `blog/${data.destination.alias.toLocaleLowerCase()}`,
    });
  }

  if (
    data &&
    data.destination &&
    data.categories &&
    data.categories.length > 0
  ) {
    breadcrumb_data.push({
      title: data.categories[0].title,
      href: `blog/${data.destination.alias.toLocaleLowerCase()}/${data.categories[0].slug.toLocaleLowerCase()}`,
    });
  }
  return (
    <>
      <div className="mb-5 flex flex-col items-start justify-start gap-5">
        <div className="flex flex-col gap-2">
          <BreadCrumb data={breadcrumb_data} />
          <PostTitle>{title}</PostTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-x-2">
              {created_by && user_slug && (
                <>
                  <div className="text-text1 text-sm">
                    By{" "}
                    <Link
                      href={{ pathname: `/author/${user_slug}` }}
                      aria-label={created_by}
                      className="font-medium hover:underline"
                    >
                      {created_by}
                    </Link>
                  </div>
                  <div className="w-px bg-slate-300 py-0.5"></div>
                </>
              )}
              {created_at && (
                <div className="text-text3 text-sm">
                  <Date dateString={created_at} />
                </div>
              )}
            </div>
            <div>
              <ShareButton />
            </div>
          </div>
          {short && <div dangerouslySetInnerHTML={{ __html: short }}></div>}
          {data?.tableContent && data?.tableContent !== "" && (
            <>
              <div className="mt-3 flex items-center gap-x-2 rounded-lg">
                <IconBookBookmark className="fill-text1 h-5 w-5" />
                <h3 className="text-left text-lg font-bold">Table content</h3>
              </div>
              <div
                className="table_content"
                dangerouslySetInnerHTML={{ __html: data?.tableContent }}
              />
            </>
          )}
        </div>
        <div className="h-[300px] w-full md:h-[500px]">
          {image && (
            <CoverImage
              title={title}
              image_alt={title}
              image={image.src}
              className="h-full"
            />
          )}
        </div>
      </div>
      {/* <div className="max-w-2xl mx-auto">
        <div className="block mb-6 md:hidden">
          <Avatar author={author} /> 
        </div>
        <div className="mb-6 text-lg">
                    Posted <Date dateString={date} />
                    <Categories categories={categories} />
                </div> 
      </div> */}
    </>
  );
}
