import { useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
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

interface TocItem { label: string; }

interface Infographic {
  id: number;
  title: string;
  title_ja?: string;
  short_description?: string;
  short_description_ja?: string;
  content?: string;
  content_ja?: string;
  table_of_contents?: TocItem[] | null;
  table_of_contents_ja?: TocItem[] | null;
  category?: string;
  category_ja?: string;
  author?: string;
  author_ja?: string;
  published_date: string;
  status: "published" | "draft";
  image?: string | null;
  infographic_image?: string | null;
}

export default function AdminInfographicsIndex() {
  const { infographics } = usePage<{ infographics: Infographic[] }>().props;

  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Infographic | null>(null);
  const [search, setSearch] = useState("");

  // Local TOC state (arrays, converted to JSON on submit)
  const [tocEn, setTocEn] = useState<string[]>([]);
  const [tocJa, setTocJa] = useState<string[]>([]);

  const { data, setData, post, reset, processing } = useForm({
    title: "", title_ja: "",
    category: "", category_ja: "",
    short_description: "", short_description_ja: "",
    content: "", content_ja: "",
    table_of_contents: "",    // JSON string
    table_of_contents_ja: "", // JSON string
    author: "", author_ja: "",
    published_date: "",
    status: "draft" as "draft" | "published",
    image: null as File | null,
    infographic_image: null as File | null,
  });

  const filtered = infographics.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.status?.toLowerCase().includes(q)
    );
  });

  const formatDate = (d: string) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // Sync TOC arrays → JSON in form data
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

  const openAdd = () => {
    reset(); setTocEn([]); setTocJa([]);
    setMode("add"); setCurrent(null); setOpen(true);
  };

  const openEdit = (item: Infographic) => {
    setMode("edit"); setCurrent(item); setOpen(true);
    const en = (item.table_of_contents ?? []).map((t) => t.label);
    const ja = (item.table_of_contents_ja ?? []).map((t) => t.label);
    setTocEn(en); setTocJa(ja);
    setData({
      title: item.title || "",
      title_ja: item.title_ja || "",
      category: item.category || "",
      category_ja: item.category_ja || "",
      short_description: item.short_description || "",
      short_description_ja: item.short_description_ja || "",
      content: item.content || "",
      content_ja: item.content_ja || "",
      table_of_contents: JSON.stringify(en.map((label) => ({ label }))),
      table_of_contents_ja: JSON.stringify(ja.map((label) => ({ label }))),
      author: item.author || "",
      author_ja: item.author_ja || "",
      published_date: item.published_date || "",
      status: item.status || "draft",
      image: null,
      infographic_image: null,
    });
  };

  const openView = (item: Infographic) => {
    setMode("view"); setCurrent(item); setOpen(true);
  };

  const submitAdd = () => {
    post(route("admin.infographics.store"), {
      forceFormData: true,
      onSuccess: () => { reset(); setOpen(false); },
    });
  };

  const submitUpdate = () => {
    if (!current) return;
    router.post(
      route("admin.infographics.update", current.id),
      { _method: "PUT", ...data },
      { forceFormData: true, onSuccess: () => { reset(); setOpen(false); } }
    );
  };

  const deleteItem = (id: number) => {
    if (confirm("Delete this infographic?")) {
      router.delete(route("admin.infographics.destroy", id));
    }
  };

  const activeToc = activeLang === "en" ? tocEn : tocJa;

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-bold">Infographics</h2>}>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Infographics</h1>
          <Button onClick={openAdd}>
            <Plus className="w-4 h-4 mr-2" /> Add Infographic
          </Button>
        </div>
        <div className="mb-4 max-w-sm relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text" placeholder="Search infographics..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* SHEET */}
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
              {/* <p><strong>Category:</strong> {current.category}</p> */}
              {/* <p><strong>Author:</strong> {current.author}</p> */}
              <p><strong>Status:</strong> {current.status}</p>
              {/* <p><strong>Date:</strong> {formatDate(current.published_date)}</p> */}
              {current.table_of_contents && current.table_of_contents.length > 0 && (
                <div>
                  <strong>Table of Contents:</strong>
                  <ol className="list-decimal pl-5 mt-1 space-y-1">
                    {current.table_of_contents.map((t, i) => (
                      <li key={i} className="text-sm">{t.label}</li>
                    ))}
                  </ol>
                </div>
              )}
              {current.short_description && (
                <div><strong>Short Description:</strong><p>{current.short_description}</p></div>
              )}
              {current.content && (
                <div>
                  <strong>Content:</strong>
                  <div className="prose mt-2 max-w-none" dangerouslySetInnerHTML={{ __html: current.content }} />
                </div>
              )}
              {current.image && (
                <div>
                  <strong>Cover Image:</strong>
                  <img src={`/storage/${current.image}`} className="mt-2 h-40 rounded-md border object-contain" />
                </div>
              )}
              {current.infographic_image && (
                <div>
                  <strong>Infographic Image:</strong>
                  <img src={`/storage/${current.infographic_image}`} className="mt-2 w-full rounded-md border object-contain" />
                </div>
              )}
            </div>
          )}

          {/* ADD / EDIT */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">
              {/* Language toggle */}
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

              {/* <div className="space-y-1">
                <label className="font-medium">Category</label>
                <Input
                  value={activeLang === "en" ? data.category : data.category_ja}
                  onChange={(e) => activeLang === "en" ? setData("category", e.target.value) : setData("category_ja", e.target.value)}
                />
              </div> */}

              <div className="space-y-1">
                <label className="font-medium">Short Description</label>
                <Textarea placeholder="Short description"
                  value={activeLang === "en" ? data.short_description : data.short_description_ja}
                  onChange={(e) => activeLang === "en" ? setData("short_description", e.target.value) : setData("short_description_ja", e.target.value)}
                />
              </div>

              {/* Table of Contents */}
              <div className="space-y-2">
                <label className="font-medium">Table of Contents ({activeLang === "en" ? "English" : "Japanese"})</label>
                <div className="space-y-2">
                  {activeToc.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-6 text-right flex-shrink-0">{i + 1}.</span>
                      <Input
                        value={item}
                        placeholder={`TOC item ${i + 1}`}
                        onChange={(e) => updateTocItem(i, e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" size="icon" variant="ghost"
                        onClick={() => removeTocItem(i)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
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
                <ReactQuill key={activeLang} theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.content : data.content_ja}
                  onChange={(value) => activeLang === "en" ? setData("content", value) : setData("content_ja", value)}
                />
              </div>

              {/* <div className="space-y-1">
                <label className="font-medium">Author</label>
                <Input
                  value={activeLang === "en" ? data.author : data.author_ja}
                  onChange={(e) => activeLang === "en" ? setData("author", e.target.value) : setData("author_ja", e.target.value)}
                />
              </div> */}

              {/* <div className="space-y-1">
                <label className="font-medium">Published Date</label>
                <DatePicker value={data.published_date} onChange={(value) => setData("published_date", value)} />
              </div> */}

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

              {/* Cover Image */}
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

              {/* Infographic Image */}
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

              <Button className="w-full" onClick={mode === "edit" ? submitUpdate : submitAdd} disabled={processing}>
                {mode === "edit" ? "Update Infographic" : "Save Infographic"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* TABLE */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Cover</TableHead>
            <TableHead className="text-white">Title</TableHead>
            {/* <TableHead className="text-white">Category</TableHead> */}
            <TableHead className="text-white">Status</TableHead>
            {/* <TableHead className="text-white">Date</TableHead> */}
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {filtered.length === 0 && (
            <TableRow><TableCell colSpan={7} className="text-center py-6">No records found</TableCell></TableRow>
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
              {/* <TableCell>{item.category}</TableCell> */}
              <TableCell>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${item.status === "published" ? "bg-white-100 text-gray-700" : "bg-white  -100 text-gray-700"}`}>
                  {item.status}
                </span>
              </TableCell>
              {/* <TableCell>{formatDate(item.published_date)}</TableCell> */}
              <TableCell className="space-x-2 text-center">
                <Button title="View" size="icon" onClick={() => openView(item)}><Eye className="w-4 h-4" /></Button>
                <Button title="Edit" size="icon" onClick={() => openEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button title="Delete" size="icon" variant="destructive" onClick={() => deleteItem(item.id)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthenticatedLayout>
  );
}