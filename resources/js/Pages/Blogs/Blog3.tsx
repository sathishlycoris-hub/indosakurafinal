import Layout from "@/components/layout/Layout";
import Insightshead from "@/components/layout/InsightsHead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
// import { Link } from "react-router-dom";

const Blog3 = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <Insightshead />

   

      {/* Blog Article */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <header className="mb-10">
              <span className="px-3 py-1 bg-rose-200 text-rose-700 text-sm font-medium rounded">
                {language === "en" ? "Cloud" : "クラウド"}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold my-4 leading-tight">
                {language === "en"
                  ? "Cloud Migration Strategies for 2025"
                  : "2025年のクラウド移行戦略"}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  2024-11-18
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {language === "en" ? "Cloud Team" : "クラウドチーム"}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden shadow-sm mb-12">
              <img
                src="/image/case3.jpg"
                alt="Cloud Migration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none leading-relaxed text-gray-800">
              <h2 className="mt-10">
                {language === "en" ? "Why Migrate to the Cloud?" : "なぜクラウドに移行するのか？"}
              </h2>
              <p>
                {language === "en"
                  ? "Cloud migration offers numerous benefits including cost optimization, scalability, improved performance, and enhanced security. Organizations that embrace cloud technology gain competitive advantages."
                  : "クラウド移行は、コスト最適化、スケーラビリティ、パフォーマンスの向上、セキュリティの強化など、多くのメリットを提供します。クラウド技術を採用する組織は競争上の優位性を獲得します。"}
              </p>

              <h2 className="mt-10">
                {language === "en" ? "Migration Approaches" : "移行アプローチ"}
              </h2>
              <p>
                {language === "en"
                  ? "There are several migration strategies: Rehost (lift and shift), Replatform, Repurchase, Refactor, Retire, and Retain. Each approach has its own benefits and considerations."
                  : "いくつかの移行戦略があります：リホスト（リフトアンドシフト）、リプラットフォーム、再購入、リファクタリング、リタイア、リテイン。各アプローチには独自のメリットと考慮事項があります。"}
              </p>

              <h2 className="mt-10">
                {language === "en" ? "Best Practices" : "ベストプラクティス"}
              </h2>
              <p>
                {language === "en"
                  ? "Successful cloud migration requires thorough planning, stakeholder alignment, proper resource allocation, and continuous monitoring throughout the process."
                  : "クラウド移行を成功させるには、徹底した計画、ステークホルダーの調整、適切なリソース配分、プロセス全体を通じた継続的なモニタリングが必要です。"}
              </p>
            </div>

            {/* Footer Navigation */}
            {/* <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === "en" ? "Back to Blogs" : "ブログ一覧に戻る"}
              </Link>

              <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Share2 className="w-4 h-4" />
                {language === "en" ? "Share" : "シェア"}
              </button>
            </div> */}

          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Blog3;
