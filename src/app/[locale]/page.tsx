import MainSlider from "@/components/Mainslider";
import WhyChoose from "@/components/WhyChoose";
import DestinationWidget from "@/components/Widgets/DestinationWidget";
import PostWidget from "@/components/Widgets/PostWidget";
import TourWidget from "@/components/Widgets/TourWidget";
import ReviewWidget from "@/components/Widgets/ReviewWidget";
import { Suspense } from "react";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;


  return (
    <>
      
      <MainSlider />
      {/* <DestinationWidget className="container" code="vietnam" locale={locale} /> */}
      
      
      <section id="home" className="hero-section bg-cover w-full" >
      <Suspense fallback={<p>Loading Destination</p>}>
        <DestinationWidget
          className="container py-10"
          code="top_destination"
          locale={locale}
        />
        </Suspense>
      </section>
      <section id="home" className="hero-section bg-[#f5f5f5] w-full" >
      <Suspense fallback={<p>Loading Why choose us</p>}>
        <WhyChoose className="container" />
        </Suspense>
      </section>
      
      <section id="home" className="hero-section bg-cover w-full" >
        <TourWidget
          className="container"
          type="featured_transfer"
          locale={locale}
        />
      </section>
     
      {/* <TourWidget className="container" type="tourWidget" /> */}
      <section id="home" className="hero-section bg-cover w-full" >
      <Suspense fallback={<p>Loading blog</p>}>
        <PostWidget
          code="latest_post"
          className="container py-10"
          locale={locale}
        />
        </Suspense>
      </section>
      <section id="home" className="hero-section bg-[#f5f5f5] w-full" >
      <Suspense fallback={<p>Loading reviews...</p>}>
        <ReviewWidget
          code="latest_reviews"
          className="container"
          locale={locale}
        />
        </Suspense>
      </section>
    </>
  );
}
