"use client";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentCookie = cookie.get("cookieConsent");

    if (!consentCookie) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "accepted", { expires: 365 });
  };

  const handleReject = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "rejected", { expires: 365 });
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-0 z-9999 transition-all md:left-3">
      <div className="p-5 bg-white rounded-lg shadow-2xl">
        <div className="mb-3 text-text1">
          <p className="">This website uses cookies to improve your browsing experience.</p>
          <p>Please click Accept to continue.</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-5">
          <button
            onClick={handleAccept}
            className="w-full py-2 text-white rounded-md border bg-primary md:w-1/2"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="w-full py-2 border rounded-md border-primary text-text1 md:w-1/2"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
