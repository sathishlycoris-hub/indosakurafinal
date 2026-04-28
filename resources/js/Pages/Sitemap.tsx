import Layout from "@/components/layout/Layout";
import ContactCTA from "@/components/layout/Contact";
import { Link, usePage } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

type NavItem = {
  title: string;
  title_ja?: string;
  slug: string;
};

interface SitemapSettings {
  sitemap_hero_title_en?: string | null;
  sitemap_hero_title_ja?: string | null;
}

const DEFAULTS = {
  sitemap_hero_title_en: "Site Map",
  sitemap_hero_title_ja: "サイトマップ",
};

type PageProps = {
  lang: "en" | "ja";
  footerServices?: NavItem[];
  footerSolutions?: NavItem[];
  siteSettings?: SitemapSettings;
};

const Sitemap = () => {
  const { lang, props } = { lang: usePage<PageProps>().props.lang, props: usePage<PageProps>().props };

  const services  = props.footerServices  ?? [];
  const solutions = props.footerSolutions ?? [];
  const s         = { ...DEFAULTS, ...(props.siteSettings ?? {}) };

  const getValue = (en?: string | null, ja?: string | null): string =>
    (lang === "ja" ? ja || en : en) || "";

  const companyLinks = [
    { href: "/corporate/greetings", en: "Greetings",     ja: "ご挨拶" },
    { href: "/corporate-info",      en: "Corporate Info", ja: "会社概要" },
    { href: "/blogs/casestudies",   en: "Case Studies",   ja: "事例紹介" },
    { href: "/recruitment",         en: "Careers",        ja: "採用情報" },
    { href: "/contact",             en: "Contact",        ja: "お問い合わせ" },
  ];

  const resourceLinks = [
    { href: "/blogs",             en: "Blog",           ja: "ブログ" },
    { href: "/contact",           en: "Support",        ja: "サポート" },
    { href: "/corporate/policy",  en: "Privacy Policy", ja: "プライバシーポリシー" },
    { href: "/usage",             en: "Terms of Service", ja: "利用規約" },
    { href: "/sitemap",           en: "Sitemap",        ja: "サイトマップ" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary py-16">
        <div className="absolute left-0 top-0 w-64 h-64 bg-muted-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {getValue(s.sitemap_hero_title_en, s.sitemap_hero_title_ja)}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-section-light">
        <div className="container mx-auto px-4 max-w-8xl">

          {/* Home */}
          <div className="mb-8">
            <Link href="/" className="text-lg font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              {getValue("Top Page", "インド桜ソフトウェアジャパン トップページ")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Solutions */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Products", "ソリューション")}
            </h2>
            <ul className="space-y-2 ml-4">
              {solutions.map((item) => (
                <li key={item.slug}>
                  <Link href={`/solutions/${item.slug}`} className="text-grey hover:underline inline-flex items-center gap-1">
                    {getValue(item.title, item.title_ja)}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Services", "サービス")}
            </h2>
            <ul className="space-y-2 ml-4">
              {services.map((item) => (
                <li key={item.slug}>
                  <Link href={`/services/${item.slug}`} className="text-grey hover:underline inline-flex items-center gap-1">
                    {getValue(item.title, item.title_ja)}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Company", "会社情報")}
            </h2>
            <ul className="space-y-2 ml-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-grey hover:underline inline-flex items-center gap-1">
                    {getValue(link.en, link.ja)}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Resources", "リソース")}
            </h2>
            <ul className="space-y-2 ml-4">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-grey hover:underline inline-flex items-center gap-1">
                    {getValue(link.en, link.ja)}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Inquiry */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-full mb-3" />
            <Link href="/contact" className="text-xl font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              {getValue("Inquiry", "お問い合わせ")}
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