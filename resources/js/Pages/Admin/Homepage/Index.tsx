import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

// ── Types ──────────────────────────────────────────────────
type Tab = "hero" | "corporate" | "stats" | "features" | "sections";

interface Settings {
  hero_heading: string;      hero_heading_ja: string;
  hero_subtext: string;      hero_subtext_ja: string;
  hero_tagline: string;      hero_tagline_ja: string;
  hero_image: string | null;

  corp_heading: string;      corp_heading_ja: string;
  corp_para1: string;        corp_para1_ja: string;
  corp_para2: string;        corp_para2_ja: string;

  stat1_value: string; stat1_label: string; stat1_label_ja: string; stat1_sub: string; stat1_sub_ja: string;
  stat2_value: string; stat2_label: string; stat2_label_ja: string; stat2_sub: string; stat2_sub_ja: string;
  stat3_value: string; stat3_label: string; stat3_label_ja: string; stat3_sub: string; stat3_sub_ja: string;
  stat4_value: string; stat4_label: string; stat4_label_ja: string; stat4_sub: string; stat4_sub_ja: string;

  feat1_label: string; feat1_label_ja: string; feat1_sub: string; feat1_sub_ja: string;
  feat2_label: string; feat2_label_ja: string; feat2_sub: string; feat2_sub_ja: string;
  feat3_label: string; feat3_label_ja: string; feat3_sub: string; feat3_sub_ja: string;
  feat4_label: string; feat4_label_ja: string; feat4_sub: string; feat4_sub_ja: string;

  services_intro: string;    services_intro_ja: string;
  solutions_intro: string;   solutions_intro_ja: string;
  updates_intro: string;     updates_intro_ja: string;
}

type FormData = Omit<Settings, "hero_image"> & {
  hero_image: File | null;
};

// ── Sub-components defined OUTSIDE the page component ─────
// This prevents React from unmounting/remounting them on every
// keystroke (which caused the lost-focus / typing bug).

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  lang: "en" | "ja";
  textarea?: boolean;
}

function Field({ label, value, onChange, lang, textarea = false }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">
        {label} <span className="text-xs text-primary">({lang.toUpperCase()})</span>
      </label>
      {textarea ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

interface StatGroupProps {
  num: 1 | 2 | 3 | 4;
  label: string;
  lang: "en" | "ja";
  data: FormData;
  setData: (key: keyof FormData, value: string) => void;
}

function StatGroup({ num, label, lang, data, setData }: StatGroupProps) {
  const vk  = `stat${num}_value`    as keyof FormData;
  const lk  = `stat${num}_label`    as keyof FormData;
  const ljk = `stat${num}_label_ja` as keyof FormData;
  const sk  = `stat${num}_sub`      as keyof FormData;
  const sjk = `stat${num}_sub_ja`   as keyof FormData;

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <p className="font-semibold text-sm text-foreground">{label}</p>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Value</label>
        <Input
          value={(data[vk] as string) ?? ""}
          onChange={(e) => setData(vk, e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Label ({lang.toUpperCase()})</label>
        <Input
          value={(data[lang === "en" ? lk : ljk] as string) ?? ""}
          onChange={(e) => setData(lang === "en" ? lk : ljk, e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Sub-label ({lang.toUpperCase()})</label>
        <Input
          value={(data[lang === "en" ? sk : sjk] as string) ?? ""}
          onChange={(e) => setData(lang === "en" ? sk : sjk, e.target.value)}
        />
      </div>
    </div>
  );
}

interface FeatGroupProps {
  num: 1 | 2 | 3 | 4;
  label: string;
  lang: "en" | "ja";
  data: FormData;
  setData: (key: keyof FormData, value: string) => void;
}

function FeatGroup({ num, label, lang, data, setData }: FeatGroupProps) {
  const lk  = `feat${num}_label`    as keyof FormData;
  const ljk = `feat${num}_label_ja` as keyof FormData;
  const sk  = `feat${num}_sub`      as keyof FormData;
  const sjk = `feat${num}_sub_ja`   as keyof FormData;

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <p className="font-semibold text-sm text-foreground">{label}</p>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Label ({lang.toUpperCase()})</label>
        <Input
          value={(data[lang === "en" ? lk : ljk] as string) ?? ""}
          onChange={(e) => setData(lang === "en" ? lk : ljk, e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Sub-text ({lang.toUpperCase()})</label>
        <Input
          value={(data[lang === "en" ? sk : sjk] as string) ?? ""}
          onChange={(e) => setData(lang === "en" ? sk : sjk, e.target.value)}
        />
      </div>
    </div>
  );
}

// ── Page component ─────────────────────────────────────────
export default function HomepageIndex() {
  const { settings } = usePage<{ settings: Settings }>().props;

  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  const { data, setData, post, processing, wasSuccessful } = useForm<FormData>({
    ...settings,
    hero_image: null,
  });

  const save = () => post(route("admin.homepage.update"), { forceFormData: true });

  // Typed setData wrapper for string fields
  const set = (key: keyof FormData, value: string) => setData(key, value as any);

  const tabs: { key: Tab; label: string }[] = [
    { key: "hero",      label: "Hero" },
    { key: "corporate", label: "Corporate Info" },
    { key: "stats",     label: "Stats" },
    { key: "features",  label: "Feature Cards" },
    { key: "sections",  label: "Section Intros" },
  ];

  return (
    <Authenticated header={<h2 className="text-xl font-bold">Homepage CMS</h2>}>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Homepage Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit all homepage content. Changes are reflected immediately on the site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {wasSuccessful && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" /> Saved
            </span>
          )}
          <div className="flex gap-2">
            <Button type="button" size="sm" variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>
              English
            </Button>
            <Button type="button" size="sm" variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>
              Japanese
            </Button>
          </div>
          {/* <Button onClick={save} disabled={processing}>
            {processing ? "Saving…" : "Save Changes"}
          </Button> */}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 border-b mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      {activeTab === "hero" && (
        <div className="space-y-5 max-w-2xl">
          <Field label="Heading"  value={data[activeLang === "en" ? "hero_heading" : "hero_heading_ja"]}  onChange={(v) => set(activeLang === "en" ? "hero_heading"  : "hero_heading_ja",  v)} lang={activeLang} />
          <Field label="Sub-text" value={data[activeLang === "en" ? "hero_subtext" : "hero_subtext_ja"]}  onChange={(v) => set(activeLang === "en" ? "hero_subtext"  : "hero_subtext_ja",  v)} lang={activeLang} textarea />
          <Field label="Tagline"  value={data[activeLang === "en" ? "hero_tagline" : "hero_tagline_ja"]}  onChange={(v) => set(activeLang === "en" ? "hero_tagline"  : "hero_tagline_ja",  v)} lang={activeLang} />

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Background Image</label>
            {settings.hero_image && (
              <img src={`/storage/${settings.hero_image}`} className="h-32 rounded-md border object-cover w-full" alt="current hero" />
            )}
            <Input type="file" accept="image/*" onChange={(e) => setData("hero_image", e.target.files?.[0] || null)} />
            <p className="text-xs text-muted-foreground">Current: {settings.hero_image ?? "osaka.jpg (default)"}</p>
          </div>
        </div>
      )}

      {/* ── CORPORATE INFO ───────────────────────────────── */}
      {activeTab === "corporate" && (
        <div className="space-y-5 max-w-2xl">
          <Field label="Section Heading" value={data[activeLang === "en" ? "corp_heading" : "corp_heading_ja"]} onChange={(v) => set(activeLang === "en" ? "corp_heading" : "corp_heading_ja", v)} lang={activeLang} />
          <Field label="Paragraph 1"     value={data[activeLang === "en" ? "corp_para1"   : "corp_para1_ja"]}   onChange={(v) => set(activeLang === "en" ? "corp_para1"   : "corp_para1_ja",   v)} lang={activeLang} textarea />
          <Field label="Paragraph 2"     value={data[activeLang === "en" ? "corp_para2"   : "corp_para2_ja"]}   onChange={(v) => set(activeLang === "en" ? "corp_para2"   : "corp_para2_ja",   v)} lang={activeLang} textarea />
        </div>
      )}

      {/* ── STATS ────────────────────────────────────────── */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatGroup num={1} label="Stat Box 1 (e.g. Years)"      lang={activeLang} data={data} setData={set} />
          <StatGroup num={2} label="Stat Box 2 (e.g. Customers)"  lang={activeLang} data={data} setData={set} />
          <StatGroup num={3} label="Stat Box 3 (e.g. IT Experts)" lang={activeLang} data={data} setData={set} />
          <StatGroup num={4} label="Stat Box 4 (e.g. Industries)" lang={activeLang} data={data} setData={set} />
        </div>
      )}

      {/* ── FEATURE CARDS ────────────────────────────────── */}
      {activeTab === "features" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatGroup num={1} label="Feature Card 1 (Global Reach)"    lang={activeLang} data={data} setData={set} />
          <FeatGroup num={2} label="Feature Card 2 (Expert Team)"     lang={activeLang} data={data} setData={set} />
          <FeatGroup num={3} label="Feature Card 3 (Quality Focus)"   lang={activeLang} data={data} setData={set} />
          <FeatGroup num={4} label="Feature Card 4 (Growth Partner)"  lang={activeLang} data={data} setData={set} />
        </div>
      )}

      {/* ── SECTION INTROS ───────────────────────────────── */}
      {activeTab === "sections" && (
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-3">
            <h3 className="font-semibold text-base border-b pb-2">Services Section</h3>
            <Field label="Intro text" value={data[activeLang === "en" ? "services_intro" : "services_intro_ja"]} onChange={(v) => set(activeLang === "en" ? "services_intro" : "services_intro_ja", v)} lang={activeLang} textarea />
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-base border-b pb-2">Solutions Section</h3>
            <Field label="Intro text" value={data[activeLang === "en" ? "solutions_intro" : "solutions_intro_ja"]} onChange={(v) => set(activeLang === "en" ? "solutions_intro" : "solutions_intro_ja", v)} lang={activeLang} textarea />
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-base border-b pb-2">Information / Updates Section</h3>
            <Field label="Intro text" value={data[activeLang === "en" ? "updates_intro" : "updates_intro_ja"]} onChange={(v) => set(activeLang === "en" ? "updates_intro" : "updates_intro_ja", v)} lang={activeLang} textarea />
          </div>
        </div>
      )}

      {/* Bottom save bar */}
      <div className="mt-10 pt-6 border-t flex justify-end">
        <Button onClick={save} disabled={processing} size="lg">
          {processing ? "Saving…" : "Save All Changes"}
        </Button>
      </div>

    </Authenticated>
  );
}