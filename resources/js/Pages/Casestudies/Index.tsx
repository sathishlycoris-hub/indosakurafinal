import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import ContactCTA from "@/components/layout/Contact";
import AOS from "aos";
import "aos/dist/aos.css";
import Insightshead from "@/components/layout/InsightsHead";
import { Head } from "@inertiajs/react";
import { getLangValue } from "@/utils/lang";
import { ArrowRight } from "lucide-react";

interface BaseCaseStudy {
  slug: string;
  title: string;
  title_ja?: string;
  company_name?: string;
  company_name_ja?: string;
  ceo_name?: string;
  ceo_name_ja?: string;
  logo?: string | null;
  hero_image?: string | null;
  hero_description?: string;
  hero_description_ja?: string;
  tags?: string;
  tags_ja?: string;
}

// India Desk-nested case study — needs the parent desk slug to build its URL
interface CaseStudy extends BaseCaseStudy {
  india_desk_slug: string;
  india_desk_title: string;
}

// Standalone home case study — its own flat URL
interface HomeCaseStudy extends BaseCaseStudy {}

interface Seo {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

interface PageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
}

interface PageProps {
  homeCaseStudies: HomeCaseStudy[];
  caseStudies: CaseStudy[];
  seo?: Seo | null;
  lang: "en" | "ja";
  pageData?: PageData | null;
  [key: string]: unknown;
}

const stripTags = (html?: string | null) => (html ? html.replace(/<[^>]+>/g, "") : "");

/* ── Shared card — same design for every case study regardless of source ── */
function CaseStudyCard({
  study,
  href,
  lang,
  index,
}: {
  study: BaseCaseStudy;
  href: string;
  lang: "en" | "ja";
  index: number;
}) {
  const companyName = getLangValue(lang, study.company_name || "", study.company_name_ja || "");
  const ceoName = getLangValue(lang, study.ceo_name || "", study.ceo_name_ja || "");
  const description = getLangValue(lang, study.hero_description || "", study.hero_description_ja || "");

  return (
    <Link
      href={href}
      data-aos="fade-up"
      data-aos-delay={index * 80}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
    >
      {/* Header: company + CEO */}
      {(companyName || ceoName || study.logo) && (
        <div className="bg-primary px-5 py-4 flex items-center gap-3">
          {study.logo && (
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white overflow-hidden flex items-center justify-center ring-2 ring-white/30">
              <img src={study.logo} alt="" className="w-full h-full object-contain p-1" />
            </div>
          )}
          <div className="min-w-0">
            {companyName && (
              <p className="text-white font-semibold text-xl truncate">{companyName}</p>
            )}
            {ceoName && <p className="text-white/70 text-sm truncate">{ceoName}</p>}
          </div>
        </div>
      )}

      <div className="aspect-video overflow-hidden">
        {study.hero_image ? (
          <img
            src={`/storage/${study.hero_image}`}
            alt={getLangValue(lang, study.title, study.title_ja)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {getLangValue(lang, study.title, study.title_ja)}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
            {stripTags(description)}
          </p>
        )}
        {getLangValue(lang, study.tags, study.tags_ja) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {getLangValue(lang, study.tags, study.tags_ja)!
              .split(",")
              .map(tag => (
                <span key={tag.trim()} className="text-sm text-primary">
                  #{tag.trim()}
                </span>
              ))}
          </div>
        )}
        {/* <span className="mt-auto inline-flex items-center gap-1 text-primary text-sm font-medium">
          {getLangValue(lang, "Read full case study", "詳細を見る")} <ArrowRight className="w-3.5 h-3.5" />
        </span> */}
      </div>
    </Link>
  );
}

// A single combined entry, tagged with the href it should link to
type CombinedEntry = {
  key: string;
  href: string;
  study: BaseCaseStudy;
};

const Casestudies = () => {
  const { homeCaseStudies = [], caseStudies = [], seo, lang, pageData } = usePage<PageProps>().props;

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true, offset: 120, delay: 80 });
  }, []);

  // Merge into one list — Home Case Studies first, then India Desk case studies, no headings splitting them.
  const combined: CombinedEntry[] = [
    ...homeCaseStudies.map((study) => ({
      key: `home-${study.slug}`,
      href: `/home-case-studies/${study.slug}`,
      study,
    })),
    ...caseStudies.map((study) => ({
      key: `${study.india_desk_slug}-${study.slug}`,
      href: `/india-desks/${study.india_desk_slug}/case-studies/${study.slug}`,
      study,
    })),
  ];

  return (
    <Layout>
      <Head>
        <title>
          {seo?.meta_title ?? (lang === "en" ? "Case Studies | Indo Sakura" : "事例 | インドサクラ")}
        </title>
        {seo?.meta_description && <meta name="description" content={seo.meta_description} />}
        {seo?.meta_keywords && <meta name="keywords" content={seo.meta_keywords} />}
      </Head>

      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Insightshead />
      </div>

      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8" data-aos="fade-right">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {getLangValue(lang, pageData?.hero_title || "Case Studies", pageData?.hero_title_ja || "事例")}
          </h1>
          {(pageData?.hero_subtitle || pageData?.hero_subtitle_ja) && (
            <p className="text-lg text-primary-foreground/90 mt-2">
              {getLangValue(lang, pageData.hero_subtitle ?? "", pageData.hero_subtitle_ja ?? "")}
            </p>
          )}
        </div>
      </section>

      {/* Case Studies Grid — Home Case Studies first, then India Desk case studies, mixed in one grid */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4">
          {combined.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {getLangValue(lang, "No case studies found", "事例が見つかりません")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combined.map((entry, index) => (
                <CaseStudyCard
                  key={entry.key}
                  study={entry.study}
                  href={entry.href}
                  lang={lang}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Casestudies;