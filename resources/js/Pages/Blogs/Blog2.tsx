import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Calendar, User, ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
import ContactCTA from "@/components/layout/Contact";
import Insightshead from "@/components/layout/InsightsHead";

const Blog2 = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <Insightshead />

     

      {/* Main Article */}
      <article className="py-16 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className="px-4 py-1.5 bg-rose-200 text-rose-700 font-semibold rounded-full text-xs uppercase tracking-wide">
                  {language === 'en' ? "Security" : "セキュリティ"}
                </span>

                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" /> 2024-11-25
                </span>

                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="w-4 h-4" />
                  {language === 'en' ? "Security Team" : "セキュリティチーム"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
                {language === 'en'
                  ? "Zero Trust Security: A Complete Guide for Modern Enterprises"
                  : "ゼロトラストセキュリティ：現代企業のための完全ガイド"}
              </h1>

              <p className="text-lg text-muted-foreground max-w-3xl">
                {language === 'en'
                  ? "Learn how Zero Trust is shaping the future of cybersecurity by eliminating implicit trust and continuously verifying every request."
                  : "暗黙的な信頼を排除し、すべてのリクエストを継続的に検証することで、ゼロトラストがサイバーセキュリティの未来をどのように形作っているかをご紹介します。"}
              </p>
            </header>

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-12">
              <img
                src="/image/case2.jpg"
                alt="Zero Trust Security Architecture"
                className="w-full h-auto max-h-[480px] object-cover"
              />
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6">

              <section>
                <h2>{language === 'en' ? "What is Zero Trust?" : "ゼロトラストとは？"}</h2>
                <p>
                  {language === 'en'
                    ? "Zero Trust is a modern security model that requires continuous verification of every user and device, regardless of where the request originates."
                    : "ゼロトラストは、要求の発信元に関係なく、すべてのユーザーとデバイスを継続的に検証することを求める最新のセキュリティモデルです。"}
                </p>
              </section>

              <section>
                <h2>{language === 'en' ? "Core Principles of Zero Trust" : "ゼロトラストのコア原則"}</h2>
                <p>
                  {language === 'en'
                    ? "Zero Trust operates on the belief that no entity should be trusted automatically. Every access request is treated as a potential threat."
                    : "ゼロトラストは、どの存在も自動的に信頼されるべきではないという前提で動作します。すべてのアクセス要求は潜在的な脅威として扱われます。"}
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-lg font-bold">✓</span>
                    <span>{language === 'en' ? "Verify explicitly" : "明示的な検証"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-lg font-bold">✓</span>
                    <span>{language === 'en' ? "Use least privilege access" : "最小権限アクセスの使用"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-lg font-bold">✓</span>
                    <span>{language === 'en' ? "Assume breach" : "侵害前提での対策"}</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2>{language === 'en' ? "Key Implementation Steps" : "実装の主要ステップ"}</h2>
                <p>
                  {language === 'en'
                    ? "Organizations implementing Zero Trust must follow a structured process to ensure a scalable and secure architecture."
                    : "ゼロトラストを導入する組織は、拡張性と安全性を確保するために体系的なプロセスに従う必要があります。"}
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3">
                    <span className="text-primary text-lg font-bold">✓</span>
                    <div>
                      <strong>{language === 'en' ? "Identify sensitive data" : "機密データの特定"}</strong>
                      <p className="text-muted-foreground mt-1">
                        {language === 'en' ? "Start by mapping critical assets" : "重要な資産を特定することから始めます"}
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-primary text-lg font-bold">✓</span>
                    <div>
                      <strong>{language === 'en' ? "Segment your environment" : "環境のセグメンテーション"}</strong>
                      <p className="text-muted-foreground mt-1">
                        {language === 'en' ? "Reduce attack surface by isolating workloads" : "ワークロードを分離することで攻撃対象領域を減らします"}
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-primary text-lg font-bold">✓</span>
                    <div>
                      <strong>{language === 'en' ? "Implement monitoring" : "モニタリングの実装"}</strong>
                      <p className="text-muted-foreground mt-1">
                        {language === 'en' ? "Continuously validate identity and behavior" : "身元と動作を継続的に検証します"}
                      </p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2>{language === 'en' ? "The Future of Zero Trust" : "ゼロトラストの未来"}</h2>
                <p>
                  {language === 'en'
                    ? "Zero Trust is rapidly becoming the global standard for cybersecurity, with enterprises adopting it across networks, applications, and devices."
                    : "ゼロトラストは急速にサイバーセキュリティの世界標準となりつつあり、企業はネットワーク、アプリケーション、デバイスにわたって導入を進めています。"}
                </p>
              </section>
            </div>

            {/* Footer Navigation */}
            {/* <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                {language === 'en' ? "Back to All Blogs" : "ブログ一覧に戻る"}
              </Link>
            </div> */}

          </div>
        </div>
      </article>
      <ContactCTA />
    </Layout>
  );
};

export default Blog2;
