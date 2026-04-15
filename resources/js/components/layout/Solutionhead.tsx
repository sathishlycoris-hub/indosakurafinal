import { Link, usePage } from "@inertiajs/react";

interface SolutionNavItem {
  title: string;
  title_ja?: string
  slug: string;
}

export default function Solutionhead() {
  const { url, props } = usePage<{
    solutionNav?: SolutionNavItem[];
    lang: "en" | "ja";
  }>();

  const { lang } = props;

  const getValue = (en?: string, ja?: string) => {
    return lang === "ja" ? ja || en : en;
  };

  const solutionNav = Array.isArray(props.solutionNav)
    ? props.solutionNav
    : [];

  const tabs = [
    {
      label: getValue("Solutions TOP", "ソリューショントップ"),
      path: "/solutions",
      exact: true,
    },
    ...solutionNav.map((solution) => ({
      label: getValue(solution.title, solution.title_ja),
      path: `/solutions/${solution.slug}`,
    })),
  ];

  const isActive = (item: { path: string; exact?: boolean }) => {
    if (item.exact) {
      return url === item.path;
    }
    return url.startsWith(item.path);
  };

  return (
    <div className="bg-muted/50 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
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
