import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, AlertCircle, ExternalLink } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SeoFields from "@/components/SeoFields";

interface Listy { title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Step  { step_number?: number; title: string; title_ja?: string; description?: string; description_ja?: string; }
interface Tech  { category: string; category_ja?: string; items: string; }
interface Faq   { question: string; question_ja?: string; answer: string; answer_ja?: string; }
interface Feature { title: string; title_ja?: string; }

interface Item {
  id: number; slug: string; sort_order?: number;
  title: string; title_ja?: string;
  card_description?: string; card_description_ja?: string;
  subtitle?: string; subtitle_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  hero_image?: string | null;
  cta_label?: string; cta_label_ja?: string; cta_url?: string;
  intro?: string; intro_ja?: string;
  sub_services?: Listy[]; features?: Feature[]; benefits?: Listy[];
  process_steps?: Step[]; tech_stack?: Tech[]; industries?: Listy[];
  why_choose?: Listy[]; faqs?: Faq[];
  meta_title?: string; meta_title_ja?: string;
  meta_description?: string; meta_description_ja?: string;
  meta_keywords?: string; meta_keywords_ja?: string;
  og_image?: string | null;
}

const slugify = (t: string) => t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

export default function Index({
  service, items,
}: {
  service: { id: number; title: string; slug: string };
  items: Item[];
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [current, setCurrent] = useState<Item | null>(null);
  const [langTab, setLangTab] = useState<"en" | "ja">("en");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data, setData, reset, processing } = useForm({
    title: "", title_ja: "", slug: "", sort_order: 0,
    card_description: "", card_description_ja: "",
    subtitle: "", subtitle_ja: "",
    hero_description: "", hero_description_ja: "",
    intro: "", intro_ja: "",
    cta_label: "", cta_label_ja: "", cta_url: "/contact",
    hero_image: null as File | null,
    meta_title: "", meta_title_ja: "",
    meta_description: "", meta_description_ja: "",
    meta_keywords: "", meta_keywords_ja: "",
    og_image: null as File | null,
    sub_services: [] as Listy[],
    features: [] as Feature[],
    benefits: [] as Listy[],
    process_steps: [] as Step[],
    tech_stack: [] as Tech[],
    industries: [] as Listy[],
    why_choose: [] as Listy[],
    faqs: [] as Faq[],
  });

  const openAdd = () => { reset(); setFormErrors({}); setMode("add"); setCurrent(null); setLangTab("en"); setOpen(true); };

  const openEdit = (it: Item) => {
    setMode("edit"); setCurrent(it); setLangTab("en"); setFormErrors({});
    setData({
      title: it.title ?? "", title_ja: it.title_ja ?? "",
      slug: it.slug ?? "", sort_order: it.sort_order ?? 0,
      card_description: it.card_description ?? "", card_description_ja: it.card_description_ja ?? "",
      subtitle: it.subtitle ?? "", subtitle_ja: it.subtitle_ja ?? "",
      hero_description: it.hero_description ?? "", hero_description_ja: it.hero_description_ja ?? "",
      intro: it.intro ?? "", intro_ja: it.intro_ja ?? "",
      cta_label: it.cta_label ?? "", cta_label_ja: it.cta_label_ja ?? "", cta_url: it.cta_url ?? "/contact",
      hero_image: null,
      meta_title: it.meta_title ?? "", meta_title_ja: it.meta_title_ja ?? "",
      meta_description: it.meta_description ?? "", meta_description_ja: it.meta_description_ja ?? "",
      meta_keywords: it.meta_keywords ?? "", meta_keywords_ja: it.meta_keywords_ja ?? "",
      og_image: null,
      sub_services: it.sub_services ?? [], features: it.features ?? [],
      benefits: it.benefits ?? [], process_steps: it.process_steps ?? [],
      tech_stack: it.tech_stack ?? [], industries: it.industries ?? [],
      why_choose: it.why_choose ?? [], faqs: it.faqs ?? [],
    });
    setOpen(true);
  };

  const handleTitle = (val: string) => {
    setData(prev => ({ ...prev, title: val, slug: prev.slug === "" ? slugify(val) : prev.slug }));
    if (formErrors.title) setFormErrors(e => ({ ...e, title: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.title.trim()) errs.title = "Title is required.";
    if (!data.slug.trim()) errs.slug = "Slug is required.";
    setFormErrors(errs);
    if (Object.keys(errs).length) setLangTab("en");
    return Object.keys(errs).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const form = new FormData();
    const app = (k: string, v: any) => form.append(k, v ?? "");

    app("title", data.title); app("title_ja", data.title_ja);
    app("slug", data.slug.trim()); app("sort_order", String(data.sort_order));
    app("card_description", data.card_description); app("card_description_ja", data.card_description_ja);
    app("subtitle", data.subtitle); app("subtitle_ja", data.subtitle_ja);
    app("hero_description", data.hero_description); app("hero_description_ja", data.hero_description_ja);
    app("intro", data.intro); app("intro_ja", data.intro_ja);
    app("cta_label", data.cta_label); app("cta_label_ja", data.cta_label_ja); app("cta_url", data.cta_url);
    app("meta_title", data.meta_title); app("meta_title_ja", data.meta_title_ja);
    app("meta_description", data.meta_description); app("meta_description_ja", data.meta_description_ja);
    app("meta_keywords", data.meta_keywords); app("meta_keywords_ja", data.meta_keywords_ja);

    if (data.hero_image) form.append("hero_image", data.hero_image);
    if (data.og_image) form.append("og_image", data.og_image);

    (["sub_services", "features", "benefits", "process_steps",
      "tech_stack", "industries", "why_choose", "faqs"] as const)
      .forEach(k => form.append(k, JSON.stringify(data[k])));

    const opts = { onSuccess: () => { reset(); setFormErrors({}); setOpen(false); } };

    if (mode === "edit" && current) {
      form.append("_method", "PUT");
      router.post(route("admin.services.items.update", [service.id, current.id]), form, opts);
    } else {
      router.post(route("admin.services.items.store", service.id), form, opts);
    }
  };

  const del = (id: number) => {
    if (!confirm("Delete this service item?")) return;
    router.delete(route("admin.services.items.destroy", [service.id, id]), { preserveScroll: true });
  };

  const add = (k: keyof typeof data, item: any) => setData(k, [...(data[k] as any[]), item]);
  const remove = (k: keyof typeof data, i: number) => { const a = [...(data[k] as any[])]; a.splice(i, 1); setData(k, a); };
  const upd = (k: keyof typeof data, i: number, f: string, v: string) => { const a = [...(data[k] as any[])]; a[i][f] = v; setData(k, a); };
  const setSeoData = (key: string, value: any) => setData(key as any, value);

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Service Items — {service.title}</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Items under “{service.title}”</h1>
          <p className="text-xs text-muted-foreground mt-1">/services/{service.slug}/&#123;item&#125;</p>
        </div>
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{mode === "add" ? "Add Item" : "Edit Item"}</SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-6">
            {Object.keys(formErrors).length > 0 && (
              <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <ul className="list-disc list-inside space-y-0.5">
                  {Object.values(formErrors).map((m, i) => <li key={i}>{m}</li>)}
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
                  <Input value={data.title} onChange={e => handleTitle(e.target.value)} className={formErrors.title ? "border-destructive" : ""} />
                </Field>
                <Field label="Slug *" error={formErrors.slug}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">/services/{service.slug}/</span>
                    <Input value={data.slug} onChange={e => setData("slug", e.target.value)} className="flex-1" />
                  </div>
                </Field>
                <Field label="Card Description (EN)" hint="Shown on the parent services list">
                  <Input value={data.card_description} onChange={e => setData("card_description", e.target.value)} />
                </Field>
                <Field label="Subtitle (EN)"><Input value={data.subtitle} onChange={e => setData("subtitle", e.target.value)} /></Field>
                <Field label="Hero Description (EN)"><ReactQuill value={data.hero_description} onChange={v => setData("hero_description", v)} /></Field>
                <Field label="Introduction (EN)"><ReactQuill value={data.intro} onChange={v => setData("intro", v)} /></Field>
              </TabsContent>

              <TabsContent value="ja" className="space-y-4">
                <Field label="Title (JA)"><Input value={data.title_ja} onChange={e => setData("title_ja", e.target.value)} /></Field>
                <Field label="Card Description (JA)"><Input value={data.card_description_ja} onChange={e => setData("card_description_ja", e.target.value)} /></Field>
                <Field label="Subtitle (JA)"><Input value={data.subtitle_ja} onChange={e => setData("subtitle_ja", e.target.value)} /></Field>
                <Field label="Hero Description (JA)"><ReactQuill value={data.hero_description_ja} onChange={v => setData("hero_description_ja", v)} /></Field>
                <Field label="Introduction (JA)"><ReactQuill value={data.intro_ja} onChange={v => setData("intro_ja", v)} /></Field>
              </TabsContent>
            </Tabs>

            {/* <SectionBox title="Hero Image">
              {mode === "edit" && current?.hero_image && (
                <img src={`/storage/${current.hero_image}`} alt="" className="h-28 rounded border object-cover mb-2" />
              )}
              <Input type="file" accept="image/*" onChange={e => setData("hero_image", e.target.files?.[0] || null)} />
            </SectionBox> */}

            <SectionBox title="CTA Button">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Label (EN)"><Input value={data.cta_label} onChange={e => setData("cta_label", e.target.value)} /></Field>
                <Field label="Label (JA)"><Input value={data.cta_label_ja} onChange={e => setData("cta_label_ja", e.target.value)} /></Field>
              </div>
              <Field label="URL"><Input value={data.cta_url} onChange={e => setData("cta_url", e.target.value)} /></Field>
            </SectionBox>

            <SeoFields
              data={{
                meta_title: data.meta_title, meta_title_ja: data.meta_title_ja,
                meta_description: data.meta_description, meta_description_ja: data.meta_description_ja,
                meta_keywords: data.meta_keywords, meta_keywords_ja: data.meta_keywords_ja,
                og_image: data.og_image,
              }}
              setData={setSeoData}
              activeLang={langTab}
              mode={mode}
              currentOgImage={current?.og_image}
            />

            {/* Sub-services */}
            <SectionBlock title="Our Services List" items={data.sub_services}
              onAdd={() => add("sub_services", { title: "", title_ja: "", description: "", description_ja: "" })}
              onRemove={i => remove("sub_services", i)}
              render={(item, i) => <TitleDesc item={item} i={i} field="sub_services" upd={upd} />} />

            {/* Features (simple title only) */}
            <SectionBlock title="Key Features" items={data.features}
              onAdd={() => add("features", { title: "", title_ja: "" })}
              onRemove={i => remove("features", i)}
              render={(item, i) => (
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Feature (EN)"><Input value={item.title} onChange={e => upd("features", i, "title", e.target.value)} /></Field>
                  <Field label="Feature (JA)"><Input value={item.title_ja || ""} onChange={e => upd("features", i, "title_ja", e.target.value)} /></Field>
                </div>
              )} />

            {/* Benefits */}
            <SectionBlock title="Benefits" items={data.benefits}
              onAdd={() => add("benefits", { title: "", title_ja: "", description: "", description_ja: "" })}
              onRemove={i => remove("benefits", i)}
              render={(item, i) => <TitleDesc item={item} i={i} field="benefits" upd={upd} />} />

            {/* Process Steps */}
            <SectionBlock title="Development Process" items={data.process_steps}
              onAdd={() => add("process_steps", { step_number: data.process_steps.length + 1, title: "", title_ja: "", description: "", description_ja: "" })}
              onRemove={i => remove("process_steps", i)}
              render={(item, i) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Step #"><Input type="number" value={item.step_number ?? i + 1} onChange={e => upd("process_steps", i, "step_number", e.target.value)} /></Field>
                    <div className="col-span-2"><Field label="Title (EN)"><Input value={item.title} onChange={e => upd("process_steps", i, "title", e.target.value)} /></Field></div>
                  </div>
                  <Field label="Title (JA)"><Input value={item.title_ja || ""} onChange={e => upd("process_steps", i, "title_ja", e.target.value)} /></Field>
                  <Field label="Description (EN)"><ReactQuill theme="snow" value={item.description || ""} onChange={v => upd("process_steps", i, "description", v)} /></Field>
                  <Field label="Description (JA)"><ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => upd("process_steps", i, "description_ja", v)} /></Field>
                </div>
              )} />

            {/* Tech Stack */}
            <SectionBlock title="Tech Stack" items={data.tech_stack}
              onAdd={() => add("tech_stack", { category: "", category_ja: "", items: "" })}
              onRemove={i => remove("tech_stack", i)}
              render={(item, i) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Category (EN)"><Input value={item.category} onChange={e => upd("tech_stack", i, "category", e.target.value)} /></Field>
                    <Field label="Category (JA)"><Input value={item.category_ja || ""} onChange={e => upd("tech_stack", i, "category_ja", e.target.value)} /></Field>
                  </div>
                  <Field label="Items (comma-separated)"><Input value={item.items} onChange={e => upd("tech_stack", i, "items", e.target.value)} /></Field>
                </div>
              )} />

            {/* Industries */}
            <SectionBlock title="Industries" items={data.industries}
              onAdd={() => add("industries", { title: "", title_ja: "", description: "", description_ja: "" })}
              onRemove={i => remove("industries", i)}
              render={(item, i) => <TitleDesc item={item} i={i} field="industries" upd={upd} simple />} />

            {/* Why Choose */}
            <SectionBlock title="Why IndoSakura" items={data.why_choose}
              onAdd={() => add("why_choose", { title: "", title_ja: "", description: "", description_ja: "" })}
              onRemove={i => remove("why_choose", i)}
              render={(item, i) => <TitleDesc item={item} i={i} field="why_choose" upd={upd} />} />

            {/* FAQs */}
            <SectionBlock title="FAQs" items={data.faqs}
              onAdd={() => add("faqs", { question: "", question_ja: "", answer: "", answer_ja: "" })}
              onRemove={i => remove("faqs", i)}
              render={(item, i) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Question (EN)"><Input value={item.question} onChange={e => upd("faqs", i, "question", e.target.value)} /></Field>
                    <Field label="Question (JA)"><Input value={item.question_ja || ""} onChange={e => upd("faqs", i, "question_ja", e.target.value)} /></Field>
                  </div>
                  <Field label="Answer (EN)"><ReactQuill theme="snow" value={item.answer || ""} onChange={v => upd("faqs", i, "answer", v)} /></Field>
                  <Field label="Answer (JA)"><ReactQuill theme="snow" value={item.answer_ja || ""} onChange={v => upd("faqs", i, "answer_ja", v)} /></Field>
                </div>
              )} />

            <Button disabled={processing} className="w-full mt-4" onClick={submit}>
              {mode === "edit" ? "Update Item" : "Save Item"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Slug</TableHead>
            <TableHead className="text-white">SEO</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((it, i) => (
            <TableRow key={it.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="font-medium">{it.title}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{it.slug}</TableCell>
              <TableCell>
                {it.meta_title
                  ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Set</span>
                  : <span className="text-xs text-muted-foreground">–</span>}
              </TableCell>
              <TableCell className="space-x-2">
                <a href={`/services/${service.slug}/${it.slug}`} target="_blank" rel="noreferrer">
                  <Button size="icon" variant="ghost"><ExternalLink className="w-4 h-4" /></Button>
                </a>
                <Button size="icon" variant="ghost" onClick={() => openEdit(it)}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="destructive" onClick={() => del(it.id)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authenticated>
  );
}

/* Helpers */
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

function SectionBlock({ title, items, onAdd, onRemove, render }: {
  title: string; items: any[]; onAdd: () => void; onRemove: (i: number) => void;
  render: (item: any, i: number) => JSX.Element;
}) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="border rounded-xl bg-muted/20 overflow-hidden">
      <button type="button" onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/40 transition-colors">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{title}</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{items.length}</span>
        </div>
        {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
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

function TitleDesc({ item, i, field, upd, simple }: {
  item: any; i: number; field: string; simple?: boolean;
  upd: (k: any, i: number, f: string, v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Field label="Title (EN)"><Input value={item.title} onChange={e => upd(field, i, "title", e.target.value)} /></Field>
        <Field label="Title (JA)"><Input value={item.title_ja || ""} onChange={e => upd(field, i, "title_ja", e.target.value)} /></Field>
      </div>
      {simple ? (
        <>
          <Field label="Description (EN)"><Input value={item.description || ""} onChange={e => upd(field, i, "description", e.target.value)} /></Field>
          <Field label="Description (JA)"><Input value={item.description_ja || ""} onChange={e => upd(field, i, "description_ja", e.target.value)} /></Field>
        </>
      ) : (
        <>
          <Field label="Description (EN)"><ReactQuill theme="snow" value={item.description || ""} onChange={v => upd(field, i, "description", v)} /></Field>
          <Field label="Description (JA)"><ReactQuill theme="snow" value={item.description_ja || ""} onChange={v => upd(field, i, "description_ja", v)} /></Field>
        </>
      )}
    </div>
  );
}