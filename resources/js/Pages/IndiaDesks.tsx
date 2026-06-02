import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import IndiaDesksHead from "@/components/layout/IndiaDesksHead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Head } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Heart,
  Wallet,
  GraduationCap,
  Factory,
  ShoppingCart,
  Building2,
  Cpu,
  Shield,
  Globe,
  Cloud,
  ArrowRight,
} from "lucide-react";
const industryIcons = [
  Heart,
  Wallet,
  GraduationCap,
  Factory,
  ShoppingCart,
  Building2,
  Cpu,
  Shield,
  Globe,
  Cloud,
];

interface Seo {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

interface IndiaDesk {
  id: number;
  title: string;
  title_ja?: string;
  slug: string;
  subtitle?: string;
  subtitle_ja?: string;
  hero_image?: string | null;
  overview?: string;
  overview_ja?: string;
  about?: string;
  about_ja?: string;
  about_indosakura?: string;
  about_indosakura_ja?: string;
  supporting_growth?: string;
  supporting_growth_ja?: string;
}

interface IndiaDeskFaq {
  id: number;
  question: string;
  question_ja?: string;
  answer: string;
  answer_ja?: string;
}

interface Industry {
  id: number;
  title: string;
  title_ja?: string;
  description: string;
  description_ja?: string; // React Quill HTML
}

const getIndustryIcon = (id: number) => {
  return industryIcons[id % industryIcons.length];
};

const getRandomIcons = (count = 3) => {
  const shuffled = [...industryIcons].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
  delay: 80,
});

function IndiaDesks({
  indiaDesks,
  faqs,
  industries,
  seo,
}: {
  indiaDesks: IndiaDesk[];
  faqs: IndiaDeskFaq[];
  industries: Industry[];
  seo?: Seo | null;
}) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const getValue = (en?: string | null, ja?: string | null): string => {
    return (lang === "ja" ? ja || en : en) || "";
  };

  const safeIndustries = Array.isArray(industries) ? industries : [];

  return (
    <Layout>
      <Head>
        <title>{seo?.meta_title ?? "Services | Indo Sakura"}</title>

        {seo?.meta_description && (
          <meta name="description" content={seo.meta_description} />
        )}

        {seo?.meta_keywords && (
          <meta name="keywords" content={seo.meta_keywords} />
        )}
      </Head>

      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <IndiaDesksHead />
      </div>

      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-24">

        <div className="container mx-auto px-4 relative z-10" data-aos="fade-right">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {lang === 'en' ? "India Desk" : "インドデスク"}
          </h1>
          <p className="text-lg text-primary-foreground/90">
            {lang === 'en'
              ? "Comprehensive India Business Support Services for Japanese Enterprises."
              : "日本企業向け インドビジネス総合支援サービス"}
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F6F6F6]">
        {indiaDesks.map((indiaDesk) => (
          <div className="container mx-auto px-6 max-w-4xl">
            <SectionHeading
              title={lang === "ja" ? "インドデスクについて" : "About Indosakura"}
            />
            <div
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: getValue(indiaDesk.about_indosakura, indiaDesk.about_indosakura_ja)
              }}
            />
          </div>
        ))}
      </section>

      <section className="py-20 bg-[#F6F6F6]">
        {indiaDesks.map((indiaDesk) => (
          <div className="container mx-auto px-6 max-w-4xl">
            <SectionHeading
              title={lang === "ja" ? "インドデスク" : "India Desk"}
            />
            <div
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: getValue(indiaDesk.about, indiaDesk.about_ja)
              }}
            />
          </div>
        ))}
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" data-aos="fade-up">
            {indiaDesks.map((indiaDesk) => (
              <Link
                key={indiaDesk.id}
                href={route("india-desks.show", indiaDesk.slug)}
                className="
                  group bg-card rounded-lg overflow-hidden
                  border border-border shadow-md hover:shadow-xl
                  transition-all flex flex-col h-full
                "
              >
                {/* IMAGE */}
                <div className="aspect-video overflow-hidden bg-muted">
                  {indiaDesk.hero_image ? (
                    <img
                      src={`/storage/${indiaDesk.hero_image}`}
                      alt={indiaDesk.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2 min-h-[56px]">
                    {getValue(indiaDesk.title, indiaDesk.title_ja)}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </h3>

                  <p className="text-muted-foreground mt-2 min-h-[80px] line-clamp-4">
                    {getValue(indiaDesk.subtitle, indiaDesk.subtitle_ja)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F6F6F6]">
        {indiaDesks.map((indiaDesk) => (
          <div className="container mx-auto px-6 max-w-4xl">
            <SectionHeading
              title={lang === "ja" ? "日本企業のインド成長を支援" : "Supporting Japanese Business Growth in India"}
            />
            <div
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: getValue(indiaDesk.supporting_growth, indiaDesk.supporting_growth_ja)
              }}
            />
          </div>
        ))}
      </section>

      {/* Industry Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
            {lang === "en" ? "Industry We Serve" : "対象業界"}
          </h2>

          <p className="text-center text-muted-foreground mb-12" data-aos="fade-up">
            {lang === "en"
              ? "Tailored IT Infrastructure Services for Every Industry"
              : "あらゆる業界向けにカスタマイズされたITインフラサービス"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeIndustries.map((industry, i) => {
              const Icon = getIndustryIcon(industry.id);

              return (
                <div
                  key={industry.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  {/* EXACT SAME ICON POSITION & SIZE */}
                  <Icon className="w-10 h-10 text-primary mb-4" />

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {getValue(industry.title, industry.title_ja)}
                  </h3>

                  <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: getValue(industry.description, industry.description_ja),
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
            {lang === "en" ? "Frequently Asked Questions" : "よくある質問"}
          </h2>

          <p className="text-center text-muted-foreground mb-12" data-aos="fade-up">
            {lang === "en"
              ? "Here are some frequently asked questions from applicants in a Q&A format."
              : "応募者からよくいただく質問をQ&A形式でご紹介します。"}
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                data-aos="fade-up"
                data-aos-delay={index * 90}
                key={faq.id}
                value={`item-${faq.id}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div data-aos="fade-up"
                    data-aos-delay={index * 90} className="flex items-start gap-4 text-left">
                    <p className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      Q
                    </p>
                    <p className="text-foreground">{getValue(faq.question, faq.question_ja)}</p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-5">
                  <div data-aos="fade-up"
                    data-aos-delay={index * 90} className="flex items-start gap-4">
                    <p className="flex-shrink-0 w-8 h-8 rounded-full bg-section-light text-primary flex items-center justify-center font-semibold">
                      A
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {getValue(faq.answer, faq.answer_ja)}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>


      {/* Blogs and Seminars Section */}
      {/* <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/blogs"
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <img
                src="/image/News1.png"
                alt="Blogs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {lang === 'en' ? "Blogs" : "ブログ"}
                  </h3>
                  <span className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-foreground transition-colors">
                    {lang === 'en' ? "To the blog list" : "ブログ一覧へ"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href="/blogs/seminars-index"
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <img
                src="/image/Seminar1.jpg"
                alt="Seminars"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {lang === 'en' ? "Seminars and Events" : "セミナー・イベント"}
                  </h3>
                  <span className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-foreground transition-colors">
                    {lang === 'en' ? "See the list of seminars and events" : "セミナー・イベント一覧を見る"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

function SectionHeading({
  title, subtitle, align = "center",
}: { title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`} data-aos="fade-up">
      {/* accent line */}
      <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="block w-8 h-1 rounded-full bg-primary" />
        <span className="block w-3 h-1 rounded-full bg-primary/40" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-muted-foreground leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}


export default IndiaDesks;
