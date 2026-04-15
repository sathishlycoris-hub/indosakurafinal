import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Link } from "@inertiajs/react";
import { Mail, Cloud, Cpu, Wifi } from "lucide-react";

const Casestudies3 = () => {
  const { language } = useLanguage();

  const relatedCases = [
    { id: 1, title: language === 'en' ? "Development and operation of travel business core systems for more than 20 years" : "20年以上にわたる旅行業務基幹システムの開発・運用", image: "/image/case1.jpg" },
    { id: 2, title: language === 'en' ? "Utilizing the Internet and web technology to improve business productivity" : "インターネットとWeb技術を活用した業務生産性の向上", image: "/image/case2.jpg" },
    { id: 4, title: language === 'en' ? "We have realized many systems, including the core system of banking business" : "銀行業務の基幹システムを含む多くのシステムを実現", image: "/image/case4.jpg" }
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
            <span className="text-foreground">{language === 'en' ? "DiXiM IoT Platform" : "DiXiM IoT Platform"}</span>
          </div>
        </div>
      </div> */}

      {/* Hero */}
      <section className="relative bg-primary py-10">

        <div className="container mx-auto px-4 relative z-10 text-start text-white">
          <h1 className="text-2xl md:text-2xl font-bold mb-2">Case Studies-3</h1>

        </div>
      </section>

      {/* Content */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              {language === 'en'
                ? "Responsible for cloud development and functional improvement of Digion's IoT device management solution 'DiXiM IoT Platform'"
                : "Digion社IoTデバイス管理ソリューション「DiXiM IoT Platform」のクラウド開発・機能改善を担当"}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-sm text-primary">#Cloud</span>
              <span className="text-sm text-primary">#AWS</span>
              <span className="text-sm text-primary">#IoT</span>
              <span className="text-sm text-primary">#Development</span>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "With the recent boom in the IoT market, the number of IoT-related devices is also increasing. Digion Co., Ltd. has been provided with the 'DiXiM IoT Platform,' a solution that can realize the management, monitoring, and remote operation of a wide range of IoT devices on the cloud, and we have supported the development of the solution and the improvement of its functions."
                  : "IoT市場の最近のブームに伴い、IoT関連デバイスの数も増加しています。Digion株式会社には、クラウド上で幅広いIoTデバイスの管理、監視、遠隔操作を実現できるソリューション「DiXiM IoT Platform」を提供しており、ソリューションの開発と機能改善をサポートしてきました。"}
              </p>
            </div>

            {/* Platform Diagram */}
            <div className="bg-muted/30 rounded-lg p-8 mb-12">
              <h3 className="text-xl font-bold text-center text-primary mb-8">DiXiM IoT Platform</h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 text-center text-sm font-medium">
                  {language === 'en' ? "Collection" : "蓄積"}
                </div>
                <div className="bg-primary text-primary-foreground rounded-lg p-3 text-center text-sm font-medium">
                  {language === 'en' ? "Processing" : "処理"}
                </div>
                <div className="bg-primary text-primary-foreground rounded-lg p-3 text-center text-sm font-medium">
                  {language === 'en' ? "Display" : "表示"}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <p className="text-center text-sm text-muted-foreground mb-4">— AWS —</p>
                <p className="text-center text-xs text-muted-foreground">AWS IoT, S3, DynamoDB, Aurora, Lambda, Kinesis</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Wifi className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? "Device Status Visualization" : "デバイスの状態可視化"}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Cloud className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? "Collect Device Status Info" : "デバイスの状態情報を収集"}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? "Remote Operation & Quick Repair" : "遠隔操作・迅速な修理サポート"}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "The DiXiM IoT Platform provided by Digion Co., Ltd. enables the status of IoT devices to be understood and fault diagnosis. Enterprises that have introduced the DiXiM IoT Platform can centrally manage and remotely control the devices they manage, and can respond quickly when problems occur."
                  : "Digion株式会社が提供するDiXiM IoT Platformは、IoTデバイスの状態把握と故障診断を可能にします。DiXiM IoT Platformを導入した企業は、管理するデバイスを一元管理・遠隔制御でき、問題発生時にも迅速に対応できます。"}
              </p>

              <p className="text-muted-foreground mt-4">
                {language === 'en'
                  ? "To build the system for this product, AWS was used and a combination of AWS IoT, S3, DynamoDB, Aurora, Lambda, and Kinesis was used. AWS is convenient but also has limitations."
                  : "本製品のシステム構築にはAWSを使用し、AWS IoT、S3、DynamoDB、Aurora、Lambda、Kinesisの組み合わせを使用しました。AWSは便利ですが、制限もあります。"}
              </p>

              <p className="text-muted-foreground mt-4">
                {language === 'en'
                  ? "For example, AWS Lambda is designed to time out in up to 15 minutes, but due to the system structure of this product, some processing times require more than 15 minutes. In that case, we solved the problem by devising a workaround method that could take more than 15 minutes to process."
                  : "例えば、AWS Lambdaは最大15分でタイムアウトするよう設計されていますが、本製品のシステム構造上、15分以上かかる処理もあります。その場合、15分以上かかる処理に対応できる回避方法を考案して問題を解決しました。"}
              </p>

              <p className="text-muted-foreground mt-4">
                {language === 'en'
                  ? "We have accumulated experience in the development of serverless applications. In particular, we have many qualified employees on AWS, and we can provide support with a team system with knowledge like this one."
                  : "サーバーレスアプリケーション開発の経験を蓄積しています。特にAWSの有資格者が多数在籍しており、このような知識を持つチーム体制でサポートを提供できます。"}
              </p>
            </div>

            <hr className="my-12 border-border" />

            {/* Related Cases */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
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

            </section>

            <div className="text-center mt-12">
              <Link
                href="/casestudies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded hover:bg-foreground/90 transition-colors"
              >
                {language === "en" ? "List of Case Studies" : "事例一覧"}
              </Link>
            </div>

          </div>
        </div>
      </article>

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
    </Layout>
  );
};

export default Casestudies3;
