import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import {
  ArrowRight,
  Building,
  Clock,
  Users,
  Newspaper,
  Handshake,
  FileText,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import ContactCTA from "@/components/layout/Contact";
import { Link, usePage } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";

// 1. Define the Icon Pool
const CORPORATE_ICONS = [
  Building,
  Lightbulb,
  MessageSquare,
  Clock,
  Users,
  Newspaper,
  Handshake,
  FileText,
];

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
  delay: 80,
});

const CorporateInfo = () => {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  type CorporateItem = {
    id: number;
    title?: string;
    title_ja?: string;
    path?: string;
    image?: string | null;
  };

  const { props } = usePage<{ items: CorporateItem[] }>();
  const sections = props.items || [];

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Subheader />
      </div>

      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {lang === "en" ? "Company Information" : "企業情報"}
          </h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            {sections.map((section, index) => {
              const hasImage = !!section.image;

              // 2. Select the icon based on the current index
              const IconComponent = CORPORATE_ICONS[index % CORPORATE_ICONS.length];

              const displayTitle = lang === "ja"
                ? section.title_ja ?? section.title
                : section.title ?? section.title_ja;

              return hasImage ? (
                /* WITH IMAGE CARD */
                <Link
                  key={section.id}
                  href={section.path || "#"}
                  className="group bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-all flex flex-col"
                >
                  {/* IMAGE SECTION: Changed from h-80 to h-40 (half) */}
                  {/* Added aspect-video for better responsiveness */}
                  <div className="relative w-full h-60 md:aspect-video overflow-hidden">
                    <img
                      src={`/storage/${section.image}`}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Suble overlay to make it look premium */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="flex items-center justify-between bg-white border-t min-h-[78px]">
                    <div className="flex items-center gap-3 px-5 py-5">
                      <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-pink-600 transition-colors" />
                      <span className="font-medium text-[20px] text-primary font-semibold">
                        {displayTitle}
                      </span>
                    </div>

                    {/* Action Square */}
                    <div className="bg-pink-600 w-[78px] flex items-center justify-center group-hover:bg-pink-700 transition self-stretch">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Link>
              ) : (
                /* NO IMAGE CARD */
                <Link
                  key={section.id}
                  href={section.path || "#"}
                  className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex items-center h-[82px]"
                >
                  <div className="flex-1 flex items-center gap-4 px-5 py-4">
                    
                      {/* Icon used here */}
                      <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-pink-600 transition-colors" />
                   
                    <span className="font-medium text-[20px] text-primary font-semibold">
                      {displayTitle}
                    </span>
                  </div>

                  <div className="bg-pink-600 w-[78px] h-full flex items-center justify-center group-hover:bg-pink-700 transition self-stretch">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default CorporateInfo;