// resources/js/Pages/Solutions/Show.tsx
// ★ marks the changes vs your original:
//   1. FAQ section added, matching the accordion design from IndiaDesks.tsx
//   2. Case Studies section rebuilt to match IndiaDesks/Show.tsx exactly:
//      logo, company name, CEO name, and each card links to its own
//      detail page at /solutions/{slug}/case-studies/{slug} (same template
//      IndiaDesk case studies use — Casestudies/Show.tsx).

import { usePage, Link } from "@inertiajs/react"; // ★ Link added
import Layout from "@/components/layout/Layout";
import Solutionhead from "@/components/layout/Solutionhead";
import ContactCTA from "@/components/layout/Contact";
import PageSeo, { PageSeoProps } from "@/components/PageSeo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Sparkles, Zap, BarChart, Brain, MessageSquare, Shield,
  Briefcase, Factory, Package, ShoppingCart, Laptop, Cpu, Database, Globe,
} from "lucide-react";
// ★ NEW — accordion for FAQs
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ICONS = [Sparkles, Zap, BarChart, Brain, MessageSquare, Shield, Briefcase, Factory, Package, ShoppingCart, Laptop, Cpu, Database, Globe];

// ★ NEW
interface Faq {
  id?: number;
  question: string; question_ja?: string;
  answer: string; answer_ja?: string;
}

// ★ NEW — same rich shape as India Desk case studies
interface CaseStudy {
  slug: string;
  title: string; title_ja?: string;
  subtitle?: string; subtitle_ja?: string;
  company_name?: string; company_name_ja?: string;
  ceo_name?: string; ceo_name_ja?: string;
  logo?: string | null;
  hero_image?: string | null;
  secondary_image?: string | null;
  tags?: string; tags_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  benefit?: string; benefit_ja?: string;
  implementation?: string; implementation_ja?: string;
  content?: string; content_ja?: string;
}

interface Solution {
  id: number;
  title: string; title_ja?: string;
  slug: string; // ★ needed to build /solutions/{slug}/case-studies/{caseSlug} links
  subtitle: string | null; subtitle_ja?: string | null;
  hero_description: string | null; hero_description_ja?: string | null;
  hero_image: string | null;
  link: string | null;
  features: any[];
  use_cases: any[];
  industries: any[];
  case_studies: CaseStudy[]; // ★ typed with the rich shape
  faqs?: Faq[]; // ★ NEW
}

AOS.init({ duration: 1000, easing: "ease-in-out", once: true, offset: 120, delay: 80 });

export default function Show({
  solution,
  pageSeo,
}: {
  solution: Solution;
  pageSeo?: PageSeoProps;
}) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const getValue = (en?: string | null, ja?: string | null) =>
    (lang === "ja" ? ja || en : en) || "";

  const getIconByIndex = (index: number) => ICONS[index % ICONS.length];

  const safeFaqs = Array.isArray(solution.faqs) ? solution.faqs : []; // ★ NEW
  const safeCaseStudies = Array.isArray(solution.case_studies) ? solution.case_studies : []; // ★ NEW

  return (
    <Layout>
      {pageSeo && <PageSeo {...pageSeo} />}

      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Solutionhead />
      </div>

      {/* HERO */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-16 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10" data-aos="fade-left">
          <div>
            <h1 className="text-4xl font-bold mb-3">
              {getValue(solution.title, solution.title_ja)}
            </h1>
            {solution.subtitle && (
              <p className="text-lg text-white mb-4">
                {getValue(solution.subtitle, solution.subtitle_ja)}
              </p>
            )}
            <div
              className="text-white mb-8 leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: getValue(solution.hero_description, solution.hero_description_ja) }}
            />
            <Button
              size="lg" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-colors shadow-lg text-sm"
              onClick={() => {
                if (solution.link) {
                  solution.link.startsWith("http")
                    ? window.open(solution.link, "_blank")
                    : (window.location.href = solution.link);
                }
              }}
            >
              {getValue("Learn More", "詳細を見る")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" data-aos="fade-up">
            {getValue("Key Features of", "主な機能")}{" "}
            {getValue(solution.title, solution.title_ja)}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.features.map((f, i) => {
              const Icon = getIconByIndex(i);
              return (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 80} className="bg-card border rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary">{getValue(f.title, f.title_ja)}</h3>
                  <p className="text-muted-foreground">{getValue(f.subtitle, f.subtitle_ja)}</p>
                  <div className="prose mt-2" dangerouslySetInnerHTML={{ __html: getValue(f.description, f.description_ja) ?? "" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      {solution.use_cases?.length > 0 && (
        <section className="py-16 bg-section-light">
          <div className="container mx-auto px-4 lg:px-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-center mb-2">{getValue("Use Cases", "活用事例")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4" />
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {getValue(
                `${solution.title} is designed to address real-world business challenges across industries.`,
                "実践的なAI活用事例を通じて、さまざまな業界の現実的なビジネス課題を解決します。"
              )}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
              {solution.use_cases.map((u, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition">
                  <h3 className="font-semibold text-foreground mb-1">{getValue(u.title, u.title_ja)}</h3>
                  {u.subtitle && <p className="text-sm text-primary mb-2">{getValue(u.subtitle, u.subtitle_ja)}</p>}
                  <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: getValue(u.description, u.description_ja) }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INDUSTRIES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">{getValue("Industry We Serve", "対応業界")}</h2>
            <div className="w-16 h-1 bg-pink-500 mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-muted-foreground">
              {getValue("Enterprise-grade AI workflows built for multiple industries", "複数業界向けに構築されたエンタープライズAIワークフロー")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {solution.industries.map((ind, i) => {
              const Icon = getIconByIndex(i + 10);
              return (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 90}
                  className="relative bg-pink-50/40 border border-pink-100 rounded-2xl p-8 text-center hover:shadow-md transition">
                  <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{getValue(ind.title, ind.title_ja)}</h3>
                  <p className="text-sm text-muted-foreground">{getValue(ind.description, ind.description_ja)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ★ CASE STUDIES — rebuilt to match IndiaDesks/Show.tsx exactly:
           logo, company/CEO line, whole card is a Link to the detail page. */}
      {safeCaseStudies.length > 0 && (
        <section className="py-16 bg-section-light">
          <div className="container mx-auto px-6 max-w-7xl space-y-6">
            <div className="section-divider mb-8" data-aos="fade-left">
              <h2 className="text-2xl font-semibold">{getValue("Case Studies", "導入事例")}</h2>
            </div>

            {safeCaseStudies.map((cs, i) => {
              const companyName = getValue(cs.company_name, cs.company_name_ja);
              const ceoName = getValue(cs.ceo_name, cs.ceo_name_ja);
              const description = getValue(cs.hero_description, cs.hero_description_ja);

              return (
                <Link
                  key={cs.slug ?? i}
                  href={`/solutions/${solution.slug}/case-studies/${cs.slug}`}
                  data-aos="fade-right"
                  data-aos-delay={i * 90}
                  className="block bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  {(companyName || ceoName || cs.logo) && (
                    <div className="flex items-center gap-3 mb-1">
                      {cs.logo && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full border bg-white overflow-hidden flex items-center justify-center">
                          <img src={cs.logo} alt="" className="w-full h-full object-contain p-0.5" />
                        </div>
                      )}
                      {(companyName || ceoName) && (
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {companyName}
                          {ceoName && <span className="normal-case font-normal"> · {ceoName}</span>}
                        </p>
                      )}
                    </div>
                  )}

                  <h3 className="font-semibold text-primary">
                    {getValue(cs.title, cs.title_ja)}
                  </h3>

                  {description && (
                    <div
                      className="prose mt-2"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ★ NEW — FAQ (same accordion design as the India Desks page) */}
      {safeFaqs.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {getValue("Frequently Asked Questions", "よくある質問")}
            </h2>
            <p className="text-center text-muted-foreground mb-12" data-aos="fade-up">
              {getValue(
                `Common questions about ${solution.title}, answered for you.`,
                `${getValue(solution.title, solution.title_ja)}についてよくいただく質問をQ&A形式でご紹介します。`
              )}
            </p>
            <Accordion type="single" collapsible className="space-y-4">
              {safeFaqs.map((faq, index) => (
                <AccordionItem
                  data-aos="fade-up"
                  data-aos-delay={index * 90}
                  key={faq.id ?? index}
                  value={`item-${faq.id ?? index}`}
                  className="border border-border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left">
                    <div className="flex items-start gap-4">
                      <p className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        Q
                      </p>
                      <p className="text-foreground font-medium pt-1">
                        {getValue(faq.question, faq.question_ja)}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="flex items-start gap-4 pl-12">
                      <div
                        className="text-muted-foreground leading-relaxed text-sm prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: getValue(faq.answer, faq.answer_ja) }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      <ContactCTA />
    </Layout>
  );
}
