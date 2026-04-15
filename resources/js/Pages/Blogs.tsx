import Layout from "@/components/layout/Layout";

import { Link, usePage } from "@inertiajs/react";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Insightshead from "@/components/layout/InsightsHead";
interface Blog {
  id: number;
  title: string;
  title_ja?: string;
  short_description: string;
  short_description_ja?: string;
  category: string;
  category_ja?: string;
  published_date: string;
  image?: string | null;
}

export default function Blogs() {

  const formatDateYYYYMMDD = (dateStr: string) => {
    const date = new Date(dateStr);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}/${mm}/${dd}`;
  };
  const getValue = (en: string, ja?: string) => {
    return lang === "ja" ? ja || en : en;
  };

  //  FIXED
  const { blogs, lang } = usePage<{ blogs: Blog[]; lang: "en" | "ja" }>().props;


  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
  });
  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
  <Insightshead />
</div>

      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4" data-aos="fade-right">
          <h1 className="text-4xl font-bold mb-4">
            {getValue("Blogs", "ブログ")}
          </h1>
          <p className="opacity-90">
            {getValue(
              "Insights, updates, and thought leadership from our experts",
              "専門家によるインサイトと最新情報"
            )}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8" data-aos="fade-up">
          {blogs.map((b) => (
            <Link
              key={b.id}
              href={`/blogs/${b.id}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg group"
            >
              <img
                src={b.image ? `/storage/${b.image}` : "/image/case1.jpg"}
                className="h-48 w-full object-cover group-hover:scale-105 transition"
              />

              <div className="p-6">
                <div className="flex gap-3 text-xs mb-3">
                  <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded flex items-center gap-1">
                    <Tag size={12} /> {getValue(b.category, b.category_ja)}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar size={12} /> {formatDateYYYYMMDD(b.published_date)}
                  </span>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-1">
                  {getValue(b.title, b.title_ja)}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {getValue(b.short_description, b.short_description_ja)}
                </p>

                <span className="text-primary inline-flex items-center gap-1">
                  {getValue("Read more", "続きを読む")}
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
