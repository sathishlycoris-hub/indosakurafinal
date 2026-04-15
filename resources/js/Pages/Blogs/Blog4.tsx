import Layout from "@/components/layout/Layout";
import Insightshead from "@/components/layout/InsightsHead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
// import { Link } from "react-router-dom";

const Blog4 = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <Insightshead />


      <article className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <span className="px-3 py-1 bg-rose-200 text-rose-700 text-sm font-medium rounded">
                {language === 'en' ? "Business" : "ビジネス"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold my-4">
                {language === 'en' ? "Digital Transformation Success Stories" : "デジタルトランスフォーメーション成功事例"}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />2024-11-10</span>
                <span className="flex items-center gap-1"><User className="w-4 h-4" />{language === 'en' ? "Business Team" : "ビジネスチーム"}</span>
              </div>
            </header>

            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img src="/image/case4.jpg" alt="Digital Transformation" className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>{language === 'en' ? "Transforming Healthcare" : "ヘルスケアの変革"}</h2>
              <p>
                {language === 'en' 
                  ? "A leading healthcare provider implemented AI-driven diagnostics and digital patient management systems, reducing wait times by 40% and improving diagnostic accuracy by 25%."
                  : "大手ヘルスケアプロバイダーがAI駆動の診断とデジタル患者管理システムを導入し、待ち時間を40％削減、診断精度を25％向上させました。"}
              </p>

              <h2>{language === 'en' ? "Retail Revolution" : "小売業の革命"}</h2>
              <p>
                {language === 'en'
                  ? "A major retailer transformed their operations with omnichannel integration, resulting in a 60% increase in online sales and improved customer satisfaction scores."
                  : "大手小売業者がオムニチャネル統合で業務を変革し、オンライン売上が60％増加、顧客満足度スコアが向上しました。"}
              </p>

              <h2>{language === 'en' ? "Key Lessons" : "主な教訓"}</h2>
              <p>
                {language === 'en'
                  ? "Successful digital transformation requires strong leadership commitment, employee engagement, and a customer-centric approach to technology adoption."
                  : "デジタルトランスフォーメーションを成功させるには、強力なリーダーシップのコミットメント、従業員のエンゲージメント、技術導入への顧客中心のアプローチが必要です。"}
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

export default Blog4;
