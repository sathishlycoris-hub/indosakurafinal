import Layout from "@/components/layout/Layout";
import ContactCTA from "@/components/layout/Contact";

import { usePage, Link } from "@inertiajs/react";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import Insightshead from "@/components/layout/InsightsHead";

interface Blog {
  id: number;
  title: string;
  title_ja?: string;
  short_description: string;
  short_description_ja?: string;
  content: string;
  content_ja?: string;
  category: string;
  category_ja?: string;
  author?: string;
  author_ja?: string;
  published_date: string;
  image?: string | null;
}

export default function BlogDetails() {
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
  //  FIXED TYPING
  const { blog, lang } = usePage<{ blog: Blog; lang: "en" | "ja" }>().props;



  return (
    <Layout>
      <Insightshead />

      <article className="py-16 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">

                <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-rose-200 text-rose-700 font-semibold rounded-full uppercase text-xs">
                  <Tag size={12} />
                  {getValue(blog.category, blog.category_ja)}  
                </span>

                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar size={14} /> {formatDateYYYYMMDD(blog.published_date)}
                </span>

                {blog.author && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <User size={14} /> {getValue(blog.author, blog.author_ja)}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {getValue(blog.title, blog.title_ja)}
              </h1>

              <p className="text-lg text-muted-foreground max-w-3xl">
                {getValue(blog.short_description, blog.short_description_ja)}
              </p>
            </header>

            {/* Image */}
            {blog.image && (
              <div className="rounded-xl overflow-hidden shadow-lg mb-12">
                <img
                  src={`/storage/${blog.image}`}
                  alt={getValue(blog.title, blog.title_ja)}
                  className="w-full max-h-[480px] object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12
                prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: getValue(blog.content, blog.content_ja),
              }}
            />

            {/* Back */}
            <div className="mt-16 pt-8 border-t">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <ArrowLeft size={18} />
                {getValue("Back to Blogs", "ブログ一覧に戻る")}
              </Link>
            </div>

          </div>
        </div>
      </article>

      <ContactCTA />
    </Layout>
  );
}
