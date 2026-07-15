// resources/js/Pages/Admin/HomeCaseStudies/Index.tsx

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
import { Plus, Eye, Pencil, Trash2, AlertCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SeoFields from "@/components/SeoFields";

interface HomeCaseStudy {
  id: number;
  title: string; title_ja?: string;
  slug: string;
  subtitle?: string; subtitle_ja?: string;
  company_name?: string; company_name_ja?: string;
  ceo_name?: string; ceo_name_ja?: string;
  logo?: string | null;
  hero_image?: string | null;
  secondary_image?: string | null;
  tags?: string; tags_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  benefit?: string; benefit_ja?: string;
  implementation?: string; implementation_ja?: string;
  content?: string; content_ja?: string;
  sort_order?: number;
  meta_title?: string; meta_title_ja?: string;
  meta_description?: string; meta_description_ja?: string;
  meta_keywords?: string; meta_keywords_ja?: string;
  og_image?: string | null;
}

const slugify = (text: string) =>
  text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function Index({ homeCaseStudies }: { homeCaseStudies: HomeCaseStudy[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<HomeCaseStudy | null>(null);
  const [open, setOpen] = useState(false);
  const [langTab, setLangTab] = useState<"en" | "ja">("en");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data, setData, reset, processing } = useForm({
    title: "", title_ja: "",
    slug: "",
    subtitle: "", subtitle_ja: "",
    company_name: "", company_name_ja: "",
    ceo_name: "", ceo_name_ja: "",
    tags: "", tags_ja: "",
    hero_description: "", hero_description_ja: "",
    benefit: "", benefit_ja: "",
    implementation: "", implementation_ja: "",
    content: "", content_ja: "",
    sort_order: 0,
    logo: null as File | null,
    hero_image: null as File | null,
    secondary_image: null as File | null,
    meta_title: "", meta_title_ja: "",
    meta_description: "", meta_description_ja: "",
    meta_keywords: "", meta_keywords_ja: "",
    og_image: null as File | null,
  });

  const openAdd = () => {
    reset();
    setFormErrors({});
    setMode("add"); setCurrent(null); setLangTab("en"); setOpen(true);
  };

  const openEdit = (s: HomeCaseStudy) => {
    setMode("edit"); setCurrent(s); setLangTab("en"); setFormErrors({});
    setData({
      title: s.title ?? "", title_ja: s.title_ja ?? "",
      slug: s.slug ?? "",
      subtitle: s.subtitle ?? "", subtitle_ja: s.subtitle_ja ?? "",
      company_name: s.company_name ?? "", company_name_ja: s.company_name_ja ?? "",
      ceo_name: s.ceo_name ?? "", ceo_name_ja: s.ceo_name_ja ?? "",
      tags: s.tags ?? "", tags_ja: s.tags_ja ?? "",
      hero_description: s.hero_description ?? "", hero_description_ja: s.hero_description_ja ?? "",
      benefit: s.benefit ?? "", benefit_ja: s.benefit_ja ?? "",
      implementation: s.implementation ?? "", implementation_ja: s.implementation_ja ?? "",
      content: s.content ?? "", content_ja: s.content_ja ?? "",
      sort_order: s.sort_order ?? 0,
      logo: null, hero_image: null, secondary_image: null,
      meta_title: s.meta_title ?? "", meta_title_ja: s.meta_title_ja ?? "",
      meta_description: s.meta_description ?? "", meta_description_ja: s.meta_description_ja ?? "",
      meta_keywords: s.meta_keywords ?? "", meta_keywords_ja: s.meta_keywords_ja ?? "",
      og_image: null,
    });
    setOpen(true);
  };

  const openView = (s: HomeCaseStudy) => { setCurrent(s); setMode("view"); setOpen(true); };

  const handleTitleChange = (val: string) => {
    setData(prev => ({ ...prev, title: val, slug: prev.slug === "" ? slugify(val) : prev.slug }));
    if (formErrors.title) setFormErrors(e => ({ ...e, title: "" }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!data.title.trim()) errors.title = "Title is required.";
    setFormErrors(errors);
    if (Object.keys(errors).length) setLangTab("en");
    return Object.keys(errors).length === 0;
  };

  const submit = () => {
    if (!validate()) return;

    const form = new FormData();
    const app = (k: string, v: string) => form.append(k, v ?? "");

    app("title", data.title); app("title_ja", data.title_ja);
    app("slug", data.slug.trim());
    app("subtitle", data.subtitle); app("subtitle_ja", data.subtitle_ja);
    app("company_name", data.company_name); app("company_name_ja", data.company_name_ja);
    app("ceo_name", data.ceo_name); app("ceo_name_ja", data.ceo_name_ja);
    app("tags", data.tags); app("tags_ja", data.tags_ja);
    app("hero_description", data.hero_description); app("hero_description_ja", data.hero_description_ja);
    app("benefit", data.benefit); app("benefit_ja", data.benefit_ja);
    app("implementation", data.implementation); app("implementation_ja", data.implementation_ja);
    app("content", data.content); app("content_ja", data.content_ja);
    app("sort_order", String(data.sort_order ?? 0));
    app("meta_title", data.meta_title); app("meta_title_ja", data.meta_title_ja);
    app("meta_description", data.meta_description); app("meta_description_ja", data.meta_description_ja);
    app("meta_keywords", data.meta_keywords); app("meta_keywords_ja", data.meta_keywords_ja);

    if (data.logo) form.append("logo", data.logo);
    if (data.hero_image) form.append("hero_image", data.hero_image);
    if (data.secondary_image) form.append("secondary_image", data.secondary_image);
    if (data.og_image) form.append("og_image", data.og_image);

    const opts = {
      onSuccess: () => { reset(); setFormErrors({}); setOpen(false); },
    };

    if (mode === "edit" && current) {
      form.append("_method", "PUT");
      router.post(route("admin.home_case_studies.update", current.id), form, opts);
    } else {
      router.post(route("admin.home_case_studies.store"), form, opts);
    }
  };

  const deleteItem = (id: number) => {
    if (!confirm("Delete this home case study? This cannot be undone.")) return;
    router.delete(route("admin.home_case_studies.destroy", id), {
      preserveScroll: true,
      onSuccess: () => { setOpen(false); setCurrent(null); },
    });
  };

  const setSeoData = (key: string, value: any) => setData(key as any, value);

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Home Case Studies</h2>}>
      <div className="mb-5 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Home Case Studies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Standalone case studies shown in the homepage "Case Studies" section. Independent of India Desks.
          </p>
        </div>
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Add Case Study</Button>
      </div>

      {/* ════════ SHEET ════════ */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" ? "Add Home Case Study" : mode === "edit" ? "Edit Home Case Study" : "Case Study Details"}
            </SheetTitle>
          </SheetHeader>

          {/* ── VIEW MODE ── */}
          {mode === "view" && current && (
            <div className="space-y-6 mt-6 text-sm">
              <div className="flex items-center gap-3">
                {current.logo && (
                  <img src={current.logo.startsWith("http") ? current.logo : `/storage/${current.logo}`}
                    className="w-12 h-12 rounded-full border object-contain bg-white p-1" alt="" />
                )}
                <div>
                  <p className="text-xl font-bold">{current.title}</p>
                  {current.title_ja && <p className="text-muted-foreground">{current.title_ja}</p>}
                  <p className="text-xs text-gray-400 mt-1">/{current.slug}</p>
                </div>
              </div>
              {(current.company_name || current.ceo_name) && (
                <div>
                  <p className="font-semibold mb-1">Company / CEO</p>
                  <p>{current.company_name} {current.ceo_name && `— ${current.ceo_name}`}</p>
                </div>
              )}
              {current.hero_image && (
                <img src={`/storage/${current.hero_image}`} alt="" className="max-h-48 rounded border object-cover" />
              )}
              {current.hero_description && (
                <div>
                  <p className="font-semibold mb-1">Description</p>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: current.hero_description }} />
                </div>
              )}
              {(current.meta_title || current.meta_description) && (
                <div className="border rounded-xl p-4 bg-muted/20 space-y-2">
                  <p className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" /> SEO
                  </p>
                  {current.meta_title && <p className="text-sm"><span className="text-muted-foreground">Title:</span> {current.meta_title}</p>}
                  {current.meta_description && <p className="text-sm"><span className="text-muted-foreground">Desc:</span> {current.meta_description}</p>}
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
                  <div>
                    <p className="font-semibold mb-1">Please fix the following:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {Object.values(formErrors).map((msg, i) => <li key={i}>{msg}</li>)}
                    </ul>
                  </div>
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
                      placeholder="Acme Corp digital transformation"
                      className={formErrors.title ? "border-destructive" : ""} />
                  </Field>
                  <Field label="Slug" hint="Auto-filled from title. Used in the URL /home-case-studies/{slug}.">
                    <Input value={data.slug} onChange={e => setData("slug", e.target.value)} placeholder="acme-corp-dx" />
                  </Field>
                  <Field label="Subtitle (EN)">
                    <Input value={data.subtitle} onChange={e => setData("subtitle", e.target.value)} />
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Company Name (EN)"><Input value={data.company_name} onChange={e => setData("company_name", e.target.value)} placeholder="Acme Corp" /></Field>
                    <Field label="CEO Name (EN)"><Input value={data.ceo_name} onChange={e => setData("ceo_name", e.target.value)} placeholder="Jane Smith, CEO" /></Field>
                  </div>
                  <Field label="Tags (comma-separated)">
                    <Input value={data.tags} onChange={e => setData("tags", e.target.value)} placeholder="DX, Fintech" />
                  </Field>
                  <Field label="Description (EN)">
                    <ReactQuill theme="snow" value={data.hero_description} onChange={v => setData("hero_description", v)} />
                  </Field>
                  <Field label="Subject (EN)" hint='Shown as the "Subject" box on the detail page'>
                    <ReactQuill theme="snow" value={data.benefit} onChange={v => setData("benefit", v)} />
                  </Field>
                  <Field label="Implementation Effect (EN)">
                    <ReactQuill theme="snow" value={data.implementation} onChange={v => setData("implementation", v)} />
                  </Field>
                  <Field label="Content (EN)" hint="Long-form body at the bottom of the detail page">
                    <ReactQuill theme="snow" value={data.content} onChange={v => setData("content", v)} />
                  </Field>
                </TabsContent>

                <TabsContent value="ja" className="space-y-4">
                  <Field label="Title (JA)">
                    <Input value={data.title_ja} onChange={e => setData("title_ja", e.target.value)} />
                  </Field>
                  <Field label="Subtitle (JA)">
                    <Input value={data.subtitle_ja} onChange={e => setData("subtitle_ja", e.target.value)} />
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Company Name (JA)"><Input value={data.company_name_ja} onChange={e => setData("company_name_ja", e.target.value)} placeholder="株式会社アクメ" /></Field>
                    <Field label="CEO Name (JA)"><Input value={data.ceo_name_ja} onChange={e => setData("ceo_name_ja", e.target.value)} /></Field>
                  </div>
                  <Field label="Tags (JA, comma-separated)">
                    <Input value={data.tags_ja} onChange={e => setData("tags_ja", e.target.value)} />
                  </Field>
                  <Field label="Description (JA)">
                    <ReactQuill theme="snow" value={data.hero_description_ja} onChange={v => setData("hero_description_ja", v)} />
                  </Field>
                  <Field label="Subject (JA)">
                    <ReactQuill theme="snow" value={data.benefit_ja} onChange={v => setData("benefit_ja", v)} />
                  </Field>
                  <Field label="Implementation Effect (JA)">
                    <ReactQuill theme="snow" value={data.implementation_ja} onChange={v => setData("implementation_ja", v)} />
                  </Field>
                  <Field label="Content (JA)">
                    <ReactQuill theme="snow" value={data.content_ja} onChange={v => setData("content_ja", v)} />
                  </Field>
                </TabsContent>
              </Tabs>

              {/* Logo */}
              <SectionBox title="Company Logo (optional)">
                {mode === "edit" && current?.logo && (
                  <img src={current.logo.startsWith("http") ? current.logo : `/storage/${current.logo}`}
                    className="w-14 h-14 rounded-full border object-contain bg-white p-1 mb-2" alt="" />
                )}
                <Input type="file" accept="image/*" onChange={e => setData("logo", e.target.files?.[0] || null)} />
              </SectionBox>

              {/* Hero image */}
              <SectionBox title="Hero Image">
                {mode === "edit" && current?.hero_image && (
                  <img src={`/storage/${current.hero_image}`} className="h-28 rounded border object-cover mb-2" alt="" />
                )}
                <Input type="file" accept="image/*" onChange={e => setData("hero_image", e.target.files?.[0] || null)} />
                <p className="text-xs text-muted-foreground mt-1">Shown on homepage card and detail page. Max 4 MB.</p>
              </SectionBox>

              {/* Secondary image */}
              <SectionBox title="Secondary Image (optional)">
                {mode === "edit" && current?.secondary_image && (
                  <img src={`/storage/${current.secondary_image}`} className="h-28 rounded border object-cover mb-2" alt="" />
                )}
                <Input type="file" accept="image/*" onChange={e => setData("secondary_image", e.target.files?.[0] || null)} />
                <p className="text-xs text-muted-foreground mt-1">Shown in-body on the detail page.</p>
              </SectionBox>

              <SectionBox title="Display Order">
                <Field label="Sort Order" hint="Lower numbers show first on the homepage.">
                  <Input type="number" value={data.sort_order} onChange={e => setData("sort_order", Number(e.target.value))} />
                </Field>
              </SectionBox>

              <SeoFields
                data={{
                  meta_title: data.meta_title,
                  meta_title_ja: data.meta_title_ja,
                  meta_description: data.meta_description,
                  meta_description_ja: data.meta_description_ja,
                  meta_keywords: data.meta_keywords,
                  meta_keywords_ja: data.meta_keywords_ja,
                  og_image: data.og_image,
                }}
                setData={setSeoData}
                activeLang={langTab}
                mode={mode}
                currentOgImage={current?.og_image}
              />

              <Button disabled={processing} className="w-full mt-4" onClick={submit}>
                {mode === "edit" ? "Update Case Study" : "Save Case Study"}
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
            <TableHead className="text-white">Company</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {homeCaseStudies.length === 0 && (
            <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No home case studies yet.</TableCell></TableRow>
          )}
          {homeCaseStudies.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="font-medium">{s.title}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{s.slug}</TableCell>
              <TableCell className="text-sm">{s.company_name || "–"}</TableCell>
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

function Field({ label, children, error, hint }: { label: string; children: React.ReactNode; error?: string; hint?: string }) {
  return (
    <div className="space-y-1">
      <Label className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground/70 -mt-0.5">{hint}</p>}
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
