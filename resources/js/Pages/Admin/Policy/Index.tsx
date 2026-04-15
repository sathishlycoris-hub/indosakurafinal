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

/* ================= TYPES ================= */

interface PolicySection {
  title: string;
  title_ja: string;
  description: string;
  description_ja: string;
}

interface Policy {
  id: number;
  title: string;
  title_ja?: string;
  slug: string;
  intro: string;
  intro_ja?: string;
  sections: PolicySection[];
}

/* ================= COMPONENT ================= */

export default function Index({ policies }: { policies: Policy[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Policy | null>(null);
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  const { data, setData, post, put, reset, processing } = useForm({
    title: "",
    title_ja: "",
    slug: "",
    intro: "",
    intro_ja: "",
    sections: [] as PolicySection[],
  });

  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setData({
      title: "",
      title_ja: "",
      slug: "",
      intro: "",
      intro_ja: "",
      sections: [
        { title: "", title_ja: "", description: "", description_ja: "" },
      ],
    });
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (policy: Policy) => {
    setMode("edit");
    setCurrent(policy);
    setActiveLang("en");
    setOpen(true);

    setData({
      title: policy.title,
      title_ja: policy.title_ja || "",
      slug: policy.slug,
      intro: policy.intro,
      intro_ja: policy.intro_ja || "",
      sections: policy.sections.map((s) => ({
        title: s.title || "",
        title_ja: s.title_ja || "",
        description: s.description || "",
        description_ja: s.description_ja || "",
      })),
    });
  };

  /* ================= OPEN VIEW ================= */
  const openView = (policy: Policy) => {
    setMode("view");
    setCurrent(policy);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const submitAdd = () => {
    post(route("admin.policy.store"), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

const submitUpdate = () => {
  if (!current) return;

  put(route("admin.policy.update", current.id), {
    onSuccess: () => {
      reset();
      setOpen(false);
    },
  });
};

  /* ================= SECTION HELPERS ================= */
  const addSection = () => {
    setData("sections", [
      ...data.sections,
      { title: "", title_ja: "", description: "", description_ja: "" },
    ]);
  };

  const updateSection = (
    index: number,
    field: keyof PolicySection,
    value: string
  ) => {
    const updated = [...data.sections];
    updated[index][field] = value;
    setData("sections", updated);
  };

  const removeSection = (index: number) => {
    const updated = [...data.sections];
    updated.splice(index, 1);
    setData("sections", updated);
  };

  /* ================= UI ================= */

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Policies</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Policies</h1>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Policy
        </Button>
      </div>

      {/* ================= SHEET ================= */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Policy"}
              {mode === "edit" && "Edit Policy"}
              {mode === "view" && "Policy Details"}
            </SheetTitle>
          </SheetHeader>

          {/* ================= VIEW ================= */}
          {mode === "view" && current && (
            <div className="space-y-6 mt-6">

              {/* <div className="flex gap-3">
                <Button
                  variant={activeLang === "en" ? "default" : "outline"}
                  onClick={() => setActiveLang("en")}
                >
                  English
                </Button>
                <Button
                  variant={activeLang === "ja" ? "default" : "outline"}
                  onClick={() => setActiveLang("ja")}
                >
                  Japanese
                </Button>
              </div> */}

              <div>
                <strong>Title</strong>
                <p className="mt-1">
                  {activeLang === "en"
                    ? current.title
                    : current.title_ja || current.title}
                </p>
              </div>

              <div>
                <strong>Intro</strong>
                <div
                  className="prose max-w-none mt-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      activeLang === "en"
                        ? current.intro
                        : current.intro_ja || current.intro,
                  }}
                />
              </div>

              <div className="space-y-6">
                {current.sections.map((s, i) => (
                  <div key={i}>
                    <h4 className="font-semibold">
                      {activeLang === "en"
                        ? s.title
                        : s.title_ja || s.title}
                    </h4>
                    <div
                      className="prose max-w-none mt-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          activeLang === "en"
                            ? s.description
                            : s.description_ja || s.description,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= ADD / EDIT ================= */}
          {mode !== "view" && (
            <div className="space-y-6 mt-6">

              {/* Language Toggle */}
              <div className="flex gap-3">
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
              <div>
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

              {/* Slug */}
              <div>
                <label className="font-medium">Slug</label>
                <Input
                  value={data.slug}
                  onChange={(e) => setData("slug", e.target.value)}
                />
              </div>

              {/* Intro */}
              <div>
                <label className="font-medium">Intro</label>
                <ReactQuill
                  key={`intro-${activeLang}`}
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={
                    activeLang === "en" ? data.intro : data.intro_ja
                  }
                  onChange={(v) =>
                    activeLang === "en"
                      ? setData("intro", v)
                      : setData("intro_ja", v)
                  }
                />
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {data.sections.map((section, i) => (
                  <div key={i} className="border p-4 rounded-md space-y-3">
                    <Input
                      placeholder="Section Title"
                      value={
                        activeLang === "en"
                          ? section.title
                          : section.title_ja
                      }
                      onChange={(e) =>
                        updateSection(
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <ReactQuill
                      key={`section-${i}-${activeLang}`}
                      style={{ height: "200px", marginBottom: "50px" }}
                      value={
                        activeLang === "en"
                          ? section.description
                          : section.description_ja
                      }
                      onChange={(v) =>
                        updateSection(
                          i,
                          activeLang === "en"
                            ? "description"
                            : "description_ja",
                          v
                        )
                      }
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSection(i)}
                    >
                      Remove Section
                    </Button>
                  </div>
                ))}

                <Button variant="outline" onClick={addSection}>
                  + Add Section
                </Button>
              </div>

              <Button
                className="w-full"
                disabled={processing}
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit"
                  ? "Update Policy"
                  : "Save Policy"}
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
            <TableHead className="text-white">Slug</TableHead>
            <TableHead className="text-white text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {policies.map((p, i) => (
            <TableRow key={p.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {p.title}
              </TableCell>
              <TableCell>{p.slug}</TableCell>
              <TableCell className="text-center space-x-2">
                <Button size="icon" onClick={() => openView(p)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" onClick={() => openEdit(p)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() =>
                    router.delete(route("admin.policy.destroy", p.id))
                  }
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