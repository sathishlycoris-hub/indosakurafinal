import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
// import { Link } from "react-router-dom";
import { Link } from "@inertiajs/react";
import { ArrowRight, Mail } from "lucide-react";

const Casestudies1 = () => {
  const { language } = useLanguage();

  const relatedCases = [
    { id: 2, title: language === 'en' ? "Migrate a complex big data foundation to Snowflake" : "複雑なビッグデータ基盤をSnowflakeに移行", image: "/image/case2.jpg" },
    { id: 3, title: language === 'en' ? "Drive the digitization and paperless of your business processes" : "業務プロセスのデジタル化・ペーパーレス化を推進", image: "/image/case3.jpg" },
    { id: 4, title: language === 'en' ? "Sharing budgets, results, and business status through portals" : "ポータルを通じた予算、実績、業務状況の共有", image: "/image/case4.jpg" }
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      {/* <div className="bg-muted/30 py-3 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">top</Link>
            <span className="text-muted-foreground">›</span>
            <Link to="/casestudies" className="text-muted-foreground hover:text-primary">Case Study</Link>
            <span className="text-muted-foreground">›</span>
            <span className="text-foreground">{language === 'en' ? "Travel Business Core System" : "旅行業務基幹システム"}</span>
          </div>
        </div>
      </div> */}

      {/* Hero */}
      <section className="relative bg-primary py-10">

        <div className="container mx-auto px-4 relative z-10 text-start text-white">
          <h1 className="text-2xl md:text-2xl font-bold mb-2">Travel business core systems</h1>

        </div>
      </section>

      {/* Content */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* <div className="max-w-4xl mx-auto"> */}
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            {language === 'en'
              ? "Development and operation of travel business core systems for more than 20 years"
              : "20年以上にわたる旅行業務基幹システムの開発・運用"}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm text-primary">#Application</span>
            <span className="text-sm text-primary">#Development</span>
            <span className="text-sm text-primary">#Service</span>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground">
              {language === 'en'
                ? "From the initial development to the present, we have been maintaining, managing and additionally developing travel business core systems and Internet reservation systems for travel agencies."
                : "初期開発から現在に至るまで、旅行代理店向けの旅行業務基幹システムおよびインターネット予約システムの保守・管理・追加開発を行っています。"}
            </p>

            <p className="text-muted-foreground mt-4">
              {language === 'en'
                ? "The core system for travel business has functions from planning to sales and settlement necessary for travel operations, and is also linked to external systems such as Internet reservation systems and airline arrangements."
                : "旅行業務基幹システムは、旅行業務に必要な企画から販売・精算までの機能を備え、インターネット予約システムや航空会社手配などの外部システムとも連携しています。"}
            </p>

            <p className="text-muted-foreground mt-4">
              {language === 'en'
                ? "In travel operations that require detailed responses to changes in the situation and system, we have flexibly responded to functions that are difficult to respond to immediately with packaged software, and as a prime vendor, we have built relationships with customers for many years and accumulated business know-how."
                : "状況やシステムの変化に詳細な対応が求められる旅行業務において、パッケージソフトでは即座に対応しにくい機能にも柔軟に対応し、プライムベンダーとして長年にわたりお客様との関係を構築し、業務ノウハウを蓄積してきました。"}
            </p>
          </div>

          {/* Diagram placeholder */}
          <div className="bg-muted/30 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-primary mb-4 text-center">
                  {language === 'en' ? "Travel Business Core System" : "旅行業務基幹システム"}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="bg-primary/10 rounded p-2 text-center">{language === 'en' ? "Overseas Travel System" : "海外旅行システム"}</div>
                  <div className="bg-primary/10 rounded p-2 text-center">{language === 'en' ? "Domestic Travel System" : "国内旅行システム"}</div>
                  <div className="bg-muted rounded p-2 text-center">{language === 'en' ? "Common: Customer Management, Tools" : "共通：顧客管理・ツール群"}</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-primary mb-4 text-center">
                  {language === 'en' ? "Internet Reservation System" : "インターネット予約システム"}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="bg-primary/10 rounded p-2 text-center">{language === 'en' ? "PC Site" : "PCサイト"}</div>
                  <div className="bg-primary/10 rounded p-2 text-center">{language === 'en' ? "Smartphone Site" : "スマホサイト"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground">
              {language === 'en'
                ? "We also contribute to improving the business continuity of our customers by replacing and migrating environmental risks (such as cloudization and EOL) that arise over the course of many years of maintenance in the best way according to the situation."
                : "また、長年の保守の中で発生する環境リスク（クラウド化やEOLなど）を状況に応じて最適な方法で置き換え・移行し、お客様の事業継続性の向上に貢献しています。"}
            </p>
          </div>
        </div>
      </article>
      {/* </div> */}
      {/* <hr className="my-12 border-border" /> */}

      {/* Related Cases */}
      <section className="py-16 bg-section-light ">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded"></span>
            {language === 'en' ? "Refer other case studies" : "他の事例を見る"}
          </h2>
          

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {relatedCases.map((item) => (
    <Link
      key={item.id}
      href={`/casestudies/${item.id}`}
      className="group"
    >
      <div className="aspect-video rounded-lg overflow-hidden mb-3">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
        {item.title}
      </h3>
    </Link>
  ))}
</div>

<div className="text-center mt-12">
  <Link
    href="/casestudies"
    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
  >
    {language === "en" ? "List of Case Studies" : "事例一覧"}
  </Link>
</div>

        </div>
      </section>


      {/* </div> */}
      {/* </div> */}
      {/* </article> */}

      {/* Contact CTA */}
      {/* <section className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">CONTACT <span className="text-lg font-normal opacity-80">{language === 'en' ? "Contact" : "お問い合わせ"}</span></h2>
              <p className="text-sm opacity-70">{language === 'en' ? "For inquiries, please contact us." : "お問い合わせはこちらから"}</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 border border-white rounded hover:bg-white hover:text-slate-800 transition-colors">
              <Mail className="w-4 h-4" />{language === 'en' ? "Contact Us" : "お問い合わせ"}
            </Link>
          </div>
        </div>
      </section> */}
    </Layout >
  );
};

export default Casestudies1;
