// resources/js/Pages/Admin/Greetings/Index.tsx
// Changes vs original:
//   1. Added SEO fields to useForm
//   2. Added <SeoFields> inside the Add/Edit form
//   3. Both submitAdd / submitUpdate already use forceFormData:true — og_image just works

import { useState } from "react";
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
import SeoFields from "@/components/SeoFields"; // ← import

interface Greeting {
  id: number;
  title: string;
  description: string;
  title_ja?: string | null;
  description_ja?: string | null;
  image?: string | null;
  // SEO
  meta_title?: string | null; meta_title_ja?: string | null;
  meta_description?: string | null; meta_description_ja?: string | null;
  meta_keywords?: string | null; meta_keywords_ja?: string | null;
  og_image?: string | null;
}

export default function Index({ greetings }: { greetings: Greeting[] }) {
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Greeting | null>(null);
  const [open, setOpen] = useState(false);

  const { data, setData, post, reset, processing } = useForm<{
    title: string;
    title_ja: string;
    description: string;
    description_ja: string;
    image: File | null;
    // SEO
    meta_title: string; meta_title_ja: string;
    meta_description: string; meta_description_ja: string;
    meta_keywords: string; meta_keywords_ja: string;
    og_image: File | null;
  }>({
    title: "", title_ja: "",
    description: "", description_ja: "",
    image: null,
    // SEO
    meta_title: "", meta_title_ja: "",
    meta_description: "", meta_description_ja: "",
    meta_keywords: "", meta_keywords_ja: "",
    og_image: null,
  });

  /* ── OPEN ADD ── */
  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setActiveLang("en");
    setOpen(true);
  };

  /* ── OPEN EDIT ── */
  const openEdit = (item: Greeting) => {
    setMode("edit");
    setCurrent(item);
    setActiveLang("en");
    setOpen(true);
    setData({
      title: item.title,
      title_ja: item.title_ja || "",
      description: item.description,
      description_ja: item.description_ja || "",
      image: null,
      // SEO
      meta_title: item.meta_title || "",
      meta_title_ja: item.meta_title_ja || "",
      meta_description: item.meta_description || "",
      meta_description_ja: item.meta_description_ja || "",
      meta_keywords: item.meta_keywords || "",
      meta_keywords_ja: item.meta_keywords_ja || "",
      og_image: null,
    });
  };

  /* ── OPEN VIEW ── */
  const openView = (item: Greeting) => {
    setMode("view");
    setCurrent(item);
    setOpen(true);
  };

  /* ── SAVE ── */
  const submitAdd = () => {
    post(route("admin.greetings.store"), {
      forceFormData: true,
      onSuccess: () => { reset(); setOpen(false); },
    });
  };

  const submitUpdate = () => {
    if (!current) return;
    router.post(
      route("admin.greetings.update", current.id),
      { _method: "PUT", ...data },
      {
        forceFormData: true,
        onSuccess: () => { reset(); setOpen(false); },
      }
    );
  };

  /* ── DELETE ── */
  const deleteItem = (id: number) => {
    if (confirm("Delete this greeting?")) {
      router.delete(route("admin.greetings.destroy", id));
    }
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Greetings</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Greetings</h1>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />Add Greeting
        </Button>
      </div>

      {/* SHEET */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add"  && "Add Greeting"}
              {mode === "edit" && "Edit Greeting"}
              {mode === "view" && "Greeting Details"}
            </SheetTitle>
          </SheetHeader>

          {/* VIEW */}
          {mode === "view" && current && (
            <div className="space-y-6 mt-6">
              <div>
                <strong>Title</strong>
                <p className="mt-1">{current.title}</p>
              </div>
              <div>
                <strong>Description</strong>
                <div
                  className="prose max-w-none mt-2 text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: current.description }}
                />
              </div>
              {current.image && (
                <div>
                  <strong>Image</strong>
                  <img
                    src={`/storage/${current.image}`}
                    alt="Greeting"
                    className="mt-2 w-64 rounded border object-contain"
                  />
                </div>
              )}
            </div>
          )}

          {/* ADD / EDIT */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">
              {/* Language toggle */}
              <div className="flex gap-2">
                <Button type="button" variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>Japanese</Button>
                <Button type="button" variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>English</Button>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="font-medium">Title</label>
                <Input
                  value={activeLang === "en" ? data.title : data.title_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("title", e.target.value)
                      : setData("title_ja", e.target.value)
                  }
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="font-medium">Description</label>
                <ReactQuill
                  key={activeLang}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.description : data.description_ja}
                  onChange={(value) =>
                    activeLang === "en"
                      ? setData("description", value)
                      : setData("description_ja", value)
                  }
                />
              </div>

              {/* Existing Image (edit only) */}
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
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData("image", e.target.files?.[0] ?? null)}
                  />
                  <span className="text-xs text-gray-500 whitespace-nowrap">Max: 4096 KB</span>
                </div>
              </div>

              {/* ── SEO FIELDS ── */}
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
                setData={(key, value) => setData(key as any, value)}
                activeLang={activeLang}
                mode={mode}
                currentOgImage={current?.og_image}
              />

              {/* Submit */}
              <Button
                className="w-full"
                disabled={processing}
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit" ? "Update Greeting" : "Save Greeting"}
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
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Image</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {greetings.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {item.image && (
                  <img src={`/storage/${item.image}`} className="w-12 h-12 object-cover rounded" />
                )}
              </TableCell>
              <TableCell className="space-x-2 text-center">
                <Button title="View" size="icon" onClick={() => openView(item)}><Eye className="w-4 h-4" /></Button>
                <Button title="Edit" size="icon" onClick={() => openEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button title="Delete" size="icon" variant="destructive" onClick={() => deleteItem(item.id)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authenticated>
  );
}