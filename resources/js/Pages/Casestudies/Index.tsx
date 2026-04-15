import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import ContactCTA from "@/components/layout/Contact";
import AOS from "aos";
import "aos/dist/aos.css";
import { getLangValue } from "@/utils/lang";
import Insightshead from "@/components/layout/InsightsHead";

interface CaseStudy {
  id: number;
  slug: string;
  subtitle: string;
  subtitle_ja?: string;
  hero_image?: string;
  tags: string;
  tags_ja?: string;
}

interface PageProps {
  caseStudies: CaseStudy[];
}

export default function Casestudies({ caseStudies = [] }: PageProps) {

  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Insightshead />
      </div>

      {/* HERO */}
      <section className="relative bg-primary py-20">
        <div
          className="container mx-auto px-4 relative z-10 text-center text-white"
          data-aos="fade-right"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {getLangValue(lang, "Case Studies", "事例")}
          </h1>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
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

                  {/* IMAGE */}
                  <div className="aspect-video overflow-hidden">

                    {study.hero_image && (
                      <img
                        src={`/storage/${study.hero_image}`}
                        alt={getLangValue(lang, study.subtitle, study.subtitle_ja)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    {/* TITLE */}
                    <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-4">
                      {getLangValue(lang, study.subtitle, study.subtitle_ja)}
                    </h3>

                    {/* TAG */}
                    {getLangValue(lang, study.tags, study.tags_ja) && (
                      <span className="text-sm text-primary">
                        #{getLangValue(lang, study.tags, study.tags_ja)}
                      </span>
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
}