import Layout from "@/components/layout/Layout";
import ContactCTA from "@/components/layout/Contact";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import {
  ArrowRight, ChevronDown, Cpu, Shield, Users, Sparkles,
  FileText, RefreshCw, Globe, Code, Database, Cloud, CheckCircle,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface HomepageSettings {
  hero_heading: string;      hero_heading_ja: string;
  hero_subtext: string;      hero_subtext_ja: string;
  hero_tagline: string;      hero_tagline_ja: string;
  hero_image: string | null;

  corp_heading: string;      corp_heading_ja: string;
  corp_para1: string;        corp_para1_ja: string;
  corp_para2: string;        corp_para2_ja: string;

  stat1_value: string; stat1_label: string; stat1_label_ja: string; stat1_sub: string; stat1_sub_ja: string;
  stat2_value: string; stat2_label: string; stat2_label_ja: string; stat2_sub: string; stat2_sub_ja: string;
  stat3_value: string; stat3_label: string; stat3_label_ja: string; stat3_sub: string; stat3_sub_ja: string;
  stat4_value: string; stat4_label: string; stat4_label_ja: string; stat4_sub: string; stat4_sub_ja: string;

  feat1_label: string; feat1_label_ja: string; feat1_sub: string; feat1_sub_ja: string;
  feat2_label: string; feat2_label_ja: string; feat2_sub: string; feat2_sub_ja: string;
  feat3_label: string; feat3_label_ja: string; feat3_sub: string; feat3_sub_ja: string;
  feat4_label: string; feat4_label_ja: string; feat4_sub: string; feat4_sub_ja: string;

  services_intro: string;    services_intro_ja: string;
  solutions_intro: string;   solutions_intro_ja: string;
  updates_intro: string;     updates_intro_ja: string;
}

interface Seo { meta_title?: string; meta_description?: string; meta_keywords?: string; }
interface NewsEvent { id: number; date: string; eventtype: string; short: string; short_ja?: string | null; }
interface Service { id: number; title: string; title_ja?: string | null; slug: string; hero_description?: string | null; hero_description_ja?: string | null; }
interface Solution { id: number; title: string; title_ja?: string | null; slug: string; hero_description?: string | null; hero_description_ja?: string | null; }
interface CaseStudy { subtitle: string; subtitle_ja?: string; slug: string; hero_image?: string | null; tags?: string; }

interface IndexProps {
  homepage: HomepageSettings;
  seo?: Seo | null;
  updates?: NewsEvent[];
  services: Service[];
  solutions?: Solution[];
  caseStudies?: CaseStudy[];
}

// ── Icon pools ───────────────────────────────────────────────────────────────
const serviceIcons = [Cpu, Database, Globe, Code, Cloud];
const solutionIcons = [Sparkles, FileText, RefreshCw, Shield, Database];
const featIcons = [Globe, Users, CheckCircle, ArrowRight];

const getServiceMeta = (i: number) => ({ Icon: serviceIcons[i % serviceIcons.length] });
const getSolutionMeta = (i: number) => ({ Icon: solutionIcons[i % solutionIcons.length] });

// ── Page ─────────────────────────────────────────────────────────────────────

const Index = ({
  homepage,
  seo = null,
  updates = [],
  services = [],
  solutions = [],
  caseStudies = [],
}: IndexProps) => {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  // Helper: pick EN or JA value
  const t = (en: string, ja: string) => (lang === "ja" ? ja || en : en);

  // Shorthand for homepage settings fields
  const h = homepage;

  const safeServices = Array.isArray(services) ? services : [];
  const safeUpdates  = Array.isArray(updates)  ? updates  : [];
  const safeSolutions = Array.isArray(solutions) ? solutions : [];

  const heroImage = h.hero_image
    ? `/storage/${h.hero_image}`
    : "/image/osaka.jpg";

  // Stats array built from CMS
  const stats = [
    { value: h.stat1_value, label: t(h.stat1_label, h.stat1_label_ja), sub: t(h.stat1_sub, h.stat1_sub_ja) },
    { value: h.stat2_value, label: t(h.stat2_label, h.stat2_label_ja), sub: t(h.stat2_sub, h.stat2_sub_ja) },
    { value: h.stat3_value, label: t(h.stat3_label, h.stat3_label_ja), sub: t(h.stat3_sub, h.stat3_sub_ja) },
    { value: h.stat4_value, label: t(h.stat4_label, h.stat4_label_ja), sub: t(h.stat4_sub, h.stat4_sub_ja) },
  ];

  // Feature cards built from CMS
  const feats = [
    { Icon: featIcons[0], label: t(h.feat1_label, h.feat1_label_ja), sub: t(h.feat1_sub, h.feat1_sub_ja) },
    { Icon: featIcons[1], label: t(h.feat2_label, h.feat2_label_ja), sub: t(h.feat2_sub, h.feat2_sub_ja) },
    { Icon: featIcons[2], label: t(h.feat3_label, h.feat3_label_ja), sub: t(h.feat3_sub, h.feat3_sub_ja) },
    { Icon: featIcons[3], label: t(h.feat4_label, h.feat4_label_ja), sub: t(h.feat4_sub, h.feat4_sub_ja) },
  ];

  return (
    <Layout>
      <Head>
        <title>{seo?.meta_title ?? (lang === "en" ? "Indo Sakura Software Japan" : "インドサクラソフトウェアジャパン")}</title>
        {seo?.meta_description && <meta name="description" content={seo.meta_description} />}
        {seo?.meta_keywords && <meta name="keywords" content={seo.meta_keywords} />}
      </Head>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[520px]">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Indo Sakura Software Japan" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            <div className="flex-1 w-full lg:w-auto flex flex-col items-center lg:items-start mt-6 lg:mt-0">
              <div className="relative rounded-xl p-4 sm:p-5 md:p-6 w-full sm:w-2/3 lg:w-1/3 max-w-sm shadow-2xl backdrop-blur-sm border border-white/30 bg-black/40">
                <div className="absolute inset-0 rounded-xl bg-black/30 pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-white">
                    {t(h.hero_heading, h.hero_heading_ja)}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4 leading-relaxed">
                    {t(h.hero_subtext, h.hero_subtext_ja)}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white">
                    {t(h.hero_tagline, h.hero_tagline_ja)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-background/20 to-transparent" />
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-10 pt-8">
          <div className="container absolute inset-0 opacity-15 pointer-events-none"
            style={{ backgroundImage: "url(/image/dot.jpg)", backgroundRepeat: "repeat", backgroundSize: "200px auto", backgroundPosition: "center top" }} />
          <div className="flex items-center gap-6 mb-10 section-divider">
            <h2 className="text-2xl font-semibold text-foreground uppercase tracking-wide whitespace-nowrap">
              {lang === "en" ? "CASE STUDIES" : "導入事例"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/blogs/casestudies/${study.slug}`} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img src={`/storage/${study.hero_image}`} alt={study.subtitle}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {lang === "en" ? study.subtitle : study.subtitle_ja || study.subtitle}
                  </h3>
                  {study.tags && <p className="text-sm text-muted-foreground">#{study.tags}</p>}
                </div>
                <div className="mt-3 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">{lang === "en" ? "View Details" : "詳細を見る"}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPDATES ───────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="section-divider">
              <h2 className="text-2xl font-semibold">{lang === "en" ? "Information" : "お知らせ"}</h2>
            </div>
          </div>
          <p className="text-muted-foreground mb-8">{t(h.updates_intro, h.updates_intro_ja)}</p>
          <div className="space-y-4">
            {safeUpdates.map((update, index) => (
              <Link key={update.id} href={route("news.show", update.id)} className="block">
                <div data-aos="fade-up" data-aos-delay={index * 80}
                  className="grid grid-cols-[120px_160px_1fr_30px] items-center py-4 border-b border-border hover:bg-muted/50 transition-colors">
                  <span className="text-md text-muted-foreground">{update.date}</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium w-fit">{update.eventtype}</span>
                  <p className="text-foreground overflow-hidden line-clamp-1">
                    {lang === "en" ? update.short : update.short_ja || update.short}
                  </p>
                  <span className="justify-self-end text-muted-foreground hover:text-primary transition-colors">
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORPORATE INFO ────────────────────────────────────────────────── */}
      <section className="py-20 bg-accent-pink text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="section-divider mb-8 border-white/80">
            <h2 className="text-2xl font-semibold text-white">
              {lang === "en" ? "Corporate Info" : "企業情報"}
            </h2>
          </div>

          <div className="container grid lg:grid-cols-[65%_35%] gap-0">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-6">
                {t(h.corp_heading, h.corp_heading_ja)}
              </h2>
              <p className="mb-4 font-bold leading-relaxed">{t(h.corp_para1, h.corp_para1_ja)}</p>
              <p className="mb-8 leading-relaxed">{t(h.corp_para2, h.corp_para2_ja)}</p>
              <Button asChild variant="heroOutline"
                className="mb-12 bg-white text-pink-600 border-white hover:bg-white/90 hover:text-pink-700">
                <Link href="/corporate-info">
                  {lang === "en" ? "About Indo-Sakura" : "インドサクラについて"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Stats from CMS */}
            <div className="grid grid-cols-2 gap-4" data-aos="zoom-in">
              {stats.map((s, i) => (
                <div key={i} className="bg-primary rounded-xl p-5">
                  <div className="text-3xl font-bold mb-1">{s.value}</div>
                  <p className="font-medium text-primary-foreground/90">{s.label}</p>
                  <p className="text-sm text-primary-foreground/90">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feature cards from CMS */}
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16" data-aos="zoom-in">
            {feats.map(({ Icon, label, sub }, i) => (
              <div key={i} className="bg-primary rounded-lg p-6 text-center">
                <Icon className="w-6 h-6 mx-auto mb-3" />
                <p className="font-medium">{label}</p>
                <p>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="section-divider mb-8">
            <h2 className="text-2xl font-semibold">{lang === "en" ? "Services" : "サービス"}</h2>
          </div>
          <p className="text-muted-foreground mb-8">{t(h.services_intro, h.services_intro_ja)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {safeServices.map((service, index) => {
              const { Icon } = getServiceMeta(index);
              return (
                <div key={service.id} data-aos="flip-up" data-aos-delay={index * 100}
                  className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col h-full">
                  <div className="icon-box mb-4"><Icon className="w-8 h-8" /></div>
                  <h2 className="font-semibold mb-2 text-lg">
                    {lang === "en" ? service.title : service.title_ja || service.title}
                  </h2>
                  <div className="text-muted-foreground mb-4 line-clamp-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: lang === "en"
                        ? service.hero_description || ""
                        : service.hero_description_ja || service.hero_description || "",
                    }} />
                  <Link href={`/services/${service.slug}`}
                    className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1 mt-auto">
                    {lang === "en" ? "Learn More" : "詳しく見る"} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-section-light text-gray-900">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="section-divider mb-4">
            <h2 className="text-2xl font-semibold">{lang === "en" ? "Solutions" : "ソリューション"}</h2>
          </div>
          <p className="text-muted-foreground mb-12">{t(h.solutions_intro, h.solutions_intro_ja)}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="zoom-in">
            {safeSolutions.map((solution, index) => {
              const { Icon } = getSolutionMeta(index);
              return (
                <div key={solution.id} data-aos="fade-up" data-aos-delay={index * 100}
                  className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-t-pink-500">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {lang === "en" ? solution.title : solution.title_ja || solution.title}
                    </h3>
                    <div className="text-muted-foreground mb-6 line-clamp-3 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: lang === "en"
                          ? solution.hero_description || ""
                          : solution.hero_description_ja || solution.hero_description || "",
                      }} />
                    <Link href={`/solutions/${solution.slug}`} className="mt-auto">
                      <Button variant="viewDetails" className="w-full">
                        {lang === "en" ? "View Details" : "詳細を見る"} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Static CTA card */}
            <div className="rounded-lg p-6 hero-gradient text-white flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {lang === "en" ? "Need a Custom Solution?" : "カスタムソリューションが必要ですか？"}
                </h3>
                <p className="opacity-90 mb-6">
                  Our team of experts can design and implement the perfect solution tailored to your unique business needs.
                </p>
              </div>
              <Link href="/contact">
                <Button className="bg-white text-pink-600 hover:bg-gray-100">
                  {lang === "en" ? "Contact Us" : "お問い合わせ"} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Index;