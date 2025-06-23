import blogData from "@/data/blogData"; // Import the blogData file
import PostBody from "@/components/post/post-body";
import PostHeader from "@/components/post/post-header";
import PostPreview from "@/components/post/post-preview";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import appConfig from "@/config";
import { Metadata } from "next";
import TravelTagCloud from "@/components/post/tags";

function removeHTMLTags(str: string) {
  return str.replace(/<[^>]+>/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length < 0) return notFound();

  // Find the post by slug
  const post = blogData.data.find((p) => p.slug.endsWith(slug));

  if (!post)
    return {
      title: "Post Not Found",
    };

  const { title, short, image, date } = post;

  const metadata: Metadata = {
    title: title,
    description: removeHTMLTags(short),
    keywords: [title, "travel blog", "destinations"],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `${appConfig.HOST}post/${slug}`,
      languages: {
        en: `${appConfig.HOST}post/${slug}`,
      },
    },
  };

  return metadata;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug || slug.length < 0) return notFound();

  // Find the post by slug
  const post = blogData.data.find((p) => p.slug.endsWith(slug));

  if (!post) return notFound();

  return (
    <>
      <div className="container py-10">
        <div className="mb-8 grid w-full grid-cols-1 gap-10 md:grid-cols-12 lg:px-10">
          <div className="col-span-8">
            <PostHeader data={post} />
            <PostBody content={post.description} />
            <div className="border-t border-slate-300"></div>
          </div>
          <div className="relative col-span-8 w-full md:col-span-4">
            <div className="sticky top-1/4 left-0">
              <TravelTagCloud />
            </div>
          </div>
        </div>
        <RelatedPost slug={slug} />
      </div>
    </>
  );
}

async function RelatedPost({ slug }: { slug: string }) {
  const t = await getTranslations("post");

  // Find related posts (excluding the current one)
  const relatedPosts = blogData.data
    .filter((p) => p.slug !== `/post/${slug}`)
    .slice(0, 4);

  if (!relatedPosts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">{t("related_articles")}</h2>
      <ul className="grid-layout grid-layout--primary p-0!">
        {relatedPosts.map((post) => {
          return <PostPreview key={post?.title} props={post} />;
        })}
      </ul>
    </div>
  );
}
