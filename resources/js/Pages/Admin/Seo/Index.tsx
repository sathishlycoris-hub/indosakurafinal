import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Eye, Pencil } from "lucide-react";

interface Seo {
  id: number;
  page: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

const PAGES = [
  { value: "home", label: "Home Page" },
  { value: "solutions", label: "Solutions Page" },
  { value: "services", label: "Services Page" },
  { value: "case-studies", label: "Case Studies Page" },
  { value: "corporate-info", label: "Corporate Info Page" },
  { value: "recruitment", label: "Recruitment Page" },
];

export default function Index({ seos }: { seos: Seo[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Seo | null>(null);
  const [open, setOpen] = useState(false);

  const { data, setData, post, reset, processing } = useForm({
    page: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });

  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (seo: Seo) => {
    setMode("edit");
    setCurrent(seo);
    setOpen(true);

    setData({
      page: seo.page,
      meta_title: seo.meta_title ?? "",
      meta_description: seo.meta_description ?? "",
      meta_keywords: seo.meta_keywords ?? "",
    });
  };

  /* ================= OPEN VIEW ================= */
  const openView = (seo: Seo) => {
    setMode("view");
    setCurrent(seo);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const submitSave = () => {
    post(route("admin.seo.store"), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">SEO Manager</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">SEO Settings</h1>

        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add / Update SEO
        </Button>
      </div>

      {/* ================= SHEET ================= */}
    <Sheet open={open} onOpenChange={setOpen}>
  <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto">
    <SheetHeader>
      <SheetTitle>
        {mode === "add" && "Add SEO"}
        {mode === "edit" && "Edit SEO"}
        {mode === "view" && "SEO Details"}
      </SheetTitle>
    </SheetHeader>

    {/* ================= VIEW ================= */}
    {mode === "view" && current && (
      <div className="space-y-6 mt-6">

        <div className="space-y-1">
          <strong>Page</strong>
          <p>{current.page}</p>
        </div>

        <div className="space-y-1">
          <strong>Meta Title</strong>
          <p>{current.meta_title || "-"}</p>
        </div>

        <div className="space-y-1">
          <strong>Meta Description</strong>
          <p>{current.meta_description || "-"}</p>
        </div>

        <div className="space-y-1">
          <strong>Meta Keywords</strong>
          <p>{current.meta_keywords || "-"}</p>
        </div>

      </div>
    )}

    {/* ================= ADD / EDIT ================= */}
    {mode !== "view" && (
      <div className="space-y-5 mt-6">

        {/* Page */}
        <div className="space-y-1">
          <label className="font-medium">Page</label>
          <select
            className="w-full border border-input rounded-md px-3 py-2"
            value={data.page}
            onChange={(e) => setData("page", e.target.value)}
            disabled={mode === "edit"}
          >
            <option value="">Select Page</option>
            {PAGES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Meta Title */}
        <div className="space-y-1">
          <label className="font-medium">Meta Title</label>
          <Input
            placeholder="Meta title"
            value={data.meta_title}
            onChange={(e) => setData("meta_title", e.target.value)}
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-1">
          <label className="font-medium">Meta Description</label>
          <Textarea
            rows={4}
            placeholder="Meta description"
            value={data.meta_description}
            onChange={(e) =>
              setData("meta_description", e.target.value)
            }
          />
        </div>

        {/* Meta Keywords */}
        <div className="space-y-1">
          <label className="font-medium">
            Meta Keywords (comma separated)
          </label>
          <Textarea
            rows={3}
            placeholder="keyword1, keyword2, keyword3"
            value={data.meta_keywords}
            onChange={(e) =>
              setData("meta_keywords", e.target.value)
            }
          />
        </div>

        {/* Submit */}
        <Button
          className="w-full"
          disabled={processing}
          onClick={submitSave}
        >
          Save SEO
        </Button>

      </div>
    )}
  </SheetContent>
</Sheet>


      {/* ================= TABLE ================= */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">Page</TableHead>
            <TableHead className="text-white">Meta Title</TableHead>
            <TableHead className="text-white">Meta Description</TableHead>
            <TableHead className="text-white text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {seos.map((seo) => (
            <TableRow key={seo.id}>
              <TableCell className="capitalize">{seo.page}</TableCell>
              <TableCell className=" max-w-md">
                {seo.meta_title}
              </TableCell>
              <TableCell className="line-clamp-2 max-w-lg">
                {seo.meta_description}
              </TableCell>
              <TableCell className="space-x-2 text-center">
                <Button
                  title="View"
                  size="icon"
                  
                  onClick={() => openView(seo)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  title="Edit"
                  size="icon"
                  
                  onClick={() => openEdit(seo)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authenticated>
  );
}
