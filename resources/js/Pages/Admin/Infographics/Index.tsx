// resources/js/Pages/Admin/Infographics/Index.tsx
// Changes vs original:
//   1. Added SEO fields to useForm
//   2. Added <SeoFields> inside the Add/Edit form
//   3. SEO fields passed to post / router.post

import { useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Eye, Pencil, Trash2, Search, X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SeoFields from "@/components/SeoFields"; // ← import


interface TocItem { label: string; }
interface PageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
}
interface Infographic {
  id: number;
  title: string; title_ja?: string;
  slug: string;
  short_description?: string; short_description_ja?: string;
  content?: string; content_ja?: string;
  table_of_contents?: TocItem[] | null;
  table_of_contents_ja?: TocItem[] | null;
  category?: string; category_ja?: string;
  author?: string; author_ja?: string;
  published_date: string;
  status: "published" | "draft";
  image?: string | null;
  infographic_image?: string | null;
  // SEO
  meta_title?: string | null; meta_title_ja?: string | null;
  meta_description?: string | null; meta_description_ja?: string | null;
  meta_keywords?: string | null; meta_keywords_ja?: string | null;
  og_image?: string | null;
}

export default function AdminInfographicsIndex() {
  const { infographics, pageData } = usePage<{
  infographics: Infographic[];
  pageData: PageData | null;
}>().props;

  const [pageOpen, setPageOpen] = useState(false);
  const [pageLang, setPageLang] = useState<"en" | "ja">("en");
  const [pageProcessing, setPageProcessing] = useState(false);
  const [pageFields, setPageFields] = useState({
    hero_title: "",
    hero_title_ja: "",
    hero_subtitle: "",
    hero_subtitle_ja: "",
  });
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Infographic | null>(null);
  const [search, setSearch] = useState("");
  const [tocEn, setTocEn] = useState<string[]>([]);
  const [tocJa, setTocJa] = useState<string[]>([]);

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
      route("admin.infographics.updatePage"),
      pageFields,
      {
        onSuccess: () => { setPageOpen(false); setPageProcessing(false); },
        onError: () => setPageProcessing(false),
      }
    );
  };

  const { data, setData, post, reset, processing } = useForm({
    slug: "",
    title: "", title_ja: "",
    category: "", category_ja: "",
    short_description: "", short_description_ja: "",
    content: "", content_ja: "",
    table_of_contents: "",
    table_of_contents_ja: "",
    author: "", author_ja: "",
    published_date: "",
    status: "draft" as "draft" | "published",
    image: null as File | null,
    infographic_image: null as File | null,
    // SEO
    meta_title: "", meta_title_ja: "",
    meta_description: "", meta_description_ja: "",
    meta_keywords: "", meta_keywords_ja: "",
    og_image: null as File | null,
  });

  const filtered = infographics.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return item.title?.toLowerCase().includes(q) || item.status?.toLowerCase().includes(q);
  });

  const formatDate = (d: string) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const syncToc = (en: string[], ja: string[]) => {
    setData("table_of_contents", JSON.stringify(en.map((label) => ({ label }))));
    setData("table_of_contents_ja", JSON.stringify(ja.map((label) => ({ label }))));
  };

  const addTocItem = () => {
    const updated = activeLang === "en" ? [...tocEn, ""] : [...tocJa, ""];
    if (activeLang === "en") { setTocEn(updated); syncToc(updated, tocJa); }
    else { setTocJa(updated); syncToc(tocEn, updated); }
  };

  const updateTocItem = (index: number, value: string) => {
    if (activeLang === "en") {
      const updated = tocEn.map((v, i) => (i === index ? value : v));
      setTocEn(updated); syncToc(updated, tocJa);
    } else {
      const updated = tocJa.map((v, i) => (i === index ? value : v));
      setTocJa(updated); syncToc(tocEn, updated);
    }
  };

  const removeTocItem = (index: number) => {
    if (activeLang === "en") {
      const updated = tocEn.filter((_, i) => i !== index);
      setTocEn(updated); syncToc(updated, tocJa);
    } else {
      const updated = tocJa.filter((_, i) => i !== index);
      setTocJa(updated); syncToc(tocEn, updated);
    }
  };

  const openAdd = () => { reset(); setTocEn([]); setTocJa([]); setMode("add"); setCurrent(null); setOpen(true); };

  const openEdit = (item: Infographic) => {
    setMode("edit"); setCurrent(item); setOpen(true);
    const en = (item.table_of_contents ?? []).map((t) => t.label);
    const ja = (item.table_of_contents_ja ?? []).map((t) => t.label);
    setTocEn(en); setTocJa(ja);
    setData({
      slug: item.slug || "",
      title: item.title || "", title_ja: item.title_ja || "",
      category: item.category || "", category_ja: item.category_ja || "",
      short_description: item.short_description || "",
      short_description_ja: item.short_description_ja || "",
      content: item.content || "", content_ja: item.content_ja || "",
      table_of_contents: JSON.stringify(en.map((label) => ({ label }))),
      table_of_contents_ja: JSON.stringify(ja.map((label) => ({ label }))),
      author: item.author || "", author_ja: item.author_ja || "",
      published_date: item.published_date || "",
      status: item.status || "draft",
      image: null, infographic_image: null,
      // SEO
      meta_title: item.meta_title || "", meta_title_ja: item.meta_title_ja || "",
      meta_description: item.meta_description || "",
      meta_description_ja: item.meta_description_ja || "",
      meta_keywords: item.meta_keywords || "",
      meta_keywords_ja: item.meta_keywords_ja || "",
      og_image: null,
    });
  };

  const openView = (item: Infographic) => { setMode("view"); setCurrent(item); setOpen(true); };

  const submitAdd = () => {
    post(route("admin.infographics.store"), {
      forceFormData: true,
      onSuccess: () => { reset(); setOpen(false); },
    });
  };

  const submitUpdate = () => {
    if (!current) return;
    router.post(
      route("admin.infographics.update", current.slug),
      { _method: "PUT", ...data },
      { forceFormData: true, onSuccess: () => { reset(); setOpen(false); } }
    );
  };

  const deleteItem = (item: Infographic) => {
    if (confirm("Delete this infographic?")) {
      router.delete(route("admin.infographics.destroy", item.slug));
    }
  };

  const activeToc = activeLang === "en" ? tocEn : tocJa;

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-bold">Infographics</h2>}>
      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Infographics</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={openPageSettings}>
              <Settings className="w-4 h-4 mr-2" /> Page Settings
            </Button>
            <Button onClick={openAdd}>
              <Plus className="w-4 h-4 mr-2" /> Add Infographic
            </Button>
          </div>
        </div>
        <div className="mb-4 max-w-sm relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search infographics..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
              placeholder="Infographics"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Hero Subtitle (EN)</Label>
            <Input
              value={pageFields.hero_subtitle}
              onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle: e.target.value }))}
              placeholder="Visual insights and data-driven stories from our experts"
            />
          </div>
        </TabsContent>

        <TabsContent value="ja" className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Hero Title (JA)</Label>
            <Input
              value={pageFields.hero_title_ja}
              onChange={e => setPageFields(prev => ({ ...prev, hero_title_ja: e.target.value }))}
              placeholder="インフォグラフィックス"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Hero Subtitle (JA)</Label>
            <Input
              value={pageFields.hero_subtitle_ja}
              onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle_ja: e.target.value }))}
              placeholder="専門家によるビジュアルインサイト"
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

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Infographic"}
              {mode === "edit" && "Edit Infographic"}
              {mode === "view" && "View Infographic"}
            </SheetTitle>
          </SheetHeader>

          {/* VIEW */}
          {mode === "view" && current && (
            <div className="space-y-4 mt-6">
              <p><strong>Title:</strong> {current.title}</p>
              <p><strong>Status:</strong> {current.status}</p>
              {current.table_of_contents && current.table_of_contents.length > 0 && (
                <div>
                  <strong>Table of Contents:</strong>
                  <ol className="list-decimal pl-5 mt-1 space-y-1">
                    {current.table_of_contents.map((t, i) => <li key={i} className="text-sm">{t.label}</li>)}
                  </ol>
                </div>
              )}
              {current.image && (
                <div>
                  <strong>Cover Image:</strong>
                  <img src={`/storage/${current.image}`} className="mt-2 h-40 rounded-md border object-contain" />
                </div>
              )}
            </div>
          )}

          {/* ADD / EDIT */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">
              <div className="flex gap-3 mb-6">
                <Button type="button" variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>Japanese</Button>
                <Button type="button" variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>English</Button>
              </div>

              <div className="space-y-1">
                <label className="font-medium">Title</label>
                <Input placeholder="Title"
                  value={activeLang === "en" ? data.title : data.title_ja}
                  onChange={(e) => activeLang === "en" ? setData("title", e.target.value) : setData("title_ja", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium">Slug</label>
                <Input placeholder="Slug" value={data.slug} onChange={(e) => setData("slug", e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="font-medium">Short Description</label>
                <Textarea placeholder="Short description"
                  value={activeLang === "en" ? data.short_description : data.short_description_ja}
                  onChange={(e) => activeLang === "en" ? setData("short_description", e.target.value) : setData("short_description_ja", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Table of Contents ({activeLang === "en" ? "English" : "Japanese"})</label>
                <div className="space-y-2">
                  {activeToc.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-6 text-right flex-shrink-0">{i + 1}.</span>
                      <Input value={item} placeholder={`TOC item ${i + 1}`} onChange={(e) => updateTocItem(i, e.target.value)} className="flex-1" />
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeTocItem(i)} className="text-red-500 hover:text-red-700 flex-shrink-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addTocItem}>
                  <Plus className="w-3 h-3 mr-1" /> Add TOC Item
                </Button>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Content</label>
                <ReactQuill key={activeLang} theme="snow" style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.content : data.content_ja}
                  onChange={(value) => activeLang === "en" ? setData("content", value) : setData("content_ja", value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium">Status</label>
                <Select value={data.status} onValueChange={(v) => setData("status", v as "published" | "draft")}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mode === "edit" && current?.image && (
                <div className="space-y-2">
                  <label className="font-medium">Existing Cover Image</label>
                  <img src={`/storage/${current.image}`} className="h-32 rounded-md border object-contain" />
                </div>
              )}
              <div className="space-y-1">
                <label className="font-medium">{mode === "edit" ? "Replace Cover Image" : "Upload Cover Image"}</label>
                <p className="text-xs text-muted-foreground">Shown as the card thumbnail in the listing.</p>
                <Input type="file" accept="image/*" onChange={(e) => setData("image", e.target.files?.[0] || null)} />
              </div>

              {mode === "edit" && current?.infographic_image && (
                <div className="space-y-2">
                  <label className="font-medium">Existing Infographic Image</label>
                  <img src={`/storage/${current.infographic_image}`} className="w-full max-h-64 rounded-md border object-contain" />
                </div>
              )}
              <div className="space-y-1">
                <label className="font-medium">{mode === "edit" ? "Replace Infographic Image" : "Upload Infographic Image"}</label>
                <p className="text-xs text-muted-foreground">The tall detailed infographic shown on the detail page.</p>
                <Input type="file" accept="image/*" onChange={(e) => setData("infographic_image", e.target.files?.[0] || null)} />
              </div>

              {/* ── SEO FIELDS ── */}
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

              <Button className="w-full" onClick={mode === "edit" ? submitUpdate : submitAdd} disabled={processing}>
                {mode === "edit" ? "Update Infographic" : "Save Infographic"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Cover</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {filtered.length === 0 && (
            <TableRow><TableCell colSpan={5} className="text-center py-6">No records found</TableCell></TableRow>
          )}
          {filtered.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {item.image
                  ? <img src={`/storage/${item.image}`} className="h-10 w-16 object-cover rounded" />
                  : <div className="h-10 w-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">No img</div>
                }
              </TableCell>
              <TableCell className="max-w-xs truncate">{item.title}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="space-x-2 text-center">
                <Button title="View" size="icon" onClick={() => openView(item)}><Eye className="w-4 h-4" /></Button>
                <Button title="Edit" size="icon" onClick={() => openEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button title="Delete" size="icon" variant="destructive" onClick={() => deleteItem(item)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthenticatedLayout>
  );
}