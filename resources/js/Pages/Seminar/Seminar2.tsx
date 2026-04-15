import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
// import { CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom";

const Seminar2 = () => {
  const { language } = useLanguage();

  // ---------------------------------------------------
  // EXPANDED EVENT DATA (Same structure as Seminar1)
  // ---------------------------------------------------
  const eventData = [
    {
      label_en: "Schedule",
      label_jp: "日時",
      value: [
        "February 20, 2025 (Thu) 13:00–18:00",
        language === "en" ? "(Lobby opens at 12:45)" : "(ロビー開場 12:45)"
      ]
    },
    {
      label_en: "Venue",
      label_jp: "会場",
      value: [
        language === "en"
          ? "Online Webinar (Zoom)"
          : "オンラインウェビナー（Zoom）",
        language === "en"
          ? "Access link will be sent after registration."
          : "登録後にアクセスリンクをお送りします。"
      ]
    },
    {
      label_en: "Participation Fee",
      label_jp: "参加費",
      value: [
        language === "en"
          ? "Free (Registration Required)"
          : "無料（事前登録制）"
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
        "Indo Sakura Ltd.",
        "Indo Sakura Field Services Ltd.",
        "Indo Sakura Cybersecurity Operations"
      ]
    },
    {
      label_en: "Cooperation",
      label_jp: "協力",
      value: [
        language === "en"
          ? "Partner Companies & Security Community"
          : "パートナー企業・セキュリティコミュニティ"
      ]
    }
  ];

  // ---------------------------------------------------
  // TOPICS
  // ---------------------------------------------------
  const topics = [
    language === "en"
      ? "Zero Trust Security Fundamentals"
      : "ゼロトラストセキュリティの基礎",
    language === "en"
      ? "Identity & Access Management Best Practices"
      : "IAM（アイデンティティ管理）のベストプラクティス",
    language === "en"
      ? "Network Segmentation & Micro-Segmentation"
      : "ネットワークセグメンテーション / マイクロセグメンテーション",
    language === "en"
      ? "Continuous Threat Monitoring & Verification"
      : "継続的な脅威モニタリングと検証",
    language === "en"
      ? "Hands-on Exercise: Creating Zero Trust Policies"
      : "ハンズオン：ゼロトラストポリシーの作成"
  ];

  // ---------------------------------------------------
  // SCHEDULE LIST
  // ---------------------------------------------------
  const schedule = [
    {
      time: "13:00–13:30",
      title:
        language === "en"
          ? "Introduction to Zero Trust"
          : "ゼロトラスト入門"
    },
    {
      time: "13:30–15:00",
      title:
        language === "en"
          ? "Hands-on: Implementing Zero Trust Architecture"
          : "ハンズオン：ゼロトラストアーキテクチャの実装"
    },
    {
      time: "15:15–16:30",
      title:
        language === "en"
          ? "Case Studies: Real-World Implementations"
          : "ケーススタディ：実際の導入事例"
    },
    {
      time: "16:30–18:00",
      title:
        language === "en"
          ? "Q&A and Networking"
          : "Q&A・ネットワーキング"
    }
  ];

  return (
    <Layout>
      <Serviceshead />

      {/* ---------------------------------------------------
         HERO SECTION
      --------------------------------------------------- */}
      <section className="relative bg-primary py-24">
        <div className="container mx-auto px-4 text-white">
          <span className="px-3 py-1 bg-white/20 rounded text-sm mb-4 inline-block">
            Security Workshop
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en"
              ? "Zero Trust Security Workshop"
              : "ゼロトラストセキュリティワークショップ"}
          </h1>

          <p className="text-lg opacity-90">
            {language === "en"
              ? "Master the principles of Zero Trust security architecture"
              : "ゼロトラストセキュリティアーキテクチャの原則を習得"}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------
         EVENT DETAILS — FULL TABLE (MATCHES SEMINAR1)
      --------------------------------------------------- */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-6">
            {language === "en" ? "Details" : "イベント詳細"}
          </h2>

          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

          <div className="max-w-7xl mx-auto bg-white shadow-md border border-border rounded-xl overflow-hidden text-base">

            {eventData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 border-border text-center ${
                  index !== eventData.length - 1 ? "border-b" : ""
                }`}
              >
                {/* Label column */}
                <div className="bg-red-50 p-6 font-semibold text-gray-700">
                  {language === "en" ? item.label_en : item.label_jp}
                </div>

                {/* Content column */}
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

export default Seminar2;
