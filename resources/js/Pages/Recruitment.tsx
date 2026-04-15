import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Code,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import Recruitmenthead from "@/components/layout/Recruitmenthead";
import ContactCTA from "@/components/layout/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

interface Job {
  id: number;
  title: string;
  title_ja?: string;
  department: string;
  department_ja?: string;
  location: string;
  location_ja?: string;
  employment_type: string;
  employment_type_ja?: string;
  experience: string;
  experience_ja?: string;
  salary?: string;
  slug: string;
}

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
  delay: 80,
});

export default function Recruitment({ jobs }: { jobs: Job[] }) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const stats = [
    {
      value: "150+",
      label: lang === "en" ? "Team Members" : "チームメンバー",
    },
    {
      value: "20+",
      label: lang === "en" ? "Years Experience" : "20年以上の実績",
    },
    {
      value: "3",
      label: lang === "en" ? "Global Offices" : "グローバル拠点",
    },
  ];

  const benefits = lang === "en"
    ? [
      "Work on innovative AI and enterprise solutions",
      "Collaborate with global teams across three continents",
      "Competitive compensation and benefits package",
      "Continuous learning and career development opportunities",
      "Flexible work arrangements and work-life balance",
      "Modern office spaces with latest technology",
    ]
    : [
      "最先端のAIおよびエンタープライズソリューションに携わる機会",
      "3大陸にわたるグローバルチームとの連携",
      "競争力のある報酬と福利厚生制度",
      "継続的な学習とキャリア開発支援",
      "柔軟な働き方とワークライフバランス",
      "最新設備を備えたモダンなオフィス環境",
    ];

  const getValue = (en?: string, ja?: string) =>
    lang === "ja" ? ja || en : en;

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Recruitmenthead
          jobs={jobs.map(({ id, title, title_ja, slug }) => ({
            id,
            title: getValue(title, title_ja),
            slug,
          }))}
        />
      </div>

      {/* HERO */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {lang === "en" ? "Join Our Team" : "私たちと一緒に働きませんか？"}
          </h1>

          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {lang === "en"
              ? "Shape the future of technology with Indo-Sakura."
              : "インドサクラとともに、テクノロジーの未来を創造しませんか。"}
          </p>

          <div className="flex justify-center gap-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {lang === "en"
                  ? "Why Join Indo-Sakura?"
                  : "インドサクラで働く魅力"}
              </h2>

              <p className="text-muted-foreground mb-6">
                {lang === "en"
                  ? "We foster a culture of innovation and continuous learning."
                  : "私たちは革新と継続的な学習を重視する企業文化を育んでいます。"}
              </p>

              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="/image/job1.jpg" className="rounded-lg h-80 object-cover" />
              <img src="/image/job2.jpg" className="rounded-lg h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* OPENINGS */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-xl font-semibold mb-2">
            {lang === "en" ? "Current Openings" : "募集職種一覧"}
          </h2>

          {jobs.length === 0 && (
            <p>
              {lang === "en"
                ? "No openings available at the moment."
                : "現在募集中の職種はありません。"}
            </p>
          )}

          <div className="space-y-4 mt-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-lg border border-border border-l-4 border-l-pink-500"
              >
                <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <Code className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {getValue(job.title, job.title_ja)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getValue(job.department, job.department_ja)}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {getValue(job.location, job.location_ja)}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getValue(job.employment_type, job.employment_type_ja)}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {getValue(job.experience, job.experience_ja)}
                      </span>

                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link href={`/recruitment/${job.slug}`}>
                    <Button variant="viewDetails">
                      {lang === "en" ? "View Details & Apply" : "詳細を見る・応募する"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
}