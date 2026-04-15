import { usePage } from "@inertiajs/react";
import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import ContactCTA from "@/components/layout/Contact";

/* =========================
   TYPES
   ========================= */

type TeamMember = {
  name: string;
  name_ja?: string | null;
  designation: string;
  designation_ja?: string | null;
  description: string | null;
  description_ja?: string | null;
  image: string | null;
};

type CategoryGroup = {
  label: string;
  label_ja: string | null;
  members: TeamMember[];
};

// key = EN category name, value = group data
type Grouped = Record<string, CategoryGroup>;

type TeamCategory = {
  id: number;
  name: string;
  name_ja: string | null;
  sort_order: number;
};

/* =========================
   SUB-COMPONENTS (outside parent to avoid focus loss)
   ========================= */

function ProfileCard({ member, lang }: { member: TeamMember; lang: "en" | "ja" }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full md:w-36 h-36 rounded-lg overflow-hidden bg-muted flex justify-center items-center flex-shrink-0">
        {member.image ? (
          <img
            src={`/storage/${member.image}`}
            alt={member.name}
            className="h-full w-auto object-cover"
          />
        ) : (
          <div className="text-sm text-muted-foreground">No Image</div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {lang === "ja" ? member.name_ja || member.name : member.name}
        </h3>
        <p className="text-primary font-medium mb-2">
          {lang === "ja" ? member.designation_ja || member.designation : member.designation}
        </p>
        {member.description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {lang === "ja"
              ? member.description_ja || member.description
              : member.description}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionBlock({
  title,
  items,
  lang,
  noMarginBottom = false,
}: {
  title: string;
  items: TeamMember[];
  lang: "en" | "ja";
  noMarginBottom?: boolean;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className={noMarginBottom ? "mb-0" : "mb-12"}>
      <h3 className="text-xl font-semibold text-foreground mb-6 inline-block bg-white px-6 py-3 border-l-4 border-primary pl-4">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <ProfileCard key={index} member={item} lang={lang} />
        ))}
      </div>
    </div>
  );
}

/* =========================
   PAGE
   ========================= */

// Which category names belong to the "Executive Leadership" section vs "Ecosystem"
// This is controlled by which categories are in the DB — anything not in the
// ecosystem list falls under Executive Leadership automatically.
const ECOSYSTEM_CATEGORIES = ["Strategic Alliance Partners"];

export default function Team() {
  const { lang }       = usePage<{ lang: "en" | "ja" }>().props as any;
  const { grouped, categories } = usePage<{
    grouped: Grouped;
    categories: TeamCategory[];
  }>().props;

  // Split categories into two sections
  const execCategories      = categories.filter((c) => !ECOSYSTEM_CATEGORIES.includes(c.name));
  const ecosystemCategories = categories.filter((c) =>  ECOSYSTEM_CATEGORIES.includes(c.name));

  // Bilingual static text helper
  const ui = {
    pageTitle:         lang === "ja" ? "チーム"                              : "Our Team",
    pageSubtitle:      lang === "ja" ? "チームは私たちの成功の原動力です"      : "Our team is the heart of our success",
    execTitle:         lang === "ja" ? "エグゼクティブリーダーシップ"          : "Executive Leadership",
    execSubtitle:      lang === "ja" ? "ビジョン、誠実さ、目的をもって率いる"   : "Leading with Vision, Integrity and Purpose",
    execSubtitleLine2: lang === "ja" ? "未来を形作る経験豊かなリーダーたち"     : "Experienced Leaders Shaping Our Future",
    ecoTitle:          lang === "ja" ? "エコシステム"                         : "Our Ecosystem",
    ecoSubtitle:       lang === "ja" ? "イノベーションと成長を支える戦略的同盟" : "Strategic Alliances Enabling Innovation and Growth",
    subheader:         lang === "ja" ? "マネジメントチーム"                    : "Management Team",
  };

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Subheader currentPage={ui.subheader} />
      </div>

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="py-8 pb-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-primary text-3xl lg:text-4xl font-bold mb-2">
            {ui.pageTitle}
          </h1>
          <p className="text-muted-foreground">{ui.pageSubtitle}</p>
        </div>
      </section>

      {/* ── EXECUTIVE LEADERSHIP ──────────────────────── */}
      {execCategories.length > 0 && (
        <section className="py-8 bg-pink-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 lg:p-12">
              <h2 className="text-primary text-3xl font-bold mb-2 text-center">
                {ui.execTitle}
              </h2>
              <p className="text-muted-foreground text-center mb-1">
                {ui.execSubtitleLine2}{ui.execSubtitle}
              </p>
              <p className="text-muted-foreground text-center mb-8">
                
              </p>

              {execCategories.map((cat, idx) => {
                const group = grouped[cat.name];
                if (!group || group.members.length === 0) return null;

                // Category section heading: use JA name from DB when lang=ja
                const sectionTitle =
                  lang === "ja" ? cat.name_ja || cat.name : cat.name;

                const isLast = idx === execCategories.length - 1;

                return (
                  <SectionBlock
                    key={cat.id}
                    title={sectionTitle}
                    items={group.members}
                    lang={lang}
                    noMarginBottom={isLast}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── ECOSYSTEM / ALLIANCE PARTNERS ─────────────── */}
      {ecosystemCategories.length > 0 && (
        <section className="bg-pink-50 py-6 -mt-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-section-light rounded-xl p-8 lg:p-12 pt-0">
              <h2 className="text-primary text-3xl font-bold mb-2 text-center">
                {ui.ecoTitle}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {ui.ecoSubtitle}
              </p>

              {ecosystemCategories.map((cat, idx) => {
                const group = grouped[cat.name];
                if (!group || group.members.length === 0) return null;

                const sectionTitle =
                  lang === "ja" ? cat.name_ja || cat.name : cat.name;
                const isLast = idx === ecosystemCategories.length - 1;

                return (
                  <SectionBlock
                    key={cat.id}
                    title={sectionTitle}
                    items={group.members}
                    lang={lang}
                    noMarginBottom={isLast}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </Layout>
  );
}