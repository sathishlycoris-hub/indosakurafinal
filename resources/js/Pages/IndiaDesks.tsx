import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import IndiaDesksHead from "@/components/layout/IndiaDesksHead";
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
  CheckCircle2,
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

interface BilingualItem {
  title: string;
  title_ja?: string;
  description?: string;
  description_ja?: string;
}

interface IndiaDeskPageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
  hero_description?: string | null;
  hero_description_ja?: string | null;
  hero_image?: string | null;
  highlights?: BilingualItem[] | null;
  service_items?: BilingualItem[] | null;
  supporting_growth?: string | null;
  supporting_growth_ja?: string | null;
  about?: string | null;
  about_ja?: string | null;
  about_indosakura?: string | null;
  about_indosakura_ja?: string | null;
  cta_label?: string | null;
  cta_label_ja?: string | null;
  cta_url?: string | null;
}

interface IndiaDesk {
  id: number;
  title: string;
  title_ja?: string;
  slug: string;
  about?: string;
  about_ja?: string;
  about_indosakura?: string;
  about_indosakura_ja?: string;
  overview?: string;
  overview_ja?: string;
  hero_image?: string | null;
  subtitle: string;
  subtitle_ja?: string;
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
  description_ja?: string;
}

const getIndustryIcon = (id: number) => industryIcons[id % industryIcons.length];

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
  delay: 80,
});

function IndiaDesks({
  pageData,
  indiaDesks,
  faqs,
  industries,
  seo,
}: {
  pageData: IndiaDeskPageData | null;
  indiaDesks: IndiaDesk[];
  faqs: IndiaDeskFaq[];
  industries: Industry[];
  seo?: Seo | null;
}) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const v = (en?: string | null, ja?: string | null): string =>
    (lang === "ja" ? ja || en : en) || "";

  const safeIndustries = Array.isArray(industries) ? industries : [];
  const safeIndiaDesks = Array.isArray(indiaDesks) ? indiaDesks : [];
  const safeHighlights = Array.isArray(pageData?.highlights) ? pageData.highlights : [];
  const safeServiceItems = Array.isArray(pageData?.service_items) ? pageData.service_items : [];

  return (
    <Layout>
      <Head>
        <title>{seo?.meta_title ?? "Services | Indo Sakura"}</title>
        {seo?.meta_description && <meta name="description" content={seo.meta_description} />}
        {seo?.meta_keywords && <meta name="keywords" content={seo.meta_keywords} />}
      </Head>

      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <IndiaDesksHead />
      </div>

      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-12 lg:py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10" data-aos="fade-right">
          <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium mb-5 tracking-wide uppercase">
            <span className="w-5 h-px bg-white/60" />
            {v(pageData?.hero_subtitle, pageData?.hero_subtitle_ja) ||
              (lang === "en" ? "India Desk" : "インドデスク")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 max-w-7xl leading-tight">
            {v(pageData?.hero_title, pageData?.hero_title_ja) ||
              (lang === "en" ? "India Desk Services" : "インドデスク サービス")}
          </h1>
          {pageData?.hero_description && (
            <p className="text-lg text-primary-foreground/90 max-w-7xl leading-relaxed mt-4">
              {v(pageData.hero_description, pageData.hero_description_ja)}
            </p>
          )}
        </div>
      </section>

      {/* {pageData?.about_indosakura && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? "インドデスクについて" : "About Indosakura"}
            />
            <div
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed prose:text-justify"
              dangerouslySetInnerHTML={{
                __html: v(pageData.about_indosakura, pageData.about_indosakura_ja)
              }}
            />
          </div>
        </section>
      )} */}

      {/* Supporting Growth Section */}
      {pageData && (pageData.supporting_growth || pageData.supporting_growth_ja) && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl" data-aos="fade-up">
            <SectionHeading
              title={lang === "ja"
                ? "日本企業のインド成長を支援"
                : "Supporting Japanese Business Growth in India"}
            />
            <div
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed bg-white p-8 md:p-10 rounded-2xl border border-border/60 shadow-sm"
              dangerouslySetInnerHTML={{
                __html: v(pageData.supporting_growth, pageData.supporting_growth_ja),
              }}
            />
          </div>
        </section>
      )}

      {pageData?.about && (
        <section className="py-20 ">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? "インドデスク" : "India Desk"}
            />
            <div
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: v(pageData.about, pageData.about_ja)
              }}
            />
          </div>
        </section>
      )}

      {/* Highlights Section */}
      {safeHighlights.length > 0 && (
        <section className="py-12 bg-card border-b border-border/60 bg-[#F6F6F6]">
          <div className="container mx-auto px-4">
            <SectionHeading
              title={lang === "ja" ? "主なハイライト" : "Key Highlights"}
              align="center"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {safeHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-primary border border-border/30 hover:shadow-sm transition-all"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {v(highlight.title, highlight.title_ja)}
                    </p>
                    {(highlight.description || highlight.description_ja) && (
                      <div
                        className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: v(highlight.description, highlight.description_ja) }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Items Section */}
      {/* {safeServiceItems.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeading
              title={lang === "ja" ? "当社のサービス" : "Our Services"}
              align="center"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {safeServiceItems.map((service, index) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                    {v(service.title, service.title_ja)}
                  </h3>
                  {(service.description || service.description_ja) && (
                    <div
                      className="text-muted-foreground leading-relaxed text-[15px] prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: v(service.description, service.description_ja),
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {safeIndiaDesks.length > 0 && (
        < section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeading
              title={lang === "ja" ? "専任サポートデスクの一覧" : "Our Dedicated Support Desks"}
              align="center"
            />
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" data-aos="fade-up">
                  {safeIndiaDesks.map((indiaDesk) => (
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
                          {v(indiaDesk.title, indiaDesk.title_ja)}
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </h3>

                        <p className="text-muted-foreground mt-2 min-h-[80px] line-clamp-4">
                          {v(indiaDesk.subtitle, indiaDesk.subtitle_ja)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      )}

      {/* {safeIndustries.length > 0 && (
        < section className="py-16 bg-[#F6F6F6]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "en" ? "Industries We Serve" : "対象業界"}
            </h2>
            <p className="text-center text-muted-foreground mb-12" data-aos="fade-up">
              {lang === "en"
                ? "Tailored IT Infrastructure Services for Every Industry"
                : "あらゆる業界向けにカスタマイズされたITインフラサービス"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {safeIndustries.map((industry, i) => {
                const Icon = getIndustryIcon(industry.id);
                return (
                  <div
                    key={industry.id}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                    className="bg-card p-6 rounded-xl border border-border/80 hover:shadow-md transition-all"
                  >
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {v(industry.title, industry.title_ja)}
                    </h3>
                    <div
                      className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: v(industry.description, industry.description_ja),
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )} */}

      {faqs.length > 0 && (
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
                  className="border border-border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left">
                    <div className="flex items-start gap-4">
                      <p className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        Q
                      </p>
                      <p className="text-foreground font-medium pt-1">
                        {v(faq.question, faq.question_ja)}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="flex items-start gap-4 pl-12">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {v(faq.answer, faq.answer_ja)}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
    </Layout >
  );
}

function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`} data-aos="fade-up">
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