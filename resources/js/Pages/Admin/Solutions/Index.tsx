// resources/js/Pages/Admin/Solutions/Index.tsx
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { useForm, router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SeoFields from "@/components/SeoFields";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

/* ── TYPES ── */
interface Feature { title: string; title_ja?: string; subtitle: string; description: string; description_ja?: string; }
interface UseCase { title: string; title_ja?: string; subtitle?: string; subtitle_ja?: string; description: string; description_ja?: string; }
interface Industry { title: string; title_ja?: string; description: string; description_ja?: string; }
interface CaseStudy { title: string; title_ja?: string; client?: string; summary?: string; summary_ja?: string; result?: string; result_ja?: string; }
interface Faq { question: string; question_ja?: string; answer: string; answer_ja?: string; }
// Add PageData interface
interface PageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
}

interface Solution {
  id: number;
  title: string; title_ja?: string;
  slug: string;
  link: string;
  subtitle?: string; subtitle_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  hero_image?: null;
  // SEO
  meta_title?: string; meta_title_ja?: string;
  meta_description?: string; meta_description_ja?: string;
  meta_keywords?: string; meta_keywords_ja?: string;
  og_image?: string | null;
  features: Feature[];
  use_cases: UseCase[];
  industries: Industry[];
  case_studies: CaseStudy[];
  faqs: Faq[];
}

/* ── COMPONENT ── */
export default function Index({
  solutions,
  pageData,
}: {
  solutions: Solution[];
  pageData: PageData | null;
}) {
  const [pageOpen, setPageOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Solution | null>(null);
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [pageLang, setPageLang] = useState<"en" | "ja">("en");
  const [pageProcessing, setPageProcessing] = useState(false);
  const [pageFields, setPageFields] = useState({
    hero_title: "",
    hero_title_ja: "",
    hero_subtitle: "",
    hero_subtitle_ja: "",
  });
  const openPageSettings = () => {
    setPageFields({
      hero_title: pageData?.hero_title ?? "",
      hero_title_ja: pageData?.hero_title_ja ?? "",
      hero_subtitle: pageData?.hero_subtitle ?? "",
      hero_subtitle_ja: pageData?.hero_subtitle_ja ?? "",
    });
    setPageLang("en");
    setPageOpen(true);
  };

  const submitPage = () => {
    setPageProcessing(true);
    router.post(
      route("admin.solutions.updatePage"),
      pageFields,
      {
        onSuccess: () => { setPageOpen(false); setPageProcessing(false); },
        onError: () => setPageProcessing(false),
      }
    );
  };

  const { data, setData, reset, processing } = useForm({
    title: "", title_ja: "",
    subtitle: "", subtitle_ja: "",
    hero_description: "", hero_description_ja: "",
    slug: "",
    hero_image: null as File | null,
    link: "",
    // SEO
    meta_title: "", meta_title_ja: "",
    meta_description: "", meta_description_ja: "",
    meta_keywords: "", meta_keywords_ja: "",
    og_image: null as File | null,
    // Relations
    features: [] as any[],
    use_cases: [] as any[],
    industries: [] as any[],
    case_studies: [] as any[],
    faqs: [] as any[],
  });

  /* ── OPEN HELPERS ── */
  const openAdd = () => { reset(); setMode("add"); setCurrent(null); setOpen(true); };

  const openEdit = (s: Solution) => {
    setMode("edit"); setCurrent(s); setOpen(true);
    setData({
      title: s.title, title_ja: s.title_ja || "",
      slug: s.slug, link: s.link || "",
      subtitle: s.subtitle || "", subtitle_ja: s.subtitle_ja || "",
      hero_description: s.hero_description || "",
      hero_description_ja: s.hero_description_ja || "",
      hero_image: null,
      // SEO
      meta_title: s.meta_title || "", meta_title_ja: s.meta_title_ja || "",
      meta_description: s.meta_description || "", meta_description_ja: s.meta_description_ja || "",
      meta_keywords: s.meta_keywords || "", meta_keywords_ja: s.meta_keywords_ja || "",
      og_image: null,
      // Relations
      features: s.features || [],
      use_cases: s.use_cases || [],
      industries: s.industries || [],
      case_studies: s.case_studies || [],
      faqs: s.faqs || [],
    });
  };

  const openView = (s: Solution) => { setMode("view"); setCurrent(s); setOpen(true); };

  /* ── SUBMIT ── */
  const buildFormData = () => {
    const form = new FormData();
    const a = (k: string, v: string) => form.append(k, v ?? "");

    a("slug", data.slug);
    a("title", data.title); a("title_ja", data.title_ja);
    a("subtitle", data.subtitle); a("subtitle_ja", data.subtitle_ja);
    a("hero_description", data.hero_description);
    a("hero_description_ja", data.hero_description_ja);
    a("link", data.link);
    // SEO
    a("meta_title", data.meta_title); a("meta_title_ja", data.meta_title_ja);
    a("meta_description", data.meta_description);
    a("meta_description_ja", data.meta_description_ja);
    a("meta_keywords", data.meta_keywords);
    a("meta_keywords_ja", data.meta_keywords_ja);

    if (data.hero_image) form.append("hero_image", data.hero_image);
    if (data.og_image) form.append("og_image", data.og_image);

    form.append("features", JSON.stringify(data.features));
    form.append("use_cases", JSON.stringify(data.use_cases));
    form.append("case_studies", JSON.stringify(data.case_studies));
    form.append("industries", JSON.stringify(data.industries));
    form.append("faqs", JSON.stringify(data.faqs));
    return form;
  };

  const submitAdd = () => {
    router.post(route("admin.solutions.store"), buildFormData(), {
      onSuccess: () => { reset(); setOpen(false); },
    });
  };

  const submitUpdate = () => {
    if (!current) return;
    const form = buildFormData();
    form.append("_method", "PUT");
    router.post(route("admin.solutions.update", current.id), form, {
      onSuccess: () => { reset(); setOpen(false); },
    });
  };



  const deleteItem = (id: number) => {
    if (!confirm("Delete this solution?")) return;
    router.delete(route("admin.solutions.destroy", id), { preserveScroll: true });
  };

  /* ── ARRAY HELPERS ── */
  const addItem = (key: keyof typeof data, item: any) => setData(key, [...(data[key] as any[]), item]);
  const updateItem = (key: keyof typeof data, i: number, field: string, value: string) => {
    const u = [...(data[key] as any[])]; u[i][field] = value; setData(key, u);
  };
  const removeItem = (key: keyof typeof data, i: number) => {
    const u = [...(data[key] as any[])]; u.splice(i, 1); setData(key, u);
  };

  /* ── SEO setData bridge (SeoFields expects (key, value)) ── */
  const setSeoData = (key: string, value: any) => setData(key as any, value);

  /* ── RENDER ── */
  return (
    <Authenticated header={<h2 className="font-bold text-xl">Solutions</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Solutions</h1>

        {/* Buttons grouped on the right */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={openPageSettings}>
            <Settings className="w-4 h-4 mr-2" />
            Page Settings
          </Button>

          <Button onClick={openAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Solution
          </Button>
        </div>
      </div>


      <Sheet open={pageOpen} onOpenChange={setPageOpen}>
        <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Page Settings — Hero Section</SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-6">
            <Tabs value={pageLang} onValueChange={v => setPageLang(v as "en" | "ja")}>
              <TabsList className="mb-2">
                <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  English
                </TabsTrigger>
                <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Japanese
                </TabsTrigger>
              </TabsList>

              <TabsContent value="en" className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Title (EN)</Label>
                  <Input
                    value={pageFields.hero_title}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_title: e.target.value }))}
                    placeholder="Products"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Subtitle (EN)</Label>
                  <Input
                    value={pageFields.hero_subtitle}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                    placeholder="Transform your business with innovative solutions"
                  />
                </div>
              </TabsContent>

              <TabsContent value="ja" className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Title (JA)</Label>
                  <Input
                    value={pageFields.hero_title_ja}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_title_ja: e.target.value }))}
                    placeholder="ソリューション"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Subtitle (JA)</Label>
                  <Input
                    value={pageFields.hero_subtitle_ja}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle_ja: e.target.value }))}
                    placeholder="革新的なソリューションでビジネスを変革します"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button disabled={pageProcessing} className="w-full" onClick={submitPage}>
              {pageProcessing ? "Saving..." : "Save Page Settings"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── SHEET ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" ? "Add Solution" : mode === "edit" ? "Edit Solution" : "Solution Details"}
            </SheetTitle>
          </SheetHeader>

          {/* ── ADD / EDIT ── */}
          {mode !== "view" && (
            <div className="space-y-6 mt-6">
              {/* Lang toggle */}
              <div className="flex gap-2">
                <Button type="button" variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>English</Button>
                <Button type="button" variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>Japanese</Button>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="font-medium">Title</label>
                <Input
                  value={activeLang === "en" ? data.title : data.title_ja}
                  onChange={(e) => setData(activeLang === "en" ? "title" : "title_ja", e.target.value)}
                />
              </div>

              {/* Slug */}
              <div className="space-y-1">
                <label className="font-medium">Slug</label>
                <Input value={data.slug} onChange={(e) => setData("slug", e.target.value)} placeholder="my-solution-slug" />
              </div>

              {/* Link */}
              <div className="space-y-1">
                <label className="font-medium">Link</label>
                <Input value={data.link} onChange={(e) => setData("link", e.target.value)} placeholder="https://example.com" />
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="font-medium">Subtitle</label>
                <Input
                  value={activeLang === "en" ? data.subtitle : data.subtitle_ja}
                  onChange={(e) => setData(activeLang === "en" ? "subtitle" : "subtitle_ja", e.target.value)}
                />
              </div>

              {/* Hero Description */}
              <div className="space-y-1">
                <label className="font-medium">Hero Description</label>
                <ReactQuill
                  key={activeLang}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.hero_description : data.hero_description_ja}
                  onChange={(v) => setData(activeLang === "en" ? "hero_description" : "hero_description_ja", v)}
                />
              </div>

              {/* Hero Image */}
              <div className="space-y-1">
                {mode === "edit" && current?.hero_image && (
                  <img src={`/storage/${current.hero_image}`} className="h-32 rounded border object-contain mb-2" alt="Hero" />
                )}
                <label className="font-medium">{mode === "edit" ? "Replace Hero Image" : "Hero Image"}</label>
                <Input type="file" accept="image/*" onChange={(e) => setData("hero_image", e.target.files?.[0] || null)} />
              </div>

              {/* ══ SEO SECTION ══ */}
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
                activeLang={activeLang}
                mode={mode}
                currentOgImage={current?.og_image}
              />

              {/* Features */}
              <SectionBlock
                title="Features"
                items={data.features}
                onAdd={() => addItem("features", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={(i) => removeItem("features", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input
                      placeholder="Title"
                      value={activeLang === "en" ? item.title : item.title_ja || ""}
                      onChange={(e) => updateItem("features", i, activeLang === "en" ? "title" : "title_ja", e.target.value)}
                    />
                    <ReactQuill key={`${activeLang}-feat-${i}`} theme="snow" style={{ height: "180px", marginBottom: "50px" }}
                      value={activeLang === "en" ? item.description || "" : item.description_ja || ""}
                      onChange={(v) => updateItem("features", i, activeLang === "en" ? "description" : "description_ja", v)}
                    />
                  </div>
                )}
              />

              {/* Use Cases */}
              <SectionBlock
                title="Use Cases"
                items={data.use_cases}
                onAdd={() => addItem("use_cases", { title: "", title_ja: "", subtitle: "", subtitle_ja: "", description: "", description_ja: "" })}
                onRemove={(i) => removeItem("use_cases", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input placeholder="Title"
                      value={activeLang === "en" ? item.title : item.title_ja || ""}
                      onChange={(e) => updateItem("use_cases", i, activeLang === "en" ? "title" : "title_ja", e.target.value)}
                    />
                    <ReactQuill key={`${activeLang}-uc-${i}`} theme="snow" style={{ height: "180px", marginBottom: "50px" }}
                      value={activeLang === "en" ? item.description || "" : item.description_ja || ""}
                      onChange={(v) => updateItem("use_cases", i, activeLang === "en" ? "description" : "description_ja", v)}
                    />
                  </div>
                )}
              />

              {/* Case Studies */}
              <SectionBlock
                title="Case Studies"
                items={data.case_studies}
                onAdd={() => addItem("case_studies", { title: "", title_ja: "", summary: "", summary_ja: "" })}
                onRemove={(i) => removeItem("case_studies", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input placeholder="Title"
                      value={activeLang === "en" ? item.title : item.title_ja || ""}
                      onChange={(e) => updateItem("case_studies", i, activeLang === "en" ? "title" : "title_ja", e.target.value)}
                    />
                    <ReactQuill key={`${activeLang}-cs-${i}`} theme="snow" style={{ height: "180px", marginBottom: "50px" }}
                      value={activeLang === "en" ? item.summary || "" : item.summary_ja || ""}
                      onChange={(v) => updateItem("case_studies", i, activeLang === "en" ? "summary" : "summary_ja", v)}
                    />
                  </div>
                )}
              />

              {/* Industries */}
              <SectionBlock
                title="Industries"
                items={data.industries}
                onAdd={() => addItem("industries", { title: "", title_ja: "", description: "", description_ja: "" })}
                onRemove={(i) => removeItem("industries", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input placeholder="Title"
                      value={activeLang === "en" ? item.title : item.title_ja || ""}
                      onChange={(e) => updateItem("industries", i, activeLang === "en" ? "title" : "title_ja", e.target.value)}
                    />
                    <Input placeholder="Description"
                      value={activeLang === "en" ? item.description : item.description_ja || ""}
                      onChange={(e) => updateItem("industries", i, activeLang === "en" ? "description" : "description_ja", e.target.value)}
                    />
                  </div>
                )}
              />

              {/* FAQs */}
              <SectionBlock
                title="FAQs"
                items={data.faqs}
                onAdd={() => addItem("faqs", { question: "", question_ja: "", answer: "", answer_ja: "" })}
                onRemove={(i) => removeItem("faqs", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input placeholder="Question"
                      value={activeLang === "en" ? item.question : item.question_ja || ""}
                      onChange={(e) => updateItem("faqs", i, activeLang === "en" ? "question" : "question_ja", e.target.value)}
                    />
                    <ReactQuill key={`${activeLang}-faq-${i}`} theme="snow" style={{ height: "150px", marginBottom: "50px" }}
                      value={activeLang === "en" ? item.answer || "" : item.answer_ja || ""}
                      onChange={(v) => updateItem("faqs", i, activeLang === "en" ? "answer" : "answer_ja", v)}
                    />
                  </div>
                )}
              />

              <Button disabled={processing} className="w-full" onClick={mode === "edit" ? submitUpdate : submitAdd}>
                {mode === "edit" ? "Update Solution" : "Save Solution"}
              </Button>
            </div>
          )}

          {/* ── VIEW ── */}
          {mode === "view" && current && (
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="font-semibold text-lg">{current.title}</h3>
                <p className="text-muted-foreground">{current.subtitle}</p>
                <p className="text-gray-500 mt-1 text-xs">Slug: {current.slug}</p>
              </div>
              {current.hero_image && (
                <img src={`/storage/${current.hero_image}`} className="w-64 rounded border object-contain" alt="" />
              )}
              {/* SEO preview */}
              {(current.meta_title || current.meta_description) && (
                <div className="border rounded-xl p-4 bg-muted/20 space-y-2">
                  <p className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" /> SEO
                  </p>
                  {current.meta_title && (
                    <p className="text-sm"><span className="text-muted-foreground">Title:</span> {current.meta_title}</p>
                  )}
                  {current.meta_description && (
                    <p className="text-sm"><span className="text-muted-foreground">Description:</span> {current.meta_description}</p>
                  )}
                  {current.meta_keywords && (
                    <p className="text-sm"><span className="text-muted-foreground">Keywords:</span> {current.meta_keywords}</p>
                  )}
                  {current.og_image && (
                    <img src={`/storage/${current.og_image}`} className="h-24 rounded border object-cover mt-2" alt="OG" />
                  )}
                </div>
              )}
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
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {solutions.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{s.title}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{s.slug}</TableCell>
              <TableCell>
                {s.meta_title
                  ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Set</span>
                  : <span className="text-xs text-muted-foreground">Not set</span>}
              </TableCell>
              <TableCell className="space-x-2 text-center">
                <Button title="View" size="icon" onClick={() => openView(s)}><Eye className="w-4 h-4" /></Button>
                <Button title="Edit" size="icon" onClick={() => openEdit(s)}><Pencil className="w-4 h-4" /></Button>
                <Button title="Delete" size="icon" variant="destructive" onClick={() => deleteItem(s.id)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authenticated>
  );
}

/* ── REUSABLE SECTION BLOCK ── */
function SectionBlock({ title, items, onAdd, onRemove, render }: {
  title: string; items: any[];
  onAdd: () => void; onRemove: (i: number) => void;
  render: (item: any, i: number) => JSX.Element;
}) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
            {render(item, i)}
            <Button variant="destructive" size="sm" onClick={() => onRemove(i)}>Remove</Button>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-3" size="sm" onClick={onAdd}>+ Add {title}</Button>
    </div>
  );
}