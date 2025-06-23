"use client";
import React, { useEffect } from "react";
import appConfig from "@/config";
import { isJSON } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

const Redirect = ({ params }: Props) => {
  useEffect(() => {
    const loadPage = async () => {
      const { slug } = await params;

      if (!slug || slug.length < 0) {
        window.location.href = `${appConfig.SITE_URL}`;
      }

      const decodeSlugString = Buffer.from(
        decodeURIComponent(slug[0]),
        "base64",
      ).toString("utf-8");

      if (decodeSlugString && isJSON(decodeSlugString)) {
        const decodeSlugObject = JSON.parse(decodeSlugString);
        if (!decodeSlugObject || !decodeSlugObject?.redirect_url) {
          window.location.href = `${appConfig.SITE_URL}`;
        } else {
          if (decodeSlugObject?.info) {
            const info = decodeSlugObject.info;
            const email = Buffer.from(info.e, "base64").toString("utf-8");
            const contact_id = Buffer.from(info.cti, "base64").toString(
              "utf-8",
            );
            const campaign_id = Buffer.from(info.cai, "base64").toString(
              "utf-8",
            );
            const sent_date = Buffer.from(info.d, "base64").toString("utf-8");
            if (email && contact_id && campaign_id && sent_date) {
              const payload = {
                email,
                contact_id,
                campaign_id,
                sent_date,
              };
              await fetch(`${appConfig.API_URL}/crm/contact-click`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
            }
          }
          const redirect_url = Buffer.from(
            decodeSlugObject.redirect_url,
            "base64",
          ).toString("utf-8");
          if (redirect_url) {
            window.location.href = redirect_url;
          } else {
            window.location.href = `${appConfig.SITE_URL}`;
          }
        }
      } else {
        window.location.href = `${appConfig.SITE_URL}`;
      }
    };
    loadPage();
  }, [params]);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-999999999999 h-screen w-screen bg-white"></div>
  );
};

export default Redirect;
