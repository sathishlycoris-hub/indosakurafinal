import Layout from "@/components/layout/Layout";
import ContactCTA from "@/components/layout/Contact";

import { usePage, Link } from "@inertiajs/react";
import { Calendar, User, ArrowLeft, Tag, ChevronDown } from "lucide-react";
import Insightshead from "@/components/layout/InsightsHead";
import { useState } from "react";

interface Faq { id: number; question: string; question_ja?: string; answer: string; answer_ja?: string; }
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

interface Props {
  faqs: Faq[];
}

export default function BlogDetails({ faqs = [] }: Props) {
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const safeFaqs = Array.isArray(faqs) ? faqs : [];

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
            {/* <div className="mt-16 pt-8 border-t">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <ArrowLeft size={18} />
                {getValue("Back to Blogs", "ブログ一覧に戻る")}
              </Link>
            </div> */}

          </div>
        </div>
      </article>

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
                        {getValue(faq.question, faq.question_ja)}
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
                          dangerouslySetInnerHTML={{ __html: getValue(faq.answer, faq.answer_ja) }}
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
      <ContactCTA />
    </Layout>
  );
}

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