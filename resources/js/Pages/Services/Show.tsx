import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
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

interface Highlight    { id: number; title: string; title_ja?: string; value?: string; description?: string; description_ja?: string; }
interface Benefit      { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ServiceItem  { id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface WhyChooseItem{ id: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ApproachStep { id: number; step_number?: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Testimonial  { quote: string; quote_ja?: string; author?: string; }
interface TechStack    { category: string; category_ja?: string; items: string; }

/* Global or per-service FAQ */
interface Faq {
  id: number;
  question: string; question_ja?: string;
  answer: string; answer_ja?: string;
}

/* Global or per-service Industry */
interface Industry {
  id: number;
  title: string; title_ja?: string;
  description: string; description_ja?: string;
}

interface Service {
  id: number;
  title: string; title_ja?: string;
  slug: string;
  subtitle?: string; subtitle_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  hero_image?: string | null;
  how_it_works?: string; how_it_works_ja?: string;
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
  service: Service;
  /** Resolved by ServicePageController — per-service if set, else global */
  faqs: Faq[];
  /** Resolved by ServicePageController — per-service if set, else global */
  industries: Industry[];
  /** 'service' | 'global' — informational, not used in UI */
  faqSource?: string;
  industrySource?: string;
}

/* ═══════════════════════════════════════
   ICON POOLS
═══════════════════════════════════════ */

const BENEFIT_ICONS      = [CheckCircle, TrendingUp, Award, Users, Clock, Zap, ShieldCheck, BarChart3];
const SERVICE_ITEM_ICONS = [Bot, Sparkles, Network, BrainCircuit, Database, MessageCircle, Workflow, Layers];
const WHY_ICONS          = [CheckCircle2, Star, Layers, Lock, Target, BadgeCheck, Lightbulb, TrendingUp];
const INDUSTRY_ICONS     = [Heart, Wallet, GraduationCap, Factory, ShoppingCart, Building2, Cpu, Shield, Globe, Cloud];

const icon = (pool: any[], i: number) => pool[i % pool.length];

AOS.init({ duration: 900, easing: "ease-in-out", once: true, offset: 100, delay: 60 });

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */

export default function Show({ service, faqs = [], industries = [] }: Props) {
  const { lang }    = usePage<{ lang: "en" | "ja" }>().props;
  const [popup, setPopup]     = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const v = (en?: string | null, ja?: string | null) =>
    ((lang === "ja" ? ja || en : en) || "").trim();

  const highlights    = Array.isArray(service.highlights)     ? service.highlights    : [];
  const benefits      = Array.isArray(service.benefits)       ? service.benefits      : [];
  const serviceItems  = Array.isArray(service.service_items)  ? service.service_items : [];
  const whyChoose     = Array.isArray(service.why_choose)     ? service.why_choose    : [];
  const approachSteps = Array.isArray(service.approach_steps) ? service.approach_steps: [];
  const testimonials  = Array.isArray(service.testimonials)   ? service.testimonials  : [];
  const techStack     = Array.isArray(service.tech_stack)     ? service.tech_stack    : [];

  // These come pre-resolved from the controller (per-service if available, else global)
  const safeFaqs       = Array.isArray(faqs)       ? faqs       : [];
  const safeIndustries = Array.isArray(industries) ? industries : [];

  const ctaUrl   = service.cta_url || "/contact";
  const ctaLabel = v(service.cta_label, service.cta_label_ja) ||
    (lang === "ja" ? "無料相談を予約する" : "Book a Free Consultation");

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Serviceshead />
      </div>

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="hero-gradient text-primary-foreground py-20 relative overflow-hidden">
        {/* {service.hero_image && (
          <div className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(/storage/${service.hero_image})` }} />
        )} */}
        <div className="container mx-auto px-6 text-white max-w-6xl relative z-10" data-aos="fade-right">
          {/* {v(service.hero_description, service.hero_description_ja) && (
            <div className="prose prose-invert max-w-2xl mb-3 text-white/80 text-sm"
              dangerouslySetInnerHTML={{ __html: v(service.hero_description, service.hero_description_ja) }} />
          )} */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {v(service.title, service.title_ja)}
          </h2>
          {v(service.subtitle, service.subtitle_ja) && (
            <p className="text-2xl font-bold max-w-2xl mb-4">
              {v(service.subtitle, service.subtitle_ja)}
            </p>
          )}
          {v(service.overview, service.overview_ja) && (
            <div className="prose prose-invert max-w-2xl mb-7 opacity-80 text-lg"
              dangerouslySetInnerHTML={{ __html: v(service.overview, service.overview_ja) }} />
          )}
          <a href={ctaUrl}
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold
                       px-7 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg">
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. OUR SERVICES
      ══════════════════════════════════════ */}
      {serviceItems.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja"
                ? `${v(service.title, service.title_ja)}サービス一覧`
                : `Our ${v(service.title, service.title_ja)} Services`}
            </h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto" data-aos="fade-up">
              {lang === "ja"
                ? "ビジネスの目標を加速するための包括的なサービス一覧です。"
                : "A comprehensive suite of services tailored to accelerate your business goals."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {serviceItems.map((item, i) => {
                const Icon = icon(SERVICE_ITEM_ICONS, i);
                return (
                  <div key={item.id} data-aos="fade-up" data-aos-delay={i * 60}
                    className="group bg-card border border-border rounded-2xl p-6
                               hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4
                                    group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {v(item.title, item.title_ja)}
                    </h3>
                    {item.description && (
                      <div className="text-sm text-muted-foreground leading-relaxed prose prose-md max-w-none"
                        dangerouslySetInnerHTML={{ __html: v(item.description, item.description_ja) }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          3. HIGHLIGHTS — Why section stats
      ══════════════════════════════════════ */}
      {/* {highlights.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6 max-w-7xl" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center text-primary mb-16 tracking-tight">
              {lang === "ja"
                ? `なぜ${v(service.title, service.title_ja)}なのか？`
                : `Why ${v(service.title, service.title_ja)}?`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {highlights.map((h, i) => (
                <div key={h.id} data-aos="fade-up" data-aos-delay={i * 80}
                  className="group relative bg-card/80 backdrop-blur-sm border border-border/50
                             rounded-2xl p-10 shadow-lg hover:shadow-2xl
                             transition-all duration-500 hover:-translate-y-2">
                  {h.value && (
                    <div className="text-6xl font-bold text-primary mb-6 group-hover:scale-110 transition-transform">
                      {h.value}
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                    {v(h.title, h.title_ja)}
                  </h3>
                  {h.description && (
                    <div className="text-sm md:text-base text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: v(h.description, h.description_ja) }} />
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-b-2xl
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* ══════════════════════════════════════
          4. BENEFITS
      ══════════════════════════════════════ */}
      {benefits.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6">
            <h2 className="text-[32px] font-semibold text-center text-primary mb-6" data-aos="fade-up">
              {lang === "ja"
                ? `${v(service.title, service.title_ja)} のメリット`
                : `Benefits of ${v(service.title, service.title_ja)}`}
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed" data-aos="fade-up">
              {lang === "ja"
                ? "AIを取り入れることで、速度・品質・コストの課題を根本的に解決します。"
                : "AI-driven development transforms your processes by solving traditional issues such as speed limitations, quality variations, and hidden costs."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b, i) => {
                const Icon = icon(BENEFIT_ICONS, i);
                return (
                  <div key={b.id} data-aos="fade-up" data-aos-delay={i * 80}
                    className="bg-white p-10 rounded-xl border shadow-sm text-center hover:shadow-md transition-shadow">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h3 className="text-lg font-semibold text-primary mb-2">{v(b.title, b.title_ja)}</h3>
                    {b.description && (
                      <div className="text-gray-600 leading-relaxed prose prose-sm max-w-none mx-auto"
                        dangerouslySetInnerHTML={{ __html: v(b.description, b.description_ja) }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          5. MID-PAGE CTA BANNER
      ══════════════════════════════════════ */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {lang === "ja"
              ? "よりスマートなAIソリューションの構築を始めましょう"
              : "Start Building Smarter AI Solutions Today"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {lang === "ja"
              ? "インテリジェントな自動化とAIイノベーションでビジネスを変革します。"
              : "Transform your business with intelligent automation and AI innovation."}
          </p>
          <a href={ctaUrl}
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold
                       px-8 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg">
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. WHY CHOOSE INDO-SAKURA
      ══════════════════════════════════════ */}
      {whyChoose.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja"
                ? "なぜIndo-Sakuraを選ぶのか？"
                : `Why Choose Indo-Sakura for ${v(service.title, service.title_ja)}?`}
            </h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto" data-aos="fade-up">
              {lang === "ja"
                ? "実績ある専門知識・カスタムソリューション・エンドツーエンドのサポートを提供します。"
                : "Proven expertise, custom solutions, and end-to-end support that deliver measurable results."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChoose.map((item, i) => {
                const Icon = icon(WHY_ICONS, i);
                return (
                  <div key={item.id} data-aos="fade-up" data-aos-delay={i * 70}
                    className="flex gap-4 p-6 bg-card border border-border rounded-2xl hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{v(item.title, item.title_ja)}</h3>
                      {item.description && (
                        <div className="text-gray-600 leading-relaxed prose prose-sm max-w-none mx-auto"
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

      {/* ══════════════════════════════════════
          7. DEVELOPMENT APPROACH
      ══════════════════════════════════════ */}
      {(approachSteps.length > 0 || v(service.how_it_works, service.how_it_works_ja)) && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja"
                ? `${v(service.title, service.title_ja)}の開発アプローチ`
                : `Our ${v(service.title, service.title_ja)} Development Approach`}
            </h2>
            <p className="text-center text-muted-foreground mb-14" data-aos="fade-up">
              {lang === "ja"
                ? "AIの導入を成功させるための実証済みの構造的アプローチに従っています。"
                : "We follow a proven, structured approach to ensure successful AI implementation."}
            </p>
            {approachSteps.length > 0 ? (
              <div className="space-y-5">
                {approachSteps.map((step, i) => (
                  <div key={step.id ?? i} data-aos="fade-up" data-aos-delay={i * 80}
                    className="flex gap-5 bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white
                                    flex items-center justify-center font-bold text-lg shadow-md">
                      {step.step_number ?? i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{v(step.title, step.title_ja)}</h4>
                      {step.description && (
                        <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: v(step.description, step.description_ja) }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div data-aos="fade-up" className="prose prose-lg max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: v(service.how_it_works, service.how_it_works_ja) }} />
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          8. TECHNOLOGY STACK
      ══════════════════════════════════════ */}
      {techStack.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja" ? "テクノロジースタック" : "Technology Stack"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto" data-aos="fade-up">
              {lang === "ja"
                ? "スケーラブルで安全なAIソリューションを構築するための最先端テクノロジーを活用しています。"
                : "We use industry-leading technologies to build scalable and secure AI solutions."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {techStack.map((stack, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 60}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-primary mb-2 text-sm uppercase tracking-wider">
                    {v(stack.category, stack.category_ja)}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stack.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                ? "あらゆる業界向けにカスタマイズされたAIソリューションを提供します。"
                : "We deliver AI solutions across multiple industries."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeIndustries.map((ind, i) => {
                const Icon = icon(INDUSTRY_ICONS, i);
                return (
                  <div key={ind.id} data-aos="fade-up" data-aos-delay={i * 80}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{v(ind.title, ind.title_ja)}</h3>
                    <div className="text-sm text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: v(ind.description, ind.description_ja) }} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          10. TESTIMONIALS
      ══════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja" ? "お客様の声" : "What Our Clients Say About Our AI Solutions"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto" data-aos="fade-up">
              {lang === "ja"
                ? "Indo-Sakuraと協力した企業の実際の声をご紹介します。"
                : "Real results from businesses that partnered with Indo-Sakura."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t_, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 80}
                  className="bg-card border border-border rounded-xl p-8 shadow-sm relative">
                  <Quote className="w-8 h-8 text-primary/15 absolute top-5 right-5" />
                  <p className="text-muted-foreground italic leading-relaxed mb-5 text-sm">
                    "{v(t_.quote, t_.quote_ja)}"
                  </p>
                  {t_.author && <p className="text-sm font-semibold text-foreground">— {t_.author}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          11. FAQ
          (per-service if set, else global)
      ══════════════════════════════════════ */}
      {safeFaqs.length > 0 && (
        <section className="py-16 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
              {lang === "ja" ? "よくある質問" : "Frequently Asked Questions"}
            </h2>
            <p className="text-center text-muted-foreground mb-12" data-aos="fade-up">
              {lang === "ja"
                ? "サービスについてよくいただく質問をQ&A形式でご紹介します。"
                : "Common questions about this service answered for you."}
            </p>
            <div className="space-y-4">
              {safeFaqs.map((faq, i) => (
                <div key={faq.id} data-aos="fade-up" data-aos-delay={i * 60}
                  className="border border-border rounded-xl bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-muted/30 transition-colors">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground
                                     flex items-center justify-center font-semibold text-sm">Q</span>
                    <span className="flex-1 font-medium text-foreground pt-0.5">
                      {v(faq.question, faq.question_ja)}
                    </span>
                    <ChevronDown className={`flex-shrink-0 w-5 h-5 text-muted-foreground mt-0.5
                                            transition-transform duration-300
                                            ${openFaq === faq.id ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-6 flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-primary
                                       flex items-center justify-center font-semibold text-sm">A</span>
                      <div className="flex-1 text-muted-foreground leading-relaxed prose prose-sm max-w-none pt-0.5"
                        dangerouslySetInnerHTML={{ __html: v(faq.answer, faq.answer_ja) }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA + Popup */}
      <ContactCTA />
      <ContactPopup open={popup} onClose={() => setPopup(false)} />
    </Layout>
  );
}