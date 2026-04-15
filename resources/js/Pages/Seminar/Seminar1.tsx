import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Calendar, Clock, MapPin, User, CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom";

const Seminar1 = () => {
  const { language } = useLanguage();

  const eventData = [
  {
    label_en: "Schedule",
    label_jp: "日時",
    value: [
      "November 11th (Tue) – 12th (Wed), 2025, 10:00–16:00",
      "(Registration begins at 10:00)"
    ]
  },
  {
    label_en: "Venue",
    label_jp: "会場",
    value: [
      "TKP Garden City PREMIUM Yokohama Station Shin-Takashima",
      "Yokohama Grand Gate, 2nd floor, 5-1-1 Minatomirai, Nishi-ku, Yokohama, Kanagawa Prefecture",
      "7-minute walk from JR Yokohama Station",
      "1-minute walk from Shin-Takashima Station on the Minatomirai Line"
    ]
  },
  {
    label_en: "Participation Fee",
    label_jp: "参加費",
    value: ["Free — *Pre-registration required"]
  },
  {
    label_en: "Organizer",
    label_jp: "主催",
    value: ["Indo Sakura Engineering Services Co., Ltd."]
  },
  {
    label_en: "Sponsorship",
    label_jp: "協賛",
    value: [
      "Indo Sakura, Ltd.",
      "Indo Sakura Field Services, Ltd.",
      "Indo Sakura Power Services, Ltd."
    ]
  },
  {
    label_en: "Cooperation",
    label_jp: "協力",
    value: ["Partner companies"]
  }
];


 
  return (
    <Layout>
      <Serviceshead />

      {/* Hero */}
      <section className="relative bg-primary py-24">
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-section-light text-black rounded text-sm">DX</span>
            <span className="px-3 py-1 bg-section-light text-black rounded text-sm">AI</span>
            <span className="px-3 py-1  bg-section-light text-black rounded text-sm">Security</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "AI & Digital Transformation Summit 2025" : "AI＆デジタルトランスフォーメーションサミット2025"}
          </h1>
          <p className="text-lg opacity-90 mb-6">
            {language === 'en' ? "Take a step towards the future in Tokyo!" : "東京で未来への一歩を踏み出しましょう！"}
          </p>
          <p className="text-sm opacity-80 max-w-2xl">
            {language === 'en' 
              ? "As your DX partner, we will support you in taking a step from Tokyo to the future."
              : "DXパートナーとして、東京から未来への一歩を踏み出すサポートをします。"}
          </p>
        </div>
      </section>

     

      {/* Event Overview */}
    <section className="py-16 bg-background">
  <div className="container mx-auto px-4">

    {/* Title */}
    <h2 className="text-3xl font-bold text-center mb-6">
      {language === 'en' ? "Details" : "イベント概要"}
    </h2>

    {/* Underline Accent */}
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
          {/* Left Label */}
          <div className="bg-muted/30 p-6 font-semibold text-gray-700 bg-section-light text-center">
            {language === 'en' ? item.label_en : item.label_jp}
          </div>

          {/* Right Content */}
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

export default Seminar1;
