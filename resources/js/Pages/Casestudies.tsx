import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Link } from "@inertiajs/react";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import ContactCTA from "@/components/layout/Contact";
import AOS from "aos";
import "aos/dist/aos.css";
const Casestudies = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = [
    "ALL", "Backend/BI", "BPM", "DX", "Intra-mart", "IT Infrastructure", "OSS",
    "Snowflake", "Application Development", "Cloud", "Service", "Digital Marketing"
  ];

  const caseStudies = [
    {
      id: 1,
      title: language === 'en'
        ? "Development and operation of travel business core systems for more than 20 years"
        : "20年以上にわたる旅行業務基幹システムの開発・運用",
      tags: ["Application", "Development", "Service"],
      image: "/image/case1.jpg"
    },
    {
      id: 2,
      title: language === 'en'
        ? "Migrate a complex big data foundation to Snowflake. Respond quickly to analysis and reduce costs"
        : "複雑なビッグデータ基盤をSnowflakeに移行。分析への迅速な対応とコスト削減",
      tags: ["Snowflake", "DX", "Cloud"],
      image: "/image/case2.jpg"
    },
    {
      id: 3,
      title: language === 'en'
        ? "Responsible for cloud development and functional improvement of Digion's IoT device management solution 'DiXiM IoT Platform'"
        : "Digion社IoTデバイス管理ソリューション「DiXiM IoT Platform」のクラウド開発・機能改善を担当",
      tags: ["Cloud", "IoT", "AWS"],
      image: "/image/case3.jpg"
    },
    {
      id: 4,
      title: language === 'en'
        ? "Drive the digitization and paperless of your business processes"
        : "業務プロセスのデジタル化・ペーパーレス化を推進",
      tags: ["BPM", "DX", "Intra-mart"],
      image: "/image/case4.jpg"
    },
    {
      id: 5,
      title: language === 'en'
        ? "Leveraging advanced chip knowledge and soft analysis capabilities"
        : "高度なチップ知識とソフト分析能力を活用",
      tags: ["DX", "IoT"],
      image: "/image/blueprint.jpg"
    },
    {
      id: 6,
      title: language === 'en'
        ? "Constructing an IoT predictive maintenance system using a self-visualizing power supply"
        : "自己可視化電源を使用したIoT予知保全システムの構築",
      tags: ["IoT", "Application"],
      image: "/image/smartsynch.jpg"
    },
    {
      id: 7,
      title: language === 'en'
        ? "A search mechanism that aggregates scattered data and centralizes management"
        : "散在するデータを集約し、管理を一元化する検索機構",
      tags: ["Backend/BI", "DX"],
      image: "/image/brmssolution.jpg"
    },
    {
      id: 8,
      title: language === 'en'
        ? "Improving the freshness of API information by centralizing data and introducing BI"
        : "データ一元化とBI導入によるAPI情報の鮮度向上",
      tags: ["Backend/BI", "DX", "API"],
      image: "/image/sourcebyte.jpg"
    },
    {
      id: 9,
      title: language === 'en'
        ? "Full-scale data utilization through optimal data development"
        : "最適なデータ開発による本格的なデータ活用",
      tags: ["DX", "Data"],
      image: "/image/cybersecurity.jpg"
    }
  ];

  const filteredStudies = activeFilter === "ALL"
    ? caseStudies
    : caseStudies.filter(study => study.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())));

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 120,
      delay: 80,
    });
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary py-20">

        <div className="container mx-auto px-4 relative z-10 text-center text-white" data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">CASES</h1>

        </div>
      </section>

      {/* Filters */}
      {/* <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Case Studies Grid */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study, index) => (
              <Link data-aos="fade-up"
                  data-aos-delay={index * 80}
                key={study.id}
                href={`/blogs/casestudies/${study.id}`}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-4">
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="text-sm text-primary">#{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Casestudies;
