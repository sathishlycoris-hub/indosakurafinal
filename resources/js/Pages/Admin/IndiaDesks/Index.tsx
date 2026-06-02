import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Pencil, Trash2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */

interface Highlight { value: string; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Benefit { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface IndiaDeskItem { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface WhyChooseItem { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ApproachStep { step_number?: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Testimonial { quote: string; quote_ja?: string; author?: string; }
interface TechStack { category: string; category_ja?: string; items: string; }
interface PageFaq { question: string; question_ja?: string; answer: string; answer_ja?: string; }
interface PageIndustry { title: string; title_ja?: string; description?: string; description_ja?: string; }

/*
 * KEY EXPLANATION — two different key formats exist:
 *
 * 1. JSON columns on the services row (cast as array in the model):
 *    service_items, why_choose, approach_steps, testimonials, tech_stack
 *    Laravel serialises these as-is using their column name (snake_case).
 *    So the JSON prop is  s.service_items, s.why_choose, etc.
 *
 * 2. Eloquent relations defined on the Service model:
 *    highlights()     → serialised as  s.highlights        (matches relation snake_case)
 *    benefits()       → serialised as  s.benefits
 *    pageFaqs()       → serialised as  s.page_faqs         ← NOT s.pageFaqs!
 *    pageIndustries() → serialised as  s.page_industries   ← NOT s.pageIndustries!
 *
 * Laravel converts camelCase relation method names to snake_case when
 * serialising to JSON. This is the root cause of the edit prefill bug.
 */
interface IndiaDesk {
  id: number;
  title: string; title_ja?: string;
  slug: string;
  subtitle?: string; subtitle_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  hero_image?: string | null;
  supporting_growth?: string; supporting_growth_ja?: string;
  about?: string; about_ja?: string;
  about_indosakura?: string; about_indosakura_ja?: string;
  overview?: string; overview_ja?: string;
  cta_label?: string; cta_label_ja?: string; cta_url?: string;

  /* relation-backed (Eloquent hasMany, snake_case in JSON) */
  highlights: Highlight[];
  benefits: Benefit[];
  page_faqs: PageFaq[];           // ← snake_case: pageFaqs() relation → page_faqs
  page_industries: PageIndustry[]; // ← snake_case: pageIndustries() relation → page_industries

  /* JSON columns on the row (snake_case column names) */
  service_items: IndiaDeskItem[];
  why_choose: WhyChooseItem[];
  /* approach_steps: ApproachStep[];
  testimonials: Testimonial[];
  tech_stack: TechStack[]; */
}

/* ═══════════════════════════════════════
   STRIP HELPERS
   Relations include DB-only fields (id, service_id, sort_order…)
   that the form doesn't need. Strip them to clean form state.
═══════════════════════════════════════ */

const toHighlight = (r: any): Highlight => ({
  value: r.value ?? "",
  title: r.title ?? "",
  title_ja: r.title_ja ?? "",
  description: r.description ?? "",
  description_ja: r.description_ja ?? "",
});

const toBenefit = (r: any): Benefit => ({
  title: r.title ?? "",
  title_ja: r.title_ja ?? "",
  description: r.description ?? "",
  description_ja: r.description_ja ?? "",
});

const toPageFaq = (r: any): PageFaq => ({
  question: r.question ?? "",
  question_ja: r.question_ja ?? "",
  answer: r.answer ?? "",
  answer_ja: r.answer_ja ?? "",
});

const toPageIndustry = (r: any): PageIndustry => ({
  title: r.title ?? "",
  title_ja: r.title_ja ?? "",
  description: r.description ?? "",
  description_ja: r.description_ja ?? "",
});

/* JSON column rows already have the right shape — just normalize nulls */
const toServiceItem = (r: any): IndiaDeskItem => ({ title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toWhyChooseItem = (r: any): WhyChooseItem => ({ title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toApproachStep = (r: any): ApproachStep => ({ step_number: r.step_number ?? undefined, title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toTestimonial = (r: any): Testimonial => ({ quote: r.quote ?? "", quote_ja: r.quote_ja ?? "", author: r.author ?? "" });
const toTechStack = (r: any): TechStack => ({ category: r.category ?? "", category_ja: r.category_ja ?? "", items: r.items ?? "" });

const slugify = (text: string) =>
  text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */

export default function Index({ india_desks }: { india_desks: IndiaDesk[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<IndiaDesk | null>(null);
  const [open, setOpen] = useState(false);
  const [langTab, setLangTab] = useState<"en" | "ja">("en");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data, setData, reset, processing } = useForm({
    title: "", title_ja: "",
    slug: "",
    subtitle: "", subtitle_ja: "",
    hero_description: "", hero_description_ja: "",
    supporting_growth: "", supporting_growth_ja: "",
    about: "", about_ja: "",
    about_indosakura: "", about_indosakura_ja: "",
    overview: "", overview_ja: "",
    cta_label: "", cta_label_ja: "",
    cta_url: "/contact",
    hero_image: null as File | null,
    highlights: [] as Highlight[],
    benefits: [] as Benefit[],
    service_items: [] as IndiaDeskItem[],
    why_choose: [] as WhyChooseItem[],
    /* approach_steps: [] as ApproachStep[],
    testimonials: [] as Testimonial[],
    tech_stack: [] as TechStack[], */
    page_faqs: [] as PageFaq[],
    page_industries: [] as PageIndustry[],
  });

  /* ── open helpers ── */
  const openAdd = () => {
    reset(); setFormErrors({});
    setMode("add"); setCurrent(null); setLangTab("en"); setOpen(true);
  };

  const openEdit = (s: IndiaDesk) => {
    setMode("edit"); setCurrent(s); setLangTab("en"); setFormErrors({});

    setData({
      /* plain string fields */
      title: s.title ?? "",
      title_ja: s.title_ja ?? "",
      slug: s.slug ?? "",
      subtitle: s.subtitle ?? "",
      subtitle_ja: s.subtitle_ja ?? "",
      hero_description: s.hero_description ?? "",
      hero_description_ja: s.hero_description_ja ?? "",
      supporting_growth: s.supporting_growth ?? "",
      supporting_growth_ja: s.supporting_growth_ja ?? "",
      about: s.about ?? "",
      about_ja: s.about_ja ?? "",
      about_indosakura: s.about_indosakura ?? "",
      about_indosakura_ja: s.about_indosakura_ja ?? "",
      overview: s.overview ?? "",
      overview_ja: s.overview_ja ?? "",
      cta_label: s.cta_label ?? "",
      cta_label_ja: s.cta_label_ja ?? "",
      cta_url: s.cta_url ?? "/contact",
      hero_image: null,

      /*
       * RELATION fields — Laravel serialises relation methods to snake_case.
       * pageFaqs()      → s.page_faqs       (NOT s.pageFaqs)
       * pageIndustries() → s.page_industries (NOT s.pageIndustries)
       * highlights()    → s.highlights      (already snake_case)
       * benefits()      → s.benefits        (already snake_case)
       *
       * Strip DB-only fields (id, service_id, sort_order…) using helpers.
       */
      highlights: Array.isArray(s.highlights) ? s.highlights.map(toHighlight) : [],
      benefits: Array.isArray(s.benefits) ? s.benefits.map(toBenefit) : [],
      page_faqs: Array.isArray(s.page_faqs) ? s.page_faqs.map(toPageFaq) : [],
      page_industries: Array.isArray(s.page_industries) ? s.page_industries.map(toPageIndustry) : [],

      /*
       * JSON column fields — stored as JSON on the services row.
       * These are cast as arrays by Laravel's $casts, so they come
       * through as plain arrays already. Still normalise with helpers.
       */
      service_items: Array.isArray(s.service_items) ? s.service_items.map(toServiceItem) : [],
      why_choose: Array.isArray(s.why_choose) ? s.why_choose.map(toWhyChooseItem) : [],
      /* approach_steps: Array.isArray(s.approach_steps) ? s.approach_steps.map(toApproachStep) : [],
      testimonials: Array.isArray(s.testimonials) ? s.testimonials.map(toTestimonial) : [],
      tech_stack: Array.isArray(s.tech_stack) ? s.tech_stack.map(toTechStack) : [], */
    });

    setOpen(true);
  };

  const openView = (s: IndiaDesk) => { setCurrent(s); setMode("view"); setOpen(true); };

  /* ── slug auto-fill ── */
  const handleTitleChange = (val: string) => {
    setData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug === "" ? slugify(val) : prev.slug,
    }));
    if (formErrors.title) setFormErrors(e => ({ ...e, title: "" }));
  };

  /* ── validation ── */
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!data.title.trim()) errors.title = "Title is required.";
    if (!data.slug.trim()) errors.slug = "Slug is required (used in the URL).";
    setFormErrors(errors);
    if (Object.keys(errors).length) setLangTab("en");
    return Object.keys(errors).length === 0;
  };

  /* ── submit ── */
  const submit = () => {
    if (!validate()) return;

    const form = new FormData();
    const app = (k: string, v: string) => form.append(k, v ?? "");

    app("title", data.title);
    app("title_ja", data.title_ja);
    app("slug", data.slug.trim());
    app("subtitle", data.subtitle);
    app("subtitle_ja", data.subtitle_ja);
    app("hero_description", data.hero_description);
    app("hero_description_ja", data.hero_description_ja);
    app("supporting_growth", data.supporting_growth);
    app("supporting_growth_ja", data.supporting_growth_ja);
    app("about", data.about);
    app("about_ja", data.about_ja);
    app("about_indosakura", data.about_indosakura);
    app("about_indosakura_ja", data.about_indosakura_ja);
    app("overview", data.overview);
    app("overview_ja", data.overview_ja);
    app("cta_label", data.cta_label);
    app("cta_label_ja", data.cta_label_ja);
    app("cta_url", data.cta_url);

    if (data.hero_image) form.append("hero_image", data.hero_image);

    // Arrays — the controller receives these as JSON strings
    /*  (["highlights", "benefits", "service_items", "why_choose", "approach_steps",
       "testimonials", "tech_stack", "page_faqs", "page_industries"] as const)
       .forEach(k => form.append(k, JSON.stringify(data[k]))); */
    (["highlights", "benefits", "service_items", "why_choose", "page_faqs", "page_industries"] as const)
      .forEach(k => form.append(k, JSON.stringify(data[k])));

    const opts = { onSuccess: () => { reset(); setFormErrors({}); setOpen(false); } };

    if (mode === "edit" && current) {
      form.append("_method", "PUT");
      router.post(route("admin.india_desks.update", current.id), form, opts);
    } else {
      router.post(route("admin.india_desks.store"), form, opts);
    }
  };

  /* ── delete ── */
  const deleteItem = (id: number) => {
    if (!confirm("Delete this India Desk? This cannot be undone.")) return;
    router.delete(route("admin.india_desks.destroy", id), {
      preserveScroll: true,
      onSuccess: () => { setOpen(false); setCurrent(null); },
    });
  };

  /* ── array helpers ── */
  const addItem = (k: keyof typeof data, item: any) => setData(k, [...(data[k] as any[]), item]);
  const removeItem = (k: keyof typeof data, i: number) => {
    const a = [...(data[k] as any[])]; a.splice(i, 1); setData(k, a);
  };
  const updateItem = (k: keyof typeof data, i: number, field: string, val: string) => {
    const a = [...(data[k] as any[])]; a[i][field] = val; setData(k, a);
  };

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <Authenticated header={<h2 className="font-bold text-xl">India Desks</h2>}>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">India Desks</h1>
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Add India Desk</Button>
      </div>

      {/* ════════ SHEET ════════ */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" ? "Add India Desk" : mode === "edit" ? "Edit India Desk" : "India Desk Details"}
            </SheetTitle>
          </SheetHeader>

          {/* ── VIEW MODE ── */}
          {mode === "view" && current && (
            <div className="space-y-6 mt-6 text-sm">
              <div>
                <p className="text-xl font-bold">{current.title}</p>
                {current.title_ja && <p className="text-muted-foreground">{current.title_ja}</p>}
                <p className="text-xs text-gray-400 mt-1">/{current.slug}</p>
              </div>
              {current.hero_image && (
                <img src={`/storage/${current.hero_image}`} alt="" className="max-h-48 rounded border object-cover" />
              )}
              <ViewField label="Subtitle" en={current.subtitle} ja={current.subtitle_ja} />
              <ViewField label="Overview" en={current.overview} ja={current.overview_ja} html />
              {current.cta_label && (
                <div>
                  <p className="font-semibold mb-1">CTA</p>
                  <p>{current.cta_label}{current.cta_label_ja ? ` / ${current.cta_label_ja}` : ""} → {current.cta_url}</p>
                </div>
              )}
              <ViewList label="Our Services" items={current.service_items} />
              <ViewList label="Highlights" items={current.highlights} showValue />
              <ViewList label="Benefits" items={current.benefits} />
              <ViewList label="Why Choose Us" items={current.why_choose} />
              {/* <ViewList label="Approach Steps" items={current.approach_steps} showStep />
              <ViewList label="Testimonials" items={current.testimonials} isQuote />
              <ViewList label="Tech Stack" items={current.tech_stack} isTech /> */}
              {/* relations come as snake_case in JSON */}
              <ViewList label="Page FAQs" items={current.page_faqs} isFaq />
              <ViewList label="Page Industries" items={current.page_industries} />
            </div>
          )}

          {/* ── ADD / EDIT MODE ── */}
          {mode !== "view" && (
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
                  <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">English</TabsTrigger>
                  <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">Japanese</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
                  <Field label="Title (EN) *" error={formErrors.title}>
                    <Input value={data.title} onChange={e => handleTitleChange(e.target.value)}
                      placeholder="India Business Services for Japanese Enterprises"
                      className={formErrors.title ? "border-destructive" : ""} />
                  </Field>

                  <Field label="Slug *" error={formErrors.slug} hint="Auto-filled from title. Used in the URL.">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">/services/</span>
                      <Input value={data.slug} onChange={e => { setData("slug", e.target.value); if (formErrors.slug) setFormErrors(er => ({ ...er, slug: "" })); }}
                        placeholder="india-desk" className={`flex-1 ${formErrors.slug ? "border-destructive" : ""}`} />
                      {data.title && !data.slug && (
                        <Button type="button" variant="outline" size="sm"
                          onClick={() => setData("slug", slugify(data.title))}>
                          Auto-fill
                        </Button>
                      )}
                    </div>
                  </Field>

                  <Field label="Subtitle (EN)">
                    <Input value={data.subtitle} onChange={e => setData("subtitle", e.target.value)}
                      placeholder="Bridging Japan and India Through Business, Technology, and Talent" />
                  </Field>
                  <Field label="Overview (EN)">
                    <ReactQuill value={data.overview} onChange={v => setData("overview", v)} />
                  </Field>
                  <Field label="Supporting Japanese Business Growth in India (EN)">
                    <ReactQuill value={data.supporting_growth} onChange={v => setData("supporting_growth", v)} />
                  </Field>
                  <Field label="About Indosakura (EN)">
                    <ReactQuill value={data.about_indosakura} onChange={v => setData("about_indosakura", v)} />
                  </Field>
                  <Field label="India Desk (EN)">
                    <ReactQuill value={data.about} onChange={v => setData("about", v)} />
                  </Field>
                </TabsContent>

                <TabsContent value="ja" className="space-y-4">
                  <Field label="Title (JA)">
                    <Input value={data.title_ja} onChange={e => setData("title_ja", e.target.value)} />
                  </Field>
                  <Field label="Subtitle (JA)">
                    <Input value={data.subtitle_ja} onChange={e => setData("subtitle_ja", e.target.value)} />
                  </Field>
                  <Field label="Overview (JA)">
                    <ReactQuill value={data.overview_ja} onChange={v => setData("overview_ja", v)} />
                  </Field>
                  <Field label="Supporting Japanese Business Growth (JA)">
                    <ReactQuill value={data.supporting_growth_ja} onChange={v => setData("supporting_growth_ja", v)} />
                  </Field>
                  <Field label="About Indosakura (JA)">
                    <ReactQuill value={data.about_indosakura_ja} onChange={v => setData("about_indosakura_ja", v)} />
                  </Field>
                  <Field label="India Desk (JA)">
                    <ReactQuill value={data.about_ja} onChange={v => setData("about_ja", v)} />
                  </Field>
                </TabsContent>
              </Tabs>

              {/* Hero Image */}
              <SectionBox title="Hero Image">
                {mode === "edit" && current?.hero_image && (
                  <div className="mb-2">
                    <p className="text-xs text-muted-foreground mb-1">Current:</p>
                    <img src={`/storage/${current.hero_image}`} alt="" className="h-28 rounded border object-cover" />
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={e => setData("hero_image", e.target.files?.[0] || null)} />
                <p className="text-xs text-muted-foreground mt-1">Max 4 MB · Recommended 1200×600 px</p>
              </SectionBox>

              {/* CTA */}
              <SectionBox title="CTA Button">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Label (EN)">
                    <Input value={data.cta_label} onChange={e => setData("cta_label", e.target.value)} placeholder="Contact India Desk" />
                  </Field>
                  <Field label="Label (JA)">
                    <Input value={data.cta_label_ja} onChange={e => setData("cta_label_ja", e.target.value)} placeholder="インドデスクに連絡" />
                  </Field>
                </div>
                <Field label="URL">
                  <Input value={data.cta_url} onChange={e => setData("cta_url", e.target.value)} placeholder="/contact" />
                </Field>
              </SectionBox>

              {/* Our Services */}
              <SectionBlock title="Our Services List" hint="Icon cards — Enterprise AI Copilots, Generative AI…"
                items={data.service_items}
                onAdd={() => addItem("service_items", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("service_items", i)}
                render={(item, i) => <BilingualTitleDesc item={item} index={i} field="service_items" updateItem={updateItem} />}
              />

              {/* Highlights */}
              <SectionBlock title="Key Highlights" hint="Presence in India and Japan, 20 Years Experience, etc."
                items={data.highlights}
                onAdd={() => addItem("highlights", { value: "", title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("highlights", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Stat value">
                        <Input value={item.value} placeholder="20+" onChange={e => updateItem("highlights", i, "value", e.target.value)} />
                      </Field>
                      <Field label="Title (EN)">
                        <Input value={item.title} placeholder="Years of Experience" onChange={e => updateItem("highlights", i, "title", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Title (JA)">
                      <Input value={item.title_ja || ""} onChange={e => updateItem("highlights", i, "title_ja", e.target.value)} />
                    </Field>
                    <Field label="Description (EN)">
                      <ReactQuill theme="snow" value={item.description || ""} onChange={v => updateItem("highlights", i, "description", v)} />
                    </Field>
                    <Field label="Description (JA)">
                      <ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => updateItem("highlights", i, "description_ja", v)} />
                    </Field>
                  </div>
                )}
              />

              {/* Benefits */}
              <SectionBlock title="Benefits" hint="Icon cards in the Benefits section"
                items={data.benefits}
                onAdd={() => addItem("benefits", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("benefits", i)}
                render={(item, i) => <BilingualTitleDesc item={item} index={i} field="benefits" updateItem={updateItem} />}
              />

              {/* Why Choose Us */}
              <SectionBlock title="Why Choose Indo-Sakura" hint="e.g. Proven AI Expertise, Custom AI Solutions…"
                items={data.why_choose}
                onAdd={() => addItem("why_choose", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("why_choose", i)}
                render={(item, i) => <BilingualTitleDesc item={item} index={i} field="why_choose" updateItem={updateItem} />}
              />

              {/* Approach Steps */}
              {/*  <SectionBlock title="Development Approach Steps" hint="1. AI Strategy & Consulting…"
                items={data.approach_steps}
                onAdd={() => addItem("approach_steps", { step_number: data.approach_steps.length + 1, title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("approach_steps", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <Field label="Step #">
                        <Input type="number" value={item.step_number ?? i + 1} onChange={e => updateItem("approach_steps", i, "step_number", e.target.value)} />
                      </Field>
                      <div className="col-span-2">
                        <Field label="Title (EN)">
                          <Input value={item.title} placeholder="AI Strategy & Consulting" onChange={e => updateItem("approach_steps", i, "title", e.target.value)} />
                        </Field>
                      </div>
                    </div>
                    <Field label="Title (JA)">
                      <Input value={item.title_ja || ""} onChange={e => updateItem("approach_steps", i, "title_ja", e.target.value)} />
                    </Field>
                    <Field label="Description (EN)">
                      <ReactQuill theme="snow" value={item.description || ""} onChange={v => updateItem("approach_steps", i, "description", v)} />
                    </Field>
                    <Field label="Description (JA)">
                      <ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => updateItem("approach_steps", i, "description_ja", v)} />
                    </Field>
                  </div>
                )}
              /> */}

              {/* Tech Stack */}
              {/* <SectionBlock title="Technology Stack" hint="e.g. AI/ML Frameworks: TensorFlow, PyTorch"
                items={data.tech_stack}
                onAdd={() => addItem("tech_stack", { category: "", category_ja: "", items: "" })}
                onRemove={i => removeItem("tech_stack", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Category (EN)">
                        <Input value={item.category} placeholder="AI/ML Frameworks" onChange={e => updateItem("tech_stack", i, "category", e.target.value)} />
                      </Field>
                      <Field label="Category (JA)">
                        <Input value={item.category_ja || ""} onChange={e => updateItem("tech_stack", i, "category_ja", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Items (comma-separated)">
                      <Input value={item.items} placeholder="TensorFlow, PyTorch, Scikit-learn" onChange={e => updateItem("tech_stack", i, "items", e.target.value)} />
                    </Field>
                  </div>
                )}
              /> */}

              {/* Testimonials */}
              {/* <SectionBlock title="Testimonials" hint="Client quotes"
                items={data.testimonials}
                onAdd={() => addItem("testimonials", { quote: "", quote_ja: "", author: "" })}
                onRemove={i => removeItem("testimonials", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Field label="Author / Company">
                      <Input value={item.author || ""} placeholder="Jane Doe, Acme Corp" onChange={e => updateItem("testimonials", i, "author", e.target.value)} />
                    </Field>
                    <Field label="Quote (EN)">
                      <textarea rows={3} value={item.quote} onChange={e => updateItem("testimonials", i, "quote", e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                    </Field>
                    <Field label="Quote (JA)">
                      <textarea rows={3} value={item.quote_ja || ""} onChange={e => updateItem("testimonials", i, "quote_ja", e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                    </Field>
                  </div>
                )}
              /> */}

              {/* Per-service Industries */}
              <SectionBlock
                title="Industries We Serve (per-service)"
                hint="Leave empty → falls back to global Industries panel"
                items={data.page_industries}
                onAdd={() => addItem("page_industries", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("page_industries", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Title (EN)">
                        <Input value={item.title} placeholder="Manufacturing" onChange={e => updateItem("page_industries", i, "title", e.target.value)} />
                      </Field>
                      <Field label="Title (JA)">
                        <Input value={item.title_ja || ""} onChange={e => updateItem("page_industries", i, "title_ja", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Description (EN)">
                      <Input value={item.description || ""} onChange={e => updateItem("page_industries", i, "description", e.target.value)} />
                    </Field>
                    <Field label="Description (JA)">
                      <Input value={item.description_ja || ""} onChange={e => updateItem("page_industries", i, "description_ja", e.target.value)} />
                    </Field>
                  </div>
                )}
              />

              {/* Per-service FAQs */}
              <SectionBlock
                title="FAQs (per-service)"
                hint="Leave empty → falls back to global FAQ panel"
                items={data.page_faqs}
                onAdd={() => addItem("page_faqs", { question: "", question_ja: "", answer: "", answer_ja: "" })}
                onRemove={i => removeItem("page_faqs", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Question (EN)">
                        <Input value={item.question} placeholder="What is a Mini GCC?" onChange={e => updateItem("page_faqs", i, "question", e.target.value)} />
                      </Field>
                      <Field label="Question (JA)">
                        <Input value={item.question_ja || ""} placeholder="ミニGCCとは何ですか？" onChange={e => updateItem("page_faqs", i, "question_ja", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Answer (EN)">
                      <ReactQuill theme="snow" value={item.answer || ""} onChange={v => updateItem("page_faqs", i, "answer", v)} />
                    </Field>
                    <Field label="Answer (JA)">
                      <ReactQuill theme="snow" value={item.answer_ja || ""} onChange={v => updateItem("page_faqs", i, "answer_ja", v)} />
                    </Field>
                  </div>
                )}
              />

              <Button disabled={processing} className="w-full mt-4" onClick={submit}>
                {mode === "edit" ? "Update India Desk" : "Save India Desk"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ════════ TABLE ════════ */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Slug</TableHead>
            <TableHead className="text-white">FAQs</TableHead>
            <TableHead className="text-white">Industries</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {india_desks.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="font-medium">{s.title}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{s.slug}</TableCell>
              <TableCell>
                {(s.page_faqs?.length ?? 0) > 0
                  ? <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.page_faqs.length} custom</span>
                  : <span className="text-xs text-muted-foreground">Global</span>}
              </TableCell>
              <TableCell>
                {(s.page_industries?.length ?? 0) > 0
                  ? <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.page_industries.length} custom</span>
                  : <span className="text-xs text-muted-foreground">Global</span>}
              </TableCell>
              <TableCell className="space-x-2">
                <Button size="icon" variant="ghost" onClick={() => openView(s)}><Eye className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="destructive" onClick={() => deleteItem(s.id)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authenticated>
  );
}

/* ═══════════════════ HELPER COMPONENTS ═══════════════════ */

function Field({ label, children, error, hint }: {
  label: string; children: React.ReactNode; error?: string; hint?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>{label}</Label>
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

function SectionBlock({ title, hint, items, onAdd, onRemove, render }: {
  title: string; hint?: string; items: any[];
  onAdd: () => void; onRemove: (i: number) => void;
  render: (item: any, i: number) => JSX.Element;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="border rounded-xl bg-muted/20 overflow-hidden">
      <button type="button" onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/40 transition-colors">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{title}</span>
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{items.length}</span>
        </div>
        {collapsed ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronUp className="w-4 h-4 flex-shrink-0" />}
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

function BilingualTitleDesc({ item, index, field, updateItem }: {
  item: any; index: number; field: string;
  updateItem: (k: any, i: number, f: string, v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Field label="Title (EN)"><Input value={item.title} onChange={e => updateItem(field, index, "title", e.target.value)} /></Field>
        <Field label="Title (JA)"><Input value={item.title_ja || ""} onChange={e => updateItem(field, index, "title_ja", e.target.value)} /></Field>
      </div>
      <Field label="Description (EN)">
        <ReactQuill theme="snow" value={item.description || ""} onChange={v => updateItem(field, index, "description", v)} />
      </Field>
      <Field label="Description (JA)">
        <ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => updateItem(field, index, "description_ja", v)} />
      </Field>
    </div>
  );
}

function ViewField({ label, en, ja, html = false }: { label: string; en?: string; ja?: string; html?: boolean }) {
  if (!en && !ja) return null;
  return (
    <div>
      <p className="font-semibold mb-1">{label}</p>
      {en && (html
        ? <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: en }} />
        : <p className="text-muted-foreground">{en}</p>)}
    </div>
  );
}

function ViewList({ label, items, showValue = false, showStep = false, isQuote = false, isTech = false, isFaq = false }: {
  label: string; items?: any[]; showValue?: boolean; showStep?: boolean;
  isQuote?: boolean; isTech?: boolean; isFaq?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="font-semibold mb-2">{label} <span className="text-xs text-muted-foreground">({items.length})</span></p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="border rounded p-3 text-sm">
            {isFaq
              ? <><p className="font-medium">Q: {item.question}</p><p className="text-muted-foreground mt-1 text-xs">A: {item.answer?.replace(/<[^>]+>/g, "").slice(0, 120)}…</p></>
              : showValue && item.value ? <><span className="text-primary font-bold mr-2">{item.value}</span>{item.title}</>
                : showStep ? <><span className="text-primary font-bold mr-2">Step {item.step_number ?? i + 1}.</span>{item.title}</>
                  : isTech ? <><span className="font-semibold text-primary">{item.category}:</span> {item.items}</>
                    : isQuote ? <><span className="italic">"{item.quote}"</span>{item.author && <span className="ml-2 font-semibold">— {item.author}</span>}</>
                      : <span className="font-medium">{item.title}</span>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}