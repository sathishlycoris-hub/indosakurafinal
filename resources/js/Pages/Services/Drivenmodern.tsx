import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import {
  RefreshCw,
  Database,
  Cloud,
  CheckCircle,
  Users,
  Clock,
  Award,
  TrendingUp
} from "lucide-react";

const Drivenmodern = () => {
  const { language } = useLanguage();

  /* ------------------------------------
   * STATS — now matches AI-Driven Dev style with rich descriptions
   * ------------------------------------*/
  const stats = [
    {
      value: "60%",
      label:
        language === "en"
          ? "Cost reduction in maintenance"
          : "保守コストの削減",
      descriptionEn:
        "AI-driven automation eliminates repetitive manual tasks and reduces technical debt, achieving up to 60% lower long-term maintenance costs compared to traditional methods.",
      descriptionJa:
        "AI自動化により反復的な手作業と技術的負債を削減し、従来手法と比べて最大60%の長期保守コスト削減を実現します。"
    },
    {
      value: "3x",
      label:
        language === "en"
          ? "Faster migration speed"
          : "より速い移行速度",
      descriptionEn:
        "Automated refactoring, AI-assisted planning, and intelligent migration tools shorten modernization timelines by up to 3 times.",
      descriptionJa:
        "自動リファクタリング、AI支援計画、インテリジェント移行ツールにより、モダナイゼーション期間を最大3倍短縮します。"
    },
    {
      value: "90%",
      label:
        language === "en"
          ? "Legacy code analysis accuracy"
          : "レガシーコード分析精度",
      descriptionEn:
        "Our AI engines analyze millions of lines of legacy code with over 90% accuracy in detecting dependencies, risks, and hidden technical debt.",
      descriptionJa:
        "AIエンジンが数百万行のレガシーコードを90%以上の精度で分析し、依存関係、リスク、隠れた技術的負債を検出します。"
    }
  ];

  /* ------------------------------------
   * BENEFITS
   * ------------------------------------*/
  const benefits = [
    {
      icon: RefreshCw,
      title:
        language === "en" ? "Legacy Transformation" : "レガシー変革",
      subtitle:
        language === "en"
          ? "Revitalize outdated systems"
          : "時代遅れシステムを再構築",
      description:
        language === "en"
          ? "Transform outdated systems into efficient, scalable modern architectures through AI-driven assessment and automated redesign."
          : "AIによる分析と自動再設計によって、古いシステムを効率的でスケーラブルな最新アーキテクチャへと変革します。"
    },
    {
      icon: Database,
      title:
        language === "en" ? "AI-Powered Data Migration" : "AI駆動データ移行",
      subtitle:
        language === "en"
          ? "Seamless, safe migration"
          : "シームレスで安全な移行",
      description:
        language === "en"
          ? "AI validates data quality, correctness, and mapping, ensuring smooth migration with minimal downtime."
          : "AIがデータ品質・正確性・マッピングを検証し、最小限の停止でスムーズな移行を実現します。"
    },
    {
      icon: Cloud,
      title:
        language === "en" ? "Cloud Modernization" : "クラウドモダナイゼーション",
      subtitle:
        language === "en"
          ? "Optimize for the cloud era"
          : "クラウド時代の最適化",
      description:
        language === "en"
          ? "AI recommends optimal cloud resources, architecture, and cost models for maximum performance and efficiency."
          : "AIが最適なクラウドリソースやアーキテクチャ、コストモデルを提案し、性能と効率を最大化します。"
    }
  ];

  /* ------------------------------------
   * PHASES
   * ------------------------------------*/
  const phases = [
    {
      title: language === "en" ? "Assessment" : "評価",
      items: [
        language === "en" ? "AI-powered legacy code analysis" : "AI駆動レガシーコード分析",
        language === "en" ? "Technical debt identification" : "技術的負債の特定",
        language === "en" ? "Modernization roadmap" : "モダナイゼーションロードマップ"
      ]
    },
    {
      title: language === "en" ? "Planning" : "計画",
      items: [
        language === "en" ? "Architecture design" : "アーキテクチャ設計",
        language === "en" ? "Risk mitigation strategies" : "リスク軽減戦略",
        language === "en" ? "Resource optimization" : "リソース最適化"
      ]
    },
    {
      title: language === "en" ? "Migration" : "移行",
      items: [
        language === "en" ? "Automated code refactoring" : "自動コードリファクタリング",
        language === "en" ? "Incremental migration" : "段階的移行",
        language === "en" ? "Zero-downtime deployment" : "ゼロダウンタイムデプロイメント"
      ]
    },
    {
      title: language === "en" ? "Optimization" : "最適化",
      items: [
        language === "en" ? "Performance tuning" : "パフォーマンスチューニング",
        language === "en" ? "Security hardening" : "セキュリティ強化",
        language === "en" ? "Continuous monitoring" : "継続的監視"
      ]
    }
  ];

  const whyUs = [
    { icon: Users, value: "25+", label: language === "en" ? "Years of Experience" : "年の経験" },
    { icon: Award, value: "100+", label: language === "en" ? "Companies Served" : "企業へのサービス提供" },
    { icon: TrendingUp, value: "99%", label: language === "en" ? "Client Satisfaction" : "顧客満足度" },
    { icon: Clock, value: "170+", label: language === "en" ? "Projects Completed" : "完了プロジェクト" }
  ];

  return (
    <Layout>
      <Serviceshead />

      {/* HERO */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-white">
          <p className="text-lg text-primary-foreground/90">
            {language === "en"
              ? "Legacy systems are no longer a burden — they become a competitive advantage."
              : "レガシーシステムはもう重荷ではありません。競争優位性に変わります。"}
          </p>
          <p className="text-sm mb-4 opacity-80">
            {language === "en"
              ? "AI redefines what modernization means."
              : "AIがモダナイゼーションの常識を再定義します。"}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "en" ? "AI-Driven Modernization" : "AI駆動モダナイゼーション"}
          </h1>

          <p className="text-lg max-w-2xl opacity-90">
            {language === "en"
              ? "Leverage cutting-edge AI to analyze, plan, and execute legacy system modernization with unprecedented speed, precision, and cost efficiency."
              : "最先端AIを活用し、レガシーシステムのモダナイゼーションを前例のないスピード・精度・コスト効率で実行します。"}
          </p>
        </div>
      </section>

      {/* STATS — Fully matched to AI-Driven Dev */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-4xl font-bold text-center text-primary mb-16 tracking-tight">
            {language === "en"
              ? "Why AI Driven Modernization?"
              : "レガシーモダナイゼーションにおける「新たな常識」を示す3つの数字"}
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

      {/* BENEFITS */}
      <section className="py-20 bg-[#F6F6F6]">
        <div className="container mx-auto px-6">
          <h2 className="text-[32px] font-semibold text-center text-primary mb-6">
            {language === "en"
              ? "Benefits of AI Driven Modernization"
              : "AI駆動モダナイゼーションの3つのコアメリット"}
          </h2>

          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
            {language === "en"
              ? "AI-driven modernization fundamentally solves the traditional challenges of legacy systems: high cost, long timelines, and high risk."
              : "AI駆動モダナイゼーションはレガシーシステムが抱える高コスト・長期間・高リスクという課題を根本的に解決します。"}
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

      {/* PHASES */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            {language === "en" ? "How AI Driven Modernization Works" : "AI駆動モダナイゼーションは「驚くほどスムーズ」"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {language === "en"
              ? "AI-driven modernization is no longer a futuristic concept — it’s a proven, end-to-end process that turns risky, multi-year legacy overhauls into fast, predictable, and remarkably low-risk transformations."
              : "当社のAI駆動アプローチはレガシーモダナイゼーションの全フェーズを効率化し、複雑でリスクの高いプロジェクトを予測可能で効率的な変革に変えます。"}
          </p>

          {/* <div className="space-y-8">
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

export default Drivenmodern;