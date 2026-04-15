import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import ContactCTA from "@/components/layout/Contact";
import ContactPopup from "@/components/ContactPopup";
import {
  CheckCircle,
  TrendingUp,
  Award,
  Users,
  Clock,
  Zap,
  ShieldCheck,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

/* ================= TYPES ================= */

interface Highlight {
  id: number;
  title: string;
  title_ja?: string;
  value?: string;
  description?: string;
  description_ja?: string;
}

interface Benefit {
  id: number;
  title: string;
  title_ja?: string;
  description?: string;
  description_ja?: string;
}

interface Service {
  title: string;
  title_ja?: string;
  subtitle?: string;
  subtitle_ja?: string;
  hero_description?: string;
  hero_description_ja?: string;
  how_it_works?: string;
  how_it_works_ja?: string;
  highlights: Highlight[];
  benefits: Benefit[];
}

interface Props {
  service: Service;
}

const BENEFIT_ICONS = [
  CheckCircle,
  TrendingUp,
  Award,
  Users,
  Clock,
  Zap,
  ShieldCheck,
  BarChart3,
];

const getBenefitIcon = (index: number) => BENEFIT_ICONS[index % BENEFIT_ICONS.length];

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
  delay: 80,
});

/* ================= COMPONENT ================= */

export default function Show({ service }: Props) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;
 const [popupOpen, setPopupOpen] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setPopupOpen(true);
  }, 3000); // 3 seconds — change to any value you like

  return () => clearTimeout(timer); // cleanup if user navigates away
}, []);

  const getValue = (en?: string | null, ja?: string | null): string =>
    (lang === "ja" ? ja || en : en) || "";

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Serviceshead />
      </div>

      {/* ================= HERO ================= */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div
          className="container mx-auto px-6 text-white max-w-6xl"
          data-aos="fade-right"
        >
          {service.hero_description && (
            <div
              className="prose prose-invert max-w-2xl mb-4"
              dangerouslySetInnerHTML={{
                __html: getValue(
                  service.hero_description,
                  service.hero_description_ja
                ),
              }}
            />
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {getValue(service.title, service.title_ja)}
          </h1>

          {service.subtitle && (
            <p className="text-lg opacity-90 mb-6 max-w-2xl">
              {getValue(service.subtitle, service.subtitle_ja)}
            </p>
          )}

          {/* ── Contact Us CTA Button ── */}
          {/* <Button
            onClick={() => setPopupOpen(true)}
            className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            {lang === "ja" ? "お問い合わせ" : "Contact Us"}
          </Button> */}
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      {service.highlights?.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6 max-w-7xl" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center text-primary mb-16 tracking-tight">
              Why {getValue(service.title, service.title_ja)}?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {service.highlights.map((h, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  key={h.id}
                  className="group relative bg-card/80 backdrop-blur-sm
                             border border-border/50 rounded-2xl p-10
                             shadow-lg hover:shadow-2xl
                             transition-all duration-500 hover:-translate-y-2"
                >
                  {h.value && (
                    <div
                      className="text-6xl font-bold text-primary mb-6
                                 group-hover:scale-110 transition-transform"
                    >
                      {h.value}
                    </div>
                  )}

                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                    {getValue(h.title, h.title_ja)}
                  </h3>

                  {h.description && (
                    <div
                      className="text-sm md:text-base text-muted-foreground leading-relaxed
                                 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: getValue(h.description, h.description_ja),
                      }}
                    />
                  )}

                  <div
                    className="absolute bottom-0 left-0 w-full h-1 bg-primary
                               rounded-b-2xl opacity-0
                               group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= BENEFITS ================= */}
      {service.benefits?.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6">
            <h2
              className="text-[32px] font-semibold text-center text-primary mb-6"
              data-aos="fade-up"
            >
              {lang === "en"
                ? `Benefits of ${getValue(service.title, service.title_ja)}`
                : `${getValue(service.title, service.title_ja)} のメリット`}
            </h2>

            <p
              className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed"
              data-aos="fade-up"
            >
              {lang === "en"
                ? "AI-driven development transforms the development process by incorporating AI, solving traditional issues such as speed limitations, quality variations, and hidden costs."
                : "AI駆動開発はAIを取り入れることで、従来の開発手法が抱える速度・品質・隠れコストなどの課題を根本的に解決します。"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.benefits.map((b, index) => {
                const Icon = getBenefitIcon(index);
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    key={b.id}
                    className="bg-white p-10 rounded-xl border shadow-sm text-center"
                  >
                    <Icon className="w-12 h-12 text-primary mx-auto mb-6" />

                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {getValue(b.title, b.title_ja)}
                    </h3>

                    {b.description && (
                      <div
                        className="text-gray-600 leading-relaxed prose prose-sm max-w-none mx-auto"
                        dangerouslySetInnerHTML={{
                          __html: getValue(b.description, b.description_ja),
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= HOW IT WORKS ================= */}
      {service.how_it_works && (
        <section className="py-20 bg-background" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-primary mb-4">
              How {service.title} Works
            </h2>

            <div
              className="prose max-w-none mx-auto text-center text-muted-foreground mb-12"
              dangerouslySetInnerHTML={{ __html: service.how_it_works }}
            />
          </div>
        </section>
      )}

      <ContactCTA />

      {/* ================= POPUP ================= */}
      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </Layout>
  );
}