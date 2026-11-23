"use client";

import { useState, useEffect } from "react";

const COOKIE_KEY = "onward_consent";

function loadAnalytics() {
  const GTM_ID = "GTM-579N3RH";
  const GADS_ID = "AW-11144813402";

  // GTM
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const gtmScript = document.createElement("script");
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(gtmScript);

  // GADS
  const gadsScript = document.createElement("script");
  gadsScript.async = true;
  gadsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`;
  document.head.appendChild(gadsScript);

  w.dataLayer = w.dataLayer || [];
  function gtag(...args: any[]) {
    w.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GADS_ID);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (stored === "accepted") {
        loadAnalytics();
        return;
      }
      if (stored === "declined") return;
    } catch {}
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    try { localStorage.setItem(COOKIE_KEY, "accepted"); } catch {}
    setVisible(false);
    loadAnalytics();
  }

  function decline() {
    try { localStorage.setItem(COOKIE_KEY, "declined"); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-700 leading-relaxed">
          We use cookies and analytics to improve your experience. By accepting,
          you agree to our use of Google Analytics, Google Tag Manager, and
          Microsoft Clarity for site analytics.{" "}
          <a
            href="/privacy-policy"
            className="underline text-[#b44512] hover:text-black transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#b44512] hover:bg-[#933a0f] rounded-xl transition-colors cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
