import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Link, usePage } from "@inertiajs/react";
import ContactCTA from "@/components/layout/Contact";
import { ChevronRight } from "lucide-react";

/* =======================
   Types
======================= */
type NavItem = {
  title: string;
  slug: string;
};

type PageProps = {
  footerServices?: NavItem[];
  footerSolutions?: NavItem[];
};

const Sitemap = () => {
  const { language } = useLanguage();
  const { props } = usePage<PageProps>();

  const services = props.footerServices ?? [];
  const solutions = props.footerSolutions ?? [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary py-16">
        <div className="absolute left-0 top-0 w-64 h-64 bg-muted-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === "en" ? "Site Map" : "サイトマップ"}
          </h1>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-12 bg-section-light">
        <div className="container mx-auto px-4 max-w-8xl">

          {/* Home */}
          <div className="mb-8">
            <Link
              href="/"
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              {language === "en"
                ? "Top Page"
                : "インド桜ソフトウェアジャパン トップページ"}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ========== Solutions (Dynamic) ========== */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === "en" ? "Products" : "ソリューション"}
            </h2>

            <ul className="space-y-2 ml-4">
              {solutions.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="text-grey hover:underline inline-flex items-center gap-1"
                  >
                    {item.title}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== Services (Dynamic) ========== */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === "en" ? "Services" : "サービス"}
            </h2>

            <ul className="space-y-2 ml-4">
              {services.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="text-grey hover:underline inline-flex items-center gap-1"
                  >
                    {item.title}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== Company (Static, same as footer) ========== */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === "en" ? "Company" : "会社情報"}
            </h2>

            <ul className="space-y-2 ml-4">
              <li><Link href="/corporate/greetings" className="text-grey hover:underline inline-flex items-center gap-1">Greetings<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/corporate-info" className="text-grey hover:underline inline-flex items-center gap-1">Corporate Info<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/blogs/casestudies" className="text-grey hover:underline inline-flex items-center gap-1">Case Studies<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/recruitment" className="text-grey hover:underline inline-flex items-center gap-1">Careers<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/contact" className="text-grey hover:underline inline-flex items-center gap-1">Contact<ChevronRight className="w-4 h-4" /></Link></li>
            </ul>
          </div>

          {/* ========== Resources (Footer parity) ========== */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === "en" ? "Resources" : "リソース"}
            </h2>

            <ul className="space-y-2 ml-4">
              <li><Link href="/blogs" className="text-grey hover:underline inline-flex items-center gap-1">Blog<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/contact" className="text-grey hover:underline inline-flex items-center gap-1">Support<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/corporate/policy" className="text-grey hover:underline inline-flex items-center gap-1">Privacy Policy<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/usage" className="text-grey hover:underline inline-flex items-center gap-1">Terms of Service<ChevronRight className="w-4 h-4" /></Link></li>
              <li><Link href="/sitemap" className="text-grey hover:underline inline-flex items-center gap-1">Sitemap<ChevronRight className="w-4 h-4" /></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <Link
              href="/contact"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              {language === "en" ? "Inquiry" : "お問い合わせ"}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Sitemap;
