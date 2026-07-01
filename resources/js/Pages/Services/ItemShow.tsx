import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import ContactCTA from "@/components/layout/Contact";
import ContactPopup from "@/components/ContactPopup";
import PageSeo, { PageSeoProps } from "@/components/PageSeo";
import {
  CheckCircle, TrendingUp, Award, Users, Clock, Zap, ShieldCheck, BarChart3,
  Heart, Wallet, GraduationCap, Factory, ShoppingCart, Building2, Cpu, Shield, Globe, Cloud,
  ChevronDown, ArrowRight, Bot, Sparkles, Network, BrainCircuit, Database,
  MessageCircle, Workflow, Layers, CheckCircle2, Star, Target, Lock, BadgeCheck, Lightbulb,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePage } from "@inertiajs/react";

interface Listy { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Step  { step_number?: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Tech  { category: string; category_ja?: string; items: string; }
interface Faq   { question: string; question_ja?: string; answer: string; answer_ja?: string; }
interface Feature { title: string; title_ja?: string; }

interface ServiceItem {
  id: number; slug: string;
  title: string; title_ja?: string;
  subtitle?: string; subtitle_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  hero_image?: string | null;
  cta_label?: string; cta_label_ja?: string; cta_url?: string;
  intro?: string; intro_ja?: string;
  sub_services?: Listy[];
  features?: Feature[];
  benefits?: Listy[];
  process_steps?: Step[];
  tech_stack?: Tech[];
  industries?: Listy[];
  why_choose?: Listy[];
  faqs?: Faq[];
}

interface Props {
  service: { id: number; title: string; title_ja?: string; slug: string };
  item: ServiceItem;
  pageSeo?: PageSeoProps;
}

const BENEFIT_ICONS = [CheckCircle, TrendingUp, Award, Users, Clock, Zap, ShieldCheck, BarChart3];
const SUB_ICONS     = [Bot, Sparkles, Network, BrainCircuit, Database, MessageCircle, Workflow, Layers];
const WHY_ICONS     = [CheckCircle2, Star, Layers, Lock, Target, BadgeCheck, Lightbulb, TrendingUp];
const IND_ICONS     = [Heart, Wallet, GraduationCap, Factory, ShoppingCart, Building2, Cpu, Shield, Globe, Cloud];
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
      {subtitle && <p className={`mt-3 text-muted-foreground leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}

export default function ItemShow({ service, item, pageSeo }: Props) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;
  const [popup, setPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const v = (en?: string | null, ja?: string | null) =>
    ((lang === "ja" ? ja || en : en) || "").trim();

  const arr = <T,>(x?: T[]): T[] => (Array.isArray(x) ? x : []);
  const subServices = arr(item.sub_services);
  const features    = arr(item.features);
  const benefits    = arr(item.benefits);
  const steps       = arr(item.process_steps);
  const tech        = arr(item.tech_stack);
  const industries  = arr(item.industries);
  const whyChoose   = arr(item.why_choose);
  const faqs        = arr(item.faqs);

  const ctaUrl = item.cta_url || "/contact";
  const ctaLabel = v(item.cta_label, item.cta_label_ja) || (lang === "ja" ? "無料相談を予約する" : "Book a Free Strategy Call");
  const title = v(item.title, item.title_ja);

  return (
    <Layout>
      {pageSeo && <PageSeo {...pageSeo} />}

     <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Serviceshead activeItem={{ title: item.title, title_ja: item.title_ja, slug: service.slug }} />
      </div>

      {/* Breadcrumb — now shown as a hover dropdown on the matching tab in Serviceshead instead
      <div className="bg-[#F6F6F6] border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl py-3 text-xs text-muted-foreground">
          <a href="/services" className="hover:text-primary">{lang === "ja" ? "サービス" : "Services"}</a>
          <span className="mx-2">/</span>
          <a href={`/services/${service.slug}`} className="hover:text-primary">{v(service.title, service.title_ja)}</a>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{title}</span>
        </div>
      </div>
      */}

      {/* HERO */}
      <section className="hero-gradient text-primary-foreground py-16 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div data-aos="fade-right" className="w-full">
            <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium mb-5 tracking-wide uppercase">
              <span className="w-5 h-px bg-white/60" />
              {v(service.title, service.title_ja)}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">{title}</h1>
            {v(item.subtitle, item.subtitle_ja) && (
              <p className="text-xl font-medium text-white/80 mb-4 leading-snug">{v(item.subtitle, item.subtitle_ja)}</p>
            )}
            {v(item.hero_description, item.hero_description_ja) && (
              <div className="prose max-w-full mb-8 text-base leading-relaxed [&_*]:!text-white"
                dangerouslySetInnerHTML={{ __html: v(item.hero_description, item.hero_description_ja) }} />
            )}
            <a href={ctaUrl}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-colors shadow-lg text-sm">
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      {v(item.intro, item.intro_ja) && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading title={lang === "ja" ? "概要" : "Introduction"} />
            <div data-aos="fade-up" className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: v(item.intro, item.intro_ja) }} />
          </div>
        </section>
      )}

      {/* SUB-SERVICES */}
      {subServices.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading title={lang === "ja" ? "サービス内容" : `Our ${title} Services`} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {subServices.map((s, i) => {
                const Icon = icon(SUB_ICONS, i);
                return (
                  <div key={i} data-aos="fade-up" data-aos-delay={i * 50}
                    className="bg-white p-6 rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-1">{v(s.title, s.title_ja)}</h3>
                    {s.description && (
                      <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: v(s.description, s.description_ja) }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* KEY FEATURES */}
      {features.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading title={lang === "ja" ? "主な機能" : "Key Features"} />
            <div className="flex flex-wrap gap-3 justify-center">
              {features.map((f, i) => (
                <span key={i} data-aos="fade-up" data-aos-delay={i * 30}
                  className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> {v(f.title, f.title_ja)}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      {benefits.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading title={lang === "ja" ? "メリット" : `Benefits of ${title}`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {benefits.map((b, i) => {
                const Icon = icon(BENEFIT_ICONS, i);
                return (
                  <div key={i} data-aos="fade-up" data-aos-delay={i * 60}
                    className="flex gap-5 bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
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

      {/* DEVELOPMENT PROCESS */}
      {steps.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading title={lang === "ja" ? "開発プロセス" : "Development Process"} />
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-primary/20 hidden md:block" />
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} data-aos="fade-up" data-aos-delay={i * 70}
                    className="flex gap-5 bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300 relative">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TECH STACK */}
      {tech.length > 0 && (
        <section className="py-16 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading title={lang === "ja" ? "テクノロジースタック" : "Technology Stack"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tech.map((t, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 50}
                  className="flex gap-4 items-start bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all duration-300">
                  <div className="flex-shrink-0 w-1 self-stretch rounded-full bg-primary/60" />
                  <div>
                    <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-1">{v(t.category, t.category_ja)}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INDUSTRIES */}
      {industries.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading title={lang === "ja" ? "対象業界" : "Industries We Serve"} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, i) => {
                const Icon = icon(IND_ICONS, i);
                return (
                  <div key={i} data-aos="fade-up" data-aos-delay={i * 80}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0"><Icon className="w-10 h-10 text-primary" /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{v(ind.title, ind.title_ja)}</h3>
                        {ind.description && (
                          <div className="text-sm text-muted-foreground prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: v(ind.description, ind.description_ja) }} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE */}
      {whyChoose.length > 0 && (
        <section className="py-20 bg-[#F6F6F6]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div data-aos="fade-right" className="lg:sticky lg:top-32">
                <SectionHeading align="left"
                  title={lang === "ja" ? "なぜIndoSakuraを選ぶのか？" : `Why IndoSakura for ${title}?`} />
                <a href={ctaUrl} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-xl hover:opacity-90 transition-colors text-sm">
                  {ctaLabel} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="space-y-4" data-aos="fade-left">
                {whyChoose.map((w, i) => {
                  const Icon = icon(WHY_ICONS, i);
                  return (
                    <div key={i} data-aos="fade-up" data-aos-delay={i * 60}
                      className="flex gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all duration-300">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1 text-base">{v(w.title, w.title_ja)}</h3>
                        {w.description && (
                          <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: v(w.description, w.description_ja) }} />
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

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:sticky lg:top-32" data-aos="fade-right">
                <SectionHeading align="left" title={lang === "ja" ? "よくある質問" : "Frequently Asked Questions"} />
                <a href={ctaUrl} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-colors text-sm">
                  {lang === "ja" ? "お問い合わせ" : "Still have questions?"} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="lg:col-span-2 space-y-3" data-aos="fade-left">
                {faqs.map((faq, i) => (
                  <div key={i} data-aos="fade-up" data-aos-delay={i * 50}
                    className="bg-[#F6F6F6] border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-200">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-primary/5 transition-colors">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs mt-0.5">Q</span>
                      <span className="flex-1 font-semibold text-foreground text-sm leading-snug pt-0.5">{v(faq.question, faq.question_ja)}</span>
                      <ChevronDown className={`flex-shrink-0 w-4 h-4 text-primary mt-1 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
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
      <ContactPopup open={popup} onClose={() => setPopup(false)} />
    </Layout>
  );
}