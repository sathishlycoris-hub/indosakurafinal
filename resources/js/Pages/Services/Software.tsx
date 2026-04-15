import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import {
  Code,
  Layers,
  Wrench,
  CheckCircle,
  Users,
  Clock,
  Award,
  TrendingUp,
  Target,
  Rocket,
  Gauge
} from "lucide-react";

const Software = () => {
  const { language } = useLanguage();

  /* ------------------------------------
   * STATS — Rich animated cards with detailed descriptions
   * ------------------------------------*/
  const stats = [
    {
      value: "1000+",
      label:
        language === "en"
          ? "Custom Solutions Delivered"
          : "カスタムソリューション提供実績",
      descriptionEn:
        "From enterprise platforms to startup MVPs — we’ve built over 1,000 mission-critical systems that power businesses worldwide.",
      descriptionJa:
        "大企業向け基幹システムからスタートアップのMVPまで、世界中のビジネスを支える1,000以上のシステムを構築してきました。"
    },
    {
      value: "95%",
      label:
        language === "en" ? "On-Time Delivery Rate" : "納期遵守率",
      descriptionEn:
        "Our battle-tested agile process, clear communication, and disciplined execution deliver projects on schedule — consistently.",
      descriptionJa:
        "確立されたアジャイルプロセス、透明なコミュニケーション、厳格な実行管理により、95%以上のプロジェクトを予定通りに納品。"
    },
    {
      value: "50%+",
      label:
        language === "en" ? "Average Cost Savings" : "平均コスト削減",
      descriptionEn:
        "Through reusable components, clean architecture, and efficient processes, our clients reduce long-term ownership costs by over 50%.",
      descriptionJa:
        "再利用可能なコンポーネント、クリーンアーキテクチャ、高効率なプロセスにより、長期保有コストを平均50%以上削減。"
    }
  ];

  /* ------------------------------------
   * BENEFITS — With subtitle & rich copy
   * ------------------------------------*/
  const benefits = [
    {
      icon: Target,
      title:
        language === "en" ? "Tailored Solutions" : "完全オーダーメイド開発",
      subtitle:
        language === "en"
          ? "Built exclusively for your business"
          : "貴社のビジネスだけのためのソフトウェア",
      description:
        language === "en"
          ? "No templates. No compromises. Software designed from scratch to perfectly fit your processes, users, and growth strategy."
          : "テンプレートは使いません。妥協もしません。貴社の業務、ユーザー、成長戦略に100%フィットするソフトウェアをゼロから構築します。"
    },
    {
      icon: Layers,
      title:
        language === "en" ? "Full-Stack Expertise" : "フルスタック開発力",
      subtitle:
        language === "en"
          ? "End-to-end ownership"
          : "ワンストップで完結",
      description:
        language === "en"
          ? "From pixel-perfect UI to scalable backend, DevOps, and cloud infrastructure — one expert team handles everything."
          : "美しいUIからスケーラブルなバックエンド、DevOps、クラウド基盤まで — 全てを一気通貫で責任持って対応します。"
    },
    {
      icon: Rocket,
      title:
        language === "en" ? "Long-Term Partnership" : "長期伴走型サポート",
      subtitle:
        language === "en"
          ? "Your system evolves with you"
          : "システムは貴社と一緒に成長する",
      description:
        language === "en"
          ? "Post-launch support, continuous improvement, performance monitoring, and feature evolution — we’re with you for the long haul."
          : "納品後も継続改善、パフォーマンス監視、新機能追加 — 貴社の成長をずっと支え続けます。"
    }
  ];

  /* ------------------------------------
   * DEVELOPMENT PHASES
   * ------------------------------------*/
  const phases = [
    {
      title: language === "en" ? "Discovery & Planning" : "要件定義・計画",
      items: [
        language === "en" ? "Deep business & user analysis" : "ビジネス・ユーザー深掘り分析",
        language === "en" ? "User journey & story mapping" : "ユーザー体験設計とストーリーマッピング",
        language === "en" ? "Technical architecture design" : "技術アーキテクチャ設計"
      ]
    },
    {
      title: language === "en" ? "Design & Prototyping" : "設計・プロトタイピング",
      items: [
        language === "en" ? "Modern UI/UX design" : "最新トレンドのUI/UXデザイン",
        language === "en" ? "Interactive prototypes" : "インタラクティブプロトタイプ作成",
        language === "en" ? "User testing & feedback loops" : "ユーザー検証とフィードバック"
      ]
    },
    {
      title: language === "en" ? "Development" : "開発",
      items: [
        language === "en" ? "Agile sprints & daily standups" : "アジャイルスプリント・日次進捗共有",
        language === "en" ? "Clean code & code reviews" : "クリーンコードとコードレビュー",
        language === "en" ? "Automated testing & CI/CD" : "自動テストとCI/CDパイプライン"
      ]
    },
    {
      title: language === "en" ? "Launch & Growth" : "ローンチ・成長支援",
      items: [
        language === "en" ? "Smooth production deployment" : "スムーズな本番リリース",
        language === "en" ? "User training & documentation" : "ユーザー教育とドキュメント整備",
        language === "en" ? "Ongoing support & evolution" : "継続的サポートと機能進化"
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

      {/* HERO — Premium AI-Driven Style */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-white">
          <p className="text-lg text-primary-foreground/90">
            {language === "en"
              ? "Off-the-shelf software limits your potential."
              : "パッケージソフトは貴社の可能性を制限します。"}
          </p>
          <p className="text-sm mb-4 opacity-80">
            {language === "en"
              ? "Custom software unlocks it."
              : "カスタム開発がそれを解放します。"}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "en" ? "Custom Software Development" : "カスタムソフトウェア開発"}
          </h1>

          <p className="text-lg max-w-2xl opacity-90">
            {language === "en"
              ? "We build powerful, scalable, and beautiful software tailored exactly to your business — no compromises, no limitations."
              : "貴社のビジネスに100%フィットする、強力でスケーラブル、そして美しいソフトウェアをゼロから構築します。"}
          </p>
        </div>
      </section>

      {/* STATS — Premium Animated Cards */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-4xl font-bold text-center text-primary mb-16 tracking-tight">
            {language === "en"
              ? "Why Custom Software Development"
              : "なぜ企業はカスタム開発を選ぶのか"}
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

      {/* BENEFITS — With Subtitle */}
      <section className="py-20 bg-[#F6F6F6]">
        <div className="container mx-auto px-6">
          <h2 className="text-[32px] font-semibold text-center text-primary mb-6">
            {language === "en"
              ? "Benifits of Custom Software Development"
              : "カスタム開発の3つの決定的な優位性"}
          </h2>

          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
            {language === "en"
              ? "Custom software isn’t just better — it’s the only way to build a true competitive advantage in the digital age."
              : "カスタム開発は「より良い」だけでなく、デジタル時代に真の競争優位性を築く「唯一の方法」です。"}
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

      {/* DEVELOPMENT PROCESS */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            {language === "en" ? "How Custom Software Development Works" : "実績に裏打ちされた開発プロセス"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {language === "en"
              ? "Transparent, collaborative, and results-focused — every step designed to deliver maximum value with zero surprises."
              : "透明性と協働を重視し、結果にコミット。サプライズゼロで最大の価値をお届けするプロセスです。"}
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

export default Software;