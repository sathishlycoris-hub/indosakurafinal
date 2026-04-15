import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Link } from "@inertiajs/react";
import { AlertCircle, CheckCircle } from "lucide-react";

const Casestudies2 = () => {
  const { language } = useLanguage();

  const subjects = [
    language === "en"
      ? "Even if the analysts had access to raw data, they had to wait for tables/views and testing to create processed data"
      : "アナリストが生データにアクセスできても、加工済みデータ作成のためのテーブル/ビューとテストを待つ必要があった",

    language === "en"
      ? "High processing performance was required to process time-series data in R/Time"
      : "R/Timeで時系列データを処理するために高い処理性能が必要だった",

    language === "en"
      ? "Complex data extraction required prior arrangements and scheduling of multiple requests"
      : "複雑なデータ抽出には事前の調整と複数リクエストのスケジューリングが必要だった",
  ];

  const effects = [
    language === "en"
      ? "Analysts can import raw data directly into Snowflake and make it readily available for analysis"
      : "アナリストが生データをSnowflakeに直接インポートし、分析にすぐ利用可能に",

    language === "en"
      ? "Automatic scaling with compute resources, enabling up to data every minute"
      : "コンピュートリソースによる自動スケーリング、毎分のデータ更新が可能に",

    language === "en"
      ? "Aggregating results can be produced on Snowflake at once"
      : "Snowflakeで集計結果を一度に生成可能に",
  ];

  const relatedCases = [
    {
      id: 1,
      title:
        language === "en"
          ? "Leveraging advanced chip knowledge and soft analysis capabilities"
          : "高度なチップ知識とソフト分析能力を活用",
      image: "/image/case1.jpg",
    },
    {
      id: 3,
      title:
        language === "en"
          ? "Drive the digitization and paperless of your business processes"
          : "業務プロセスのデジタル化・ペーパーレス化を推進",
      image: "/image/case3.jpg",
    },
    {
      id: 4,
      title:
        language === "en"
          ? "Sharing budgets, results, and business status through portals"
          : "ポータルを通じた予算、実績、業務状況の共有",
      image: "/image/case4.jpg",
    },
  ];

  return (
    <Layout>
      {/* HERO (same height, padding, font-size as Casestudies1) */}
      <section className="relative bg-primary py-10">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-2xl md:text-2xl font-bold">
            Big data foundation to Snowflake
          </h1>
        </div>
      </section>

      {/* MAIN ARTICLE (same spacing as Casestudies1) */}
      <article className="py-16 bg-background">
        <div className=" mx-auto px-4 max-w-7xl">

          {/* Main Heading */}
          <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            {language === "en"
              ? "Migrate a complex big data foundation to Snowflake. Respond quickly to analysis and reduce costs"
              : "複雑なビッグデータ基盤をSnowflakeに移行。分析への迅速な対応とコスト削減"}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm text-primary">#Snowflake</span>
            <span className="text-sm text-primary">#DX</span>
            <span className="text-sm text-primary">#Cloud</span>
            <span className="text-sm text-primary">#Data Analytics</span>
          </div>

          {/* Intro Paragraphs (same spacing + font size) */}
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


          {/* SUBJECT & EFFECT (same grid spacing & card design as Casestudies1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Subject */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <h3 className="font-bold text-pink-600 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {language === "en" ? "Subject" : "課題"}
              </h3>

              <ul className="space-y-3">
                {subjects.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Effect */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <h3 className="font-bold text-pink-600 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {language === "en" ? "Implementation Effect" : "導入効果"}
              </h3>

              <ul className="space-y-3">
                {effects.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

         
          {/* Related Cases (same structure & spacing as Casestudies1) */}
        </div>
      </article>
      <div className="bg-section-light">
        <section className="py-10 container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded"></span>
            {language === "en" ? "Refer other case studies" : "他の事例を見る"}
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

        </section>
      </div>
    </Layout>
  );
};

export default Casestudies2;
