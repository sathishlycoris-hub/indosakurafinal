import Layout from "@/components/layout/Layout";
import Insightshead from "@/components/layout/InsightsHead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
// import { Link } from "react-router-dom";

const Blog5 = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <Insightshead />

      

      <article className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <span className="px-3 py-1 bg-rose-200 text-rose-700 text-sm font-medium rounded">
                {language === 'en' ? "Development" : "開発"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold my-4">
                {language === 'en' ? "The Rise of Low-Code Development Platforms" : "ローコード開発プラットフォームの台頭"}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />2024-11-05</span>
                <span className="flex items-center gap-1"><User className="w-4 h-4" />{language === 'en' ? "Dev Team" : "開発チーム"}</span>
              </div>
            </header>

            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img src="/image/blueprint.jpg" alt="Low-Code Development" className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>{language === 'en' ? "What is Low-Code?" : "ローコードとは？"}</h2>
              <p>
                {language === 'en' 
                  ? "Low-code development platforms enable users to create applications through graphical user interfaces and configuration instead of traditional hand-coded programming."
                  : "ローコード開発プラットフォームは、従来の手書きプログラミングではなく、グラフィカルユーザーインターフェースと設定を通じてアプリケーションを作成できます。"}
              </p>

              <h2>{language === 'en' ? "Benefits for Enterprises" : "企業にとってのメリット"}</h2>
              <p>
                {language === 'en'
                  ? "Low-code platforms accelerate development by 10x, reduce costs, and enable business users to participate in application development, bridging the gap between IT and business."
                  : "ローコードプラットフォームは開発を10倍加速し、コストを削減し、ビジネスユーザーがアプリケーション開発に参加できるようにし、ITとビジネスのギャップを埋めます。"}
              </p>

              <h2>{language === 'en' ? "When to Use Low-Code" : "ローコードを使用するタイミング"}</h2>
              <p>
                {language === 'en'
                  ? "Low-code is ideal for internal tools, workflow automation, customer portals, and rapid prototyping. For complex, mission-critical systems, traditional development may still be preferred."
                  : "ローコードは、社内ツール、ワークフロー自動化、カスタマーポータル、ラピッドプロトタイピングに最適です。複雑でミッションクリティカルなシステムには、従来の開発が好まれる場合があります。"}
              </p>
            </div>

            {/* <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              <Link to="/blogs" className="inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft className="w-4 h-4" />{language === 'en' ? "Back to Blogs" : "ブログ一覧に戻る"}
              </Link>
              <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Share2 className="w-4 h-4" />{language === 'en' ? "Share" : "シェア"}
              </button>
            </div> */}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Blog5;
