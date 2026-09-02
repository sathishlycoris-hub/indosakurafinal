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
interface CaseStudy {
  title: string; title_ja?: string;
  slug?: string;
  subtitle?: string; subtitle_ja?: string;
  company_name?: string; company_name_ja?: string;
  ceo_name?: string; ceo_name_ja?: string;
  logo?: string | null;
  hero_image?: string | null;       // relative path — render as /storage/${hero_image}
  secondary_image?: string | null;  // relative path
  tags?: string; tags_ja?: string;
  hero_description?: string; hero_description_ja?: string;
  benefit?: string; benefit_ja?: string;               // "Subject" box on the show page
  implementation?: string; implementation_ja?: string; // "Implementation Effect" box on the show page
  content?: string; content_ja?: string;               // long-form body at bottom of show page
  meta_title?: string; meta_title_ja?: string;
  meta_description?: string; meta_description_ja?: string;
  meta_keywords?: string; meta_keywords_ja?: string;
  og_image?: string | null;
}
interface Faq { question: string; question_ja?: string; answer: string; answer_ja?: string; }
// Add PageData interface
interface PageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
}

// ★ NEW — matches availableBlogs from admin SolutionController::index
interface BlogOption {
  id: number;
  title: string;
  title_ja?: string | null;
  service_id: number | null;
  status: "published" | "draft";
}
interface AttachedBlog { id: number; }

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
  featured_blogs?: AttachedBlog[]; // ★ NEW — Laravel serializes featuredBlogs() as featured_blogs
}

/* ── COMPONENT ── */
export default function Index({
  solutions,
  pageData,
  availableBlogs = [], // ★ NEW — full blog picker list from admin SolutionController::index
}: {
  solutions: Solution[];
  pageData: PageData | null;
  availableBlogs?: BlogOption[];
}) {
  const [pageOpen, setPageOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Solution | null>(null);
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  // Separate state for case study File objects (not serialisable in useForm) — one map per upload slot
  const [caseStudyLogoFiles, setCaseStudyLogoFiles] = useState<Map<number, File>>(new Map());
  const [caseStudyHeroFiles, setCaseStudyHeroFiles] = useState<Map<number, File>>(new Map());
  const [caseStudySecondaryFiles, setCaseStudySecondaryFiles] = useState<Map<number, File>>(new Map());
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
    blog_ids: [] as number[], // ★ NEW — IDs of existing blogs featured on this solution
  });

  /* ── OPEN HELPERS ── */
  const openAdd = () => {
    reset();
    setCaseStudyLogoFiles(new Map());
    setCaseStudyHeroFiles(new Map());
    setCaseStudySecondaryFiles(new Map());
    setMode("add"); setCurrent(null); setOpen(true);
  };

  const openEdit = (s: Solution) => {
    setMode("edit"); setCurrent(s); setOpen(true);
    setCaseStudyLogoFiles(new Map());
    setCaseStudyHeroFiles(new Map());
    setCaseStudySecondaryFiles(new Map());
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
      blog_ids: Array.isArray(s.featured_blogs) ? s.featured_blogs.map(b => b.id) : [], // ★ NEW
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

    // Append case study files keyed by index — one field name per upload slot
    caseStudyLogoFiles.forEach((file, index) => form.append(`case_study_logos[${index}]`, file));
    caseStudyHeroFiles.forEach((file, index) => form.append(`case_study_hero_images[${index}]`, file));
    caseStudySecondaryFiles.forEach((file, index) => form.append(`case_study_secondary_images[${index}]`, file));

    form.append("features", JSON.stringify(data.features));
    form.append("use_cases", JSON.stringify(data.use_cases));
    form.append("case_studies", JSON.stringify(data.case_studies));
    form.append("industries", JSON.stringify(data.industries));
    form.append("faqs", JSON.stringify(data.faqs));
    // ★ NEW — featured blog IDs, sent as repeated blog_ids[] entries
    data.blog_ids.forEach(id => form.append("blog_ids[]", String(id)));
    return form;
  };

  const submitAdd = () => {
    router.post(route("admin.solutions.store"), buildFormData(), {
      onSuccess: () => {
        reset();
        setCaseStudyLogoFiles(new Map());
        setCaseStudyHeroFiles(new Map());
        setCaseStudySecondaryFiles(new Map());
        setOpen(false);
      },
    });
  };

  const submitUpdate = () => {
    if (!current) return;
    const form = buildFormData();
    form.append("_method", "PUT");
    router.post(route("admin.solutions.update", current.id), form, {
      onSuccess: () => {
        reset();
        setCaseStudyLogoFiles(new Map());
        setCaseStudyHeroFiles(new Map());
        setCaseStudySecondaryFiles(new Map());
        setOpen(false);
      },
    });
  };



  const deleteItem = (id: number) => {
    if (!confirm("Delete this solution?")) return;
    router.delete(route("admin.solutions.destroy", id), { preserveScroll: true });
  };

  /* ── ARRAY HELPERS ── */
  const addItem = (key: keyof typeof data, item: any) => setData(key, [...(data[key] as any[]), item]);

  // ★ NEW — toggle a blog's id in/out of the featured list
  const toggleBlogId = (id: number) => {
    setData("blog_ids", data.blog_ids.includes(id)
      ? data.blog_ids.filter(x => x !== id)
      : [...data.blog_ids, id]);
  };
  const updateItem = (key: keyof typeof data, i: number, field: string, value: string) => {
    const u = [...(data[key] as any[])]; u[i][field] = value; setData(key, u);
  };

  // Re-index a single file map after an item at `removedIndex` is spliced out
  const reindexFileMap = (map: Map<number, File>, removedIndex: number): Map<number, File> => {
    const next = new Map<number, File>();
    map.forEach((file, idx) => {
      if (idx < removedIndex) next.set(idx, file);
      else if (idx > removedIndex) next.set(idx - 1, file); // shift down
      // idx === removedIndex → dropped
    });
    return next;
  };

  const removeItem = (key: keyof typeof data, i: number) => {
    const u = [...(data[key] as any[])]; u.splice(i, 1); setData(key, u);

    // Case studies have three independent file slots — keep all three in sync
    if (key === "case_studies") {
      setCaseStudyLogoFiles(prev => reindexFileMap(prev, i));
      setCaseStudyHeroFiles(prev => reindexFileMap(prev, i));
      setCaseStudySecondaryFiles(prev => reindexFileMap(prev, i));
    }
  };

  // Handle logo file selection for a specific case study index
  const handleCaseStudyLogoChange = (index: number, file: File | null) => {
    setCaseStudyLogoFiles(prev => {
      const next = new Map(prev);
      if (file) next.set(index, file);
      else next.delete(index);
      return next;
    });
  };

  // Generic handler for hero / secondary image slots
  const handleCaseStudyFileChange = (
    setter: React.Dispatch<React.SetStateAction<Map<number, File>>>,
    index: number,
    file: File | null,
  ) => {
    setter(prev => {
      const next = new Map(prev);
      if (file) next.set(index, file); else next.delete(index);
      return next;
    });
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

              {/* Case Studies — same rich schema as India Desk case studies */}
              <SectionBlock
                title="Case Studies"
                items={data.case_studies}
                onAdd={() => addItem("case_studies", {
                  title: "", title_ja: "",
                  slug: "",
                  subtitle: "", subtitle_ja: "",
                  company_name: "", company_name_ja: "",
                  ceo_name: "", ceo_name_ja: "",
                  tags: "", tags_ja: "",
                  logo: null, hero_image: null, secondary_image: null,
                  hero_description: "", hero_description_ja: "",
                  benefit: "", benefit_ja: "",
                  implementation: "", implementation_ja: "",
                  content: "", content_ja: "",
                })}
                onRemove={(i) => removeItem("case_studies", i)}
                render={(item, i) => (
                  <div className="space-y-3">
                    {/* Logo upload block */}
                    <div className="border border-dashed border-primary/30 rounded-lg p-3 bg-primary/5">
                      <p className="text-xs font-semibold text-primary mb-2">Company Logo (optional)</p>
                      <div className="flex items-center gap-3">
                        {caseStudyLogoFiles.has(i) ? (
                          <img
                            src={URL.createObjectURL(caseStudyLogoFiles.get(i)!)}
                            alt="logo preview"
                            className="w-12 h-12 object-contain rounded-lg border bg-white p-1"
                          />
                        ) : item.logo ? (
                          <img
                            src={item.logo}
                            alt="current logo"
                            className="w-12 h-12 object-contain rounded-lg border bg-white p-1"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg border bg-white flex items-center justify-center text-muted-foreground text-xs text-center leading-tight p-1">
                            No logo
                          </div>
                        )}
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            className="text-xs"
                            onChange={e => handleCaseStudyLogoChange(i, e.target.files?.[0] ?? null)}
                          />
                          <p className="text-xs text-muted-foreground mt-1">PNG/JPG/SVG · Max 2 MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Title (EN)"><Input value={item.title} onChange={e => updateItem("case_studies", i, "title", e.target.value)} /></Field>
                      <Field label="Title (JA)"><Input value={item.title_ja || ""} onChange={e => updateItem("case_studies", i, "title_ja", e.target.value)} /></Field>
                    </div>

                    {/* Subtitle */}
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Subtitle (EN)"><Input value={item.subtitle || ""} onChange={e => updateItem("case_studies", i, "subtitle", e.target.value)} /></Field>
                      <Field label="Subtitle (JA)"><Input value={item.subtitle_ja || ""} onChange={e => updateItem("case_studies", i, "subtitle_ja", e.target.value)} /></Field>
                    </div>

                    {/* Company + CEO name */}
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Company Name (EN)"><Input value={item.company_name || ""} onChange={e => updateItem("case_studies", i, "company_name", e.target.value)} placeholder="Acme Corp" /></Field>
                      <Field label="Company Name (JA)"><Input value={item.company_name_ja || ""} onChange={e => updateItem("case_studies", i, "company_name_ja", e.target.value)} placeholder="株式会社アクメ" /></Field>
                      <Field label="CEO Name (EN)"><Input value={item.ceo_name || ""} onChange={e => updateItem("case_studies", i, "ceo_name", e.target.value)} placeholder="Jane Smith, CEO" /></Field>
                      <Field label="CEO Name (JA)"><Input value={item.ceo_name_ja || ""} onChange={e => updateItem("case_studies", i, "ceo_name_ja", e.target.value)} placeholder="ジェーン・スミス, CEO" /></Field>
                    </div>

                    {/* Slug + Tags */}
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Slug (auto from title if left blank)">
                        <Input value={item.slug || ""} onChange={e => updateItem("case_studies", i, "slug", e.target.value)} placeholder="acme-corp-expansion" />
                      </Field>
                      <Field label="Tags (comma-separated)">
                        <Input value={item.tags || ""} onChange={e => updateItem("case_studies", i, "tags", e.target.value)} placeholder="DX, Fintech" />
                      </Field>
                    </div>

                    {/* Hero image */}
                    <div className="border border-dashed rounded-lg p-3 bg-muted/10">
                      <p className="text-xs font-semibold mb-2">Hero Image (case study detail page)</p>
                      <div className="flex items-center gap-3">
                        {caseStudyHeroFiles.has(i) ? (
                          <img src={URL.createObjectURL(caseStudyHeroFiles.get(i)!)} className="w-16 h-10 object-cover rounded border" />
                        ) : item.hero_image ? (
                          <img src={`/storage/${item.hero_image}`} className="w-16 h-10 object-cover rounded border" />
                        ) : (
                          <div className="w-16 h-10 rounded border bg-white flex items-center justify-center text-muted-foreground text-[10px]">None</div>
                        )}
                        <Input type="file" accept="image/*" className="text-xs flex-1"
                          onChange={e => handleCaseStudyFileChange(setCaseStudyHeroFiles, i, e.target.files?.[0] ?? null)} />
                      </div>
                    </div>

                    {/* Main description shown below the title */}
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Description (EN)"><ReactQuill theme="snow" value={item.hero_description || ""} onChange={v => updateItem("case_studies", i, "hero_description", v)} /></Field>
                      <Field label="Description (JA)"><ReactQuill theme="snow" value={item.hero_description_ja || ""} onChange={v => updateItem("case_studies", i, "hero_description_ja", v)} /></Field>
                    </div>

                    {/* Subject / Implementation Effect boxes */}
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Subject (EN)" hint='Shown as the "Subject" box on the detail page'>
                        <ReactQuill theme="snow" value={item.benefit || ""} onChange={v => updateItem("case_studies", i, "benefit", v)} />
                      </Field>
                      <Field label="Subject (JA)">
                        <ReactQuill theme="snow" value={item.benefit_ja || ""} onChange={v => updateItem("case_studies", i, "benefit_ja", v)} />
                      </Field>
                      <Field label="Implementation Effect (EN)">
                        <ReactQuill theme="snow" value={item.implementation || ""} onChange={v => updateItem("case_studies", i, "implementation", v)} />
                      </Field>
                      <Field label="Implementation Effect (JA)">
                        <ReactQuill theme="snow" value={item.implementation_ja || ""} onChange={v => updateItem("case_studies", i, "implementation_ja", v)} />
                      </Field>
                    </div>

                    {/* Secondary image */}
                    <div className="border border-dashed rounded-lg p-3 bg-muted/10">
                      <p className="text-xs font-semibold mb-2">Secondary Image (optional, shown in-body)</p>
                      <div className="flex items-center gap-3">
                        {caseStudySecondaryFiles.has(i) ? (
                          <img src={URL.createObjectURL(caseStudySecondaryFiles.get(i)!)} className="w-16 h-10 object-cover rounded border" />
                        ) : item.secondary_image ? (
                          <img src={`/storage/${item.secondary_image}`} className="w-16 h-10 object-cover rounded border" />
                        ) : (
                          <div className="w-16 h-10 rounded border bg-white flex items-center justify-center text-muted-foreground text-[10px]">None</div>
                        )}
                        <Input type="file" accept="image/*" className="text-xs flex-1"
                          onChange={e => handleCaseStudyFileChange(setCaseStudySecondaryFiles, i, e.target.files?.[0] ?? null)} />
                      </div>
                    </div>

                    {/* Long-form content at the bottom of the detail page */}
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Content (EN)"><ReactQuill theme="snow" value={item.content || ""} onChange={v => updateItem("case_studies", i, "content", v)} /></Field>
                      <Field label="Content (JA)"><ReactQuill theme="snow" value={item.content_ja || ""} onChange={v => updateItem("case_studies", i, "content_ja", v)} /></Field>
                    </div>
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

              {/* ★ NEW — Featured Blogs: pick from existing blogs (authored
                  under their actual parent Service) to show in a "Related
                  Blogs" card grid on this solution's public page.
                  Many-to-many — a blog can be featured on multiple
                  solutions with no data duplication. */}
              <div className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-sm">Featured Blogs</h3>
                  <p className="text-xs text-muted-foreground">
                    Check the blogs to show on this solution's page. Blogs are authored under their parent Service
                    (Blogs admin section) — this just features existing ones here too. A blog can be featured on
                    multiple solutions at once.
                  </p>
                </div>

                {availableBlogs.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">
                    No blogs found. Create some first in the Blogs admin section.
                  </p>
                ) : (
                  <div className="max-h-56 overflow-y-auto border rounded-md divide-y">
                    {availableBlogs.map((blog) => {
                      const checked = data.blog_ids.includes(blog.id);

                      return (
                        <label
                          key={blog.id}
                          className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/40 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleBlogId(blog.id)}
                            className="h-4 w-4"
                          />
                          <span className="flex-1 truncate">
                            {blog.title}
                            {blog.status === "draft" && (
                              <span className="ml-2 text-[10px] uppercase tracking-wide text-amber-600 font-semibold">Draft</span>
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

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

/* ── FIELD WRAPPER ── */
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {hint && <p className="text-[11px] text-muted-foreground -mt-0.5">{hint}</p>}
      {children}
    </div>
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