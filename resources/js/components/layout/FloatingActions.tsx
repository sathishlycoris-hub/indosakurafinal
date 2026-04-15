import { Phone, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

interface SiteSettings {
  float_phone: string;
  float_email: string;
  float_whatsapp: string;
  float_whatsapp_message: string;
}

const FloatingActions = () => {
  const { props } = usePage<{ siteSettings?: SiteSettings }>();

  // Fallback to original hardcoded values if DB not seeded yet
  const s: SiteSettings = props.siteSettings ?? {
    float_phone:            "+819044078453",
    float_email:            "info@indosakura.com",
    float_whatsapp:         "919629129539",
    float_whatsapp_message: "Hello!",
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const message = encodeURIComponent(s.float_whatsapp_message || "Hello!");

  const actions = [
    {
      href: `tel:${s.float_phone}`,
      label: "Call us",
      Icon: Phone,
      external: false,
    },
    {
      href: `mailto:${s.float_email}`,
      label: "Email us",
      Icon: Mail,
      external: false,
    },
    {
      href: `https://api.whatsapp.com/send?phone=${s.float_whatsapp}&text=${message}`,
      label: "WhatsApp us",
      Icon: MessageCircle,
      external: true,
    },
  ];

  const btnClass = `
    group flex h-12 w-12 xl:h-14 xl:w-14 items-center justify-center
    rounded-full bg-[#524A4E] text-primary-foreground shadow-lg transition
    hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  `;

  return (
    <>
      {/* Right floating actions — desktop only */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {actions.map(({ href, label, Icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={label}
            className={btnClass}
          >
            <Icon className="h-6 w-6 xl:h-7 xl:w-7" />
          </a>
        ))}
      </div>

      {/* Scroll to top — all screens */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`
          fixed bottom-4 right-4 z-50 flex h-12 w-12 xl:h-14 xl:w-14 items-center justify-center
          rounded-full bg-[#524A4E] text-primary-foreground shadow-lg transition hover:scale-110
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          ${showScrollTop ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}
        `}
      >
        <ArrowUp className="h-6 w-6 xl:h-7 xl:w-7" />
      </button>
    </>
  );
};

export default FloatingActions;