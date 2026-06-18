// resources/js/Pages/IndiaDesks/Show.tsx
// ★ marks the only two changes vs the original:
//   1. Import PageSeo + PageSeoProps
//   2. Add pageSeo prop + render <PageSeo> at top of Layout

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import IndiaDesksHead from "@/components/layout/IndiaDesksHead";
import ContactCTA from "@/components/layout/Contact";
import PageSeo, { PageSeoProps } from "@/components/PageSeo"; // ★ NEW
import {
  CheckCircle, TrendingUp, Award, Users, Clock, Zap, ShieldCheck, BarChart3,
  Heart, Wallet, GraduationCap, Factory, ShoppingCart, Building2, Cpu, Shield, Globe, Cloud,
  ChevronDown, ArrowRight,
  Bot, Sparkles, Network, BrainCircuit, Database, MessageCircle, Workflow, Layers,
  CheckCircle2, Star, Target, Lock, BadgeCheck, Lightbulb,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePage } from "@inertiajs/react";

/* ─── TYPES (unchanged) ─── */
interface Highlight { id: number; title: string; title_ja?: string; value?: string; description?: string; description_ja?: string; }
interface Benefit { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ServiceItem { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface WhyChooseItem { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ApproachStep { id: number; step_number?: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Testimonial { quote: string; quote_ja?: string; author?: string; }
interface TechStack { category: string; category_ja?: string; items: string; }
interface Faq { id: number; question: string; question_ja?: string; answer: string; answer_ja?: string; }
interface Industry { id: number; title: string; title_ja?: string; description: string; description_ja?: string; }
interface CaseStudy {
  id: number; title: string; title_ja?: string;
  logo?: string | null;
  challenge_title?: string; challenge_title_ja?: string;
  challenge_description?: string; challenge_description_ja?: string;
  solution_title?: string; solution_title_ja?: string;
  solution_description?: string; solution_description_ja?: string;
  results?: string; results_ja?: string;
}

interface IndiaDesk {
  id: number;
  title: string; title_ja?: string;
  slug: string;
  subtitle?: string; subtitle_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  hero_image?: string | null;
  supporting_growth?: string; supporting_growth_ja?: string;
  about?: string; about_ja?: string;
  about_indosakura?: string; about_indosakura_ja?: string;
  overview?: string; overview_ja?: string;
  cta_label?: string; cta_label_ja?: string;
  cta_url?: string;
  service_items?: ServiceItem[];
  why_choose?: WhyChooseItem[];
  approach_steps?: ApproachStep[];
  testimonials?: Testimonial[];
  tech_stack?: TechStack[];
  highlights: Highlight[];
  benefits: Benefit[];
  case_studies?: CaseStudy[];
}

interface Props {
  indiaDesk: IndiaDesk;
  faqs: Faq[];
  industries: Industry[];
  faqSource?: string;
  industrySource?: string;
  pageSeo?: PageSeoProps; // ★ NEW
}

/* ─── ICON POOLS (unchanged) ─── */
const BENEFIT_ICONS = [CheckCircle, TrendingUp, Award, Users, Clock, Zap, ShieldCheck, BarChart3];
const SERVICE_ITEM_ICONS = [Bot, Sparkles, Network, BrainCircuit, Database, MessageCircle, Workflow, Layers];
const WHY_ICONS = [CheckCircle2, Star, Layers, Lock, Target, BadgeCheck, Lightbulb, TrendingUp];
const INDUSTRY_ICONS = [Heart, Wallet, GraduationCap, Factory, ShoppingCart, Building2, Cpu, Shield, Globe, Cloud];

const icon = (pool: any[], i: number) => pool[i % pool.length];

AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 80, delay: 50 });

function SectionHeading({ title, subtitle, align = "center" }: { title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`} data-aos="fade-up">
      <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="block w-8 h-1 rounded-full bg-primary" />
        <span className="block w-3 h-1 rounded-full bg-primary/40" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-muted-foreground leading-relaxed max-w-4xl ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── COMPONENT ─── */
export default function Show({ indiaDesk, faqs = [], industries = [], pageSeo }: Props) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const v = (en?: string | null, ja?: string | null) =>
    ((lang === "ja" ? ja || en : en) || "").trim();

  const highlights = Array.isArray(indiaDesk.highlights) ? indiaDesk.highlights : [];
  const benefits = Array.isArray(indiaDesk.benefits) ? indiaDesk.benefits : [];
  const serviceItems = Array.isArray(indiaDesk.service_items) ? indiaDesk.service_items : [];
  const whyChoose = Array.isArray(indiaDesk.why_choose) ? indiaDesk.why_choose : [];
  const approachSteps = Array.isArray(indiaDesk.approach_steps) ? indiaDesk.approach_steps : [];
  const safeFaqs = Array.isArray(faqs) ? faqs : [];
  const safeIndustries = Array.isArray(industries) ? industries : [];
  const safeCaseStudies = Array.isArray(indiaDesk.case_studies) ? indiaDesk.case_studies : [];

  const ctaUrl = indiaDesk.cta_url || "/contact";
  const ctaLabel = v(indiaDesk.cta_label, indiaDesk.cta_label_ja) ||
    (lang === "ja" ? "無料相談を予約する" : "Book a Free Consultation");
  const svcTitle = v(indiaDesk.title, indiaDesk.title_ja);

  return (
    <Layout>
      {/* ★ NEW — inject per-page SEO meta tags */}
      {pageSeo && <PageSeo {...pageSeo} />}

      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <IndiaDesksHead />
      </div>

      {/* 1. HERO */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-16 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <div data-aos="fade-right" className="w-full">
            <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium mb-5 tracking-wide uppercase">
              <span className="w-5 h-px bg-white/60" />
              {lang === "ja" ? "インドデスク" : "India Desk"}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">{svcTitle}</h1>

            {v(indiaDesk.subtitle, indiaDesk.subtitle_ja) && (
              <p className="text-xl font-medium text-white/80 mb-4 leading-snug">{v(indiaDesk.subtitle, indiaDesk.subtitle_ja)}</p>
            )}

            {v(indiaDesk.overview, indiaDesk.overview_ja) && (
              /* Removed 'max-w-xl' and added 'max-w-full' to match the fully expanded design pattern */
              <div className="prose max-w-full mb-8 text-base leading-relaxed [&_*]:!text-white [&_p]:!text-white [&_li]:!text-white"
                dangerouslySetInnerHTML={{ __html: v(indiaDesk.overview, indiaDesk.overview_ja) }} />
            )}

            <a href={ctaUrl}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-colors shadow-lg text-sm">
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 2. HIGHLIGHTS */}
      {highlights.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">

            {/* Section Divider */}
            <div className="section-divider mb-8 border-pink/80">
              <h2 className="text-3xl font-bold mb-8 text-primary">
                {lang === "ja" ? "主なハイライト" : "Key Highlights"}
              </h2>
            </div>

            {/* Two Column Pink Style */}
            <div className="border border-gray-300 rounded-lg overflow-hidden text-sm">
              {highlights.map((item, i) => {
                const Icon = icon(SERVICE_ITEM_ICONS, i);

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-[320px,1fr] border-b border-gray-300 last:border-b-0"
                  >
                    {/* LEFT COLUMN - Pink Background */}
                    <div className="bg-pink-100 p-5 md:p-6 font-semibold leading-relaxed flex items-start gap-3">
                      {Icon && (
                        <div className="text-pink-600 mt-0.5 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                      )}
                      <span className="text-lg font-bold text-pink-600">
                        {v(item.title, item.title_ja)}
                      </span>
                    </div>

                    {/* RIGHT COLUMN - Description (Original styling preserved) */}
                    {item.description && (
                      <div
                        className="p-5 md:p-6 leading-relaxed prose prose-sm max-w-none bg-white text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: v(item.description, item.description_ja)
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
      {/* 3. MID-PAGE CTA */}
      <section className="py-16 bg-primary" data-aos="fade-up">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {lang === "ja" ? "インド進出・事業拡大のご相談はこちら" : "Ready to Establish or Expand Your India Operations?"}
              </h2>
              <p className="text-white/75 text-sm max-w-xl">
                {lang === "ja" ? "インドデスクチームが御社のニーズに合わせたプランをご提案します。" : "Contact our India Desk team for a tailored engagement plan."}
              </p>
            </div>
            <a href={ctaUrl}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-colors shadow-lg text-sm">
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE */}
      {whyChoose.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div data-aos="fade-right" className="lg:sticky lg:top-32">
                <SectionHeading align="left"
                  title={lang === "ja" ? "なぜIndo-Sakuraを選ぶのか？" : `Why Choose Indo-Sakura for ${svcTitle}?`}
                  subtitle={lang === "ja" ? "実績ある専門知識・カスタムソリューション・エンドツーエンドのサポートを提供します。" : "Proven expertise, custom solutions, and end-to-end support that deliver measurable results."} />
                <a href={ctaUrl}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-xl hover:opacity-90 transition-colors text-sm">
                  {ctaLabel} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="space-y-4" data-aos="fade-left">
                {whyChoose.map((item, i) => {
                  const Icon = icon(WHY_ICONS, i);
                  return (
                    <div key={item.id} data-aos="fade-up" data-aos-delay={i * 60}
                      className="flex gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all duration-300 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1 text-base">{v(item.title, item.title_ja)}</h3>
                        {item.description && (
                          <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: v(item.description, item.description_ja) }} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. OUR SERVICES */}
      {serviceItems.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? `${svcTitle}サービス一覧` : `Our ${svcTitle} Services`}
              subtitle={lang === "ja" ? "日本企業向け インドビジネス総合支援サービス" : "Comprehensive India Business Support Services for Japanese Enterprises."} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {serviceItems.map((item, i) => {
                const Icon = icon(SERVICE_ITEM_ICONS, i);
                return (
                  <div key={item.id} data-aos={i % 2 === 0 ? "fade-right" : "fade-left"} data-aos-delay={i * 50}
                    className="flex gap-5 bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-base">{v(item.title, item.title_ja)}</h3>
                      {item.description && (
                        <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(item.description, item.description_ja) }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. APPROACH */}
      {approachSteps.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading
              title={lang === "ja" ? "私たちのプロセス" : "Our Process"}
              subtitle={lang === "ja" ? "日本企業のインド進出・事業拡大を成功に導く、実績あるステップバイステップのアプローチをご紹介します。" : "Our proven, step-by-step approach ensures successful outcomes for our clients in India."} />
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-primary/20 hidden md:block" />
              <div className="space-y-4">
                {approachSteps.map((step, i) => (
                  <div key={step.id ?? i} data-aos="fade-up" data-aos-delay={i * 70}
                    className="flex gap-5 bg-white border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300 relative">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-extrabold text-lg shadow-md z-10">
                      {step.step_number ?? i + 1}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="font-bold text-foreground mb-1 text-base leading-snug">{v(step.title, step.title_ja)}</h3>
                      {step.description && (
                        <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(step.description, step.description_ja) }} />
                      )}
                    </div>
                    <div className="absolute right-0 top-4 bottom-4 w-1 rounded-full bg-primary/20 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. BENEFITS */}
      {benefits.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? `${svcTitle} のメリット` : `Benefits of ${svcTitle}`}
              subtitle={lang === "ja" ? "インドでのビジネス展開において、日本企業が直面する課題を総合的にサポートします。" : "End-to-end support that helps Japanese enterprises establish, operate, and grow their presence in India with confidence."} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {benefits.map((b, i) => {
                const Icon = icon(BENEFIT_ICONS, i);
                return (
                  <div key={b.id} data-aos="fade-up" data-aos-delay={i * 60}
                    className="flex gap-5 bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-base">{v(b.title, b.title_ja)}</h3>
                      {b.description && (
                        <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(b.description, b.description_ja) }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. INDUSTRIES */}
      {/* {safeIndustries.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja" ? "支援対象業界" : "Industries We Support"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" data-aos="fade-up">
              {lang === "ja" ? "インドに進出する日本企業をさまざまな業界にわたって支援します。" : "We support Japanese enterprises across a wide range of sectors entering and growing in India."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeIndustries.map((ind, i) => {
                const Icon = icon(INDUSTRY_ICONS, i);
                return (
                  <div key={ind.id} data-aos="fade-up" data-aos-delay={i * 80}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0"><Icon className="w-10 h-10 text-primary" /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{v(ind.title, ind.title_ja)}</h3>
                        <div className="text-sm text-muted-foreground prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(ind.description, ind.description_ja) }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )} */}

      {/* 9. CASE STUDIES */}
      {safeCaseStudies.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? "ケーススタディ" : "Case Studies"}
              subtitle={lang === "ja"
                ? "インドデスクが支援したプロジェクトの成功事例をご紹介します。"
                : "Explore success stories from our supported projects that demonstrate our impact and expertise."}
            />
            <div className="space-y-10">
              {safeCaseStudies.map((cs, i) => (
                <div
                  key={cs.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Card Header */}
                  {/* Card Header */}
                  <div className="bg-primary px-6 py-4 flex items-center gap-4">
                    {cs.logo && (
                      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white overflow-hidden flex items-center justify-center shadow-md ring-2 ring-white/30">
                        <img
                          src={cs.logo}
                          alt={v(cs.title, cs.title_ja)}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                      {v(cs.title, cs.title_ja)}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="divide-y divide-border">

                    {/* Challenge */}
                    {cs.challenge_title && (
                      <div className="flex flex-col md:flex-row">
                        {/* Left Label */}
                        <div className="md:w-48 shrink-0 flex items-stretch">
                          <div className="w-1 bg-pink-400 rounded-l" />
                          <div className="flex items-center justify-center px-5 py-5 bg-pink-50 w-full">
                            <div className="text-center">
                              <div className="w-9 h-9 rounded-full bg-pink-100 border-2 border-pink-400 flex items-center justify-center mx-auto mb-2">
                                <span className="text-pink-500 font-bold text-sm">01</span>
                              </div>
                              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                                {lang === "ja" ? "課題" : "Challenge"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Right Content */}
                        <div className="flex-1 px-6 py-5 bg-white">
                          <div
                            className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: v(cs.challenge_description, cs.challenge_description_ja) }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Solution */}
                    {cs.solution_title && (
                      <div className="flex flex-col md:flex-row">
                        {/* Left Label */}
                        <div className="md:w-48 shrink-0 flex items-stretch">
                          <div className="w-1 bg-pink-500 rounded-l" />
                          <div className="flex items-center justify-center px-5 py-5 bg-pink-50 w-full">
                            <div className="text-center">
                              <div className="w-9 h-9 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center mx-auto mb-2">
                                <span className="text-pink-600 font-bold text-sm">02</span>
                              </div>
                              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                                {lang === "ja" ? "ソリューション" : "Solution"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Right Content */}
                        <div className="flex-1 px-6 py-5 bg-white">
                          <div
                            className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: v(cs.solution_description, cs.solution_description_ja) }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Results */}
                    {cs.results && (
                      <div className="flex flex-col md:flex-row">
                        {/* Left Label */}
                        <div className="md:w-48 shrink-0 flex items-stretch">
                          <div className="w-1 bg-pink-500 rounded-l" />
                          <div className="flex items-center justify-center px-5 py-5 bg-pink-50 w-full">
                            <div className="text-center">
                              <div className="w-9 h-9 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center mx-auto mb-2">
                                <span className="text-pink-600 font-bold text-sm">03</span>
                              </div>
                              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                                {lang === "ja" ? "結果" : "Results"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Right Content */}
                        <div className="flex-1 px-6 py-5 bg-pink-50/30">
                          <div
                            className="text-sm leading-relaxed prose prose-sm max-w-none font-medium text-foreground/90"
                            dangerouslySetInnerHTML={{ __html: v(cs.results, cs.results_ja) }}
                          />
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. FAQ */}
      {safeFaqs.length > 0 && (
        <section className="py-16 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:sticky lg:top-32" data-aos="fade-right">
                <SectionHeading align="left"
                  title={lang === "ja" ? "よくある質問" : "Frequently Asked Questions"}
                  subtitle={lang === "ja" ? "サービスについてよくいただく質問をQ&A形式でご紹介します。" : "Common questions about this service answered for you."} />
                <a href={ctaUrl}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-colors text-sm">
                  {lang === "ja" ? "お問い合わせ" : "Still have questions?"} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="lg:col-span-2 space-y-3" data-aos="fade-left">
                {safeFaqs.map((faq, i) => (
                  <div key={faq.id} data-aos="fade-up" data-aos-delay={i * 50}
                    className="bg-white border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-200">
                    <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-primary/5 transition-colors">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs mt-0.5">Q</span>
                      <span className="flex-1 font-semibold text-foreground text-sm leading-snug pt-0.5">{v(faq.question, faq.question_ja)}</span>
                      <ChevronDown className={`flex-shrink-0 w-4 h-4 text-primary mt-1 transition-transform duration-300 ${openFaq === faq.id ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === faq.id && (
                      <div className="flex gap-4 px-6 pb-6">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5">A</span>
                        <div className="flex-1 text-muted-foreground text-sm leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(faq.answer, faq.answer_ja) }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </Layout>
  );
}