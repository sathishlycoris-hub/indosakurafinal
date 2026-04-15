import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import { Calendar, Tag, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Insightshead from "@/components/layout/InsightsHead";

interface Infographic {
  id: number;
  title: string;
  title_ja?: string;
  short_description?: string;
  short_description_ja?: string;
  category?: string;
  category_ja?: string;
  author?: string;
  author_ja?: string;
  published_date: string;
  image?: string | null;
}

export default function Infographics() {
  const { infographics, lang } = usePage<{
    infographics: Infographic[];
    lang: "en" | "ja";
  }>().props;

  AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 80 });

  const getValue = (en?: string, ja?: string) =>
    (lang === "ja" ? ja || en : en) || "";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
  };

  const [featured, ...rest] = infographics;

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Insightshead />
      </div>

      {/* Hero */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4" data-aos="fade-right">
          <h1 className="text-4xl font-bold mb-4">
            {getValue("Infographics", "インフォグラフィックス")}
          </h1>
          <p className="opacity-90">
            {getValue(
              "Visual insights and data-driven stories from our experts",
              "専門家によるビジュアルインサイト"
            )}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">

          {infographics.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              {getValue("No infographics available yet.", "インフォグラフィックスはまだありません。")}
            </p>
          )}

          {/* ── Featured card — full width horizontal (matches reference top card) ── */}
          {featured && (
            <Link

              href={`/blogs/infographics/${featured.id}`}
              className="group flex flex-col md:flex-row border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow mb-10 bg-white"
              data-aos="fade-up"
            >
              {/* Left image — larger */}
              <div className="md:w-[45%] h-56 md:h-72 overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={featured.image ? `/storage/${featured.image}` : "/image/case1.jpg"}
                  alt={getValue(featured.title, featured.title_ja)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right content */}
              <div className="flex-1 p-8 flex flex-col justify-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-rose-500 text-white px-3 py-1 rounded-full w-fit uppercase tracking-wide">
                  <Tag size={11} />
                  {getValue(featured.category, featured.category_ja) || "INFOGRAPHICS"}
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {getValue(featured.title, featured.title_ja)}
                </h2>

                {featured.short_description && (
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {getValue(featured.short_description, featured.short_description_ja)}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  {featured.author && (
                    <span className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <User size={12} className="text-primary" />
                      </div>
                      {getValue(featured.author, featured.author_ja)}
                    </span>
                  )}
                  {/* <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {formatDate(featured.published_date)}
                  </span> */}
                </div>
              </div>
            </Link>
          )}

          {/* ── 2-column grid for the rest ── */}
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {rest.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/blogs/infographics/${item.id}`}
                  className="group border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  {/* Cover image */}
                  <div className="h-52 overflow-hidden bg-muted">
                    <img
                      src={item.image ? `/storage/${item.image}` : "/image/case1.jpg"}
                      alt={getValue(item.title, item.title_ja)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-500 text-white px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wide">
                      <Tag size={10} />
                      {getValue(item.category, item.category_ja) || "INFOGRAPHICS"}
                    </span>

                    <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                      {getValue(item.title, item.title_ja)}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {item.author && (
                        <span className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <User size={10} className="text-primary" />
                          </div>
                          {getValue(item.author, item.author_ja)}
                        </span>
                      )}
                      {/* <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(item.published_date)}
                      </span> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}