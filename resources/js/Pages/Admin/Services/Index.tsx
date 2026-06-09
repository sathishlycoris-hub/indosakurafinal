// resources/js/Pages/Admin/Services/Index.tsx
// Only the SEO-related additions are annotated with // ★ NEW
// The rest of the file is identical to your original.

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
import SeoFields from "@/components/SeoFields"; // ★ NEW

/* ─── TYPES (same as before + SEO fields) ─── */
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
  // ★ NEW — SEO
  meta_title?: string; meta_title_ja?: string;
  meta_description?: string; meta_description_ja?: string;
  meta_keywords?: string; meta_keywords_ja?: string;
  og_image?: string | null;
  highlights: Highlight[];
  benefits: Benefit[];
  page_faqs: PageFaq[];
  page_industries: PageIndustry[];
  service_items: ServiceItem[];
  why_choose: WhyChooseItem[];
  approach_steps: ApproachStep[];
  testimonials: Testimonial[];
  tech_stack: TechStack[];
}

/* ─── STRIP HELPERS (unchanged) ─── */
const toHighlight     = (r: any): Highlight     => ({ value: r.value ?? "", title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toBenefit       = (r: any): Benefit       => ({ title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toPageFaq       = (r: any): PageFaq       => ({ question: r.question ?? "", question_ja: r.question_ja ?? "", answer: r.answer ?? "", answer_ja: r.answer_ja ?? "" });
const toPageIndustry  = (r: any): PageIndustry  => ({ title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toServiceItem   = (r: any): ServiceItem   => ({ title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toWhyChooseItem = (r: any): WhyChooseItem => ({ title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toApproachStep  = (r: any): ApproachStep  => ({ step_number: r.step_number, title: r.title ?? "", title_ja: r.title_ja ?? "", description: r.description ?? "", description_ja: r.description_ja ?? "" });
const toTestimonial   = (r: any): Testimonial   => ({ quote: r.quote ?? "", quote_ja: r.quote_ja ?? "", author: r.author ?? "" });
const toTechStack     = (r: any): TechStack     => ({ category: r.category ?? "", category_ja: r.category_ja ?? "", items: r.items ?? "" });

const slugify = (text: string) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

/* ─── COMPONENT ─── */
export default function Index({ services }: { services: Service[] }) {
  const [mode, setMode]             = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent]       = useState<Service | null>(null);
  const [open, setOpen]             = useState(false);
  const [langTab, setLangTab]       = useState<"en" | "ja">("en");
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
    // ★ NEW — SEO
    meta_title: "", meta_title_ja: "",
    meta_description: "", meta_description_ja: "",
    meta_keywords: "", meta_keywords_ja: "",
    og_image: null as File | null,
    // Relations
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

  /* ── OPEN HELPERS ── */
  const openAdd = () => { reset(); setFormErrors({}); setMode("add"); setCurrent(null); setLangTab("en"); setOpen(true); };

  const openEdit = (s: Service) => {
    setMode("edit"); setCurrent(s); setLangTab("en"); setFormErrors({});
    setData({
      title: s.title ?? "", title_ja: s.title_ja ?? "",
      slug: s.slug ?? "",
      subtitle: s.subtitle ?? "", subtitle_ja: s.subtitle_ja ?? "",
      hero_description: s.hero_description ?? "", hero_description_ja: s.hero_description_ja ?? "",
      how_it_works: s.how_it_works ?? "", how_it_works_ja: s.how_it_works_ja ?? "",
      overview: s.overview ?? "", overview_ja: s.overview_ja ?? "",
      cta_label: s.cta_label ?? "", cta_label_ja: s.cta_label_ja ?? "",
      cta_url: s.cta_url ?? "/contact",
      hero_image: null,
      // ★ NEW — SEO
      meta_title: s.meta_title ?? "", meta_title_ja: s.meta_title_ja ?? "",
      meta_description: s.meta_description ?? "", meta_description_ja: s.meta_description_ja ?? "",
      meta_keywords: s.meta_keywords ?? "", meta_keywords_ja: s.meta_keywords_ja ?? "",
      og_image: null,
      // Relations
      highlights:      Array.isArray(s.highlights)      ? s.highlights.map(toHighlight)         : [],
      benefits:        Array.isArray(s.benefits)        ? s.benefits.map(toBenefit)             : [],
      page_faqs:       Array.isArray(s.page_faqs)       ? s.page_faqs.map(toPageFaq)            : [],
      page_industries: Array.isArray(s.page_industries) ? s.page_industries.map(toPageIndustry) : [],
      service_items:   Array.isArray(s.service_items)   ? s.service_items.map(toServiceItem)    : [],
      why_choose:      Array.isArray(s.why_choose)      ? s.why_choose.map(toWhyChooseItem)     : [],
      approach_steps:  Array.isArray(s.approach_steps)  ? s.approach_steps.map(toApproachStep)  : [],
      testimonials:    Array.isArray(s.testimonials)    ? s.testimonials.map(toTestimonial)     : [],
      tech_stack:      Array.isArray(s.tech_stack)      ? s.tech_stack.map(toTechStack)         : [],
    });
    setOpen(true);
  };

  const openView = (s: Service) => { setCurrent(s); setMode("view"); setOpen(true); };

  const handleTitleChange = (val: string) => {
    setData(prev => ({ ...prev, title: val, slug: prev.slug === "" ? slugify(val) : prev.slug }));
    if (formErrors.title) setFormErrors(e => ({ ...e, title: "" }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!data.title.trim()) errors.title = "Title is required.";
    if (!data.slug.trim())  errors.slug  = "Slug is required.";
    setFormErrors(errors);
    if (Object.keys(errors).length) setLangTab("en");
    return Object.keys(errors).length === 0;
  };

  /* ── SUBMIT ── */
  const submit = () => {
    if (!validate()) return;

    const form = new FormData();
    const app  = (k: string, v: string) => form.append(k, v ?? "");

    app("title",               data.title);        app("title_ja",            data.title_ja);
    app("slug",                data.slug.trim());
    app("subtitle",            data.subtitle);     app("subtitle_ja",         data.subtitle_ja);
    app("hero_description",    data.hero_description);
    app("hero_description_ja", data.hero_description_ja);
    app("how_it_works",        data.how_it_works); app("how_it_works_ja",     data.how_it_works_ja);
    app("overview",            data.overview);     app("overview_ja",         data.overview_ja);
    app("cta_label",           data.cta_label);    app("cta_label_ja",        data.cta_label_ja);
    app("cta_url",             data.cta_url);
    // ★ NEW — SEO
    app("meta_title",          data.meta_title);   app("meta_title_ja",       data.meta_title_ja);
    app("meta_description",    data.meta_description);
    app("meta_description_ja", data.meta_description_ja);
    app("meta_keywords",       data.meta_keywords);
    app("meta_keywords_ja",    data.meta_keywords_ja);

    if (data.hero_image) form.append("hero_image", data.hero_image);
    if (data.og_image)   form.append("og_image",   data.og_image);  // ★ NEW

    (["highlights","benefits","service_items","why_choose","approach_steps",
      "testimonials","tech_stack","page_faqs","page_industries"] as const)
      .forEach(k => form.append(k, JSON.stringify(data[k])));

    const opts = { onSuccess: () => { reset(); setFormErrors({}); setOpen(false); } };

    if (mode === "edit" && current) {
      form.append("_method", "PUT");
      router.post(route("admin.services.update", current.id), form, opts);
    } else {
      router.post(route("admin.services.store"), form, opts);
    }
  };

  const deleteItem = (id: number) => {
    if (!confirm("Delete this service?")) return;
    router.delete(route("admin.services.destroy", id), {
      preserveScroll: true,
      onSuccess: () => { setOpen(false); setCurrent(null); },
    });
  };

  const addItem    = (k: keyof typeof data, item: any) => setData(k, [...(data[k] as any[]), item]);
  const removeItem = (k: keyof typeof data, i: number) => { const a = [...(data[k] as any[])]; a.splice(i, 1); setData(k, a); };
  const updateItem = (k: keyof typeof data, i: number, field: string, val: string) => { const a = [...(data[k] as any[])]; a[i][field] = val; setData(k, a); };

  /* ── SEO setData bridge ── */
  const setSeoData = (key: string, value: any) => setData(key as any, value);

  /* ═══ RENDER ═══ */
  return (
    <Authenticated header={<h2 className="font-bold text-xl">Services</h2>}>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Add Service</Button>
      </div>

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
              {/* ★ NEW — SEO preview block */}
              {(current.meta_title || current.meta_description) && (
                <div className="border rounded-xl p-4 bg-muted/20 space-y-2">
                  <p className="font-semibold text-sm">SEO</p>
                  {current.meta_title       && <p className="text-sm"><span className="text-muted-foreground">Title:</span> {current.meta_title}</p>}
                  {current.meta_description && <p className="text-sm"><span className="text-muted-foreground">Description:</span> {current.meta_description}</p>}
                  {current.meta_keywords    && <p className="text-sm"><span className="text-muted-foreground">Keywords:</span> {current.meta_keywords}</p>}
                  {current.og_image && <img src={`/storage/${current.og_image}`} className="h-20 rounded border object-cover mt-2" alt="OG" />}
                </div>
              )}
            </div>
          )}

          {/* ── ADD / EDIT MODE ── */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">
              {Object.keys(formErrors).length > 0 && (
                <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30
                                text-destructive rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <ul className="list-disc list-inside space-y-0.5">
                    {Object.values(formErrors).map((msg, i) => <li key={i}>{msg}</li>)}
                  </ul>
                </div>
              )}

              <Tabs value={langTab} onValueChange={v => setLangTab(v as "en" | "ja")}>
                <TabsList className="mb-2">
                  <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">English</TabsTrigger>
                  <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">Japanese</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
                  <Field label="Title (EN) *" error={formErrors.title}>
                    <Input value={data.title} onChange={e => handleTitleChange(e.target.value)}
                      className={formErrors.title ? "border-destructive" : ""} />
                  </Field>
                  <Field label="Slug *" error={formErrors.slug}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">/services/</span>
                      <Input value={data.slug} onChange={e => setData("slug", e.target.value)} className="flex-1" />
                    </div>
                  </Field>
                  <Field label="Subtitle (EN)"><Input value={data.subtitle} onChange={e => setData("subtitle", e.target.value)} /></Field>
                  <Field label="Overview (EN)"><ReactQuill value={data.overview} onChange={v => setData("overview", v)} /></Field>
                </TabsContent>

                <TabsContent value="ja" className="space-y-4">
                  <Field label="Title (JA)"><Input value={data.title_ja} onChange={e => setData("title_ja", e.target.value)} /></Field>
                  <Field label="Subtitle (JA)"><Input value={data.subtitle_ja} onChange={e => setData("subtitle_ja", e.target.value)} /></Field>
                  <Field label="Overview (JA)"><ReactQuill value={data.overview_ja} onChange={v => setData("overview_ja", v)} /></Field>
                </TabsContent>
              </Tabs>

              {/* Hero Image */}
              <SectionBox title="Hero Image">
                {mode === "edit" && current?.hero_image && (
                  <img src={`/storage/${current.hero_image}`} alt="" className="h-28 rounded border object-cover mb-2" />
                )}
                <Input type="file" accept="image/*" onChange={e => setData("hero_image", e.target.files?.[0] || null)} />
              </SectionBox>

              {/* CTA */}
              <SectionBox title="CTA Button">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Label (EN)"><Input value={data.cta_label} onChange={e => setData("cta_label", e.target.value)} /></Field>
                  <Field label="Label (JA)"><Input value={data.cta_label_ja} onChange={e => setData("cta_label_ja", e.target.value)} /></Field>
                </div>
                <Field label="URL"><Input value={data.cta_url} onChange={e => setData("cta_url", e.target.value)} /></Field>
              </SectionBox>

              {/* ★ NEW — SEO Section */}
              <SeoFields
                data={{
                  meta_title:          data.meta_title,
                  meta_title_ja:       data.meta_title_ja,
                  meta_description:    data.meta_description,
                  meta_description_ja: data.meta_description_ja,
                  meta_keywords:       data.meta_keywords,
                  meta_keywords_ja:    data.meta_keywords_ja,
                  og_image:            data.og_image,
                }}
                setData={setSeoData}
                activeLang={langTab}
                mode={mode}
                currentOgImage={current?.og_image}
              />

              {/* Our Services */}
              <SectionBlock title="Our Services List" items={data.service_items}
                onAdd={() => addItem("service_items", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("service_items", i)}
                render={(item, i) => <BilingualTitleDesc item={item} index={i} field="service_items" updateItem={updateItem} />}
              />

              {/* Highlights */}
              <SectionBlock title="Highlights" items={data.highlights}
                onAdd={() => addItem("highlights", { value: "", title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("highlights", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Stat value"><Input value={item.value} onChange={e => updateItem("highlights", i, "value", e.target.value)} /></Field>
                      <Field label="Title (EN)"><Input value={item.title} onChange={e => updateItem("highlights", i, "title", e.target.value)} /></Field>
                    </div>
                    <Field label="Title (JA)"><Input value={item.title_ja || ""} onChange={e => updateItem("highlights", i, "title_ja", e.target.value)} /></Field>
                    <Field label="Description (EN)"><ReactQuill theme="snow" value={item.description || ""} onChange={v => updateItem("highlights", i, "description", v)} /></Field>
                    <Field label="Description (JA)"><ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => updateItem("highlights", i, "description_ja", v)} /></Field>
                  </div>
                )}
              />

              {/* Benefits */}
              <SectionBlock title="Benefits" items={data.benefits}
                onAdd={() => addItem("benefits", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("benefits", i)}
                render={(item, i) => <BilingualTitleDesc item={item} index={i} field="benefits" updateItem={updateItem} />}
              />

              {/* Why Choose */}
              <SectionBlock title="Why Choose" items={data.why_choose}
                onAdd={() => addItem("why_choose", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("why_choose", i)}
                render={(item, i) => <BilingualTitleDesc item={item} index={i} field="why_choose" updateItem={updateItem} />}
              />

              {/* Approach Steps */}
              <SectionBlock title="Approach Steps" items={data.approach_steps}
                onAdd={() => addItem("approach_steps", { step_number: data.approach_steps.length + 1, title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("approach_steps", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <Field label="Step #"><Input type="number" value={item.step_number ?? i + 1} onChange={e => updateItem("approach_steps", i, "step_number", e.target.value)} /></Field>
                      <div className="col-span-2"><Field label="Title (EN)"><Input value={item.title} onChange={e => updateItem("approach_steps", i, "title", e.target.value)} /></Field></div>
                    </div>
                    <Field label="Title (JA)"><Input value={item.title_ja || ""} onChange={e => updateItem("approach_steps", i, "title_ja", e.target.value)} /></Field>
                    <Field label="Description (EN)"><ReactQuill theme="snow" value={item.description || ""} onChange={v => updateItem("approach_steps", i, "description", v)} /></Field>
                    <Field label="Description (JA)"><ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => updateItem("approach_steps", i, "description_ja", v)} /></Field>
                  </div>
                )}
              />

              {/* Tech Stack */}
              <SectionBlock title="Tech Stack" items={data.tech_stack}
                onAdd={() => addItem("tech_stack", { category: "", category_ja: "", items: "" })}
                onRemove={i => removeItem("tech_stack", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Category (EN)"><Input value={item.category} onChange={e => updateItem("tech_stack", i, "category", e.target.value)} /></Field>
                      <Field label="Category (JA)"><Input value={item.category_ja || ""} onChange={e => updateItem("tech_stack", i, "category_ja", e.target.value)} /></Field>
                    </div>
                    <Field label="Items (comma-separated)"><Input value={item.items} onChange={e => updateItem("tech_stack", i, "items", e.target.value)} /></Field>
                  </div>
                )}
              />

              {/* Testimonials */}
              <SectionBlock title="Testimonials" items={data.testimonials}
                onAdd={() => addItem("testimonials", { quote: "", quote_ja: "", author: "" })}
                onRemove={i => removeItem("testimonials", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Field label="Author"><Input value={item.author || ""} onChange={e => updateItem("testimonials", i, "author", e.target.value)} /></Field>
                    <Field label="Quote (EN)"><textarea rows={3} value={item.quote} onChange={e => updateItem("testimonials", i, "quote", e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></Field>
                    <Field label="Quote (JA)"><textarea rows={3} value={item.quote_ja || ""} onChange={e => updateItem("testimonials", i, "quote_ja", e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></Field>
                  </div>
                )}
              />

              {/* Per-service Industries */}
              <SectionBlock title="Industries (per-service)" items={data.page_industries}
                onAdd={() => addItem("page_industries", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={i => removeItem("page_industries", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Title (EN)"><Input value={item.title} onChange={e => updateItem("page_industries", i, "title", e.target.value)} /></Field>
                      <Field label="Title (JA)"><Input value={item.title_ja || ""} onChange={e => updateItem("page_industries", i, "title_ja", e.target.value)} /></Field>
                    </div>
                    <Field label="Description (EN)"><Input value={item.description || ""} onChange={e => updateItem("page_industries", i, "description", e.target.value)} /></Field>
                    <Field label="Description (JA)"><Input value={item.description_ja || ""} onChange={e => updateItem("page_industries", i, "description_ja", e.target.value)} /></Field>
                  </div>
                )}
              />

              {/* Per-service FAQs */}
              <SectionBlock title="FAQs (per-service)" items={data.page_faqs}
                onAdd={() => addItem("page_faqs", { question: "", question_ja: "", answer: "", answer_ja: "" })}
                onRemove={i => removeItem("page_faqs", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Question (EN)"><Input value={item.question} onChange={e => updateItem("page_faqs", i, "question", e.target.value)} /></Field>
                      <Field label="Question (JA)"><Input value={item.question_ja || ""} onChange={e => updateItem("page_faqs", i, "question_ja", e.target.value)} /></Field>
                    </div>
                    <Field label="Answer (EN)"><ReactQuill theme="snow" value={item.answer || ""} onChange={v => updateItem("page_faqs", i, "answer", v)} /></Field>
                    <Field label="Answer (JA)"><ReactQuill theme="snow" value={item.answer_ja || ""} onChange={v => updateItem("page_faqs", i, "answer_ja", v)} /></Field>
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

      {/* ── TABLE ── */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Slug</TableHead>
            <TableHead className="text-white">SEO</TableHead>
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
              {/* ★ NEW — SEO status */}
              <TableCell>
                {s.meta_title
                  ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Set</span>
                  : <span className="text-xs text-muted-foreground">–</span>}
              </TableCell>
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

/* ─── HELPER COMPONENTS (unchanged from your original) ─── */
function Field({ label, children, error, hint }: { label: string; children: React.ReactNode; error?: string; hint?: string }) {
  return (
    <div className="space-y-1">
      <Label className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground/70">{hint}</p>}
      {children}
      {error && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
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
          <Button variant="outline" size="sm" onClick={onAdd}><Plus className="w-3 h-3 mr-1" /> Add {title.split(" ")[0]}</Button>
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
      <Field label="Description (EN)"><ReactQuill theme="snow" value={item.description || ""} onChange={v => updateItem(field, index, "description", v)} /></Field>
      <Field label="Description (JA)"><ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => updateItem(field, index, "description_ja", v)} /></Field>
    </div>
  );
}