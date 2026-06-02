import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import IndiaDesksHead from "@/components/layout/IndiaDesksHead";
import ContactCTA from "@/components/layout/Contact";
import ContactPopup from "@/components/ContactPopup";
import {
  CheckCircle, TrendingUp, Award, Users, Clock, Zap, ShieldCheck, BarChart3,
  Heart, Wallet, GraduationCap, Factory, ShoppingCart, Building2, Cpu, Shield, Globe, Cloud,
  ChevronDown, ArrowRight, Quote,
  Bot, Sparkles, Network, BrainCircuit, Database, MessageCircle, Workflow, Layers,
  CheckCircle2, Star, Target, Lock, BadgeCheck, Lightbulb,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePage } from "@inertiajs/react";

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */

interface Highlight { id: number; title: string; title_ja?: string; value?: string; description?: string; description_ja?: string; }
interface Benefit { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ServiceItem { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface WhyChooseItem { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ApproachStep { id: number; step_number?: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Testimonial { quote: string; quote_ja?: string; author?: string; }
interface TechStack { category: string; category_ja?: string; items: string; }
interface Faq { id: number; question: string; question_ja?: string; answer: string; answer_ja?: string; }
interface Industry { id: number; title: string; title_ja?: string; description: string; description_ja?: string; }

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
}

interface Props {
  indiaDesk: IndiaDesk;
  faqs: Faq[];
  industries: Industry[];
  faqSource?: string;
  industrySource?: string;
}

/* ═══════════════════════════════════════
   ICON POOLS
═══════════════════════════════════════ */

const BENEFIT_ICONS = [CheckCircle, TrendingUp, Award, Users, Clock, Zap, ShieldCheck, BarChart3];
const SERVICE_ITEM_ICONS = [Bot, Sparkles, Network, BrainCircuit, Database, MessageCircle, Workflow, Layers];
const WHY_ICONS = [CheckCircle2, Star, Layers, Lock, Target, BadgeCheck, Lightbulb, TrendingUp];
const INDUSTRY_ICONS = [Heart, Wallet, GraduationCap, Factory, ShoppingCart, Building2, Cpu, Shield, Globe, Cloud];

const icon = (pool: any[], i: number) => pool[i % pool.length];

AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 80, delay: 50 });

/* ═══════════════════════════════════════
   SHARED SECTION HEADING
═══════════════════════════════════════ */

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

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */

export default function Show({ indiaDesk, faqs = [], industries = [] }: Props) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;
  const [popup, setPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const v = (en?: string | null, ja?: string | null) =>
    ((lang === "ja" ? ja || en : en) || "").trim();

  const highlights = Array.isArray(indiaDesk.highlights) ? indiaDesk.highlights : [];
  const benefits = Array.isArray(indiaDesk.benefits) ? indiaDesk.benefits : [];
  const serviceItems = Array.isArray(indiaDesk.service_items) ? indiaDesk.service_items : [];
  const whyChoose = Array.isArray(indiaDesk.why_choose) ? indiaDesk.why_choose : [];
  const approachSteps = Array.isArray(indiaDesk.approach_steps) ? indiaDesk.approach_steps : [];
  const testimonials = Array.isArray(indiaDesk.testimonials) ? indiaDesk.testimonials : [];
  const techStack = Array.isArray(indiaDesk.tech_stack) ? indiaDesk.tech_stack : [];
  const safeFaqs = Array.isArray(faqs) ? faqs : [];
  const safeIndustries = Array.isArray(industries) ? industries : [];

  const ctaUrl = indiaDesk.cta_url || "/contact";
  const ctaLabel = v(indiaDesk.cta_label, indiaDesk.cta_label_ja) ||
    (lang === "ja" ? "無料相談を予約する" : "Book a Free Consultation");
  const svcTitle = v(indiaDesk.title, indiaDesk.title_ja);

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <IndiaDesksHead />
      </div>

      {/* ══════════════════════════════════════
          1. HERO — two-column split
      ══════════════════════════════════════ */}
      <section className="hero-gradient text-primary-foreground py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* left: text */}
            <div data-aos="fade-right">
              {/* breadcrumb-style label */}
              <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium mb-5 tracking-wide uppercase">
                <span className="w-5 h-px bg-white/60" />
                {lang === "ja" ? "インドデスク" : "India Desk"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">
                {svcTitle}
              </h1>
              {v(indiaDesk.subtitle, indiaDesk.subtitle_ja) && (
                <p className="text-xl font-medium text-white/80 mb-4 leading-snug">
                  {v(indiaDesk.subtitle, indiaDesk.subtitle_ja)}
                </p>
              )}
              {v(indiaDesk.overview, indiaDesk.overview_ja) && (
                <div
                  className="prose max-w-xl mb-8 text-base leading-relaxed [&_*]:!text-white [&_p]:!text-white [&_li]:!text-white"
                  dangerouslySetInnerHTML={{ __html: v(indiaDesk.overview, indiaDesk.overview_ja) }}
                />
              )}
              <a
                href={ctaUrl}
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold
                           px-8 py-3.5 rounded-xl hover:opacity-90 transition-colors shadow-lg text-sm"
              >
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* right: hero image or stat highlights */}
            <div data-aos="fade-left" className="hidden lg:flex flex-col gap-4 justify-center">
              {indiaDesk.hero_image ? (
                <img
                  src={`/storage/${indiaDesk.hero_image}`}
                  alt={svcTitle}
                  className="w-full max-h-80 object-cover rounded-2xl shadow-2xl"
                />
              ) : highlights.length > 0 ? (
                /* show stat cards in hero if no image */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {highlights.slice(0, 3).map((h, i) => (
                    <div
                      key={h.id}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                    >
                      {h.value && (
                        <p className="text-4xl font-extrabold text-white mb-1">{h.value}</p>
                      )}
                      <p className="text-sm font-medium text-white/80 leading-snug">
                        {v(h.title, h.title_ja)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {serviceItems.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? `${svcTitle}サービス一覧` : `Our ${svcTitle} Services`}
              subtitle={
                lang === "ja"
                  ? "日本企業向け インドビジネス総合支援サービス"
                  : "Comprehensive India Business Support Services for Japanese Enterprises."
              }
            />

            <div className="space-y-6">
              {serviceItems.map((item, i) => {
                const Icon = icon(SERVICE_ITEM_ICONS, i);
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={item.id}
                    data-aos={isEven ? "fade-right" : "fade-left"}
                    data-aos-delay={i * 50}
                    className={`flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl
                                border border-border bg-card hover:shadow-lg transition-all duration-300
                                group`}
                  >
                    {/* Icon block */}
                    <div className="flex-shrink-0 w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center
                                    ">
                      <Icon className="w-7 h-7" />
                    </div>


                    <div className="flex-1 min-w-0">
                      {/* step badge + title inline */}
                      <div className="flex items-center gap-3 mb-2">
                        {/* <span className="text-xs font-bold text-primary/40 tracking-widest">
                          {String(i + 1).padStart(2, "0")}
                        </span> */}
                        <h3 className="text-lg font-bold text-primary leading-snug">
                          {v(item.title, item.title_ja)}
                        </h3>
                      </div>
                      {item.description && (
                        <div
                          className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(item.description, item.description_ja) }}
                        />
                      )}
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="hidden md:block flex-shrink-0 w-5 h-5 text-primary/30
                                           group-hover:text-primary group-hover:translate-x-1
                                           transition-all duration-300 mt-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          3. BENEFITS — horizontal icon-left cards
      ══════════════════════════════════════ */}
      {benefits.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? `${svcTitle} のメリット` : `Benefits of ${svcTitle}`}
              subtitle={
                lang === "ja"
                  ? "インドでのビジネス展開において、日本企業が直面する課題を総合的にサポートします。"
                  : "End-to-end support that helps Japanese enterprises establish, operate, and grow their presence in India with confidence."
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {benefits.map((b, i) => {
                const Icon = icon(BENEFIT_ICONS, i);
                return (
                  <div
                    key={b.id}
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                    className="flex gap-5 bg-white p-6 rounded-xl border border-border
                               shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center
                                    ">
                      <Icon className="w-6 h-6" />
                    </div>


                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-base">{v(b.title, b.title_ja)}</h3>
                      {b.description && (
                        <div
                          className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(b.description, b.description_ja) }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          4. MID-PAGE CTA — full-width banner
      ══════════════════════════════════════ */}
      <section className="py-16 bg-primary" data-aos="fade-up">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {lang === "ja"
                  ? "インド進出・事業拡大のご相談はこちら"
                  : "Ready to Establish or Expand Your India Operations?"}
              </h2>
              <p className="text-white/75 text-sm max-w-xl">
                {lang === "ja"
                  ? "インドデスクチームが御社のニーズに合わせたプランをご提案します。"
                  : "Contact our India Desk team for a tailored engagement plan."}
              </p>
            </div>
            <a
              href={ctaUrl}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary font-semibold
                         px-8 py-3.5 rounded-xl hover:opacity-90 transition-colors shadow-lg text-sm"
            >
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WHY CHOOSE — two-column checklist style
      ══════════════════════════════════════ */}
      {whyChoose.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div data-aos="fade-right" className="lg:sticky lg:top-32"  >
                <SectionHeading
                  align="left"
                  title={
                    lang === "ja"
                      ? "なぜIndo-Sakuraを選ぶのか？"
                      : `Why Choose Indo-Sakura for ${svcTitle}?`
                  }
                  subtitle={
                    lang === "ja"
                      ? "実績ある専門知識・カスタムソリューション・エンドツーエンドのサポートを提供します。"
                      : "Proven expertise, custom solutions, and end-to-end support that deliver measurable results."
                  }
                />
                <a
                  href={ctaUrl}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold
                             px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
                >
                  {ctaLabel} <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-4" data-aos="fade-left">
                {whyChoose.map((item, i) => {
                  const Icon = icon(WHY_ICONS, i);
                  return (
                    <div
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-delay={i * 60}
                      className="flex gap-4 p-5 bg-card border border-border rounded-xl
                                 hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center
                                     ">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <h3 className="font-bold text-foreground mb-1 text-base">{v(item.title, item.title_ja)}</h3>
                        {item.description && (
                          <div
                            className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: v(item.description, item.description_ja) }}
                          />
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

      {/* ══════════════════════════════════════
          6. APPROACH — numbered timeline rows
      ══════════════════════════════════════ */}
      {/* {(approachSteps.length > 0 || v(indiaDesk.supporting_growth, indiaDesk.supporting_growth_ja)) && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading
              title={
                lang === "ja"
                  ? `${svcTitle}の開発アプローチ`
                  : `Our ${svcTitle} Development Approach`
              }
              subtitle={
                lang === "ja"
                  ? "インド市場への参入と事業運営を円滑に進めるための実証済みプロセスです。"
                  : "A structured, step-by-step process designed to ensure smooth India market entry and operations."
              }
            />

            {approachSteps.length > 0 ? (
              <div className="relative">
                <div className="absolute left-6 top-6 bottom-6 w-px bg-primary/20 hidden md:block" />

                <div className="space-y-4">
                  {approachSteps.map((step, i) => (
                    <div
                      key={step.id ?? i}
                      data-aos="fade-up"
                      data-aos-delay={i * 70}
                      className="flex gap-5 bg-white border border-border rounded-2xl p-6
                                 hover:border-primary/40 hover:shadow-md transition-all duration-300 relative"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white
                                      flex items-center justify-center font-extrabold text-lg shadow-md z-10">
                        {step.step_number ?? i + 1}
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-bold text-foreground mb-1 text-base leading-snug">
                          {v(step.title, step.title_ja)}
                        </h3>
                        {step.description && (
                          <div
                            className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: v(step.description, step.description_ja) }}
                          />
                        )}
                      </div>
                      <div className="absolute right-0 top-4 bottom-4 w-1 rounded-full bg-primary/20 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                data-aos="fade-up"
                className="prose prose-lg max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: v(indiaDesk.supporting_growth, indiaDesk.supporting_growth_ja) }}
              />
            )}
          </div>
        </section>
      )} */}

      {/* ══════════════════════════════════════
          7. TECHNOLOGY STACK — badge-style grid
      ══════════════════════════════════════ */}
      {/* {techStack.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? "テクノロジースタック" : "Technology Stack"}
              subtitle={
                lang === "ja"
                  ? "信頼性の高いインド事業運営を支えるための最新技術プラットフォームを活用しています。"
                  : "We leverage modern technology platforms and tools to deliver reliable, scalable India operations."
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((stack, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 50}
                  className="flex gap-4 items-start bg-card border border-border rounded-xl p-5
                             hover:border-primary/40 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-1 self-stretch rounded-full bg-primary/60" />
                  <div>
                    <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-1">
                      {v(stack.category, stack.category_ja)}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stack.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* ══════════════════════════════════════
          9. INDUSTRIES WE SERVE
          (per-service if set, else global)
      ══════════════════════════════════════ */}
      {safeIndustries.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja" ? "対象業界" : "Industries We Serve"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" data-aos="fade-up">
              {lang === "ja"
                ? "インドに進出する日本企業をさまざまな業界にわたって支援します。"
                : "We support Japanese enterprises across a wide range of sectors entering and growing in India."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeIndustries.map((ind, i) => {
                const Icon = icon(INDUSTRY_ICONS, i);
                return (
                  <div
                    key={ind.id}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>

                      {/* Title + Description */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {v(ind.title, ind.title_ja)}
                        </h3>
                        <div
                          className="text-sm text-muted-foreground prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(ind.description, ind.description_ja) }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* ══════════════════════════════════════
          9. TESTIMONIALS — quote card with left accent
      ══════════════════════════════════════ */}
      {/* {testimonials.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading
              title={lang === "ja" ? "お客様の声" : "What Our Clients Say"}
              subtitle={
                lang === "ja"
                  ? "Indo-Sakuraのサポートでインド展開に成功した日本企業の声をご紹介します。"
                  : "Hear from Japanese companies that have successfully expanded to India with Indo-Sakura's support."
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t_, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 70}
                  className="relative bg-card border border-border rounded-xl p-7 shadow-sm
                             hover:shadow-md transition-shadow duration-300
                             border-l-4 border-l-primary"
                >
                  <Quote className="w-7 h-7 text-primary/20 mb-4" />
                  <p className="text-muted-foreground italic leading-relaxed mb-5 text-sm">
                    "{v(t_.quote, t_.quote_ja)}"
                  </p>
                  {t_.author && (
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center
                                      text-primary font-bold text-xs flex-shrink-0">
                        {t_.author.charAt(0).toUpperCase()}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{t_.author}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* ══════════════════════════════════════
          10. FAQ — two-column layout on desktop
      ══════════════════════════════════════ */}
      {safeFaqs.length > 0 && (
        <section className="py-16 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* left: sticky heading */}
              <div className="lg:sticky lg:top-32" data-aos="fade-right">
                <SectionHeading
                  align="left"
                  title={lang === "ja" ? "よくある質問" : "Frequently Asked Questions"}
                  subtitle={
                    lang === "ja"
                      ? "サービスについてよくいただく質問をQ&A形式でご紹介します。"
                      : "Common questions about this service answered for you."
                  }
                />
                <a
                  href={ctaUrl}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                             font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
                >
                  {lang === "ja" ? "お問い合わせ" : "Still have questions?"} <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* right: accordion */}
              <div className="lg:col-span-2 space-y-3" data-aos="fade-left">
                {safeFaqs.map((faq, i) => (
                  <div
                    key={faq.id}
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                    className="bg-white border border-border rounded-xl overflow-hidden
                               hover:border-primary/30 transition-colors duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-start gap-4 px-6 py-5 text-left
                                 hover:bg-primary/5 transition-colors"
                    >
                      {/* Q badge */}
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground
                                   flex items-center justify-center font-bold text-xs mt-0.5"
                      >
                        Q
                      </span>
                      <span className="flex-1 font-semibold text-foreground text-sm leading-snug pt-0.5">
                        {v(faq.question, faq.question_ja)}
                      </span>
                      <ChevronDown
                        className={`flex-shrink-0 w-4 h-4 text-primary mt-1 transition-transform duration-300
                                    ${openFaq === faq.id ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openFaq === faq.id && (
                      <div className="flex gap-4 px-6 pb-6">
                        {/* A badge */}
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary
                                     flex items-center justify-center font-bold text-xs mt-0.5"
                        >
                          A
                        </span>
                        <div
                          className="flex-1 text-muted-foreground text-sm leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(faq.answer, faq.answer_ja) }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA + Popup */}
      <ContactCTA />
      {/* <ContactPopup open={popup} onClose={() => setPopup(false)} /> */}
    </Layout>
  );
}