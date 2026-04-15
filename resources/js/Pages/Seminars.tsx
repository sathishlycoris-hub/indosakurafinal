import Layout from "@/components/layout/Layout";
import Serviceshead from "@/components/layout/Serviceshead";

import { Link, usePage } from "@inertiajs/react";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Insightshead from "@/components/layout/InsightsHead";
interface Seminar {
  id: number;
  title: string;
  title_ja?: string | null;
  description: string;
  description_ja?: string | null;
  date: string;
  time: string;
  location: string;
  location_ja?: string | null;
  image?: string | null;
  status: "upcoming" | "archived";
}

export default function Seminars() {

  const { lang } = usePage<{ lang: "en" | "ja" }>().props;
  const page = usePage();
  const upcomingSeminars = page.props.upcomingSeminars as Seminar[];
  const archivedSeminars = page.props.archivedSeminars as Seminar[];

  const getTitle = (s: Seminar) =>
    lang === "en" ? s.title : s.title_ja || s.title;

  const getDescription = (s: Seminar) =>
    lang === "en" ? s.description : s.description_ja || s.description;

  const getLocation = (s: Seminar) =>
    lang === "en" ? s.location : s.location_ja || s.location;

  const formatDate = (d: string) => {
    const date = new Date(d);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
  });




  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Insightshead />
      </div>
      

      {/* HERO */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4" data-aos="fade-right">
          <h1 className="text-4xl font-bold mb-4">
            {lang === "en" ? "Seminars & Events" : "セミナー・イベント"}
          </h1>
          <p className="opacity-90 max-w-2xl">
            {lang === "en"
              ? "Stay ahead with our expert-led seminars and industry events"
              : "専門家主導のセミナーと業界イベントで常に先を行く"}
          </p>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="py-16">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-primary mb-8">
            {lang === "en" ? "Upcoming Seminar (Event)" : "開催予定"}
          </h2>

          {upcomingSeminars.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingSeminars.map((s) => (
                <Link
                  key={s.id}
                  href={`/blogs/seminars/${s.id}`}
                  className="border rounded-lg overflow-hidden hover:shadow-lg"
                >
                  <img
                    src={s.image ? `/storage/${s.image}` : "/image/case1.jpg"}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6">
                    <div className="flex gap-3 text-xs mb-3">
                      <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded flex items-center gap-1"><Tag size={12} />
                        {lang === "en" ? "Upcoming Event" : "開催予定イベント"}</span>
                    </div>
                    <h3 className="font-semibold mt-2">{getTitle(s)}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {getDescription(s)}
                    </p>

                    <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                      <div className="flex gap-2">
                        <Calendar size={14} /> {formatDate(s.date)}
                      </div>
                      <div className="flex gap-2">
                        <Clock size={14} /> {s.time}
                      </div>
                      <div className="flex gap-2">
                        <MapPin size={14} /> {getLocation(s)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              {lang === "en"
                ? "There are currently no applicable seminars or events."
                : "現在、該当するセミナーやイベントはありません。"}
            </p>
          )}
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-primary mb-8">
            {lang === "en" ? "Archive Seminar / Events" : "アーカイブ"}
          </h2>

          {archivedSeminars.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {archivedSeminars.map((s) => (
                <Link
                  key={s.id}
                  href={`/blogs/seminars/${s.id}`}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={s.image ? `/storage/${s.image}` : "/image/case1.jpg"}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                      {lang === "en"
                        ? "Event has ended"
                        : "本イベントは終了しました"}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex gap-3 text-xs mb-3">
                      <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded flex items-center gap-1"><Tag size={12} />
                        {lang === "en" ? "Archived Event" : "終了イベント"}</span>
                    </div>
                    <h3 className="font-semibold mt-2">{getTitle(s)}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {getDescription(s)}
                    </p>
                    <p className="text-xs mt-2 text-muted-foreground">
                      {formatDate(s.date)} • {s.time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              {lang === "en"
                ? "No archived seminars."
                : "アーカイブされたセミナーはありません。"}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
