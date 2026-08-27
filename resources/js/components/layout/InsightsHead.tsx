import { Link, usePage } from "@inertiajs/react";

export default function Insightshead() {
  const { url, props } = usePage<{
    lang: "en" | "ja";
    siteSettings?: Record<string, string>;
  }>();

  const { lang, siteSettings } = props;
  const s = siteSettings ?? {};

  const t = (en: string, ja: string) => (lang === "ja" ? ja || en : en);

  // Build tabs from CMS — fall back to hardcoded defaults if not set
  const tabs = [
    {
      label: t(s.ins1_en || "Blogs",            s.ins1_ja || "ブログ"),
      path:  s.ins1_href || "/blogs",
    },
    {
      label: t(s.ins2_en || "Case Studies",      s.ins2_ja || "事例紹介"),
      path:  s.ins2_href || "/blogs/casestudies",
    },
    {
      label: t(s.ins3_en || "Infographics",      s.ins3_ja || "インフォグラフィックス"),
      path:  s.ins3_href || "/blogs/infographics",
    },
    {
      label: t(s.ins4_en || "Seminar (Events)",  s.ins4_ja || "セミナー"),
      path:  s.ins4_href || "/blogs/seminars-index",
    },
  ];

  /**
   * Normalize a path for comparison: trims whitespace, lowercases, strips a
   * trailing slash (but keeps a lone "/"), and strips query/hash so links
   * like "/blogs/casestudies?" or "/blogs/casestudies#top" still match.
   *
   * This is the actual fix: tab paths come from the CMS (SiteSetting model,
   * ins1_href..ins4_href), and a stray trailing slash, different casing, or
   * surrounding whitespace saved via the admin panel silently broke the
   * exact-match check below — the Case Studies tab would just never light up
   * even though the route itself worked fine.
   */
  const normalize = (path: string) => {
    const clean = path.trim().toLowerCase().split(/[?#]/)[0];
    const noTrailingSlash = clean.length > 1 ? clean.replace(/\/+$/, "") : clean;
    return noTrailingSlash || "/";
  };

  /* ── Active link logic ── */
  const isActive = (path: string) => {
    const currentUrl = normalize(url);
    const targetPath = normalize(path);

    // Seminars: match index or any /blogs/seminars/* path
    if (targetPath === "/blogs/seminars-index" || targetPath.includes("seminars")) {
      return (
        currentUrl === "/blogs/seminars-index" ||
        currentUrl.startsWith("/blogs/seminars/")
      );
    }

    // General Blogs tab — active only when NOT on another sub-tab
    if (targetPath === "/blogs") {
      const isOtherTab = tabs.some((tab) => {
        if (normalize(tab.path) === "/blogs") return false;
        const tp = normalize(tab.path);
        if (tp.includes("seminars")) return currentUrl.startsWith("/blogs/seminars");
        return currentUrl === tp || currentUrl.startsWith(`${tp}/`);
      });
      return (
        (currentUrl === "/blogs" || currentUrl.startsWith("/blogs/")) &&
        !isOtherTab
      );
    }

    // Standard sub-categories
    return currentUrl === targetPath || currentUrl.startsWith(`${targetPath}/`);
  };

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap items-center gap-1 py-3">
          {tabs.map((item, index) => (
            <div key={item.path} className="flex items-center">
              <Link
                href={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
              {index < tabs.length - 1 && (
                <span className="text-muted-foreground/50 mx-1">/</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
