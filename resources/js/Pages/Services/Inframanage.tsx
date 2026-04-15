import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import {
  Server,
  Shield,
  Activity,
  CheckCircle,
  Users,
  Clock,
  Award,
  TrendingUp,
  Zap,
  Lock,
  Globe
} from "lucide-react";
// import { Link } from "react-router-dom";

const Inframanage = () => {
  const { language } = useLanguage();

  /* ------------------------------------
   * STATS — Rich, animated cards like AI-Driven pages
   * ------------------------------------*/
  const stats = [
    {
      value: "24/7",
      label: language === "en" ? "Monitoring & Support" : "モニタリングとサポート",
      descriptionEn:
        "Our expert team and AI-powered monitoring tools watch your infrastructure around the clock — preventing issues before they impact your business.",
      descriptionJa:
        "専門チームとAI駆動監視ツールが24時間365日システムを見守り、ビジネスに影響が出る前に問題を未然に防ぎます。"
    },
    {
      value: "99.99%",
      label: language === "en" ? "Uptime Guarantee" : "稼働率保証",
      descriptionEn:
        "Enterprise-grade SLA with financial penalties if we fail. Your systems stay online — period.",
      descriptionJa:
        "達成できない場合は罰金付きの企業向けSLA。あなたのシステムは絶対に止まりません。"
    },
    {
      value: "30%+",
      label: language === "en" ? "Average Cost Reduction" : "平均コスト削減",
      descriptionEn:
        "Through automation, rightsizing, and predictive optimization, our clients consistently reduce infrastructure costs by 30% or more.",
      descriptionJa:
        "自動化、リソース最適化、予測型運用により、お客様は平均30%以上のインフラコスト削減を実現しています。"
    }
  ];

  /* ------------------------------------
   * BENEFITS — With subtitle like AI-Driven pages
   * ------------------------------------*/
  const benefits = [
    {
      icon: Server,
      title: language === "en" ? "Infrastructure Management" : "インフラ管理",
      subtitle: language === "en" ? "Full control, zero hassle" : "完全管理、ゼロ手間",
      description:
        language === "en"
          ? "We manage servers, networks, databases, and cloud environments so your team can focus on innovation — not operations."
          : "サーバー・ネットワーク・データベース・クラウド環境を完全管理。貴社のチームは運用ではなくイノベーションに集中できます。"
    },
    {
      icon: Shield,
      title: language === "en" ? "Proactive Security" : "プロアクティブセキュリティ",
      subtitle: language === "en" ? "Threats stopped before they start" : "脅威は発生前に阻止",
      description:
        language === "en"
          ? "Real-time threat detection, automated response, compliance management, and regular penetration testing — all included."
          : "リアルタイム脅威検知、自動対応、コンプライアンス管理、定期ペネトレーションテスト — すべて標準装備。"
    },
    {
      icon: Activity,
      title: language === "en" ? "Performance Optimization" : "パフォーマンス最適化",
      subtitle: language === "en" ? "Always fast, always efficient" : "常に高速、常に効率的",
      description:
        language === "en"
          ? "AI-driven performance monitoring and auto-scaling ensure your systems run at peak efficiency — without overprovisioning."
          : "AI駆動のパフォーマンス監視とオートスケーリングにより、過剰リソースなしで常に最高効率で稼働します。"
    }
  ];

  /* ------------------------------------
   * PHASES / DETAILED SERVICES
   * ------------------------------------*/
  const services = [
    {
      title: language === "en" ? "Server & OS Management" : "サーバー・OS管理",
      items: [
        language === "en" ? "Provisioning & decommissioning" : "プロビジョニングと廃棄",
        language === "en" ? "Patch & vulnerability management" : "パッチ・脆弱性管理",
        language === "en" ? "Performance tuning & backup" : "パフォーマンスチューニングとバックアップ"
      ]
    },
    {
      title: language === "en" ? "Network & Connectivity" : "ネットワーク・接続性",
      items: [
        language === "en" ? "24/7 network monitoring" : "24時間ネットワーク監視",
        language === "en" ? "Firewall & VPN management" : "ファイアウォール・VPN管理",
        language === "en" ? "Bandwidth optimization" : "帯域最適化"
      ]
    },
    {
      title: language === "en" ? "Cloud & Multi-Cloud" : "クラウド・マルチクラウド",
      items: [
        language === "en" ? "Cloud migration & modernization" : "クラウド移行とモダナイゼーション",
        language === "en" ? "Multi-cloud strategy & governance" : "マルチクラウド戦略とガバナンス",
        language === "en" ? "Cost control & FinOps" : "コスト管理とFinOps"
      ]
    },
    {
      title: language === "en" ? "Security & Compliance" : "セキュリティ・コンプライアンス",
      items: [
        language === "en" ? "Real-time threat detection & response" : "リアルタイム脅威検知と対応",
        language === "en" ? "Incident response & forensics" : "インシデント対応とフォレンジック",
        language === "en" ? "Compliance (ISO, PCI, etc.)" : "コンプライアンス（ISO、PCIなど）"
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

      {/* HERO — Matches AI-Driven style */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-white">
          <p className="text-lg text-primary-foreground/90">
            {language === "en"
              ? "Your infrastructure should accelerate your business — not slow it down."
              : "インフラはビジネスの足かせではなく、加速装置であるべきです。"}
          </p>
          <p className="text-sm mb-4 opacity-80">
            {language === "en" ? "Let experts manage it. You focus on growth." : "プロに任せて、貴社は成長に集中してください。"}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "en" ? "Infra Managed Services" : "インフラマネージドサービス"}
          </h1>

          <p className="text-lg max-w-2xl opacity-90">
            {language === "en"
              ? "24/7 managed infrastructure with 99.99% uptime, proactive security, and intelligent optimization — all delivered as a predictable monthly service."
              : "99.99%稼働率保証、プロアクティブなセキュリティ、インテリジェント最適化を月額定額でご提供するフルマネージドインフラサービス。"}
          </p>
        </div>
      </section>

      {/* STATS — Premium animated cards */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-4xl font-bold text-center text-primary mb-16 tracking-tight">
            {language === "en"
              ? "Why Infra Managed Services"
              : "なぜ多くの企業が私たちのマネージドサービスを選ぶのか"}
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

      {/* BENEFITS — With subtitle */}
      <section className="py-20 bg-[#F6F6F6]">
        <div className="container mx-auto px-6">
          <h2 className="text-[32px] font-semibold text-center text-primary mb-6">
            {language === "en"
              ? "Benefits of Infra Managed Services"
              : "マネージドサービスの3つのコアメリット"}
          </h2>

          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
            {language === "en"
              ? "We take full ownership of your infrastructure so you get reliability, security, and performance — without the overhead."
              : "インフラの完全責任を負うことで、貴社は信頼性・セキュリティ・パフォーマンスを手に入れ、管理負担をゼロにできます。"}
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

      {/* DETAILED SERVICES / PHASES */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            {language === "en" ? "How Infra Managed Services Works" : "私たちが貴社に代わって管理するすべて"}
          </h2>
          <p className="text-center text-muted-foreground  mb-12 max-w-3xl mx-auto">
            {language === "en"
              ? "From the moment you hand over the keys, our team + AI-powered platform takes full ownership 24/7/365. We monitor every server, container, network device, and cloud resource in real time, detecting and fixing issues — often before you even know they exist. Security threats are blocked automatically, patches are applied without downtime, capacity is auto-scaled to match demand, and costs are continuously optimized so you never overpay."
              : "サーバーからセキュリティ、クラウドからコンプライアンスまで — フルスタックを私たちが責任持って管理します。"}
          </p>

          {/* <div className="space-y-8">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold text-primary">
                    {service.title}
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
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

export default Inframanage;