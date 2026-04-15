import { usePage } from "@inertiajs/react";
import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import { getLangValue } from "@/utils/lang";
export default function NewsDetail() {
  const { news, lang } = usePage().props as any;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(
      lang === "ja" ? "ja-JP" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

  return (
    <Layout>
      <Subheader currentPage="News" />

      <article className="py-12 max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-primary mb-4">
          {getLangValue(lang, news.short, news.short_ja)}
        </h1>

        {/* DATE */}
        <p className="text-sm mb-4">
          {formatDate(news.date)}
        </p>

        {/* IMAGE */}
        {news.image && (
          <img
            src={`/storage/${news.image}`}
            className="rounded-lg mb-6 mx-auto"
          />
        )}

        {/* DESCRIPTION */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: getLangValue(
              lang,
              news.description,
              news.description_ja
            ),
          }}
        />

        {/* PDF */}
        {news.pdf && (
          <a
            href={`/storage/${news.pdf}`}
            target="_blank"
            className="block mt-6 text-primary underline"
          >
            {getLangValue(lang, "Download PDF", "PDFをダウンロード")}
          </a>
        )}
      </article>
    </Layout>
  );
}
