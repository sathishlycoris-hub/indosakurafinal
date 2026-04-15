import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import {
  Building2,
  Cog,
  BarChart3,
  CheckCircle,
  Users,
  Clock,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Zap
} from "lucide-react";

const Application = () => {
  const { language } = useLanguage();

  /* ------------------------------------
   * STATS — Premium animated cards with rich copy
   * ------------------------------------*/
  const stats = [
    {
      value: "500+",
      label:
        language === "en"
          ? "Enterprise Applications Delivered"
          : "エンタープライズアプリ提供実績",
      descriptionEn:
        "From Fortune 500 to fast-growing enterprises — we’ve built mission-critical systems that power operations across 20+ countries.",
      descriptionJa:
        "フォーチュン500から急成長企業まで — 20カ国以上で稼働する基幹業務システムを500以上構築。"
    },
    {
      value: "99.9%",
      label:
        language === "en" ? "System Uptime Guarantee" : "稼働率保証",
      descriptionEn:
        "High-availability architecture with geo-redundancy and auto-failover — your business never stops.",
      descriptionJa:
        "地理的冗長性と自動フェイルオーバーを備えた高可用性設計 — ビジネスは止まりません。"
    },
    {
      value: "40%+",
      label:
        language === "en" ? "Average Efficiency Gain" : "平均業務効率向上",
      descriptionEn:
        "Our clients report 40–60% improvements in process speed, decision-making, and operational costs after deployment.",
      descriptionJa:
        "導入企業は平均40〜60%の業務速度向上、意思決定高速化、運用コスト削減を実現。"
    }
  ];

  /* ------------------------------------
   * BENEFITS — With subtitle (exact same pattern)
   * ------------------------------------*/
  const benefits = [
    {
      icon: Globe,
      title:
        language === "en" ? "Scalable Global Architecture" : "グローバル対応スケーラブル設計",
      subtitle:
        language === "en" ? "Grow without limits" : "制限なく成長できる",
      description:
        language === "en"
          ? "Microservices, multi-region cloud, and horizontal scaling — built to support millions of users from day one."
          : "マイクロサービス、マルチリージョンクラウド、水平スケーリング — 初日から数百万ユーザーに対応可能。"
    },
    {
      icon: Cog,
      title:
        language === "en" ? "Seamless System Integration" : "シームレスなシステム統合",
      subtitle:
        language === "en" ? "One platform, all your tools" : "1つのプラットフォームで全ツール連携",
      description:
        language === "en"
          ? "Connect ERP, CRM, SCM, HRIS, legacy systems, and third-party APIs into a unified, real-time ecosystem."
          : "ERP、CRM、SCM、人事システム、レガシー、外部APIを1つのリアルタイム連携プラットフォームに統合。"
    },
    {
      icon: BarChart3,
      title:
        language === "en" ? "Real-Time Business Intelligence" : "リアルタイムBI",
      subtitle:
        language === "en" ? "Decide faster, win faster" : "より速く判断、より速く勝利",
      description:
        language === "en"
          ? "Embedded analytics, predictive insights, and executive dashboards — turn data into competitive advantage instantly."
          : "埋め込み型分析、予測インサイト、経営ダッシュボード — データを即座に競争優位性に変換。"
    }
  ];

  /* ------------------------------------
   * PHASES — Same structure as all other pages
   * ------------------------------------*/
  const phases = [
    {
      title: language === "en" ? "Discovery & Strategy" : "発見・戦略立案",
      items: [
        language === "en" ? "Deep business process analysis" : "業務プロセスの徹底分析",
        language === "en" ? "Executive & user workshops" : "経営層・ユーザー向けワークショップ",
        language === "en" ? "Digital transformation roadmap" : "DXロードマップ策定"
      ]
    },
    {
      title: language === "en" ? "Architecture & Design" : "アーキテクチャ設計",
      items: [
        language === "en" ? "Enterprise-grade system design" : "エンタープライズ級システム設計",
        language === "en" ? "Technology & cloud strategy" : "技術・クラウド戦略",
        language === "en" ? "Security & compliance framework" : "セキュリティ・コンプライアンス設計"
      ]
    },
    {
      title: language === "en" ? "Development & Integration" : "開発・統合",
      items: [
        language === "en" ? "Agile delivery with bi-weekly demos" : "2週間ごとのデモ付きアジャイル開発",
        language === "en" ? "Continuous integration & testing" : "継続的インテグレーション・テスト",
        language === "en" ? "Legacy & third-party system integration" : "レガシー・外部システム連携"
      ]
    },
    {
      title: language === "en" ? "Deployment & Evolution" : "デプロイ・継続進化",
      items: [
        language === "en" ? "Zero-downtime blue-green deployment" : "ゼロダウンタイムのブルーグリーンデプロイ",
        language === "en" ? "User training & change management" : "ユーザー教育・チェンジマネジメント",
        language === "en" ? "24/7 support & continuous enhancement" : "24時間365日サポート・継続改善"
      ]
    }
  ];

  return (
    <Layout>
      <Serviceshead />

      {/* HERO — Premium style with double lead-in */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-white">
          <p className="text-lg text-primary-foreground/90">
            {language === "en"
              ? "Generic software slows enterprises down."
              : "汎用ソフトはエンタープライズの足を引っ張ります。"}
          </p>
          <p className="text-sm mb-4 opacity-80">
            {language === "en"
              ? "Enterprise applications accelerate them."
              : "エンタープライズアプリが加速させます。"}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "en"
              ? "Enterprise Applications Development"
              : "エンタープライズアプリケーション開発"}
          </h1>

          <p className="text-lg max-w-2xl opacity-90">
            {language === "en"
              ? "We build powerful, integrated, future-proof enterprise systems that become the backbone of your digital transformation."
              : "貴社のデジタルトランスフォーメーションの中核となる、強力で統合された未来志向のエンタープライズシステムを構築します。"}
          </p>
        </div>
      </section>

      {/* STATS — Exact same premium animated cards */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-4xl font-bold text-center text-primary mb-16 tracking-tight">
            {language === "en"
              ? "Why Enterprise Applications ?"
              : "スケールで実証されたエンタープライズ成果"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-6xl font-bold text-primary mb-6 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                  {stat.label}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {language === "en" ? stat.descriptionEn : stat.descriptionJa}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS — With subtitle & rich copy */}
      <section className="py-20 bg-[#F6F6F6]">
        <div className="container mx-auto px-6">
          <h2 className="text-[32px] font-semibold text-center text-primary mb-6">
            {language === "en"
              ? "Benefits of Enterprise Applications"
              : "エンタープライズソリューションの3つの強み"}
          </h2>

          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
            {language === "en"
              ? "We don’t just build applications. We build the digital foundation that powers world-class enterprises."
              : "単なるアプリケーションではなく、世界水準の企業を支えるデジタル基盤を構築します。"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white p-10 rounded-xl border shadow-sm text-center"
              >
                <benefit.icon className="w-12 h-12 text-primary mx-auto mb-6" />

                <h3 className="text-lg font-semibold text-primary mb-2">
                  {benefit.title}
                </h3>

                <p className="font-semibold mb-4">{benefit.subtitle}</p>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES — Same layout as all other pages */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            {language === "en" ? "How Enterprise Applications Works" : "エンタープライズ納品プロセス"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {language === "en"
              ? "Our enterprise applications operate through a meticulously engineered process that transforms complex business needs into robust, scalable systems. It begins with in-depth discovery, where we analyze your operations, interview stakeholders, and map out a strategic roadmap to align technology with your goals."
              : "実績に裏打ちされた透明性の高いプロセス — 全フェーズがエンタープライズ成功のために設計されています。"}
          </p>
{/* 
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold text-primary">
                    {phase.title}
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </Layout>
  );
};

export default Application;