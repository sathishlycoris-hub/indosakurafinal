import { Link, usePage } from "@inertiajs/react";

interface IndiaDeskNavItem {
  title: string;
  title_ja?: string;
  slug: string;
}

export default function IndiaDesksHead() {
  const { url, props } = usePage<{
    indiaDeskNav?: IndiaDeskNavItem[];
    lang: "en" | "ja";
  }>();

  const { lang } = props;

  const getValue = (en?: string, ja?: string) => {
    return lang === "ja" ? ja || en : en;
  };

  const indiaDeskNav = Array.isArray(props.indiaDeskNav)
    ? props.indiaDeskNav
    : [];

  const tabs = [
    {
      label: getValue("India Desks", "インドデスク"),
      path: "/india-desks",
      exact: true,
    },
    ...indiaDeskNav.map((indiaDesk) => ({
      label: getValue(indiaDesk.title, indiaDesk.title_ja),
      path: `/india-desks/${indiaDesk.slug}`,
    })),
    // {
    //   label: getValue("Seminar (Events)", "セミナー"),
    //   path: "/services/seminars-index",
    //   exact: true,
    // },
    /* {
      label: getValue("Blogs", "ブログ"),
      path: "/blogs-index",
      exact: true,
    }, */
  ];

  const isActive = (item: { path: string; exact?: boolean }) => {
    if (item.exact) {
      return url === item.path;
    }
    return url.startsWith(item.path);
  };

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap items-center gap-1 py-3">
          {tabs.map((item, index) => (
            <div key={item.path} className="flex items-center">
              <Link
                href={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${isActive(item)
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