import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { setCookie, getCookie } from "@/utils/cookies";

const COOKIE_KEY = "cookie_consent";

/**
 * Enable analytics ONLY after user accepts cookies
 * Replace G-XXXXXXX with your real Google Analytics ID
 */
const enableAnalytics = () => {
  if (typeof window === "undefined") return;

  // Prevent loading analytics twice
  if ((window as any).__analyticsLoaded) return;
  (window as any).__analyticsLoaded = true;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-1MZW5JZ2TT";
  script.async = true;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];

  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }

  gtag("js", new Date());
  gtag("config", "G-1MZW5JZ2TT");
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie(COOKIE_KEY);
    const localConsent = localStorage.getItem(COOKIE_KEY);

    // Show banner only if consent not stored anywhere
    if (!cookieConsent && !localConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    // Store consent in BOTH cookie & localStorage
    setCookie(COOKIE_KEY, "accepted");
    localStorage.setItem(COOKIE_KEY, "accepted");

    setShowBanner(false);
    enableAnalytics();
  };

  const declineCookies = () => {
    setCookie(COOKIE_KEY, "declined");
    localStorage.setItem(COOKIE_KEY, "declined");

    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
<div className="fixed bottom-0 left-0 right-0 z-50 bg-footer border-t border-border/20 shadow-2xl animate-fade-in">
  <div className="container mx-auto py-4 px-6">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Left Content */}
      <div className="flex items-start gap-4 max-w-5xl">
        <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M16 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M7 14v.01" />
          </svg>
        </div>

        <p className="text-md text-footer-foreground/90 leading-relaxed text-center md:text-left">
          <strong className="font-medium text-footer-foreground">
            We value your privacy.
          </strong>{" "}
         We use cookies to enhance your browsing experience, analyze website traffic, and improve our services. These cookies help us understand how visitors interact with our website so we can continuously improve performance and usability.{" "}
          <strong>“Allow”</strong>, you agree to our use of cookies in accordance
          with our{" "}
          <a
            href="/cookie-policy"
            className="underline underline-offset-2 text-primary hover:text-white transition-colors"
          >
            Cookie Policy
          </a>.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 shrink-0">
        <Button
          onClick={acceptCookies}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Allow
        </Button>

        <Button
          onClick={declineCookies}
          variant="outline"
          className="border-footer-foreground/30 text-footer-black-foreground px-6 py-2 rounded-md font-medium transition-all duration-200"
        >
          Decline
        </Button>
      </div>
    </div>
  </div>
</div>

  );
};

export default CookieConsent;
