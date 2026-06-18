import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ContactCTA from "@/components/layout/Contact";
import AOS from "aos";
import "aos/dist/aos.css";
import Insightshead from "@/components/layout/InsightsHead";
import { Head } from "@inertiajs/react";
import { getLangValue } from "@/utils/lang";

interface CaseStudy {
  id: number;
  slug: string;
  subtitle: string;
  subtitle_ja?: string;
  hero_image?: string;
  tags: string;
  tags_ja?: string;
}

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
  caseStudies: CaseStudy[];
  seo?: Seo | null;
  lang: "en" | "ja";
  pageData?: PageData | null;
  [key: string]: unknown;
}

const Casestudies = () => {
  const { caseStudies = [], seo, lang, pageData } = usePage<PageProps>().props;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 120,
      delay: 80,
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          {seo?.meta_title ??
            (lang === "en" ? "Case Studies | Indo Sakura" : "事例 | インドサクラ")}
        </title>
        {seo?.meta_description && (
          <meta name="description" content={seo.meta_description} />
        )}
        {seo?.meta_keywords && (
          <meta name="keywords" content={seo.meta_keywords} />
        )}
      </Head>

      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Insightshead />
      </div>

      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8" data-aos="fade-right">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {getLangValue(
              lang,
              pageData?.hero_title    || "Case Studies",
              pageData?.hero_title_ja || "事例"
            )}
          </h1>
          {(pageData?.hero_subtitle || pageData?.hero_subtitle_ja) && (
            <p className="text-lg text-primary-foreground/90 mt-2">
              {getLangValue(
                lang,
                pageData.hero_subtitle    ?? "",
                pageData.hero_subtitle_ja ?? ""
              )}
            </p>
          )}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4">
          {caseStudies.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {getLangValue(lang, "No case studies found", "事例が見つかりません")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <Link
                  key={study.id}
                  href={`/blogs/casestudies/${study.slug}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-video overflow-hidden">
                    {study.hero_image ? (
                      <img
                        src={`/storage/${study.hero_image}`}
                        alt={getLangValue(lang, study.subtitle, study.subtitle_ja)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-4">
                      {getLangValue(lang, study.subtitle, study.subtitle_ja)}
                    </h3>
                    {getLangValue(lang, study.tags, study.tags_ja) && (
                      <div className="flex flex-wrap gap-2">
                        {getLangValue(lang, study.tags, study.tags_ja)
                          .split(",")
                          .map(tag => (
                            <span key={tag.trim()} className="text-sm text-primary">
                              #{tag.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </Link>
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