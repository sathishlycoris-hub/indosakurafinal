import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, ChevronDown, ChevronUp, AlertCircle, Plus } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */

interface BilingualItem {
  title: string;
  title_ja?: string;
  description?: string;
  description_ja?: string;
}

interface IndiaDeskPageData {
  id: number;
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
  hero_description?: string | null;
  hero_description_ja?: string | null;
  hero_image?: string | null;
  highlights?: BilingualItem[];
  supporting_growth?: string | null;
  supporting_growth_ja?: string | null;
  about?: string | null;
  about_ja?: string | null;
  about_indosakura?: string | null;
  about_indosakura_ja?: string | null;
  cta_label?: string | null;
  cta_label_ja?: string | null;
  cta_url?: string | null;
}

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */

export default function Index({
  pageData,
}: {
  pageData: IndiaDeskPageData | null;
}) {
  const [open, setOpen] = useState(false);
  const [langTab, setLangTab] = useState<"en" | "ja">("en");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data, setData, processing } = useForm({
    hero_title: "",
    hero_title_ja: "",
    hero_subtitle: "",
    hero_subtitle_ja: "",
    hero_description: "",
    hero_description_ja: "",
    supporting_growth: "",
    supporting_growth_ja: "",
    about: "",
    about_ja: "",
    about_indosakura: "",
    about_indosakura_ja: "",
    cta_label: "",
    cta_label_ja: "",
    cta_url: "/contact",
    hero_image: null as File | null,
    highlights: [] as BilingualItem[],
  });

  /* ── open helper ── */
  const openEdit = () => {
    setLangTab("en");
    setFormErrors({});

    if (pageData) {
      setData({
        hero_title: pageData.hero_title ?? "",
        hero_title_ja: pageData.hero_title_ja ?? "",
        hero_subtitle: pageData.hero_subtitle ?? "",
        hero_subtitle_ja: pageData.hero_subtitle_ja ?? "",
        hero_description: pageData.hero_description ?? "",
        hero_description_ja: pageData.hero_description_ja ?? "",
        supporting_growth: pageData.supporting_growth ?? "",
        supporting_growth_ja: pageData.supporting_growth_ja ?? "",
        about: pageData.about ?? "",
        about_ja: pageData.about_ja ?? "",
        about_indosakura: pageData.about_indosakura ?? "",
        about_indosakura_ja: pageData.about_indosakura_ja ?? "",
        cta_label: pageData.cta_label ?? "",
        cta_label_ja: pageData.cta_label_ja ?? "",
        cta_url: pageData.cta_url ?? "/contact",
        hero_image: null,
        highlights: Array.isArray(pageData.highlights)
          ? pageData.highlights.map(item => ({ ...item }))
          : [],
      });
    }

    setOpen(true);
  };

  /* ── validation ── */
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!data.hero_title?.trim()) errors.hero_title = "Hero Title is required.";
    setFormErrors(errors);
    if (Object.keys(errors).length) setLangTab("en");
    return Object.keys(errors).length === 0;
  };

  /* ── submit ── */
  const submit = () => {
    if (!validate()) return;

    const form = new FormData();
    const app = (k: string, v: any) => form.append(k, v ?? "");

    app("hero_title", data.hero_title);
    app("hero_title_ja", data.hero_title_ja);
    app("hero_subtitle", data.hero_subtitle);
    app("hero_subtitle_ja", data.hero_subtitle_ja);
    app("hero_description", data.hero_description);
    app("hero_description_ja", data.hero_description_ja);
    app("supporting_growth", data.supporting_growth);
    app("supporting_growth_ja", data.supporting_growth_ja);
    app("about", data.about);
    app("about_ja", data.about_ja);
    app("about_indosakura", data.about_indosakura);
    app("about_indosakura_ja", data.about_indosakura_ja);
    app("cta_label", data.cta_label);
    app("cta_label_ja", data.cta_label_ja);
    app("cta_url", data.cta_url);

    if (data.hero_image) form.append("hero_image", data.hero_image);

    form.append("highlights", JSON.stringify(data.highlights));

    form.append("_method", "PUT");

    router.post(route("admin.india_desks_page.update"), form, {
      onSuccess: () => {
        setFormErrors({});
        setOpen(false);
      },
    });
  };

  /* ── generic array helpers ── */
  const addItem = (k: "highlights") =>
    setData(k, [...data[k], { title: "", title_ja: "", description: "", description_ja: "" }]);

  const updateItem = (k: "highlights", idx: number, field: keyof BilingualItem, value: string) => {
    const arr = [...data[k]];
    (arr[idx] as any)[field] = value;
    setData(k, arr);
  };

  const removeItem = (k: "highlights", idx: number) => {
    const arr = [...data[k]];
    arr.splice(idx, 1);
    setData(k, arr);
  };

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <Authenticated header={<h2 className="font-bold text-xl">India Desk Page</h2>}>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">India Desk Page</h1>
        <Button onClick={openEdit}>
          <Pencil className="w-4 h-4 mr-2" /> Edit Page Configuration
        </Button>
      </div>

      {/* ════════ SHEET ════════ */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit India Desk Page Configuration</SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-6">

            {/* Error banner */}
            {Object.keys(formErrors).length > 0 && (
              <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30
                              text-destructive rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Please fix the following:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {Object.values(formErrors).map((msg, i) => <li key={i}>{msg}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* EN / JA tabs */}
            <Tabs value={langTab} onValueChange={v => setLangTab(v as "en" | "ja")}>
              <TabsList className="mb-2">
                <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  English
                </TabsTrigger>
                <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Japanese
                </TabsTrigger>
              </TabsList>

              {/* ── English Tab ── */}
              <TabsContent value="en" className="space-y-4">
                <Field label="Hero Title (EN) *" error={formErrors.hero_title}>
                  <Input
                    value={data.hero_title}
                    onChange={e => {
                      setData("hero_title", e.target.value);
                      if (formErrors.hero_title) setFormErrors(er => ({ ...er, hero_title: "" }));
                    }}
                    placeholder="India Desk — Bridging Japan and India"
                    className={formErrors.hero_title ? "border-destructive" : ""}
                  />
                </Field>

                <Field label="Hero Subtitle (EN)">
                  <Input
                    value={data.hero_subtitle}
                    onChange={e => setData("hero_subtitle", e.target.value)}
                    placeholder="Bridging Japan and India Through Business, Technology, and Talent"
                  />
                </Field>

                <Field label="Hero Description (EN)">
                  <Input
                    value={data.hero_description}
                    onChange={e => setData("hero_description", e.target.value)}
                    placeholder="Short description for the hero section"
                  />
                </Field>

                <Field label="Supporting Japanese Business Growth in India (EN)">
                  <ReactQuill
                    value={data.supporting_growth}
                    onChange={v => setData("supporting_growth", v)}
                  />
                </Field>

                <Field label="About Indosakura (EN)">
                  <ReactQuill
                    value={data.about_indosakura}
                    onChange={v => setData("about_indosakura", v)}
                  />
                </Field>

                <Field label="About India Desk (EN)">
                  <ReactQuill
                    value={data.about}
                    onChange={v => setData("about", v)}
                  />
                </Field>
              </TabsContent>

              {/* ── Japanese Tab ── */}
              <TabsContent value="ja" className="space-y-4">
                <Field label="Hero Title (JA)">
                  <Input
                    value={data.hero_title_ja}
                    onChange={e => setData("hero_title_ja", e.target.value)}
                  />
                </Field>

                <Field label="Hero Subtitle (JA)">
                  <Input
                    value={data.hero_subtitle_ja}
                    onChange={e => setData("hero_subtitle_ja", e.target.value)}
                  />
                </Field>

                <Field label="Hero Description (JA)">
                  <Input
                    value={data.hero_description_ja}
                    onChange={e => setData("hero_description_ja", e.target.value)}
                  />
                </Field>

                <Field label="Supporting Japanese Business Growth in India (JA)">
                  <ReactQuill
                    value={data.supporting_growth_ja}
                    onChange={v => setData("supporting_growth_ja", v)}
                  />
                </Field>

                <Field label="About Indosakura (JA)">
                  <ReactQuill
                    value={data.about_indosakura_ja}
                    onChange={v => setData("about_indosakura_ja", v)}
                  />
                </Field>

                <Field label="About India Desk (JA)">
                  <ReactQuill
                    value={data.about_ja}
                    onChange={v => setData("about_ja", v)}
                  />
                </Field>
              </TabsContent>
            </Tabs>

            {/* Hero Image */}
            <SectionBox title="Hero Image">
              {pageData?.hero_image && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">Current:</p>
                  <img
                    src={`/storage/${pageData.hero_image}`}
                    alt=""
                    className="h-28 rounded border object-cover"
                  />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={e => setData("hero_image", e.target.files?.[0] || null)}
              />
              <p className="text-xs text-muted-foreground mt-1">Max 4 MB · Recommended 1200×600 px</p>
            </SectionBox>

            {/* CTA */}
            <SectionBox title="CTA Button">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Label (EN)">
                  <Input
                    value={data.cta_label}
                    onChange={e => setData("cta_label", e.target.value)}
                    placeholder="Contact India Desk"
                  />
                </Field>
                <Field label="Label (JA)">
                  <Input
                    value={data.cta_label_ja}
                    onChange={e => setData("cta_label_ja", e.target.value)}
                    placeholder="インドデスクに連絡"
                  />
                </Field>
              </div>
              <Field label="URL">
                <Input
                  value={data.cta_url}
                  onChange={e => setData("cta_url", e.target.value)}
                  placeholder="/contact"
                />
              </Field>
            </SectionBox>

            {/* Highlights */}
            <SectionBlock
              title="Highlights"
              hint="e.g. 20+ Years Experience, Presence in India and Japan"
              items={data.highlights}
              onAdd={() => addItem("highlights")}
              onRemove={i => removeItem("highlights", i)}
              render={(item: BilingualItem, i: number) => (
                <BilingualTitleDesc
                  item={item}
                  index={i}
                  updateItem={(idx, field, val) => updateItem("highlights", idx, field, val)}
                />
              )}
            />

            {/* Service Items */}
            {/* <SectionBlock
              title="Service Items"
              hint="Icon cards — Enterprise AI Copilots, Generative AI…"
              items={data.service_items}
              onAdd={() => addItem("service_items")}
              onRemove={i => removeItem("service_items", i)}
              render={(item: BilingualItem, i: number) => (
                <BilingualTitleDesc
                  item={item}
                  index={i}
                  updateItem={(idx, field, val) => updateItem("service_items", idx, field, val)}
                />
              )}
            /> */}

            <Button disabled={processing} className="w-full mt-4" onClick={submit}>
              Save Page Configuration
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ════════ PREVIEW CARD ════════ */}
      {pageData && (
        <div className="mt-6 border rounded-xl p-6 bg-card space-y-3 text-sm">
          <p className="text-lg font-bold">
            {pageData.hero_title || <span className="text-muted-foreground italic">No title set</span>}
          </p>
          {pageData.hero_title_ja && <p className="text-muted-foreground">{pageData.hero_title_ja}</p>}
          {pageData.hero_subtitle && <p className="text-muted-foreground text-xs">{pageData.hero_subtitle}</p>}
          {pageData.hero_image && (
            <img
              src={`/storage/${pageData.hero_image}`}
              alt=""
              className="max-h-48 rounded border object-cover mt-2"
            />
          )}
          <div className="flex gap-6 pt-2 text-xs text-muted-foreground">
            <span>Highlights: <strong>{pageData.highlights?.length ?? 0}</strong></span>
          </div>
        </div>
      )}
    </Authenticated>
  );
}

/* ═══════════════════ HELPER COMPONENTS ═══════════════════ */

function Field({
  label,
  children,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>
        {label}
      </Label>
      {hint && <p className="text-xs text-muted-foreground/70 -mt-0.5">{hint}</p>}
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function SectionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl p-4 space-y-3 bg-muted/20">
      <p className="font-semibold text-sm">{title}</p>
      {children}
    </div>
  );
}

function SectionBlock({
  title,
  hint,
  items,
  onAdd,
  onRemove,
  render,
}: {
  title: string;
  hint?: string;
  items: any[];
  onAdd: () => void;
  onRemove: (i: number) => void;
  render: (item: any, i: number) => JSX.Element;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="border rounded-xl bg-muted/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{title}</span>
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {items.length}
          </span>
        </div>
        {collapsed
          ? <ChevronDown className="w-4 h-4 flex-shrink-0" />
          : <ChevronUp className="w-4 h-4 flex-shrink-0" />}
      </button>
      {!collapsed && (
        <div className="px-4 pb-4 space-y-4">
          {items.map((item, i) => (
            <div key={i} className="border border-dashed rounded-lg p-4 space-y-3 bg-background">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">#{i + 1}</span>
                <Button variant="destructive" size="sm" onClick={() => onRemove(i)}>Remove</Button>
              </div>
              {render(item, i)}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={onAdd}>
            <Plus className="w-3 h-3 mr-1" /> Add {title.split(" ")[0]}
          </Button>
        </div>
      )}
    </div>
  );
}

function BilingualTitleDesc({
  item,
  index,
  updateItem,
}: {
  item: BilingualItem;
  index: number;
  updateItem: (i: number, f: keyof BilingualItem, v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Field label="Title (EN)">
          <Input value={item.title} onChange={e => updateItem(index, "title", e.target.value)} />
        </Field>
        <Field label="Title (JA)">
          <Input value={item.title_ja || ""} onChange={e => updateItem(index, "title_ja", e.target.value)} />
        </Field>
      </div>
      <Field label="Description (EN)">
        <ReactQuill
          theme="snow"
          value={item.description || ""}
          onChange={v => updateItem(index, "description", v)}
        />
      </Field>
      <Field label="Description (JA)">
        <ReactQuill
          theme="snow"
          value={item.description_ja || ""}
          onChange={v => updateItem(index, "description_ja", v)}
        />
      </Field>
    </div>
  );
}