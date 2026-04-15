import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { getLangValue } from "@/utils/lang";

interface NewsEvent {
  id: number;
  date: string;
  eventtype: string;
  eventtype_ja?: string | null;
  short: string;
  short_ja?: string | null;
  description: string;
  description_ja?: string | null;
}

interface PageProps {
  news: NewsEvent[];
  filters: string[];       // EN names — used as match keys
  filters_ja?: string[];  // JA names — parallel array
}

export default function Pressrelease({ news = [], filters = [], filters_ja = [] }: PageProps) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const [activeFilter, setActiveFilter] = useState("All");

  // Always filter using the EN name as the key (stored in newsevents.eventtype)
  const filteredNews = activeFilter === "All"
    ? news
    : news.filter((item) => item.eventtype === activeFilter);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(lang === "ja" ? "ja-JP" : "en-GB");

  // Get the display label for a filter button
  // filters[i] = EN name, filters_ja[i] = JA name
  const filterLabel = (enName: string, idx: number) =>
    lang === "ja" ? (filters_ja[idx] || enName) : enName;

  return (
    <Layout>
      {/* sticky-below-header class defined in app.css — always sits below the main header */}
      <div className="sticky-below-header">
        <Subheader currentPage={getLangValue(lang, "Press Release", "プレスリリース")} />
      </div>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-primary text-3xl lg:text-4xl font-bold mb-8">
            {getLangValue(lang, "News", "ニュース")}
          </h1>

          {/* FILTER TABS — labels from DB, matching by EN key */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter, idx) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeFilter === filter
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {filterLabel(filter, idx)}
              </button>
            ))}
          </div>

          {/* NEWS LIST */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {getLangValue(lang, "No news found", "ニュースが見つかりません")}
            </div>
          ) : (
            filteredNews.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[120px_160px_1fr_100px] items-center gap-4 py-4 border-b border-border hover:bg-muted/50 transition-colors"
              >
                {/* DATE */}
                <div className="text-md text-muted-foreground">{formatDate(item.date)}</div>

                {/* TYPE — shows JA if available */}
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium w-fit">
                  {lang === "ja"
                    ? item.eventtype_ja || item.eventtype
                    : item.eventtype}
                </div>

                {/* TITLE */}
                <div className="text-foreground">
                  {getLangValue(lang, item.short, item.short_ja)}
                </div>

                {/* LINK */}
                <Link href={route("news.show", item.id)} className="justify-self-start">
                  <Button variant="outline" size="sm"
                    className="text-primary border-primary hover:bg-primary hover:text-white whitespace-nowrap">
                    {getLangValue(lang, "View", "詳細を見る")}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}