import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Calendar, User, ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
import ContactCTA from "@/components/layout/Contact";
import Insightshead from "@/components/layout/InsightsHead";

const Blog1 = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <Insightshead />


      {/* Article */}
      <article className="py-16 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className="px-4 py-1.5 bg-rose-200 text-rose-700 font-semibold rounded-full text-xs uppercase tracking-wide">
                  {language === "en" ? "Technology" : "テクノロジー"}
                </span>

                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" /> 2024-12-01
                </span>

                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="w-4 h-4" />
                  {language === "en" ? "Tech Team" : "テックチーム"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
                {language === "en"
                  ? "The Future of AI-Driven Software Development"
                  : "AI駆動ソフトウェア開発の未来"}
              </h1>

              <p className="text-lg text-muted-foreground max-w-3xl">
                {language === "en"
                  ? "Discover how AI is revolutionizing the entire software development lifecycle—from planning and coding to testing and deployment."
                  : "AIが計画、コーディング、テスト、デプロイメントまで、ソフトウェア開発ライフサイクル全体をどのように変革しているかをご紹介します。"}
              </p>
            </header>

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-12">
              <img
                src="/image/case1.jpg"
                alt="AI Driven Software Development"
                className="w-full h-auto max-h-[480px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6">

              {/* Intro */}
              <section>
                <h2>{language === "en" ? "Introduction" : "はじめに"}</h2>
                <p className="text-lg text-foreground/90">
                  {language === "en"
                    ? "Artificial Intelligence is revolutionizing development workflows, enabling faster, smarter, and more efficient software production."
                    : "人工知能は開発フローを革新し、より高速でスマートかつ効率的なソフトウェア開発を実現しています。"}
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2>{language === "en" ? "AI-Powered Code Generation" : "AI駆動コード生成"}</h2>
                <p>
                  {language === "en"
                    ? "AI can now generate production-ready code from natural language descriptions, drastically reducing development time and improving efficiency."
                    : "AIは自然言語の説明から本番環境向けのコードを生成でき、開発時間の大幅な短縮と効率化に貢献します。"}
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2>{language === "en" ? "Automated Testing & Quality Assurance" : "自動テストと品質保証"}</h2>
                <p>
                  {language === "en"
                    ? "Automated AI testing tools predict bugs, generate test cases, and validate performance—ensuring high-quality, stable releases."
                    : "AIを活用した自動テストツールは、バグの予測、テストケース生成、パフォーマンス検証が可能で、高品質で安定したリリースを実現します。"}
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2>{language === "en" ? "Intelligent Code Review" : "インテリジェントコードレビュー"}</h2>
                <p>
                  {language === "en"
                    ? "AI-driven code review tools analyze logic, detect vulnerabilities, and provide real-time improvement suggestions."
                    : "AI駆動のコードレビューツールはロジック分析、脆弱性検出、改善提案をリアルタイムで行います。"}
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2>{language === "en" ? "The Road Ahead" : "今後の展望"}</h2>
                <p className="text-lg text-foreground/90">
                  {language === "en"
                    ? "The next wave of AI will bring autonomous development systems capable of designing, coding, testing, and deploying software with minimal human intervention."
                    : "次世代のAIは、最小限の人間の関与でソフトウェアの設計、コーディング、テスト、デプロイまでを実行できる自律型開発システムをもたらすでしょう。"}
                </p>
              </section>
            </div>

            {/* Footer Navigation */}
            {/* <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                {language === "en" ? "Back to All Blogs" : "ブログ一覧に戻る"}
              </Link>
            </div> */}

          </div>
        </div>
      </article>
      <ContactCTA />
    </Layout>
  );
};

export default Blog1;
