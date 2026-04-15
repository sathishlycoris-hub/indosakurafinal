import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Philosophy {
  id: number;
  title: string;
  title_ja?: string | null;
  content: string;
  content_ja?: string | null;
  description: string;
  description_ja?: string | null;
  image?: string | null;
}

export default function Index({ philosophies }: { philosophies: Philosophy[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Philosophy | null>(null);
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const { data, setData, post, reset, processing } = useForm<{
    title: string;
    content: string;
    image: File | null;
    description: string;
    title_ja: string;
    content_ja: string;
    description_ja: string;
  }>({
    title: "",
    content: "",
    image: null,
    description: "",
    title_ja: "",
    content_ja: "",
    description_ja: "",
  });

  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (item: Philosophy) => {
    setMode("edit");
    setCurrent(item);
    setActiveLang("en");
    setOpen(true);

    setData({
      title: item.title,
      title_ja: item.title_ja || "",
      content: item.content || "",
      content_ja: item.content_ja ||  "",
      description: item.description || "",
      description_ja: item.description_ja || "",
      image: null,
    });
  };

  /* ================= OPEN VIEW ================= */
  const openView = (item: Philosophy) => {
    setMode("view");
    setCurrent(item);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const submitAdd = () => {
    post(route("admin.philosophy.store"), {
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
      route("admin.philosophy.update", current.id),
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
  const deleteItem = (id: number) => {
    if (confirm("Delete this philosophy item?")) {
      router.delete(route("admin.philosophy.destroy", id));
    }
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Philosophy</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Philosophy</h1>

        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Philosophy
        </Button>
      </div>

      {/* ================= SHEET ================= */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Philosophy"}
              {mode === "edit" && "Edit Philosophy"}
              {mode === "view" && "Philosophy Details"}
            </SheetTitle>
          </SheetHeader>

          {/* ================= VIEW ================= */}
          {mode === "view" && current && (
            <div className="space-y-6 mt-6">
              <div>
                <strong>Title</strong>
                <p className="mt-1">{current.title}</p>
              </div>

              <div>
                <strong>Content</strong>
                <div
                  className="prose max-w-none mt-2"
                  dangerouslySetInnerHTML={{
                    __html: current.content,
                  }}
                />
              </div>

              {current.image && (
                <div>
                  <strong>Image</strong>
                  <img
                    src={`/storage/${current.image}`}
                    alt="Philosophy"
                    className="mt-2 rounded-md max-h-56 border object-contain"
                  />
                </div>
              )}

              <div>
                <strong>Description</strong>
                <div
                  className="prose max-w-none mt-2"
                  dangerouslySetInnerHTML={{
                    __html: current.description,
                  }}
                />
              </div>
            </div>
          )}

          {/* ================= ADD / EDIT ================= */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">
              <div className="flex gap-2">
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

              {/* Content */}
              <div className="space-y-2">
                <label className="font-medium">Content</label>
                <ReactQuill
                key={activeLang}
                style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.content : data.content_ja}
                  onChange={(v) =>
                    activeLang === "en"
                      ? setData("content", v)
                      : setData("content_ja", v)
                  }
                />
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

                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setData("image", e.target.files?.[0] || null)
                    }
                  />

                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Max: 2048 KB
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="font-medium">Description</label>
                <ReactQuill
                key={activeLang}
                style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.description : data.description_ja}
                  onChange={(v) =>
                    activeLang === "en"
                      ? setData("description", v)
                      : setData("description_ja", v)
                  }
                />
              </div>

              {/* Submit */}
              <Button
                className="w-full"
                disabled={processing}
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit"
                  ? "Update Philosophy"
                  : "Save Philosophy"}
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
            <TableHead className="text-white">Content</TableHead>
            <TableHead className="text-white">Image</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {philosophies.map((p, i) => (
            <TableRow key={p.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {p.title}
              </TableCell>

              <TableCell className="line-clamp-2 max-w-md">
                <div
                  dangerouslySetInnerHTML={{
                    __html: p.content,
                  }}
                />
              </TableCell>

              <TableCell>
                {p.image ? (
                  <img
                    src={`/storage/${p.image}`}
                    className="h-10 rounded"
                  />
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell className="line-clamp-2 max-w-md">
                <div
                  dangerouslySetInnerHTML={{
                    __html: p.description,
                  }}
                />
              </TableCell>

              <TableCell className="space-x-2 text-center">
                <Button
                  title="View"
                  size="icon"

                  onClick={() => openView(p)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  title="Edit"
                  size="icon"

                  onClick={() => openEdit(p)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  title="Delete"
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteItem(p.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authenticated>
  );
}
