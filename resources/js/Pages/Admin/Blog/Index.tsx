import { useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Eye, Pencil, Trash2, Search, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";

interface PageFaq { question: string; question_ja?: string; answer: string; answer_ja?: string; }

interface Blog {
  id: number;
  slug: string;
  title: string;
  title_ja?: string;

  short_description: string;
  short_description_ja?: string;

  content?: string;
  content_ja?: string;

  category: string;
  category_ja?: string;

  status: "published" | "draft";
  published_date: string;

  author?: string;
  author_ja?: string;

  image?: string | null;
  page_faqs: PageFaq[];
}

export default function AdminBlogIndex() {
  const { blogs } = usePage<{ blogs: Blog[] }>().props;
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Blog | null>(null);
  const [search, setSearch] = useState("");

  const { data, setData, post, reset, processing } = useForm({
    title: "",
    title_ja: "",
    slug: "",

    category: "",
    category_ja: "",

    short_description: "",
    short_description_ja: "",

    content: "",
    content_ja: "",

    author: "",
    author_ja: "",
    published_date: "",
    status: "draft",

    image: null as File | null,
    page_faqs: [] as PageFaq[],
  });

  /* ================= SEARCH FILTER ================= */

  const filteredBlogs = blogs.filter((b) => {
    if (!search) return true;

    const q = search.toLowerCase();

    return (
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.status.toLowerCase().includes(q) ||
      b.published_date.includes(q)
    );
  });

  const toPageFaq = (r: any): PageFaq => ({
    question: r.question ?? "",
    question_ja: r.question_ja ?? "",
    answer: r.answer ?? "",
    answer_ja: r.answer_ja ?? "",
  });
  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (blog: Blog) => {
    setMode("edit");
    setCurrent(blog);
    setOpen(true);

    setData({
      title: blog.title || "",
      title_ja: blog.title_ja || "",
      slug: blog.slug || "",

      category: blog.category || "",
      category_ja: blog.category_ja || "",

      short_description: blog.short_description || "",
      short_description_ja: blog.short_description_ja || "",

      content: blog.content || "",
      content_ja: blog.content_ja || "",

      author: blog.author || "",
      author_ja: blog.author_ja || "",
      published_date: blog.published_date || "",
      status: blog.status || "",

      image: null,
      page_faqs: Array.isArray(blog.page_faqs) ? blog.page_faqs.map(toPageFaq) : [],
    });
  };

  /* ================= OPEN VIEW ================= */
  const openView = (blog: Blog) => {
    setMode("view");
    setCurrent(blog);
    setOpen(true);
  };

  /* ================= ARRAY HELPERS ================= */
  const addItem = (k: keyof typeof data, item: any) => setData(k, [...(data[k] as any[]), item]);
  const removeItem = (k: keyof typeof data, i: number) => {
    const a = [...(data[k] as any[])]; a.splice(i, 1); setData(k, a);
  };
  const updateItem = (k: keyof typeof data, i: number, field: string, val: string) => {
    const a = [...(data[k] as any[])]; a[i][field] = val; setData(k, a);
  };

  /* ================= SAVE ================= */
  const submitAdd = () => {
    const formData = new FormData();

    // Append all text fields
    Object.keys(data).forEach((key) => {
      if (key !== "image" && key !== "page_faqs") {
        formData.append(key, (data as any)[key] ?? "");
      }
    });

    // Append file if it exists
    if (data.image) {
      formData.append("image", data.image);
    }

    // Stringify arrays so Laravel's controller can receive it properly
    formData.append("page_faqs", JSON.stringify(data.page_faqs));

    router.post(route("admin.blogs.store"), formData, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const submitUpdate = () => {
    if (!current) return;

    const formData = new FormData();
    formData.append("_method", "PUT");

    // Append all text fields
    Object.keys(data).forEach((key) => {
      if (key !== "image" && key !== "page_faqs") {
        formData.append(key, (data as any)[key] ?? "");
      }
    });

    if (data.image) {
      formData.append("image", data.image);
    }

    formData.append("page_faqs", JSON.stringify(data.page_faqs));
    router.post(route("admin.blogs.update", current.id), formData, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  /* ================= DELETE ================= */
  const deleteBlog = (id: number) => {
    if (confirm("Delete this blog?")) {
      router.delete(route("admin.blogs.destroy", id));
    }
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  console.warn({ current });
  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-bold">Blogs</h2>}>

      {/* HEADER */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Blogs</h1>

          <Button onClick={openAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </div>

        {/* SEARCH FILTER */}
        <div className="mb-4 max-w-sm relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* ================= SHEET ================= */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Blog"}
              {mode === "edit" && "Edit Blog"}
              {mode === "view" && "View Blog"}
            </SheetTitle>
          </SheetHeader>

          {/* ================= VIEW ================= */}
          {mode === "view" && current && (
            <div className="space-y-4 mt-6">
              <p><strong>Title:</strong> {current.title}</p>
              <p><strong>Category:</strong> {current.category}</p>
              <p><strong>Status:</strong> {current.status}</p>
              <p>
                <strong>Date:</strong>{" "}
                {formatDate(current.published_date)}
              </p>

              <div>
                <strong>Short Description:</strong>
                <p>{current.short_description || "No Description available"}</p>
              </div>

              <div>
                <strong>Content:</strong>

                {current.content ? (
                  <div
                    className="prose mt-2 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: current.content,
                    }}
                  />
                ) : (
                  <p>No content available</p>
                )}
              </div>
              {current.image && (
                <div>
                  <strong>Image:</strong>
                  <img
                    src={`/storage/${current.image}`}
                    alt="Blog"
                    className="mt-2 h-40 rounded-md border object-contain"
                  />
                </div>
              )}
              {current.page_faqs && current.page_faqs.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="font-semibold mb-2">FAQs ({current.page_faqs.length})</p>
                  <div className="space-y-2">
                    {current.page_faqs.map((faq, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-zinc-900 p-3 rounded text-xs border">
                        <p className="font-bold">Q: {faq.question} {faq.question_ja && `| ${faq.question_ja}`}</p>
                        <div className="mt-1 text-muted-foreground prose prose-xs" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        {faq.answer_ja && (
                          <div className="mt-1 text-muted-foreground border-t pt-1 border-dashed prose prose-xs" dangerouslySetInnerHTML={{ __html: faq.answer_ja }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= ADD / EDIT ================= */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">

              <div className="flex gap-3 mb-6">
                <Button
                  type="button"
                  variant={activeLang === "ja" ? "default" : "outline"}
                  onClick={() => setActiveLang("ja")}
                >
                  Japanese
                </Button>
                <Button
                  type="button"
                  variant={activeLang === "en" ? "default" : "outline"}
                  onClick={() => setActiveLang("en")}
                >
                  English
                </Button>


              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="font-medium">
                  Title {activeLang === "ja" && ""}
                </label>

                <Input
                  placeholder="Title"
                  value={activeLang === "en" ? data.title : data.title_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("title", e.target.value)
                      : setData("title_ja", e.target.value)
                  }
                />
              </div>
              {/* Title */}
              <div className="space-y-1">
                <label className="font-medium">Slug</label>
                <Input
                  placeholder="Slug"
                  value={data.slug}
                  onChange={(e) => setData("slug", e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="font-medium">Category</label>
                <Input
                  value={activeLang === "en" ? data.category : data.category_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("category", e.target.value)
                      : setData("category_ja", e.target.value)
                  }
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1">
                <label className="font-medium">
                  Short Description {activeLang === "ja" && ""}
                </label>

                <Textarea
                  placeholder="Short description"
                  value={
                    activeLang === "en"
                      ? data.short_description
                      : data.short_description_ja
                  }
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("short_description", e.target.value)
                      : setData("short_description_ja", e.target.value)
                  }
                />
              </div>
              {/* Content */}
              <div className="space-y-2">
                <label className="font-medium">
                  Content {activeLang === "ja" && ""}
                </label>

                <ReactQuill
                  key={activeLang}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={
                    activeLang === "en"
                      ? data.content
                      : data.content_ja
                  }
                  onChange={(value) =>
                    activeLang === "en"
                      ? setData("content", value)
                      : setData("content_ja", value)
                  }
                />
              </div>

              {/* Author */}
              <div className="space-y-1">
                <label className="font-medium">Author</label>
                <Input
                  value={activeLang === "en" ? data.author : data.author_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("author", e.target.value)
                      : setData("author_ja", e.target.value)
                  }
                />
              </div>

              {/* Published Date */}
              <div className="space-y-1">
                <label className="font-medium">Published Date</label>
                <DatePicker

                  value={data.published_date}
                  onChange={(value) =>
                    setData("published_date", value)
                  }
                />
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="font-medium">Status</label>
                <Select
                  value={data.status}
                  onValueChange={(v) =>
                    setData("status", v as "published" | "draft")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">
                      Published
                    </SelectItem>
                    <SelectItem value="draft">
                      Draft
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Existing Image (EDIT ONLY) */}
              {mode === "edit" && current?.image && (
                <div className="space-y-2">
                  <label className="font-medium">Existing Image</label>
                  <img
                    src={`/storage/${current.image}`}
                    alt="Existing"
                    className="h-32 rounded-md border object-contain"
                  />
                </div>
              )}

              {/* Upload Image */}
              <div className="space-y-1">
                <label className="font-medium">
                  {mode === "edit" ? "Replace Image" : "Upload Image"}
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setData("image", e.target.files?.[0] || null)
                  }
                />
              </div>

              {/* ================= FAQs SECTION ================= */}
              <SectionBlock
                title="FAQs (per-blog)"
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

              {/* Submit */}
              <Button
                className="w-full"
                onClick={mode === "edit" ? submitUpdate : submitAdd}
                disabled={processing}
              >
                {mode === "edit" ? "Update Blog" : "Save Blog"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>


      {/* ================= TABLE ================= */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {filteredBlogs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No records found
              </TableCell>
            </TableRow>
          )}

          {filteredBlogs.map((blog, i) => (
            <TableRow key={blog.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.category}</TableCell>
              <TableCell>{blog.status}</TableCell>
              <TableCell>{formatDate(blog.published_date)}</TableCell>
              <TableCell className="space-x-2 text-center">
                <Button title="View" size="icon" onClick={() => openView(blog)}>
                  <Eye className="w-4 h-4" />
                </Button>

                <Button title="Edit" size="icon" onClick={() => openEdit(blog)}>
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  title="Delete"
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteBlog(blog.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthenticatedLayout>
  );
}



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