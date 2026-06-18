import { useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
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
import { Plus, Pencil, Trash2, Settings } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SeoFields from "@/components/SeoFields";

interface CaseStudy {
  id: number;
  title: string; title_ja?: string;
  subtitle?: string; subtitle_ja?: string;
  slug: string;
  hero_description?: string; hero_description_ja?: string;
  content?: string; content_ja?: string;
  benefit?: string; benefit_ja?: string;
  implementation?: string; implementation_ja?: string;
  tags?: string;
  hero_image?: string | null;
  secondary_image?: string | null;
  meta_title?: string | null; meta_title_ja?: string | null;
  meta_description?: string | null; meta_description_ja?: string | null;
  meta_keywords?: string | null; meta_keywords_ja?: string | null;
  og_image?: string | null;
}

interface PageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
}

export default function Index() {
  const { caseStudies, pageData } = usePage<{
    caseStudies: CaseStudy[];
    pageData: PageData | null;
  }>().props;

  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<CaseStudy | null>(null);
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  // ── Page Settings state ──
  const [pageOpen, setPageOpen] = useState(false);
  const [pageLang, setPageLang] = useState<"en" | "ja">("en");
  const [pageProcessing, setPageProcessing] = useState(false);
  const [pageFields, setPageFields] = useState({
    hero_title:       "",
    hero_title_ja:    "",
    hero_subtitle:    "",
    hero_subtitle_ja: "",
  });

  const { data, setData, reset, processing } = useForm({
    title: "", title_ja: "",
    subtitle: "", subtitle_ja: "",
    slug: "",
    hero_description: "", hero_description_ja: "",
    content: "", content_ja: "",
    benefit: "", benefit_ja: "",
    implementation: "", implementation_ja: "",
    tags: "",
    hero_image: null as File | null,
    secondary_image: null as File | null,
    meta_title: "", meta_title_ja: "",
    meta_description: "", meta_description_ja: "",
    meta_keywords: "", meta_keywords_ja: "",
    og_image: null as File | null,
  });

  // ── Item sheet helpers ──
  const openAdd = () => { reset(); setMode("add"); setCurrent(null); setOpen(true); };

  const openEdit = (item: CaseStudy) => {
    setMode("edit"); setCurrent(item); setOpen(true);
    setData({
      title: item.title, title_ja: item.title_ja || "",
      subtitle: item.subtitle || "", subtitle_ja: item.subtitle_ja || "",
      slug: item.slug,
      hero_description: item.hero_description || "",
      hero_description_ja: item.hero_description_ja || "",
      content: item.content || "", content_ja: item.content_ja || "",
      benefit: item.benefit || "", benefit_ja: item.benefit_ja || "",
      implementation: item.implementation || "",
      implementation_ja: item.implementation_ja || "",
      tags: item.tags || "",
      hero_image: null, secondary_image: null,
      meta_title: item.meta_title || "", meta_title_ja: item.meta_title_ja || "",
      meta_description: item.meta_description || "",
      meta_description_ja: item.meta_description_ja || "",
      meta_keywords: item.meta_keywords || "",
      meta_keywords_ja: item.meta_keywords_ja || "",
      og_image: null,
    });
  };

  const buildForm = (withMethod?: string) => {
    const form = new FormData();
    if (withMethod) form.append("_method", withMethod);

    const textKeys = [
      "title", "title_ja", "subtitle", "subtitle_ja", "slug",
      "hero_description", "hero_description_ja", "content", "content_ja",
      "benefit", "benefit_ja", "implementation", "implementation_ja", "tags",
      "meta_title", "meta_title_ja", "meta_description", "meta_description_ja",
      "meta_keywords", "meta_keywords_ja",
    ] as const;
    textKeys.forEach((k) => form.append(k, data[k] ?? ""));

    if (data.hero_image)      form.append("hero_image", data.hero_image);
    if (data.secondary_image) form.append("secondary_image", data.secondary_image);
    if (data.og_image)        form.append("og_image", data.og_image);
    return form;
  };

  const submitAdd = () => {
    router.post(route("admin.casestudies.store"), buildForm(), {
      onSuccess: () => { reset(); setOpen(false); },
    });
  };

  const submitUpdate = () => {
    if (!current) return;
    router.post(route("admin.casestudies.update", current.id), buildForm("PUT"), {
      onSuccess: () => { reset(); setOpen(false); },
    });
  };

  const deleteItem = (id: number) => {
    if (!confirm("Delete this case study?")) return;
    router.delete(route("admin.casestudies.destroy", id));
  };

  // ── Page Settings helpers ──
  const openPageSettings = () => {
    setPageFields({
      hero_title:       pageData?.hero_title       ?? "",
      hero_title_ja:    pageData?.hero_title_ja    ?? "",
      hero_subtitle:    pageData?.hero_subtitle    ?? "",
      hero_subtitle_ja: pageData?.hero_subtitle_ja ?? "",
    });
    setPageLang("en");
    setPageOpen(true);
  };

  const submitPage = () => {
    setPageProcessing(true);
    router.post(
      route("admin.case_studies.updatePage"),
      pageFields,
      {
        onSuccess: () => { setPageOpen(false); setPageProcessing(false); },
        onError:   () => setPageProcessing(false),
      }
    );
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Case Studies</h2>}>

      {/* ── Top bar ── */}
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openPageSettings}>
            <Settings className="w-4 h-4 mr-2" /> Page Settings
          </Button>
          <Button onClick={openAdd}>
            <Plus className="w-4 h-4 mr-2" /> Add Case Study
          </Button>
        </div>
      </div>

      {/* ── Page Settings Sheet ── */}
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
                    placeholder="Case Studies"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Subtitle (EN)</Label>
                  <Input
                    value={pageFields.hero_subtitle}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                    placeholder="Real-world results from our client engagements"
                  />
                </div>
              </TabsContent>

              <TabsContent value="ja" className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Title (JA)</Label>
                  <Input
                    value={pageFields.hero_title_ja}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_title_ja: e.target.value }))}
                    placeholder="事例"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Subtitle (JA)</Label>
                  <Input
                    value={pageFields.hero_subtitle_ja}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle_ja: e.target.value }))}
                    placeholder="お客様との取り組みから得られた実際の成果"
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

      {/* ── Add / Edit / View Sheet ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Case Study"}
              {mode === "edit" && "Edit Case Study"}
              {mode === "view" && "Case Study Details"}
            </SheetTitle>
          </SheetHeader>

          {mode !== "view" && (
            <div className="space-y-6 mt-6">
              <div className="flex gap-2">
                <Button type="button" variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>English</Button>
                <Button type="button" variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>Japanese</Button>
              </div>

              <div>
                <label className="font-medium">Title</label>
                <Input
                  value={activeLang === "en" ? data.title : data.title_ja}
                  onChange={(e) => activeLang === "en" ? setData("title", e.target.value) : setData("title_ja", e.target.value)}
                />
              </div>

              <div>
                <label className="font-medium">Subtitle</label>
                <Input
                  value={activeLang === "en" ? data.subtitle : data.subtitle_ja}
                  onChange={(e) => activeLang === "en" ? setData("subtitle", e.target.value) : setData("subtitle_ja", e.target.value)}
                />
              </div>

              <div>
                <label className="font-medium">Slug</label>
                <Input value={data.slug} onChange={(e) => setData("slug", e.target.value)} />
              </div>

              <div>
                <label className="font-medium">Tag</label>
                <Input placeholder="Example: DX" value={data.tags} onChange={(e) => setData("tags", e.target.value)} />
              </div>

              <div>
                <label className="font-medium">Description Image</label>
                <Input type="file" onChange={(e) => setData("secondary_image", e.target.files?.[0] || null)} />
                {mode === "edit" && current?.secondary_image && (
                  <img src={`/storage/${current.secondary_image}`} className="h-32 rounded border mt-2" />
                )}
              </div>

              <div>
                <label className="font-medium">Descriptions</label>
                <ReactQuill key={activeLang} theme="snow" style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.hero_description : data.hero_description_ja}
                  onChange={(v) => activeLang === "en" ? setData("hero_description", v) : setData("hero_description_ja", v)}
                />
              </div>

              <div>
                <label className="font-medium">Benefit</label>
                <ReactQuill key={`benefit-${activeLang}`} theme="snow" style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.benefit : data.benefit_ja}
                  onChange={(v) => activeLang === "en" ? setData("benefit", v) : setData("benefit_ja", v)}
                />
              </div>

              <div>
                <label className="font-medium">Implementation</label>
                <ReactQuill key={`implementation-${activeLang}`} theme="snow" style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.implementation : data.implementation_ja}
                  onChange={(v) => activeLang === "en" ? setData("implementation", v) : setData("implementation_ja", v)}
                />
              </div>

              <div>
                <label className="font-medium">Content</label>
                <ReactQuill key={`content-${activeLang}`} theme="snow" style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.content : data.content_ja}
                  onChange={(v) => activeLang === "en" ? setData("content", v) : setData("content_ja", v)}
                />
              </div>

              <div>
                <label className="font-medium">Hero Image</label>
                {mode === "edit" && current?.hero_image && (
                  <img src={`/storage/${current.hero_image}`} className="h-32 rounded border mb-2" />
                )}
                <Input type="file" onChange={(e) => setData("hero_image", e.target.files?.[0] || null)} />
              </div>

              <SeoFields
                data={{
                  meta_title: data.meta_title, meta_title_ja: data.meta_title_ja,
                  meta_description: data.meta_description, meta_description_ja: data.meta_description_ja,
                  meta_keywords: data.meta_keywords, meta_keywords_ja: data.meta_keywords_ja,
                  og_image: data.og_image,
                }}
                setData={(key, value) => setData(key as any, value)}
                activeLang={activeLang}
                mode={mode}
                currentOgImage={current?.og_image}
              />

              <Button disabled={processing} className="w-full" onClick={mode === "edit" ? submitUpdate : submitAdd}>
                {mode === "edit" ? "Update Case Study" : "Save Case Study"}
              </Button>
            </div>
          )}

          {mode === "view" && current && (
            <div className="space-y-6 mt-6">
              <h3 className="text-xl font-semibold">{current.title}</h3>
              {current.hero_image && (
                <img src={`/storage/${current.hero_image}`} className="w-64 rounded border" />
              )}
              <div dangerouslySetInnerHTML={{ __html: current.hero_description || "" }} />
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Table ── */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Slug</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {caseStudies.map((c, i) => (
            <TableRow key={c.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{c.title}</TableCell>
              <TableCell>{c.slug}</TableCell>
              <TableCell className="text-center space-x-2">
                <Button size="icon" onClick={() => openEdit(c)}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="destructive" onClick={() => deleteItem(c.id)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Authenticated>
  );
}