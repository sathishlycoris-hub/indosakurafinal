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

interface CorporateItem {
  id: number;
  title: string;
  title_ja?: string;
  path?: string;
  image?: string | null;
}

export default function Index({ items }: { items: CorporateItem[] }) {
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<CorporateItem | null>(null);
  const [open, setOpen] = useState(false);

  const { data, setData, post, reset, processing } = useForm({
    title: "",
    title_ja: "",
    path: "",
    image: null as File | null,
  });

  /* ================= OPEN ================= */

  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  const openEdit = (item: CorporateItem) => {
    setMode("edit");
    setCurrent(item);
    setOpen(true);

    setData({
      title: item.title,
      title_ja: item.title_ja || "",
      path: item.path || "",
      image: null,
    });
  };

  const openView = (item: CorporateItem) => {
    setMode("view");
    setCurrent(item);
    setOpen(true);
  };

  /* ================= SAVE ================= */

  const submitAdd = () => {
    post(route("admin.corporate.store"), {
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
      route("admin.corporate.update", current.id),
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
    if (confirm("Delete this item?")) {
      router.delete(route("admin.corporate.destroy", id));
    }
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Corporate Info</h2>}>

      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Corporate Info</h1>

        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Info
        </Button>
      </div>

      {/* ================= SHEET ================= */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Item"}
              {mode === "edit" && "Edit Item"}
              {mode === "view" && "View Item"}
            </SheetTitle>
          </SheetHeader>

          {/* VIEW */}
          {mode === "view" && current && (
            <div className="space-y-4 mt-6">
              <p><strong>Title:</strong> {current.title}</p>
              <p><strong>Path:</strong> {current.path}</p>

              {current.image && (
                <img
                  src={`/storage/${current.image}`}
                  className="w-64 rounded border"
                />
              )}
            </div>
          )}

          {/* ADD / EDIT */}
          {mode !== "view" && (
            <div className="space-y-5 mt-6">

              {/* Language Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={activeLang === "ja" ? "default" : "outline"}
                  onClick={() => setActiveLang("ja")}
                >
                  Japanese
                </Button>
                <Button
                  variant={activeLang === "en" ? "default" : "outline"}
                  onClick={() => setActiveLang("en")}
                >
                  English
                </Button>
              </div>

              {/* Title */}
              <Input
                placeholder="Title"
                value={activeLang === "en" ? data.title : data.title_ja}
                onChange={(e) =>
                  activeLang === "en"
                    ? setData("title", e.target.value)
                    : setData("title_ja", e.target.value)
                }
              />

              {/* Path */}
              {/* <Input
                placeholder="/corporate/example"
                value={data.path}
                onChange={(e) => setData("path", e.target.value)}
              /> */}

              {/* Image */}
              {mode === "edit" && current?.image && (
                <img
                  src={`/storage/${current.image}`}
                  className="h-24 rounded"
                />
              )}

              <Input
                type="file"
                onChange={(e) =>
                  setData("image", e.target.files?.[0] ?? null)
                }
              />
              <span className="text-xs text-gray-500 whitespace-nowrap">
                    Max: 2048 KB (625px x 242px)
                  </span>

              <Button
                disabled={processing}
                className="w-full"
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit" ? "Update" : "Save"}
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
            <TableHead className="text-white">Path</TableHead>
            <TableHead className="text-white">Image</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.path}</TableCell>

              <TableCell>
                {item.image && (
                  <img
                    src={`/storage/${item.image}`}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </TableCell>

              <TableCell className="text-center space-x-2">
                <Button size="icon" onClick={() => openView(item)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" onClick={() => openEdit(item)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteItem(item.id)}
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