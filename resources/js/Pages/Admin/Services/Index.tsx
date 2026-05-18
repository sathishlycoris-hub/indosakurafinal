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

/* ═══════════════════ TYPES ═══════════════════ */

interface Highlight     { value: string; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Benefit       { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ServiceItem   { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface WhyChooseItem { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface ApproachStep  { step_number?: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Testimonial   { quote: string; quote_ja?: string; author?: string; }
interface TechStack     { category: string; category_ja?: string; items: string; }
interface PageFaq       { question: string; question_ja?: string; answer: string; answer_ja?: string; }
interface PageIndustry  { title: string; title_ja?: string; description?: string; description_ja?: string; }

interface Service {
  id: number;
  title: string; title_ja?: string;
  slug: string;
  subtitle?: string; subtitle_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  hero_image?: string | null;
  how_it_works?: string; how_it_works_ja?: string;
  overview?: string; overview_ja?: string;
  cta_label?: string; cta_label_ja?: string; cta_url?: string;
  highlights: Highlight[];
  benefits: Benefit[];
  service_items?: ServiceItem[];
  why_choose?: WhyChooseItem[];
  approach_steps?: ApproachStep[];
  testimonials?: Testimonial[];
  tech_stack?: TechStack[];
  /* Eloquent relations — objects with extra DB fields (id, service_id, sort_order…) */
  pageFaqs?: any[];
  pageIndustries?: any[];
}

/* ═══════════════════════════════════════════════
   HELPERS — strip DB-only keys so the form only
   keeps the fields it cares about
═══════════════════════════════════════════════ */

/** Pick only the form-relevant keys from a pageFaqs row */
const toPageFaq = (row: any): PageFaq => ({
  question:    row.question    ?? "",
  question_ja: row.question_ja ?? "",
  answer:      row.answer      ?? "",
  answer_ja:   row.answer_ja   ?? "",
});

/** Pick only the form-relevant keys from a pageIndustries row */
const toPageIndustry = (row: any): PageIndustry => ({
  title:          row.title          ?? "",
  title_ja:       row.title_ja       ?? "",
  description:    row.description    ?? "",
  description_ja: row.description_ja ?? "",
});

/** Auto-generate a slug from the English title */
const slugify = (text: string) =>
  text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ═══════════════════ COMPONENT ═══════════════════ */

export default function Index({ services }: { services: Service[] }) {
  const [mode, setMode]         = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent]   = useState<Service | null>(null);
  const [open, setOpen]         = useState(false);
  const [langTab, setLangTab]   = useState<"en" | "ja">("en");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data, setData, reset, processing } = useForm({
    title: "", title_ja: "",
    slug: "",
    subtitle: "", subtitle_ja: "",
    hero_description: "", hero_description_ja: "",
    how_it_works: "", how_it_works_ja: "",
    overview: "", overview_ja: "",
    cta_label: "", cta_label_ja: "",
    cta_url: "/contact",
    hero_image: null as File | null,
    highlights:      [] as Highlight[],
    benefits:        [] as Benefit[],
    service_items:   [] as ServiceItem[],
    why_choose:      [] as WhyChooseItem[],
    approach_steps:  [] as ApproachStep[],
    testimonials:    [] as Testimonial[],
    tech_stack:      [] as TechStack[],
    page_faqs:       [] as PageFaq[],
    page_industries: [] as PageIndustry[],
  });

  /* ── open helpers ── */
  const openAdd = () => {
    reset();
    setFormErrors({});
    setMode("add"); setCurrent(null); setLangTab("en"); setOpen(true);
  };

  const openEdit = (s: Service) => {
    setMode("edit"); setCurrent(s); setLangTab("en");
    setFormErrors({});

    setData({
      title:              s.title ?? "",
      title_ja:           s.title_ja ?? "",
      slug:               s.slug ?? "",
      subtitle:           s.subtitle ?? "",
      subtitle_ja:        s.subtitle_ja ?? "",
      hero_description:   s.hero_description ?? "",
      hero_description_ja: s.hero_description_ja ?? "",
      how_it_works:       s.how_it_works ?? "",
      how_it_works_ja:    s.how_it_works_ja ?? "",
      overview:           s.overview ?? "",
      overview_ja:        s.overview_ja ?? "",
      cta_label:          s.cta_label ?? "",
      cta_label_ja:       s.cta_label_ja ?? "",
      cta_url:            s.cta_url ?? "/contact",
      hero_image:         null,
      highlights:         Array.isArray(s.highlights)    ? s.highlights    : [],
      benefits:           Array.isArray(s.benefits)      ? s.benefits      : [],
      service_items:      Array.isArray(s.service_items) ? s.service_items : [],
      why_choose:         Array.isArray(s.why_choose)    ? s.why_choose    : [],
      approach_steps:     Array.isArray(s.approach_steps)? s.approach_steps: [],
      testimonials:       Array.isArray(s.testimonials)  ? s.testimonials  : [],
      tech_stack:         Array.isArray(s.tech_stack)    ? s.tech_stack    : [],

      /*
       * FIX: pageFaqs / pageIndustries come from Laravel as Eloquent
       * collection objects containing extra DB fields (id, service_id,
       * sort_order, created_at, updated_at). Strip those down to only
       * the fields the form needs using the helper functions above.
       */
      page_faqs:       Array.isArray(s.pageFaqs)       ? s.pageFaqs.map(toPageFaq)         : [],
      page_industries: Array.isArray(s.pageIndustries) ? s.pageIndustries.map(toPageIndustry) : [],
    });

    setOpen(true);
  };

  const openView = (s: Service) => { setCurrent(s); setMode("view"); setOpen(true); };

  /* ── slug helpers ── */
  const handleTitleChange = (val: string) => {
    setData(prev => ({
      ...prev,
      title: val,
      // Auto-fill slug only when it's empty (don't overwrite a manually set slug)
      slug: prev.slug === "" ? slugify(val) : prev.slug,
    }));
    if (formErrors.title) setFormErrors(e => ({ ...e, title: "" }));
  };

  const handleSlugChange = (val: string) => {
    setData("slug", val);
    if (formErrors.slug) setFormErrors(e => ({ ...e, slug: "" }));
  };

  /* ── frontend validation ── */
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!data.title.trim())   errors.title = "Title is required.";
    if (!data.slug.trim())    errors.slug  = "Slug is required. It will be used in the URL.";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Switch to the English tab so the user can see the errors
      setLangTab("en");
    }
    return Object.keys(errors).length === 0;
  };

  /* ── submit ── */
  const submit = () => {
    if (!validate()) return;

    const form = new FormData();
    const append = (k: string, v: string) => form.append(k, v ?? "");

    append("title",              data.title);
    append("title_ja",           data.title_ja);
    append("slug",               data.slug.trim());
    append("subtitle",           data.subtitle);
    append("subtitle_ja",        data.subtitle_ja);
    append("hero_description",   data.hero_description);
    append("hero_description_ja",data.hero_description_ja);
    append("how_it_works",       data.how_it_works);
    append("how_it_works_ja",    data.how_it_works_ja);
    append("overview",           data.overview);
    append("overview_ja",        data.overview_ja);
    append("cta_label",          data.cta_label);
    append("cta_label_ja",       data.cta_label_ja);
    append("cta_url",            data.cta_url);

    if (data.hero_image) form.append("hero_image", data.hero_image);

    const arrays: (keyof typeof data)[] = [
      "highlights", "benefits", "service_items", "why_choose",
      "approach_steps", "testimonials", "tech_stack",
      "page_faqs", "page_industries",
    ];
    arrays.forEach(k => form.append(k as string, JSON.stringify(data[k])));

    const opts = {
      onSuccess: () => { reset(); setFormErrors({}); setOpen(false); },
    };

    if (mode === "edit" && current) {
      form.append("_method", "PUT");
      router.post(route("admin.services.update", current.id), form, opts);
    } else {
      router.post(route("admin.services.store"), form, opts);
    }
  };

  /* ── delete ── */
  const deleteItem = (id: number) => {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    router.delete(route("admin.services.destroy", id), {
      preserveScroll: true,
      onSuccess: () => { setOpen(false); setCurrent(null); },
    });
  };

  /* ── array helpers ── */
  const addItem    = (k: keyof typeof data, item: any) => setData(k, [...(data[k] as any[]), item]);
  const removeItem = (k: keyof typeof data, i: number) => {
    const a = [...(data[k] as any[])]; a.splice(i, 1); setData(k, a);
  };
  const updateItem = (k: keyof typeof data, i: number, field: string, val: string) => {
    const a = [...(data[k] as any[])]; a[i][field] = val; setData(k, a);
  };

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <Authenticated header={<h2 className="font-bold text-xl">Services</h2>}>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Add Service</Button>
      </div>

      {/* ════════ SHEET ════════ */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" ? "Add Service" : mode === "edit" ? "Edit Service" : "Service Details"}
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
                  <p>{current.cta_label} {current.cta_label_ja && `/ ${current.cta_label_ja}`} → {current.cta_url}</p>
                </div>
              )}
              <ViewList label="Our Services"      items={current.service_items} />
              <ViewList label="Highlights"        items={current.highlights} showValue />
              <ViewList label="Benefits"          items={current.benefits} />
              <ViewList label="Why Choose Us"     items={current.why_choose} />
              <ViewList label="Approach Steps"    items={current.approach_steps} showStep />
              <ViewList label="Testimonials"      items={current.testimonials} isQuote />
              <ViewList label="Tech Stack"        items={current.tech_stack} isTech />
              <ViewList label="Page FAQs"         items={current.pageFaqs} isFaq />
              <ViewList label="Page Industries"   items={current.pageIndustries} />
            </div>
          )}

          {/* ── ADD / EDIT MODE ── */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">

              {/* Global error banner */}
              {Object.keys(formErrors).length > 0 && (
                <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30
                                text-destructive rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Please fix the following:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {Object.values(formErrors).map((msg, i) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* EN / JA tabs */}
              <Tabs value={langTab} onValueChange={(v) => setLangTab(v as "en" | "ja")}>
                <TabsList className="mb-2">
                  <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    English
                  </TabsTrigger>
                  <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Japanese
                  </TabsTrigger>
                </TabsList>

                {/* ── ENGLISH ── */}
                <TabsContent value="en" className="space-y-4">
                  <Field label="Title (EN) *" error={formErrors.title}>
                    <Input
                      value={data.title}
                      onChange={e => handleTitleChange(e.target.value)}
                      placeholder="e.g. AI-Driven Development"
                      className={formErrors.title ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                  </Field>

                  {/* Slug — required, auto-filled from title */}
                  <Field label="Slug *" error={formErrors.slug}
                    hint="Used in the URL. Auto-filled from title, but you can edit it.">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">/services/</span>
                      <Input
                        value={data.slug}
                        onChange={e => handleSlugChange(e.target.value)}
                        placeholder="ai-driven-development"
                        className={`flex-1 ${formErrors.slug ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                      {data.title && !data.slug && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap"
                          onClick={() => setData("slug", slugify(data.title))}
                        >
                          Auto-fill
                        </Button>
                      )}
                    </div>
                  </Field>

                  <Field label="Subtitle (EN)">
                    <Input value={data.subtitle} onChange={e => setData("subtitle", e.target.value)}
                      placeholder="Build Intelligent, Scalable & Future-Ready AI Solutions" />
                  </Field>
                  <Field label="Overview (EN)">
                    <ReactQuill value={data.overview} onChange={v => setData("overview", v)} />
                  </Field>
                </TabsContent>

                {/* ── JAPANESE ── */}
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
                <Input type="file" accept="image/*"
                  onChange={e => setData("hero_image", e.target.files?.[0] || null)} />
                <p className="text-xs text-muted-foreground mt-1">Max 4 MB · Recommended 1200×600 px</p>
              </SectionBox>

              {/* CTA Button */}
              <SectionBox title="CTA Button">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Label (EN)">
                    <Input value={data.cta_label} onChange={e => setData("cta_label", e.target.value)}
                      placeholder="Book a Free Consultation" />
                  </Field>
                  <Field label="Label (JA)">
                    <Input value={data.cta_label_ja} onChange={e => setData("cta_label_ja", e.target.value)}
                      placeholder="無料相談を予約する" />
                  </Field>
                </div>
                <Field label="URL">
                  <Input value={data.cta_url} onChange={e => setData("cta_url", e.target.value)}
                    placeholder="/contact" />
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
              <SectionBlock title="Highlights — Why section (stats)" hint="e.g. 51.3% / Reduction in development time"
                items={data.highlights}
                onAdd={() => addItem("highlights", { value: "", title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("highlights", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Stat value">
                        <Input value={item.value} placeholder="51.3%"
                          onChange={e => updateItem("highlights", i, "value", e.target.value)} />
                      </Field>
                      <Field label="Title (EN)">
                        <Input value={item.title} placeholder="Reduction in development time"
                          onChange={e => updateItem("highlights", i, "title", e.target.value)} />
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
              <SectionBlock title="Development Approach Steps" hint="1. AI Strategy & Consulting, 2. Data Engineering…"
                items={data.approach_steps}
                onAdd={() => addItem("approach_steps", { step_number: data.approach_steps.length + 1, title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("approach_steps", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <Field label="Step #">
                        <Input type="number" value={item.step_number ?? i + 1}
                          onChange={e => updateItem("approach_steps", i, "step_number", e.target.value)} />
                      </Field>
                      <div className="col-span-2">
                        <Field label="Title (EN)">
                          <Input value={item.title} placeholder="AI Strategy & Consulting"
                            onChange={e => updateItem("approach_steps", i, "title", e.target.value)} />
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
              />

              {/* Tech Stack */}
              <SectionBlock title="Technology Stack" hint="e.g. AI/ML Frameworks: TensorFlow, PyTorch"
                items={data.tech_stack}
                onAdd={() => addItem("tech_stack", { category: "", category_ja: "", items: "" })}
                onRemove={i => removeItem("tech_stack", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Category (EN)">
                        <Input value={item.category} placeholder="AI/ML Frameworks"
                          onChange={e => updateItem("tech_stack", i, "category", e.target.value)} />
                      </Field>
                      <Field label="Category (JA)">
                        <Input value={item.category_ja || ""}
                          onChange={e => updateItem("tech_stack", i, "category_ja", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Items (comma-separated)">
                      <Input value={item.items} placeholder="TensorFlow, PyTorch, Scikit-learn"
                        onChange={e => updateItem("tech_stack", i, "items", e.target.value)} />
                    </Field>
                  </div>
                )}
              />

              {/* Testimonials */}
              <SectionBlock title="Testimonials" hint="Client quotes"
                items={data.testimonials}
                onAdd={() => addItem("testimonials", { quote: "", quote_ja: "", author: "" })}
                onRemove={i => removeItem("testimonials", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Field label="Author / Company">
                      <Input value={item.author || ""} placeholder="Jane Doe, Acme Corp"
                        onChange={e => updateItem("testimonials", i, "author", e.target.value)} />
                    </Field>
                    <Field label="Quote (EN)">
                      <textarea rows={3} value={item.quote}
                        onChange={e => updateItem("testimonials", i, "quote", e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                                   shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                    </Field>
                    <Field label="Quote (JA)">
                      <textarea rows={3} value={item.quote_ja || ""}
                        onChange={e => updateItem("testimonials", i, "quote_ja", e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                                   shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                    </Field>
                  </div>
                )}
              />

              {/* ════════════════════════════════════════════
                  PER-SERVICE INDUSTRIES (service_page_industries)
              ════════════════════════════════════════════ */}
              <SectionBlock
                title="Industries We Serve (per-service)"
                hint="Leave empty to use the global Industries panel as fallback"
                items={data.page_industries}
                onAdd={() => addItem("page_industries", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("page_industries", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Title (EN)">
                        <Input value={item.title} placeholder="Healthcare"
                          onChange={e => updateItem("page_industries", i, "title", e.target.value)} />
                      </Field>
                      <Field label="Title (JA)">
                        <Input value={item.title_ja || ""} placeholder="ヘルスケア"
                          onChange={e => updateItem("page_industries", i, "title_ja", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Description (EN)">
                      <Input value={item.description || ""} placeholder="Predictive analytics, patient data insights"
                        onChange={e => updateItem("page_industries", i, "description", e.target.value)} />
                    </Field>
                    <Field label="Description (JA)">
                      <Input value={item.description_ja || ""}
                        onChange={e => updateItem("page_industries", i, "description_ja", e.target.value)} />
                    </Field>
                  </div>
                )}
              />

              {/* ════════════════════════════════════════════
                  PER-SERVICE FAQs (service_page_faqs)
              ════════════════════════════════════════════ */}
              <SectionBlock
                title="FAQs (per-service)"
                hint="Leave empty to use the global FAQ panel as fallback"
                items={data.page_faqs}
                onAdd={() => addItem("page_faqs", { question: "", question_ja: "", answer: "", answer_ja: "" })}
                onRemove={i => removeItem("page_faqs", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Question (EN)">
                        <Input value={item.question} placeholder="What is AI-driven development?"
                          onChange={e => updateItem("page_faqs", i, "question", e.target.value)} />
                      </Field>
                      <Field label="Question (JA)">
                        <Input value={item.question_ja || ""} placeholder="AI駆動開発とは？"
                          onChange={e => updateItem("page_faqs", i, "question_ja", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Answer (EN)">
                      <ReactQuill theme="snow" value={item.answer || ""}
                        onChange={v => updateItem("page_faqs", i, "answer", v)} />
                    </Field>
                    <Field label="Answer (JA)">
                      <ReactQuill theme="snow" value={item.answer_ja || ""}
                        onChange={v => updateItem("page_faqs", i, "answer_ja", v)} />
                    </Field>
                  </div>
                )}
              />

              <Button disabled={processing} className="w-full mt-4" onClick={submit}>
                {mode === "edit" ? "Update Service" : "Save Service"}
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
          {services.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="font-medium">{s.title}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{s.slug}</TableCell>
              <TableCell>
                {(s.pageFaqs?.length ?? 0) > 0
                  ? <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.pageFaqs!.length} custom</span>
                  : <span className="text-xs text-muted-foreground">Global</span>}
              </TableCell>
              <TableCell>
                {(s.pageIndustries?.length ?? 0) > 0
                  ? <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.pageIndustries!.length} custom</span>
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

/* ═══════════════════ HELPERS ═══════════════════ */

function Field({
  label, children, error, hint,
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
  title, hint, items, onAdd, onRemove, render,
}: {
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
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {items.length}
          </span>
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

function BilingualTitleDesc({
  item, index, field, updateItem,
}: {
  item: any; index: number; field: string;
  updateItem: (k: any, i: number, f: string, v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Field label="Title (EN)">
          <Input value={item.title} onChange={e => updateItem(field, index, "title", e.target.value)} />
        </Field>
        <Field label="Title (JA)">
          <Input value={item.title_ja || ""} onChange={e => updateItem(field, index, "title_ja", e.target.value)} />
        </Field>
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

function ViewList({
  label, items, showValue = false, showStep = false,
  isQuote = false, isTech = false, isFaq = false,
}: {
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
              ? <><p className="font-medium">Q: {item.question}</p>
                  <p className="text-muted-foreground mt-1 text-xs">A: {item.answer?.replace(/<[^>]+>/g, "").slice(0, 120)}…</p></>
              : showValue && item.value
              ? <><span className="text-primary font-bold mr-2">{item.value}</span>{item.title}</>
              : showStep
              ? <><span className="text-primary font-bold mr-2">Step {item.step_number ?? i + 1}.</span>{item.title}</>
              : isTech
              ? <><span className="font-semibold text-primary">{item.category}:</span> {item.items}</>
              : isQuote
              ? <><span className="italic">"{item.quote}"</span>{item.author && <span className="ml-2 font-semibold">— {item.author}</span>}</>
              : <span className="font-medium">{item.title}</span>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}