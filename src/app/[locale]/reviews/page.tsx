import { notFound } from "next/navigation";
import ReviewItem from "./review-item";
import { Metadata } from "next";
import reviewData from "@/data/reviewData";
import PageHeader from "@/components/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: "Customer reviews",
    description:
      "All the reviews are contributed by verified customers who have booked transportation options such as shuttle buses, trains, cars, as well as tours. Reviews can only be made after the completion of their trip and experience.",
  };

  return metadata;
}

export interface IReviewsSearchProps {
  page: string | undefined;
}

const Reviews = async ({
  searchParams,
}: {
  searchParams: Promise<IReviewsSearchProps>;
}) => {
  const { page } = await searchParams;

  const reviews = reviewData;

  if (!reviews) return notFound();

  return (
    <>
      <PageHeader
        title="Customer Reviews"
        sub_title="Real feedback from our travelers"
        img="https://res.cloudinary.com/drnf8u8vq/image/upload/v1738655079/nextravel/japan_reviews_gzqch8.webp"
      />

      <div className="container py-10">
        <h1 className="mb-8 text-2xl font-semibold text-center">
          Glimpse the joy of real travelers here
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews &&
            reviews.data &&
            reviews.data.length > 0 &&
            reviews.data.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <ReviewItem review={review} />
              </div>
            ))}

          {reviews && reviews.data.length <= 0 && (
            <div className="col-span-full flex flex-col items-center justify-center gap-2 mt-10 lg:gap-5">
              <h2 className="text-2xl font-bold">
                You do not have any reviews yet
              </h2>
              <p>Booking and review now.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
