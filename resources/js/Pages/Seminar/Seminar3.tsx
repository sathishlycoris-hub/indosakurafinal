import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
// import { Calendar, MapPin, User, CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom";

const Seminar3 = () => {
  const { language } = useLanguage();

 const eventData = [
  {
    label_en: "Schedule",
    label_jp: "日時",
    value: [
      "December 10, 2024 (Tue) 14:00–17:00",
      language === "en" ? "(Registration begins at 13:45)" : "（受付開始 13:45）"
    ]
  },
  {
    label_en: "Venue",
    label_jp: "会場",
    value: [
      language === "en"
        ? "Osaka Convention Center, Room B-204"
        : "大阪コンベンションセンター B-204室",
      language === "en"
        ? "5-minute walk from Osaka Station"
        : "大阪駅より徒歩5分"
    ]
  },
  {
    label_en: "Participation Fee",
    label_jp: "参加費",
    value: [
      language === "en"
        ? "Free — Advance registration required"
        : "無料 — 事前登録制"
    ]
  },
  {
    label_en: "Organizer",
    label_jp: "主催",
    value: [
      language === "en"
        ? "Indo Sakura Engineering Services Co., Ltd."
        : "インドサクラエンジニアリングサービス株式会社"
    ]
  },
  {
    label_en: "Sponsorship",
    label_jp: "協賛",
    value: [
      "Indo Sakura Cloud Solutions",
      "Indo Sakura Infrastructure Team",
      "Indo Sakura Field Services"
    ]
  },
  {
    label_en: "Cooperation",
    label_jp: "協力",
    value: [
      language === "en"
        ? "Partner companies"
        : "パートナー企業"
    ]
  }
];


  return (
    <Layout>
      <Serviceshead />

      <section className="relative bg-primary py-20">
        <div className="container mx-auto px-4 text-white">
          <span className="px-3 py-1 bg-white/20 rounded text-sm mb-4 inline-block">Cloud</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "Cloud Migration Best Practices" : "クラウド移行ベストプラクティス"}
          </h1>
          <p className="text-lg opacity-90">
            {language === 'en' ? "Learn proven strategies for successful cloud migration" : "成功するクラウド移行のための実証済み戦略を学ぶ"}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
  <div className="container mx-auto px-4">

    {/* Title */}
    <h2 className="text-3xl font-bold text-center mb-6">
      {language === 'en' ? "Details" : "イベント概要"}
    </h2>

    {/* Underline */}
    <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

    {/* Table */}
    <div className="max-w-7xl mx-auto bg-white shadow-md border border-border rounded-xl overflow-hidden text-base">

      {eventData.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-3 border-border ${
            index !== eventData.length - 1 ? "border-b" : ""
          }`}
        >
          {/* LEFT LABEL box */}
          <div className="bg-section-light p-6 font-semibold text-gray-700 text-center ">
            {language === "en" ? item.label_en : item.label_jp}
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-2 p-6 text-gray-600 leading-relaxed">
            {item.value.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      ))}

    </div>
  </div>
</section>

    
    </Layout>
  );
};

export default Seminar3;
