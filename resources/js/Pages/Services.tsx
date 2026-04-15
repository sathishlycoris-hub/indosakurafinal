import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import Serviceshead from "@/components/layout/Serviceshead";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Head } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Heart,
  Wallet,
  GraduationCap,
  Factory,
  ShoppingCart,
  Building2,
  Cpu,
  Shield,
  Globe,
  Cloud,
  ArrowRight,
} from "lucide-react";
const industryIcons = [
  Heart,
  Wallet,
  GraduationCap,
  Factory,
  ShoppingCart,
  Building2,
  Cpu,
  Shield,
  Globe,
  Cloud,
];

interface Seo {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

interface Service {
  id: number;
  title: string;
  title_ja?: string;
  slug: string;
  subtitle?: string;
  subtitle_ja?: string;
  hero_image?: string | null;
}

interface Faq {
  id: number;
  question: string;
  question_ja?: string;
  answer: string;
  answer_ja?: string;
}

interface Industry {
  id: number;
  title: string;
  title_ja?: string;
  description: string;
  description_ja?: string; // React Quill HTML
}

const getIndustryIcon = (id: number) => {
  return industryIcons[id % industryIcons.length];
};

const getRandomIcons = (count = 3) => {
  const shuffled = [...industryIcons].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
  delay: 80,
});

function Services({
  services,
  faqs,
  industries,
  seo,
}: {
  services: Service[];
  faqs: Faq[];
  industries: Industry[];
  seo?: Seo | null;
}) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const getValue = (en?: string | null, ja?: string | null): string => {
    return (lang === "ja" ? ja || en : en) || "";
  };
  const safeIndustries = Array.isArray(industries) ? industries : [];
  // const services = [
  //   {
  //     title: language === 'en' ? "AI Driven Development" : "AI駆動開発",
  //     description: language === 'en'
  //       ? "Leverage cutting-edge AI technologies to accelerate software development, reduce costs, and deliver innovative solutions faster than ever before."
  //       : "最先端のAI技術を活用してソフトウェア開発を加速し、コストを削減し、これまで以上に速く革新的なソリューションを提供します。",
  //     path: "/services/ai-driven-development",
  //     image: "/image/Drivendevelopement.png"
  //   },
  //   {
  //     title: language === 'en' ? "AI Driven Modernization" : "AI駆動モダナイゼーション",
  //     description: language === 'en'
  //       ? "Transform legacy systems using AI-powered analysis and migration strategies to modernize your IT infrastructure efficiently."
  //       : "AI駆動の分析と移行戦略を使用してレガシーシステムを変革し、ITインフラストラクチャを効率的にモダナイズします。",
  //     path: "/services/ai-driven-modernization",
  //     image: "/image/DrivenModern.png"
  //   },
  //   {
  //     title: language === 'en' ? "Enterprise Applications Development" : "エンタープライズアプリケーション開発",
  //     description: language === 'en'
  //       ? "Build robust, scalable enterprise applications tailored to your business needs with our experienced development team."
  //       : "経験豊富な開発チームがビジネスニーズに合わせた堅牢でスケーラブルなエンタープライズアプリケーションを構築します。",
  //     path: "/services/enterprise-applications",
  //     image: "/image/Enerprise.jpg"
  //   },
  //   {
  //     title: language === 'en' ? "Custom Software Development" : "カスタムソフトウェア開発",
  //     description: language === 'en'
  //       ? "Get tailored software solutions designed specifically for your unique business requirements and operational workflows."
  //       : "独自のビジネス要件と運用ワークフローに特化して設計されたオーダーメイドのソフトウェアソリューションを手に入れましょう。",
  //     path: "/services/custom-software",
  //     image: "/image/Customsoftware.jpg"
  //   },
  //   {
  //     title: language === 'en' ? "Infra Managed Services" : "インフラマネージドサービス",
  //     description: language === 'en'
  //       ? "Comprehensive infrastructure management services to ensure your IT systems run smoothly, securely, and efficiently 24/7."
  //       : "ITシステムが24時間365日スムーズ、安全、効率的に稼働するための包括的なインフラ管理サービス。",
  //     path: "/services/infra-managed",
  //     image: "/image/inframanage.webp"
  //   }
  // ];

  // const faqs = [
  //   {
  //     question: language === 'en'
  //       ? "What is the relationship between Indo-Sakura Software and other IT companies?"
  //       : "Indo-Sakuraソフトウェアと他のIT企業との関係は？",
  //     answer: language === 'en'
  //       ? "As a technology-focused company, we collaborate with leading IT partners worldwide, from system design to platform construction and system operation, to solve issues for customers and society based on our expertise in system integration and managed services."
  //       : "テクノロジーに焦点を当てた企業として、システム設計からプラットフォーム構築、システム運用まで、世界中の主要なITパートナーと協力し、システムインテグレーションとマネージドサービスの専門知識に基づいて、お客様と社会の課題を解決します。"
  //   },
  //   {
  //     question: language === 'en'
  //       ? "What kind of company culture is it?"
  //       : "どのような企業文化ですか？",
  //     answer: language === 'en'
  //       ? "We believe there are many people who love technology and want to contribute to society in some way. Customers often say that many of our employees are honest, dedicated, and steadfast in their commitment to excellence."
  //       : "私たちは、テクノロジーを愛し、何らかの形で社会に貢献したいと思っている人が多いと信じています。お客様からは、当社の従業員の多くが正直で、献身的で、卓越性へのコミットメントにおいて確固たる姿勢を持っているとよく言われます。"
  //   },
  //   {
  //     question: language === 'en'
  //       ? "How is project assignment determined after joining the company?"
  //       : "入社後のプロジェクト配属はどのように決まりますか？",
  //     answer: language === 'en'
  //       ? "During the recruitment screening, we confirm the desired location and job type, but we also have interviews during the training period for new employees to confirm the person's wishes. At our company, we decide where to assign after considering the skills and wishes of the person."
  //       : "採用選考中に希望勤務地と職種を確認しますが、新入社員の研修期間中に面談を行い、本人の希望を確認します。当社では、本人のスキルと希望を考慮した上で配属先を決定します。"
  //   },
  //   {
  //     question: language === 'en'
  //       ? "Where will you be working?"
  //       : "勤務地はどこですか？",
  //     answer: language === 'en'
  //       ? "Most of the employees work in the Tokyo metropolitan area (head office, customers, etc.), mainly in Yokohama and Tokyo, and some employees work in the Chubu area, Kansai area, and Chugoku region. We also have offices in India and USA."
  //       : "従業員のほとんどは首都圏（本社、顧客先など）で勤務しており、主に横浜と東京で働いています。一部の従業員は中部地方、関西地方、中国地方で働いています。インドとアメリカにもオフィスがあります。"
  //   },
  //   {
  //     question: language === 'en'
  //       ? "What kind of clothes do you wear to work?"
  //       : "仕事にはどのような服装で行きますか？",
  //     answer: language === 'en'
  //       ? "In order to promote autonomous work styles, such as expanding flex work and establishing optimal work styles that combine in-person and remote work, the dress code has been free since October 2023. Depending on the location and TPO, many employees wear casual clothing such as T-shirts and denim during normal work."
  //       : "フレックスワークの拡大や対面とリモートワークを組み合わせた最適なワークスタイルの確立など、自律的なワークスタイルを推進するため、2023年10月からドレスコードは自由となっています。勤務地やTPOに応じて、通常勤務時はTシャツやデニムなどのカジュアルな服装で働く従業員が多いです。"
  //   },
  //   {
  //     question: language === 'en'
  //       ? "Can I get the job or project I want to do?"
  //       : "やりたい仕事やプロジェクトに就くことはできますか？",
  //     answer: language === 'en'
  //       ? "We have introduced an internal recruitment system, allowing you to open up your career by raising your hand in response to recruitment. In addition, there is a career plan support program aimed at learning how to develop your career and skills and becoming self-reliant in your career. Based on each individual's growth plan, we will provide maximum support for planned learning and active participation."
  //       : "社内公募制度を導入しており、募集に対して手を挙げることでキャリアを切り開くことができます。また、キャリアとスキルの開発方法を学び、キャリアにおいて自立することを目的としたキャリアプラン支援プログラムがあります。各個人の成長計画に基づき、計画的な学習と積極的な参加を最大限サポートします。"
  //   },
  //   {
  //     question: language === 'en'
  //       ? "I didn't study programming when I was a student, is that okay?"
  //       : "学生時代にプログラミングを勉強していなかったのですが、大丈夫ですか？",
  //     answer: language === 'en'
  //       ? "In order to cultivate excellent engineers who will continue to play an active role in the world, we carefully and carefully train new employees from the time they are newcomers, including basic training for three months after joining the company and manufacturing training for the next six months. You can learn the basics of IT and programming through training for prospective employees and training after joining the company. Even if you have no experience in programming at all, by the end of the training, you will be able to think and create specifications and program on your own."
  //       : "世界で活躍し続ける優秀なエンジニアを育成するため、入社後3ヶ月間の基礎研修と、その後6ヶ月間の製造研修を含め、新入社員を入社当初から丁寧に育成しています。内定者研修と入社後の研修を通じて、ITとプログラミングの基礎を学ぶことができます。プログラミング経験がまったくなくても、研修終了時には自分で仕様を考え、作成し、プログラムを組めるようになります。"
  //   },
  //   {
  //     question: language === 'en'
  //       ? "How is the evaluation done?"
  //       : "評価はどのように行われますか？",
  //     answer: language === 'en'
  //       ? "We use a comprehensive performance management system. Consult with your boss and decide on the annual goals you need to achieve. We evaluate the degree of achievement and process against that goal. Every six months, we will have an interview with our supervisor to provide feedback on the evaluation."
  //       : "包括的なパフォーマンス管理システムを使用しています。上司と相談し、達成すべき年間目標を決定します。その目標に対する達成度とプロセスを評価します。6ヶ月ごとに上司との面談を行い、評価に関するフィードバックを提供します。"
  //   }
  // ];

  // const industries = [
  //   { icon: Heart, title: language === 'en' ? "Healthcare" : "ヘルスケア", description: language === 'en' ? "Streamlined healthcare IT solutions to improve patient care and operations" : "患者ケアと運用を改善するためのヘルスケアITソリューション" },
  //   { icon: Wallet, title: language === 'en' ? "Finance" : "金融", description: language === 'en' ? "Secure, compliant ICT services to optimize financial systems and data management" : "金融システムとデータ管理を最適化するセキュアなICTサービス" },
  //   { icon: GraduationCap, title: language === 'en' ? "Education" : "教育", description: language === 'en' ? "Innovative educational technology to enhance learning experiences and operational efficiency" : "学習体験と運用効率を向上させる革新的な教育テクノロジー" },
  //   { icon: Factory, title: language === 'en' ? "Manufacturing" : "製造業", description: language === 'en' ? "Smart manufacturing solutions to optimize production, logistics, and supply chain" : "生産、物流、サプライチェーンを最適化するスマート製造ソリューション" },
  //   { icon: ShoppingCart, title: language === 'en' ? "Retail" : "小売業", description: language === 'en' ? "E-commerce, point-of-sale systems, and customer experience technologies" : "Eコマース、POSシステム、顧客体験テクノロジー" },
  //   { icon: Building2, title: language === 'en' ? "Government" : "政府機関", description: language === 'en' ? "Reliable ICT infrastructure to support government operations and public services" : "政府業務と公共サービスを支援する信頼性の高いICTインフラ" }
  // ];

  return (
    <Layout>
      <Head>
        <title>{seo?.meta_title ?? "Services | Indo Sakura"}</title>

        {seo?.meta_description && (
          <meta name="description" content={seo.meta_description} />
        )}

        {seo?.meta_keywords && (
          <meta name="keywords" content={seo.meta_keywords} />
        )}
      </Head>

      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Serviceshead />
      </div>

      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-24">

        <div className="container mx-auto px-4 relative z-10" data-aos="fade-right">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {lang === 'en' ? "Services" : "サービス"}
          </h1>
          <p className="text-lg text-primary-foreground/90">
            {lang === 'en'
              ? "Comprehensive IT solutions tailored to drive your business forward"
              : "ビジネスを前進させるためのオーダーメイドの包括的なITソリューション"}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" data-aos="fade-up">
            {services.map((service) => (
              <Link
                key={service.id}
                href={route("services.show", service.slug)}
                className="
                  group bg-card rounded-lg overflow-hidden
                  border border-border shadow-md hover:shadow-xl
                  transition-all flex flex-col h-full
                "
              >
                {/* IMAGE */}
                <div className="aspect-video overflow-hidden bg-muted">
                  {service.hero_image ? (
                    <img
                      src={`/storage/${service.hero_image}`}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2 min-h-[56px]">
                    {getValue(service.title, service.title_ja)}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </h3>

                  <p className="text-muted-foreground mt-2 min-h-[80px] line-clamp-4">
                    {getValue(service.subtitle, service.subtitle_ja)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Industry Section */}
      {/* Industry Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
            {lang === "en" ? "Industry We Serve" : "対象業界"}
          </h2>

          <p className="text-center text-muted-foreground mb-12" data-aos="fade-up">
            {lang === "en"
              ? "Tailored IT Infrastructure Services for Every Industry"
              : "あらゆる業界向けにカスタマイズされたITインフラサービス"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeIndustries.map((industry, i) => {
              const Icon = getIndustryIcon(industry.id);

              return (
                <div
                  key={industry.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  {/* EXACT SAME ICON POSITION & SIZE */}
                  <Icon className="w-10 h-10 text-primary mb-4" />

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {getValue(industry.title, industry.title_ja)}
                  </h3>

                  <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: getValue(industry.description, industry.description_ja),
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-4" data-aos="fade-up">
            {lang === "en" ? "Frequently Asked Questions" : "よくある質問"}
          </h2>

          <p className="text-center text-muted-foreground mb-12" data-aos="fade-up">
            {lang === "en"
              ? "Here are some frequently asked questions from applicants in a Q&A format."
              : "応募者からよくいただく質問をQ&A形式でご紹介します。"}
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                data-aos="fade-up"
                data-aos-delay={index * 90}
                key={faq.id}
                value={`item-${faq.id}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div data-aos="fade-up"
                    data-aos-delay={index * 90} className="flex items-start gap-4 text-left">
                    <p className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      Q
                    </p>
                    <p className="text-foreground">{getValue(faq.question, faq.question_ja)}</p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-5">
                  <div data-aos="fade-up"
                    data-aos-delay={index * 90} className="flex items-start gap-4">
                    <p className="flex-shrink-0 w-8 h-8 rounded-full bg-section-light text-primary flex items-center justify-center font-semibold">
                      A
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {getValue(faq.answer, faq.answer_ja)}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>


      {/* Blogs and Seminars Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/blogs"
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <img
                src="/image/News1.png"
                alt="Blogs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {lang === 'en' ? "Blogs" : "ブログ"}
                  </h3>
                  <span className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-foreground transition-colors">
                    {lang === 'en' ? "To the blog list" : "ブログ一覧へ"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href="/blogs/seminars-index"
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <img
                src="/image/Seminar1.jpg"
                alt="Seminars"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {lang === 'en' ? "Seminars and Events" : "セミナー・イベント"}
                  </h3>
                  <span className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-foreground transition-colors">
                    {lang === 'en' ? "See the list of seminars and events" : "セミナー・イベント一覧を見る"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
