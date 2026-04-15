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
import { Plus, Eye, Pencil, Trash2, Search } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Blog {
  id: number;

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

  console.warn({ filteredBlogs })
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
    });
  };

  /* ================= OPEN VIEW ================= */
  const openView = (blog: Blog) => {
    setMode("view");
    setCurrent(blog);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const submitAdd = () => {
    post(route("admin.blogs.store"), {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const submitUpdate = () => {
    if (!current) return;

    router.post(
      route("admin.blogs.update", current.id),
      {
        _method: "PUT",
        ...data,
      },
      {
        forceFormData: true,
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
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
