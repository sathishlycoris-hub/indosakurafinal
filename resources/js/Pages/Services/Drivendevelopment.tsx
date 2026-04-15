import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Brain, Zap, Shield, CheckCircle, Users, Clock, Award, TrendingUp } from "lucide-react";
// import { Link } from "react-router-dom";

const Drivendevelopment = () => {
  const { language } = useLanguage();

  const stats = [
    { value: "51.3%", label: language === 'en' ? "Reduction in development time" : "開発時間の削減" },
    { value: "80%+", label: language === 'en' ? "Companies adopting AI-driven solutions" : "AI駆動ソリューションを採用する企業" },
    { value: "15x", label: language === 'en' ? "Faster code reviews" : "より速いコードレビュー" }
  ];

const benefits = [
  {
    icon: Zap, // You can change this icon if needed
    title: language === 'en'
      ? "Maximizing development speed"
      : "開発スピードの最大化",
    subtitle: language === 'en'
      ? "Dramatically shorten time to market"
      : "市場投入までの時間を劇的に短縮",
    description: language === 'en'
      ? "Generative AI accelerates requirements drafting, specifications, and prototyping. Automated code generation shortens the implementation phase, enabling overwhelming development speed and eliminating missed business opportunities."
      : "生成AIは要件定義、仕様作成、プロトタイピングを加速します。自動コード生成により実装フェーズが短縮され、圧倒的な開発スピードを実現し、ビジネスチャンスを逃しません。"
  },

  {
    icon: Shield, // You can change this to a Diamond icon if needed
    title: language === 'en'
      ? "Overwhelming improvement in quality"
      : "品質の圧倒的改善",
    subtitle: language === 'en'
      ? "Eliminate rework and personal dependency"
      : "手戻りと属人化を排除",
    description: language === 'en'
      ? "AI detects inconsistencies and vulnerabilities in real time, reducing human errors and rework. Even inexperienced members can consistently produce standardized, high-quality output."
      : "AIがリアルタイムで不整合や脆弱性を検出し、手戻りと人為的ミスを大幅に削減します。経験の浅いメンバーでも標準化された高品質な成果物を生み出せます。"
  },

  {
    icon: Brain, // You can change to Money icon if needed
    title: language === 'en'
      ? "Project Cost Optimization"
      : "プロジェクトコスト最適化",
    subtitle: language === 'en'
      ? "Thoroughly reduce 'invisible costs'"
      : "“見えないコスト”を徹底削減",
    description: language === 'en'
      ? "Improved development speed and reduced rework translate directly into lower labor and management costs, maximizing ROI across the entire project."
      : "開発スピードの向上と手戻り削減により、労務・管理コストが削減され、プロジェクト全体のROIが最大化されます。"
  }
];



  const phases = [
    { title: language === 'en' ? "Requirement Definition" : "要件定義", items: [language === 'en' ? "AI-assisted requirement analysis" : "AI支援要件分析", language === 'en' ? "Natural language processing for specifications" : "仕様のための自然言語処理", language === 'en' ? "Automated documentation" : "自動ドキュメント化"] },
    { title: language === 'en' ? "Design" : "設計", items: [language === 'en' ? "AI-generated architecture proposals" : "AI生成アーキテクチャ提案", language === 'en' ? "Automated UI/UX prototyping" : "自動UI/UXプロトタイピング", language === 'en' ? "Design system optimization" : "デザインシステム最適化"] },
    { title: language === 'en' ? "Implementation" : "実装", items: [language === 'en' ? "AI-powered code generation" : "AI駆動コード生成", language === 'en' ? "Intelligent code completion" : "インテリジェントコード補完", language === 'en' ? "Real-time code review" : "リアルタイムコードレビュー"] },
    { title: language === 'en' ? "Test" : "テスト", items: [language === 'en' ? "Automated test generation" : "自動テスト生成", language === 'en' ? "AI-driven bug detection" : "AI駆動バグ検出", language === 'en' ? "Performance optimization" : "パフォーマンス最適化"] },
    { title: language === 'en' ? "Operation and Maintenance" : "運用・保守", items: [language === 'en' ? "Predictive maintenance" : "予測保守", language === 'en' ? "Automated monitoring" : "自動モニタリング", language === 'en' ? "Continuous optimization" : "継続的最適化"] }
  ];

  const whyUs = [
    { icon: Users, value: "25+", label: language === 'en' ? "Years of Experience" : "年の経験" },
    { icon: Award, value: "100+", label: language === 'en' ? "Companies Served" : "企業へのサービス提供" },
    { icon: TrendingUp, value: "99%", label: language === 'en' ? "Client Satisfaction" : "顧客満足度" },
    { icon: Clock, value: "170+", label: language === 'en' ? "Projects Completed" : "完了プロジェクト" }
  ];

  return (
    <Layout>
      <Serviceshead />

      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-white">
          <p className="text-lg text-primary-foreground/90">
            {language === 'en' ? "The potential of AI development is not determined by the number of member skills." : "AI開発の可能性はメンバーのスキル数では決まりません。"}
          </p>
          <p className="mb-4 opacity-80">
            {language === 'en' ? "AI will change the common sense." : "AIが常識を変えます。"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? "AI-Driven Development" : "AI駆動開発"}
          </h1>
          <p className="text-lg max-w-2xl opacity-90">
            {language === 'en'
              ? "Leverage cutting-edge AI technologies to transform your software development process, delivering faster results with higher quality."
              : "最先端のAI技術を活用してソフトウェア開発プロセスを変革し、より高品質でより速い成果を提供します。"}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Title */}
          <h2 className="text-4xl md:text-4xl font-bold text-center text-primary mb-16 tracking-tight">
            {language === 'en'
              ? 'Why AI Driven Development ?'
              : 'ソフトウェア開発における「新たな常識」を示す3つの数字'}
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >

                {/* Big Number */}
                <div className="text-6xl font-bold text-primary mb-6 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                  {stat.label}
                </h3>


                {/* Description - Match the original content */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {index === 0 && language === 'en' && (
                    <>In a recent survey of software engineers, more than half said they have already implemented generative AI in their development.<br /><br />The use of AI is no longer a future option, but the current standard.</>
                  )}
                  {index === 0 && language === 'ja' && (
                    <>ソフトウェアエンジニアを対象とした最近の調査では、半数以上がすでに開発現場で生成AIを導入済みと回答。<br /><br />AIの活用はもはや「未来の選択肢」ではなく「現在の標準」です。</>
                  )}

                  {index === 1 && language === 'en' && (
                    <>Over 80% of companies responded that they are short of personnel capable of promoting DX. <br /><br />With competition for recruitment intensifying, it is becoming extremely difficult to strengthen development structures using traditional methods.</>
                  )}
                  {index === 1 && language === 'ja' && (
                    <>DXを推進できる人材が不足していると回答した企業は80%以上。<br /><br />採用競争が激化する中、従来の手法で開発体制を強化することは極めて困難になっています。</>
                  )}

                  {index === 2 && language === 'en' && (
                    <>The domestic generative AI market is expected to expand to 1.7 trillion yen by 2030 (15 times the size of 2023). <br /><br />To win in this fast-growing market, action is needed now.</>
                  )}
                  {index === 2 && language === 'ja' && (
                    <>国内生成AI市場は2030年に1.7兆円規模へ拡大予定（2023年の15倍）。<br /><br />この急成長市場で勝つために、今すぐ行動が必要です。</>
                  )}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      
     {/* Benefits Section */}
<section className="py-20 bg-[#F6F6F6]">
  <div className="container mx-auto px-6 max-w-6xl">

    {/* Title */}
    <h2 className="text-[32px] font-semibold text-center text-primary mb-6">
      {language === 'en'
        ? 'Benefits of AI-Driven Development'
        : 'AI駆動開発の3つのコアメリット'}
    </h2>

    <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
      {language === 'en'
        ? 'AI-driven development transforms the development process by incorporating AI, solving traditional issues such as speed limitations, quality variations, and hidden costs.'
        : 'AI駆動開発はAIを取り入れることで、従来の開発手法が抱える速度・品質・隠れコストなどの課題を根本的に解決します。'}
    </p>

    {/* Benefit Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="bg-white p-10 rounded-xl border shadow-sm"
        >
          {/* Icon */}
          <benefit.icon className="w-12 h-12 text-primary mx-auto mb-6" />

          {/* Title */}
          <h3 className="text-lg font-semibold mb-3">
            {benefit.title}
          </h3>

          {/* Subtitle */}
          <p className="font-semibold mb-4">
            {benefit.subtitle}
          </p>

          {/* Description */}
          <p className="tprose text-gray-600 text-sm">
            {benefit.description}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>



      {/* Development Phases */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            {language === 'en' ? 'How AI Driven Developement Works' : 'AI駆動開発は「驚くほどスムーズ」'}
          </h2>
          <p className="text-center text-gray-700 text-lg mb-12 max-w-3xl mx-auto">
            {language === 'en'
              ? "AI driven development is not magic. It is a highly reproducible scientific process that leverages AI's strengths at each stage of development, allowing humans to focus on more creative and essential tasks."
              : "当社のAI駆動アプローチはソフトウェア開発ライフサイクルのすべてのフェーズを効率化します。"}
          </p>
          {/* <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.title} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold text-primary">{phase.title}</h3>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
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

export default Drivendevelopment;
