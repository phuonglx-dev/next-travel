import {
  IconChevronRight,
  IconEnvelope,
  IconMessageSmile,
  IconPhoneVolume,
} from "@/components/icons";
import { Metadata } from "next";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Kapanda Support center",
  description:
    "Kapanda supports the transportation services and tours in Vietnam. 24/7 support team is always ready to help you.",
};

export default async function SupportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        sub_title="We’re here to help and answer any questions you might have."
        img="https://res.cloudinary.com/drnf8u8vq/image/upload/v1738730453/nextravel/uganda_ylddjc.webp"
      />
      <div className="container mx-auto space-y-8 px-4 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:gap-12">
          <div className="w-full flex-1 md:w-1/3">
            <div className="h-full w-full rounded-md bg-gray-100 px-3 py-8 text-center">
              <IconMessageSmile className="fill-secondary mx-auto mb-3 h-6 w-6" />
              <h3 className="mb-2 text-lg font-semibold"> Chat support</h3>
              <div className="text-text1 mb-5">
                Our support team is just a click away.
              </div>

              <div className="text-secondary flex cursor-pointer items-center justify-center gap-2">
                <span>Click to open chat </span>
                <IconChevronRight className="fill-secondary h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 md:w-1/3">
            <div className="h-full w-full rounded-md bg-gray-100 px-3 py-8 text-center">
              <IconEnvelope className="fill-secondary mx-auto mb-3 h-6 w-6" />
              <h3 className="mb-2 text-lg font-semibold">Email support</h3>
              <div className="text-text1 mb-5">
                {`Send us an email and we'll get back to you soon.`}
              </div>
              <div className="text-secondary flex items-center justify-center gap-2">
                <span>contact@joombooking.com</span>
                <IconChevronRight className="fill-secondary h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 md:w-1/3">
            <div className="h-full w-full rounded-md bg-gray-100 px-3 py-8 text-center">
              <IconPhoneVolume className="fill-secondary mx-auto mb-3 h-6 w-6" />
              <h3 className="mb-2 text-lg font-semibold">Call us</h3>
              <div className="text-text1 mb-5">
                English only and in case of emergency
              </div>
              <div className="text-secondary flex items-center justify-center gap-2">
                <span>
                  Whatsapp :{" "}
                  <a
                    title="Contact us by Whatsapp"
                    href="https://api.whatsapp.com/send?phone=+84912348149"
                    target="_blank"
                  >
                    +84 912348149
                  </a>
                </span>
                <IconChevronRight className="fill-secondary h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
