// resources/js/Pages/Infographics/InfographicDetails.tsx
// Changes vs original: import PageSeo, read pageSeo from usePage, render <PageSeo>

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ContactCTA from "@/components/layout/Contact";
import { usePage, Link } from "@inertiajs/react";
import { Calendar, User, Tag, List, ArrowLeft } from "lucide-react";
import Insightshead from "@/components/layout/InsightsHead";
import PageSeo, { type PageSeoProps } from "@/components/PageSeo"; // ← import

interface TocItem { label: string; }

interface Infographic {
  id: number;
  title: string;
  title_ja?: string;
  short_description?: string;
  short_description_ja?: string;
  content?: string;
  content_ja?: string;
  table_of_contents?: TocItem[] | null;
  table_of_contents_ja?: TocItem[] | null;
  category?: string;
  category_ja?: string;
  author?: string;
  author_ja?: string;
  published_date: string;
  image?: string | null;
  infographic_image?: string | null;
}

export default function InfographicDetails() {
  // ← Read pageSeo alongside existing props
  const { infographic, related, lang, pageSeo } = usePage<{
    infographic: Infographic;
    related: Infographic[];
    lang: "en" | "ja";
    pageSeo: PageSeoProps;
  }>().props;

  const [tocOpen, setTocOpen] = useState(true);

  const getValue = (en?: string, ja?: string) =>
    (lang === "ja" ? ja || en : en) || "";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
  };

  const toc =
    lang === "ja"
      ? (infographic.table_of_contents_ja ?? infographic.table_of_contents ?? [])
      : (infographic.table_of_contents ?? []);

  return (
    <Layout>
      {/* ← Inject SEO meta tags */}
      <PageSeo {...pageSeo} />

      <Insightshead />

      <article className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* HEADER */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-snug">
              {getValue(infographic.title, infographic.title_ja)}
            </h1>
          </header>

          {/* COVER IMAGE */}
          {infographic.image && (
            <div className="rounded-xl overflow-hidden shadow-md mb-10">
              <img
                src={`/storage/${infographic.image}`}
                alt={getValue(infographic.title, infographic.title_ja)}
                className="w-full max-h-[400px] object-cover"
              />
            </div>
          )}

          {/* TABLE OF CONTENTS */}
          {toc && toc.length > 0 && (
            <div className="border border-border rounded-lg mb-10 overflow-hidden">
              <button
                type="button"
                onClick={() => setTocOpen((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-3 bg-muted/40 hover:bg-muted/60 transition-colors text-left"
              >
                <span className="flex items-center gap-2 font-semibold text-foreground text-sm">
                  <List size={16} className="text-primary" />
                  {lang === "ja" ? "目次" : "Table of Contents"}
                </span>
                <span className="text-xs text-primary font-medium">
                  {tocOpen
                    ? lang === "ja" ? "閉じる" : "close"
                    : lang === "ja" ? "開く" : "open"}
                </span>
              </button>

              {tocOpen && (
                <ol className="px-6 py-4 space-y-2">
                  {toc.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed hover:text-primary cursor-pointer transition-colors">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {/* SHORT DESCRIPTION */}
          {infographic.short_description && (
            <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed text-start mb-12">
              {getValue(infographic.short_description, infographic.short_description_ja)}
            </p>
          )}

          {/* RICH TEXT CONTENT */}
          {infographic.content && (
            <div
              className="prose prose-lg max-w-none mb-12
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: getValue(infographic.content, infographic.content_ja),
              }}
            />
          )}

          {/* MAIN INFOGRAPHIC IMAGE */}
          {infographic.infographic_image && (
            <div className="rounded-xl overflow-hidden shadow-lg mb-12">
              <img
                src={`/storage/${infographic.infographic_image}`}
                alt={`${getValue(infographic.title, infographic.title_ja)} infographic`}
                className="w-full object-contain"
              />
            </div>
          )}

          {/* BACK LINK */}
          <div className="mt-12 pt-8 border-t">
            <Link
              href="/blogs/infographics"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <ArrowLeft size={18} />
              {getValue("Back to Infographics", "インフォグラフィックス一覧に戻る")}
            </Link>
          </div>
        </div>
      </article>

      {/* RELATED POSTS */}
      {related && related.length > 0 && (
        <section className="py-14 bg-gray-50 border-t border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-xl font-bold text-foreground mb-8">
              {getValue("Related Posts", "関連記事")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/infographics/${item.id}`}
                  className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={item.image ? `/storage/${item.image}` : "/image/case1.jpg"}
                      alt={getValue(item.title, item.title_ja)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    {item.category && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-500 text-white px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wide">
                        <Tag size={9} />
                        {getValue(item.category, item.category_ja)}
                      </span>
                    )}

                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-3 leading-snug line-clamp-2">
                      {getValue(item.title, item.title_ja)}
                    </h3>

                    {item.author && (
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <User size={10} className="text-primary" />
                          </div>
                          {getValue(item.author, item.author_ja)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </Layout>
  );
}