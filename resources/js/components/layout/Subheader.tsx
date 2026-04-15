import { Link, usePage } from "@inertiajs/react";

interface SiteSettings {
  corp1_en: string; corp1_ja: string; corp1_href: string;
  corp2_en: string; corp2_ja: string; corp2_href: string;
  corp3_en: string; corp3_ja: string; corp3_href: string;
  corp4_en: string; corp4_ja: string; corp4_href: string;
  corp5_en: string; corp5_ja: string; corp5_href: string;
  corp6_en: string; corp6_ja: string; corp6_href: string;
  corp7_en: string; corp7_ja: string; corp7_href: string;
  corp8_en: string; corp8_ja: string; corp8_href: string;
  corp9_en: string; corp9_ja: string; corp9_href: string;
}

const CORP_DEFAULTS: SiteSettings = {
  corp1_en: "Corporate Info TOP",   corp1_ja: "企業情報トップ",             corp1_href: "/corporate-info",
  corp2_en: "Greetings",            corp2_ja: "ご挨拶",                    corp2_href: "/corporate/greetings",
  corp3_en: "Corporate Philosophy", corp3_ja: "企業理念",                  corp3_href: "/corporate/philosophy",
  corp4_en: "Profile",              corp4_ja: "会社概要",                  corp4_href: "/corporate/profile",
  corp5_en: "History",              corp5_ja: "沿革",                      corp5_href: "/corporate/history",
  corp6_en: "Team",                 corp6_ja: "チーム",                    corp6_href: "/corporate/team",
  corp7_en: "Press Release",        corp7_ja: "プレスリリース",             corp7_href: "/corporate/press-release",
  corp8_en: "Clients",              corp8_ja: "取引先・ビジネスパートナー", corp8_href: "/corporate/clients",
  corp9_en: "Policy Statements",    corp9_ja: "ポリシー",                  corp9_href: "/corporate/policy",
};

interface SubheaderProps {
  currentPage?: string;
}

const Subheader = ({ currentPage }: SubheaderProps) => {
  const { url, props } = usePage<{ lang: "en" | "ja"; siteSettings?: SiteSettings }>();
  const lang = props.lang;
  const s: SiteSettings = { ...CORP_DEFAULTS, ...(props.siteSettings ?? {}) };

  // Build tabs from CMS
  const tabs = ([1,2,3,4,5,6,7,8,9] as const)
    .map((n) => ({
      name_en: s[`corp${n}_en`],
      name_ja: s[`corp${n}_ja`],
      path:    s[`corp${n}_href`],
    }))
    .filter((t) => t.path); // skip rows with empty URL

  const isActive = (path: string, name: string) =>
    url === path || url.startsWith(path + "/") || currentPage === name;

  return (
    <div className="bg-muted/50 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex flex-wrap items-center justify-start gap-1 py-3">
          {tabs.map((tab, index) => {
            const label = lang === "ja" ? tab.name_ja : tab.name_en;
            return (
              <div key={tab.path} className="flex items-center">
                <Link
                  href={tab.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(tab.path, label) ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </Link>
                {index < tabs.length - 1 && <span className="text-muted-foreground/50 mx-1">/</span>}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Subheader;