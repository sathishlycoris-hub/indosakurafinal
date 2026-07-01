import { Link, usePage } from "@inertiajs/react";

interface ServiceNavItem {
  title: string;
  title_ja?: string;
  slug: string;
}

interface ActiveItem {
  title?: string;
  title_ja?: string;
  slug?: string;
}

interface ServicesheadProps {
  // Pass the current sub-service/item being viewed (e.g. from Services/ItemShow.tsx).
  // When set, the matching top-level service tab shows this item's title in a hover dropdown.
  activeItem?: ActiveItem;
}

export default function Serviceshead({ activeItem }: ServicesheadProps) {
  const { url, props } = usePage<{
    serviceNav?: ServiceNavItem[];
    lang: "en" | "ja";
  }>();

  const { lang } = props;

  const getValue = (en?: string, ja?: string) => {
    return lang === "ja" ? ja || en : en;
  };

  const serviceNav = Array.isArray(props.serviceNav)
    ? props.serviceNav
    : [];

  interface Tab {
    label: string | undefined;
    path: string;
    exact?: boolean;
    slug?: string;
  }

  const tabs: Tab[] = [
    {
      label: getValue("Services TOP", "サービスTOP"),
      path: "/services",
      exact: true,
    },
    ...serviceNav.map((service) => ({
      label: getValue(service.title, service.title_ja),
      path: `/services/${service.slug}`,
      slug: service.slug,
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

  const activeItemTitle = activeItem ? getValue(activeItem.title, activeItem.title_ja) : null;

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap items-center gap-1 py-3">
          {tabs.map((item, index) => {
            const active = isActive(item);
            // Only the tab matching the current sub-item's parent service gets the hover dropdown.
            const showItemDropdown =
              !item.exact &&
              active &&
              !!activeItemTitle &&
              (!activeItem?.slug || item.slug === activeItem.slug);

            return (
              <div key={item.path} className="flex items-center relative group">
                <Link
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    active
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>

                {showItemDropdown && (
                  <div
                    className="absolute left-0 top-full mt-1 hidden group-hover:flex z-50 items-center gap-2
                               bg-white border border-border rounded-lg shadow-lg px-4 py-2 text-xs whitespace-nowrap"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="text-primary font-medium">{activeItemTitle}</span>
                  </div>
                )}

                {index < tabs.length - 1 && (
                  <span className="text-muted-foreground/50 mx-1">/</span>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}