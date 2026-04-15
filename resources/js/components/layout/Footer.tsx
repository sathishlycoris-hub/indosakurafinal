import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react";

type NavItem = { title: string; title_ja?: string; slug: string };

interface SiteSettings {
  footer_company_heading_en: string;   footer_company_heading_ja: string;
  footer_resources_heading_en: string; footer_resources_heading_ja: string;
  footer_solutions_heading_en: string; footer_solutions_heading_ja: string;
  footer_services_heading_en: string;  footer_services_heading_ja: string;
  footer_copyright_en: string;         footer_copyright_ja: string;
  footer_offices_en: string;           footer_offices_ja: string;
  footer_sitemap_en: string;           footer_sitemap_ja: string;
  footer_logo_image: string | null;
  fc1_en: string; fc1_ja: string; fc1_href: string;
  fc2_en: string; fc2_ja: string; fc2_href: string;
  fc3_en: string; fc3_ja: string; fc3_href: string;
  fc4_en: string; fc4_ja: string; fc4_href: string;
  fc5_en: string; fc5_ja: string; fc5_href: string;
  fr1_en: string; fr1_ja: string; fr1_href: string;
  fr2_en: string; fr2_ja: string; fr2_href: string;
  fr3_en: string; fr3_ja: string; fr3_href: string;
  fr4_en: string; fr4_ja: string; fr4_href: string;
  social_facebook: string;
  social_x: string;
  social_linkedin: string;
  social_youtube: string;
  social_instagram: string;
}

const DEFAULTS: SiteSettings = {
  footer_company_heading_en:   "Company",   footer_company_heading_ja:   "会社情報",
  footer_resources_heading_en: "Resources", footer_resources_heading_ja: "リソース",
  footer_solutions_heading_en: "Solutions", footer_solutions_heading_ja: "ソリューション",
  footer_services_heading_en:  "Services",  footer_services_heading_ja:  "サービス",
  footer_copyright_en: "© 2026 Indo-Sakura. All rights reserved.",
  footer_copyright_ja: "© 2026 インドサクラ株式会社。無断転載を禁じます。",
  footer_offices_en:   "Offices in Japan, India & USA",
  footer_offices_ja:   "日本・インド・アメリカに拠点",
  footer_sitemap_en:   "Sitemap", footer_sitemap_ja: "サイトマップ",
  footer_logo_image:   null,
  fc1_en: "About Us",       fc1_ja: "会社概要",     fc1_href: "/corporate/greetings",
  fc2_en: "Corporate Info", fc2_ja: "企業情報",     fc2_href: "/corporate-info",
  fc3_en: "Insights",       fc3_ja: "導入事例",     fc3_href: "/blogs",
  fc4_en: "Careers",        fc4_ja: "採用情報",     fc4_href: "/recruitment",
  fc5_en: "Contact",        fc5_ja: "お問い合わせ", fc5_href: "/contact",
  fr1_en: "Blog",            fr1_ja: "ブログ",                 fr1_href: "/blogs",
  fr2_en: "Support",         fr2_ja: "サポート",               fr2_href: "/contact",
  fr3_en: "Privacy Policy",  fr3_ja: "プライバシーポリシー",   fr3_href: "/corporate/policy",
  fr4_en: "Terms of Service",fr4_ja: "利用規約",               fr4_href: "/usage",
  social_facebook:  "https://www.facebook.com/indosakurasoftwarejapan",
  social_x:         "https://x.com/IndoSakuraJapan/status/1658354411025104896",
  social_linkedin:  "https://www.linkedin.com/company/indo-sakura-software-japan/posts/?feedView=all",
  social_youtube:   "https://www.youtube.com/@IndoSakura",
  social_instagram: "https://www.instagram.com/indosakurasoftware/",
};

const Footer = () => {
  const { props } = usePage<{ lang: "en" | "ja"; siteSettings?: SiteSettings; footerServices?: NavItem[]; footerSolutions?: NavItem[] }>();
  const { lang } = props;
  const s = { ...DEFAULTS, ...(props.siteSettings ?? {}) };
  const services  = props.footerServices  ?? [];
  const solutions = props.footerSolutions ?? [];

  const t  = (en: string, ja: string) => lang === "ja" ? ja || en : en;
  const tv = (en?: string | null, ja?: string | null) => (lang === "ja" ? ja || en : en) || "";

  const footerLogoSrc = s.footer_logo_image ? `/storage/${s.footer_logo_image}` : "/image/logo20.png";

  // Build company & resources from CMS
  const companyLinks = [
    { name: t(s.fc1_en, s.fc1_ja), path: s.fc1_href },
    { name: t(s.fc2_en, s.fc2_ja), path: s.fc2_href },
    { name: t(s.fc3_en, s.fc3_ja), path: s.fc3_href },
    { name: t(s.fc4_en, s.fc4_ja), path: s.fc4_href },
    { name: t(s.fc5_en, s.fc5_ja), path: s.fc5_href },
  ].filter(l => l.path);

  const resourceLinks = [
    { name: t(s.fr1_en, s.fr1_ja), path: s.fr1_href },
    { name: t(s.fr2_en, s.fr2_ja), path: s.fr2_href },
    { name: t(s.fr3_en, s.fr3_ja), path: s.fr3_href },
    { name: t(s.fr4_en, s.fr4_ja), path: s.fr4_href },
  ].filter(l => l.path);

  // Social icons — only render if URL is set
  const socialIcons = [
    { url: s.social_facebook,  icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
    { url: s.social_x,         icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-black"><path d="M18.244 2H21.5l-7.49 8.56L22.5 22h-6.8l-5.35-7.01L4.5 22H1.24l8.04-9.19L1.5 2h6.97l4.84 6.29L18.244 2z" /></svg>, label: "X" },
    { url: s.social_linkedin,  icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
    { url: s.social_youtube,   icon: <Youtube className="w-5 h-5" />,  label: "YouTube" },
    { url: s.social_instagram, icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
  ].filter(i => i.url);

  const linkClass = "text-xs sm:text-sm text-gray-700 hover:text-primary transition-colors";
  const headingClass = "font-semibold text-black text-sm sm:text-base mb-3 sm:mb-4";

  return (
    <footer className="bg-[#EFEFF4]">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-1 mb-8 md:mb-12">
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-3">

              {/* Company — CMS links */}
              <div>
                <h4 className={headingClass}>{t(s.footer_company_heading_en, s.footer_company_heading_ja)}</h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {companyLinks.map((item) => (
                    <li key={item.path}><Link href={item.path} className={linkClass}>{item.name}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Resources — CMS links */}
              <div>
                <h4 className={headingClass}>{t(s.footer_resources_heading_en, s.footer_resources_heading_ja)}</h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {resourceLinks.map((item) => (
                    <li key={item.path}><Link href={item.path} className={linkClass}>{item.name}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Solutions — from DB (existing), heading from CMS */}
              <div>
                <h2 className={headingClass}>{t(s.footer_solutions_heading_en, s.footer_solutions_heading_ja)}</h2>
                <ul className="space-y-1.5 sm:space-y-2">
                  {solutions.map((sol) => (
                    <li key={sol.slug}><Link href={`/solutions/${sol.slug}`} className={linkClass}>{tv(sol.title, sol.title_ja)}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Services — from DB (existing), heading from CMS */}
              <div>
                <h2 className={headingClass}>{t(s.footer_services_heading_en, s.footer_services_heading_ja)}</h2>
                <ul className="space-y-1.5 sm:space-y-2">
                  {services.map((svc) => (
                    <li key={svc.slug}><Link href={`/services/${svc.slug}`} className={linkClass}>{tv(svc.title, svc.title_ja)}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer logo */}
          <div><img src={footerLogoSrc} alt="20 years of excellence" className="w-16 sm:w-20 object-contain" /></div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-600 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex flex-col items-start gap-2 text-sm">
              <p className="text-black">{t(s.footer_copyright_en, s.footer_copyright_ja)}</p>
              <Link href="/sitemap" className="hover:text-primary text-black transition-colors">
                {t(s.footer_sitemap_en, s.footer_sitemap_ja)}
              </Link>
            </div>
            <div className="flex flex-col items-end gap-3">
              {/* Social icons — CMS-driven, hidden if URL is blank */}
              {socialIcons.length > 0 && (
                <div className="flex gap-3">
                  {socialIcons.map(({ url, icon, label }) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="bg-white rounded-full p-1">
                      {icon}
                    </a>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-800 text-right">{t(s.footer_offices_en, s.footer_offices_ja)}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;