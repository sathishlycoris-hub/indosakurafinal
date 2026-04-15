import { useState } from "react";
import { usePage } from "@inertiajs/react";
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

interface Feature {
  title: string;
  title_ja?: string;  // NEW
  subtitle: string;   // NEW
  description: string;
  description_ja?: string;  // NEW
  image?: string;     // NEW
}

interface UseCase {
  title: string;
  title_ja?: string;
  subtitle?: string;
  subtitle_ja?: string;
  description: string;
}

interface Industry {
  title: string;
  title_ja?: string;
  description: string;
  description_ja?: string;
}

interface CaseStudy {
  title: string;
  title_ja?: string;
  client?: string;
  client_ja?: string;
  summary?: string;
  result?: string;
}

interface Solution {
  id: number;
  title: string;
  title_ja?: string;
  slug: string;
  link: string; // NEW
  subtitle?: string;
  subtitle_ja?: string;
  hero_description?: string;
  hero_description_ja?: string;
  hero_image?: null;
  features: Feature[];
  use_cases: UseCase[];
  industries: Industry[];
  case_studies: CaseStudy[];
  
}

/* ================= COMPONENT ================= */

export default function Index({ solutions }: { solutions: Solution[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Solution | null>(null);
  const [open, setOpen] = useState(false);

  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  const { data, setData, post, reset, processing } = useForm({
    title: "",
    title_ja: "",

    subtitle: "",
    subtitle_ja: "",

    hero_description: "",
    hero_description_ja: "",

    slug: "",
    hero_image: null as File | null,
     link: "", // ✅ ADD

    features: [] as any[],
    use_cases: [] as any[],
    industries: [] as any[],
    case_studies: [] as any[],
  });

  /* ================= OPEN ================= */

  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  const openEdit = (solution: Solution) => {
    setMode("edit");
    setCurrent(solution);
    setOpen(true);

    setData({
      title: solution.title,
      title_ja: solution.title_ja || "",
      link: solution.link || "",
      slug: solution.slug,
      subtitle: solution.subtitle || "",
      subtitle_ja: solution.subtitle_ja || "",
      hero_description: solution.hero_description || "",
      hero_description_ja: solution.hero_description_ja || "",
      hero_image: null,
      features: solution.features || [],
      use_cases: solution.use_cases || [],
      industries: solution.industries || [],
      case_studies: solution.case_studies || [],
    });
  };


  const openView = (solution: Solution) => {
    setMode("view");
    setCurrent(solution);
    setOpen(true);
  };

  /* ================= SAVE ================= */

  const submitAdd = () => {
    const form = new FormData();

    // basic fields
    form.append("slug", data.slug);


    form.append("title", data.title);
    form.append("title_ja", data.title_ja);

    form.append("subtitle", data.subtitle);
    form.append("subtitle_ja", data.subtitle_ja);

    form.append("hero_description", data.hero_description);
    form.append("hero_description_ja", data.hero_description_ja);
    form.append("link", data.link);
    // hero image ONLY
    if (data.hero_image) {
      form.append("hero_image", data.hero_image);
    }

    // keep existing relational arrays (JSON is OK here)
    form.append("features", JSON.stringify(data.features));
    form.append("use_cases", JSON.stringify(data.use_cases));
    form.append("case_studies", JSON.stringify(data.case_studies));
    form.append("industries", JSON.stringify(data.industries));

    router.post(route("admin.solutions.store"), form, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };


  const submitUpdate = () => {
    if (!current) return;

    const form = new FormData();

    form.append("_method", "PUT");

    form.append("slug", data.slug);

    form.append("title", data.title);
    form.append("title_ja", data.title_ja);

    form.append("subtitle", data.subtitle);
    form.append("subtitle_ja", data.subtitle_ja);

    form.append("hero_description", data.hero_description);
    form.append("hero_description_ja", data.hero_description_ja);
    form.append("link", data.link);

    if (data.hero_image) {
      form.append("hero_image", data.hero_image);
    }

    form.append("features", JSON.stringify(data.features));
    form.append("use_cases", JSON.stringify(data.use_cases));
    form.append("case_studies", JSON.stringify(data.case_studies));
    form.append("industries", JSON.stringify(data.industries));

    router.post(route("admin.solutions.update", current.id), form, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };


  /* ================= DELETE ================= */

  const deleteItem = (id: number) => {
    if (!confirm("Are you sure you want to delete this solution?")) return;

    router.delete(route("admin.solutions.destroy", id), {
      preserveScroll: true,
      onSuccess: () => {
        // optional toast later
        console.log("Solution deleted");
      },
    });
  };

  /* ================= HELPERS ================= */

  const addItem = (key: keyof typeof data, item: any) => {
    setData(key, [...(data[key] as any[]), item]);
  };

  const updateItem = (
    key: keyof typeof data,
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...(data[key] as any[])];
    updated[index][field] = value;
    setData(key, updated);
  };

  const removeItem = (key: keyof typeof data, index: number) => {
    const updated = [...(data[key] as any[])];
    updated.splice(index, 1);
    setData(key, updated);
  };

  /* ================= UI ================= */

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Solutions</h2>}>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* ================= SHEET ================= */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Product"}
              {mode === "edit" && "Edit Product"}
              {mode === "view" && "Product Details"}
            </SheetTitle>
          </SheetHeader>

          {/* ================= ADD / EDIT ================= */}
          {mode !== "view" && (
            <div className="space-y-6 mt-6">
              <div className="flex gap-2 mb-4">
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
                  placeholder="Title"
                  value={activeLang === "en" ? data.title : data.title_ja || ""}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("title", e.target.value)
                      : setData("title_ja", e.target.value)
                  }
                />
              </div>

              {/* Slug */}
              <div className="space-y-1">
                <label className="font-medium">Slug</label>
                <Input
                  placeholder="sourcebytes-ai"
                  value={data.slug}
                  onChange={(e) => setData("slug", e.target.value)}
                />
              </div>
              {/* Link */}
              <div className="space-y-1">
                <label className="font-medium">Link</label>
                <Input
                  placeholder="https://example.com"
                  value={data.link}
                  onChange={(e) => setData("link", e.target.value)}
                />
              </div>


              {/* Subtitle */}
              <div className="space-y-1">
                <label className="font-medium">Subtitle</label>
                <Input
                  value={activeLang === "en" ? data.subtitle : data.subtitle_ja || ""}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("subtitle", e.target.value)
                      : setData("subtitle_ja", e.target.value)
                  }
                />
              </div>

              {/* Hero Description */}
              <ReactQuill
                key={activeLang}
                theme="snow"
                style={{ height: "200px", marginBottom: "50px" }}
                value={
                  activeLang === "en"
                    ? data.hero_description
                    : data.hero_description_ja
                }
                onChange={(v) =>
                  activeLang === "en"
                    ? setData("hero_description", v)
                    : setData("hero_description_ja", v)
                }
              />

              {/* Existing Hero Image (EDIT ONLY) */}
              {mode === "edit" && current?.hero_image && (
                <div className="space-y-2">
                  <label className="font-medium">Existing Hero Image</label>
                  <img
                    src={`/storage/${current.hero_image}`}
                    alt="Hero"
                    className="h-32 rounded-md border object-contain"
                  />
                </div>
              )}

              {/* Upload Hero Image */}
              <div className="space-y-1">
                <label className="font-medium">
                  {mode === "edit" ? "Replace Hero Image" : "Upload Hero Image"}
                </label>

                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-64"
                    onChange={(e) =>
                      setData("hero_image", e.target.files?.[0] || null)
                    }
                  />

                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Max: 2048 KB
                  </span>
                </div>
              </div>

              {/* FEATURES */}
              <SectionBlock
                title="Features"
                items={data.features}
                onAdd={() =>
                  addItem("features", {
                    title: "",
                    title_ja: "",
                    description: "",
                    description_ja: "",
                  })
                }
                onRemove={(i) => removeItem("features", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input
                      value={
                        activeLang === "en" ? item.title : item.title_ja || ""
                      }
                      onChange={(e) =>
                        updateItem(
                          "features",
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <ReactQuill
                      key={`${activeLang}-${i}`}
                      theme="snow"
                      style={{ height: "200px", marginBottom: "50px" }}
                      value={
                        activeLang === "en"
                          ? item.description || ""
                          : item.description_ja || ""
                      }
                      onChange={(v) =>
                        updateItem(
                          "features",
                          i,
                          activeLang === "en" ? "description" : "description_ja",
                          v
                        )
                      }
                    />
                  </div>
                )}
              />

              {/* USE CASES */}
              <SectionBlock
                title="Use Cases"
                items={data.use_cases}
                onAdd={() =>
                  addItem("use_cases", {
                    title: "",
                    title_ja: "",
                    subtitle: "",
                    subtitle_ja: "",
                    description: "",
                    description_ja: "",
                  })
                }
                onRemove={(i) => removeItem("use_cases", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input
                      value={activeLang === "en" ? item.title : item.title_ja || ""}
                      onChange={(e) =>
                        updateItem(
                          "use_cases",
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <ReactQuill
                      key={`${activeLang}-uc-${i}`}
                      theme="snow"
                      style={{ height: "200px", marginBottom: "50px" }}
                      value={
                        activeLang === "en"
                          ? item.description || ""
                          : item.description_ja || ""
                      }
                      onChange={(v) =>
                        updateItem(
                          "use_cases",
                          i,
                          activeLang === "en" ? "description" : "description_ja",
                          v
                        )
                      }
                    />
                  </div>
                )}
              />

              {/* CASE STUDIES */}
              <SectionBlock
                title="Case Studies"
                items={data.case_studies}
                onAdd={() =>
                  addItem("case_studies", {
                    title: "",
                    title_ja: "",
                    summary: "",
                    summary_ja: "",
                  })
                }
                onRemove={(i) => removeItem("case_studies", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input
                      value={activeLang === "en" ? item.title : item.title_ja || ""}
                      onChange={(e) =>
                        updateItem(
                          "case_studies",
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <ReactQuill
                      key={`${activeLang}-cs-${i}`}
                      theme="snow"
                      style={{ height: "200px", marginBottom: "50px" }}
                      value={
                        activeLang === "en"
                          ? item.summary || ""
                          : item.summary_ja || ""
                      }
                      onChange={(v) =>
                        updateItem(
                          "case_studies",
                          i,
                          activeLang === "en" ? "summary" : "summary_ja",
                          v
                        )
                      }
                    />
                  </div>
                )}
              />

              {/* INDUSTRIES */}
              <SectionBlock
                title="Industries We Serve"
                items={data.industries}
                onAdd={() =>
                  addItem("industries", {
                    title: "",
                    title_ja: "",
                    description: "",
                    description_ja: "",
                  })
                }
                onRemove={(i) => removeItem("industries", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input
                      value={activeLang === "en" ? item.title : item.title_ja || ""}
                      onChange={(e) =>
                        updateItem(
                          "industries",
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      value={
                        activeLang === "en"
                          ? item.description
                          : item.description_ja || ""
                      }
                      onChange={(e) =>
                        updateItem(
                          "industries",
                          i,
                          activeLang === "en"
                            ? "description"
                            : "description_ja",
                          e.target.value
                        )
                      }
                    />
                  </div>
                )}
              />

              {/* Submit */}
              <Button
                disabled={processing}
                className="w-full"
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit" ? "Update Solution" : "Save Solution"}
              </Button>
            </div>
          )}

          {/* ================= VIEW ================= */}
          {mode === "view" && current && (
            <div className="space-y-6 mt-6">

              {/* BASIC INFO */}
              <div>
                <h3 className="font-semibold text-lg"> {activeLang === "en" ? current.title : current.title_ja}</h3>
                <p className="text-muted-foreground">{activeLang === "en" ? current.subtitle : current.subtitle_ja}</p>
                <p className="text-gray-500 mt-1">Slug: {current.slug}</p>
              </div>

              {/* HERO IMAGE */}
              {current.hero_image && (
                <img
                  src={`/storage/${current.hero_image}`}
                  className="mt-2 w-64 rounded border object-contain"
                  alt={current.title}
                />
              )}

              {/* HERO DESCRIPTION */}
              {current.hero_description && (
                <div>
                  <strong>Description</strong>
                  <div
                    className="prose max-w-none mt-2"
                    dangerouslySetInnerHTML={{
                      __html: current.hero_description,
                    }}
                  />
                </div>
              )}

              {/* FEATURES */}
              {current.features?.length > 0 && (
                <div>
                  <strong>Features</strong>
                  <ul className="space-y-3 mt-2">
                    {current.features.map((f, i) => (
                      <li key={i} className="border rounded p-3">
                        <strong> {activeLang === "en"
                          ? f.title
                          : f.title_ja || f.title}</strong>
                        <div
                          className="prose max-w-none mt-1"
                          dangerouslySetInnerHTML={{
                            __html: f.description ?? "",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* USE CASES */}
              {current.use_cases?.length > 0 && (
                <div>
                  <strong>Use Cases</strong>
                  <ul className="space-y-3 mt-2">
                    {current.use_cases.map((u, i) => (
                      <li key={i} className="border rounded p-3">
                        <strong>{u.title}</strong>
                        <div
                          className="prose max-w-none mt-1"
                          dangerouslySetInnerHTML={{
                            __html: u.description ?? "",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* INDUSTRIES */}
              {current.industries?.length > 0 && (
                <div>
                  <strong>
                    {activeLang === "en"
                      ? "Industries We Serve"
                      : "対応業界"}
                  </strong>

                  <ul className="space-y-3 mt-2">
                    {current.industries.map((ind, i) => (
                      <li key={i} className="border rounded p-3">
                        <strong>
                          {activeLang === "en"
                            ? ind.title
                            : ind.title_ja || ""}
                        </strong>

                        <p className="mt-1">
                          {activeLang === "en"
                            ? ind.description
                            : ind.description_ja || ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* CASE STUDIES */}
              {current.case_studies?.length > 0 && (
                <div>
                  <strong>Case Studies</strong>
                  <ul className="space-y-3 mt-2">
                    {current.case_studies.map((c, i) => (
                      <li key={i} className="border rounded p-3">
                        <strong>{c.title}</strong>
                        <div
                          className="prose max-w-none mt-1"
                          dangerouslySetInnerHTML={{
                            __html: c.summary ?? "",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {solutions.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{s.title}</TableCell>
              <TableCell>{s.slug}</TableCell>
              <TableCell className="space-x-2 text-center">
                <Button title="View" size="icon" onClick={() => openView(s)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button title="Edit" size="icon" onClick={() => openEdit(s)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  title="Delete"
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteItem(s.id)}
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

/* ================= REUSABLE SECTION ================= */

function SectionBlock({
  title,
  items,
  onAdd,
  onRemove,
  render,
}: {
  title: string;
  items: any[];
  onAdd: () => void;
  onRemove: (i: number) => void;
  render: (item: any, index: number) => JSX.Element;
}) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
            {render(item, i)}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(i)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="mt-3"
        size="sm"
        onClick={onAdd}
      >
        + Add {title}
      </Button>
    </div>
  );
}
