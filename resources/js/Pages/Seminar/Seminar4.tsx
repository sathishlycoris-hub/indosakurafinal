import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Calendar, MapPin, User, CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom";
import { Link } from '@inertiajs/react';

const Seminar4 = () => {
  const { language } = useLanguage();

  const schedule = [
    { time: "09:00-09:30", title: language === 'en' ? "Registration & Welcome" : "受付・オープニング" },
    { time: "09:30-11:00", title: language === 'en' ? "AI Integration Keynote" : "AI統合基調講演" },
    { time: "11:15-12:30", title: language === 'en' ? "Breakout Sessions" : "ブレイクアウトセッション" },
    { time: "13:30-15:00", title: language === 'en' ? "Enterprise AI Use Cases" : "エンタープライズAIユースケース" },
    { time: "15:15-16:00", title: language === 'en' ? "Closing Remarks" : "閉会の辞" }
  ];

  const topics = [
    language === 'en' ? "Enterprise AI Strategy" : "エンタープライズAI戦略",
    language === 'en' ? "Machine Learning Operations" : "機械学習オペレーション",
    language === 'en' ? "AI Governance and Ethics" : "AIガバナンスと倫理",
    language === 'en' ? "ROI Measurement for AI Projects" : "AIプロジェクトのROI測定"
  ];

  return (
    <Layout>
      <Serviceshead />

      <section className="relative bg-gradient-to-r from-violet-600 to-purple-700 py-20">
        <div className="container mx-auto px-4 text-white">
          <span className="px-3 py-1 bg-white/20 rounded text-sm mb-4 inline-block">AI Forum</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "Enterprise AI Integration Forum" : "エンタープライズAI統合フォーラム"}
          </h1>
          <p className="text-lg opacity-90">
            {language === 'en' ? "Discover how enterprises integrate AI for competitive advantage" : "企業がAIを統合して競争優位性を獲得する方法を発見"}
          </p>
        </div>
      </section>

      <section className="py-8 bg-yellow-50 border-b border-yellow-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-yellow-800 font-medium">
            {language === 'en' ? "This event has ended." : "本イベントは終了しました。"}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{language === 'en' ? "Event Details" : "イベント詳細"}</h2>
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{language === 'en' ? "Date" : "日時"}</p>
                  <p className="text-muted-foreground">November 25, 2024 09:00-16:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{language === 'en' ? "Venue" : "会場"}</p>
                  <p className="text-muted-foreground">{language === 'en' ? "Yokohama Grand Hotel" : "横浜グランドホテル"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <User className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{language === 'en' ? "Attendees" : "参加者"}</p>
                  <p className="text-muted-foreground">{language === 'en' ? "300+ participants" : "300名以上参加"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{language === 'en' ? "Topics Covered" : "カバーしたトピック"}</h2>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-3">
              {topics.map((topic) => (
                <li key={topic} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-violet-500" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{language === 'en' ? "Schedule" : "スケジュール"}</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {schedule.map((item) => (
              <div key={item.time} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                <span className="text-violet-500 font-medium whitespace-nowrap">{item.time}</span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{language === 'en' ? "Explore More Events" : "他のイベントを探す"}</h2>
          <Link href="/seminars" className="inline-block px-8 py-3 bg-white text-violet-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            {language === 'en' ? "All Seminars" : "すべてのセミナー"}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Seminar4;
