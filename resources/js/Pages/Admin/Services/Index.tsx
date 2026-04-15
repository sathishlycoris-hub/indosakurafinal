import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
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
import { title } from "process";

/* ================= TYPES ================= */

interface Highlight {
  value: string;
  title: string;
  title_ja?: string;
  description?: string;
}

interface Benefit {
  title: string;
  title_ja?: string;
  description?: string;
}

interface Industry {
  title: string;
  title_ja?: string;
  description?: string;
}

interface Service {
  id: number;
  title: string;
  title_ja?: string;
  slug: string;
  subtitle?: string;
  subtitle_ja?: string;
  hero_description?: string;
  hero_description_ja?: string;
  hero_image?: string | null;
  how_it_works?: string;
  how_it_works_ja?: string;
  highlights: Highlight[];
  benefits: Benefit[];
  // industries: Industry[];
}
interface ViewServicePageProps {
  service: Service;
}

/* ================= COMPONENT ================= */

export default function Index({ services }: { services: Service[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  const { data, setData, reset, processing } = useForm({
    title: "",
    title_ja: "",

    slug: "",

    subtitle: "",
    subtitle_ja: "",

    hero_description: "",
    hero_description_ja: "",

    how_it_works: "",
    how_it_works_ja: "",

    hero_image: null as File | null,

    highlights: [] as any[],
    benefits: [] as any[],
    // industries: [] as Industry[],
  });

  /* ================= OPEN ================= */

  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  const openEdit = (service: Service) => {
    setMode("edit");
    setCurrent(service);
    setOpen(true);

    setData({
      title: service.title || "",
      title_ja: service.title_ja || "",
      slug: service.slug,
      subtitle: service.subtitle || "",
      subtitle_ja: service.subtitle_ja || "",
      hero_description: service.hero_description || "",
      hero_description_ja: service.hero_description_ja || "",
      hero_image: null,
      how_it_works: service.how_it_works || "",
      how_it_works_ja: service.how_it_works_ja || "",
      highlights: service.highlights || [],
      benefits: service.benefits || [],
      // industries: service.industries || [],
    });
  };


  const openView = (service: Service) => {
    setCurrent(service);
    setMode("view");
    setOpen(true);
  };


  /* ================= SAVE ================= */

 const submit = () => {
  const form = new FormData();

  form.append("title", data.title || "");
  form.append("title_ja", data.title_ja || "");

  form.append("slug", data.slug || "");

  form.append("subtitle", data.subtitle || "");
  form.append("subtitle_ja", data.subtitle_ja || "");

  form.append("hero_description", data.hero_description || "");
  form.append("hero_description_ja", data.hero_description_ja || "");

  form.append("how_it_works", data.how_it_works || "");
  form.append("how_it_works_ja", data.how_it_works_ja || "");

  if (data.hero_image) {
    form.append("hero_image", data.hero_image);
  }

  form.append("highlights", JSON.stringify(data.highlights));
  form.append("benefits", JSON.stringify(data.benefits));

  if (mode === "edit" && current) {
    form.append("_method", "PUT");

    router.post(route("admin.services.update", current.id), form, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  } else {
    router.post(route("admin.services.store"), form, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  }
};
  const submitUpdate = () => {
    if (!current) return;

    const form = new FormData();

    form.append("_method", "PUT");
    form.append("title", data.title);
    form.append("slug", data.slug);
    form.append("subtitle", data.subtitle);
    form.append("hero_description", data.hero_description);

    if (data.hero_image) {
      form.append("hero_image", data.hero_image);
    }

    form.append("highlights", JSON.stringify(data.highlights));
    form.append("benefits", JSON.stringify(data.benefits));
    // form.append("industries", JSON.stringify(data.industries));

    router.post(route("admin.services.update", current.id), form, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };



  /* ================= DELETE ================= */

  const deleteItem = (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    router.delete(route("admin.services.destroy", id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        setCurrent(null);
      },
    });
  };

  /* ================= HELPERS ================= */

  const addItem = (key: keyof typeof data, item: any) =>
    setData(key, [...(data[key] as any[]), item]);

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
    <Authenticated header={<h2 className="font-bold text-xl">Services</h2>}>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* ================= SHEET ================= */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Service"}
              {mode === "edit" && "Edit Service"}
              {mode === "view" && "Service Details"}
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
                  value={activeLang === "en" ? data.title : data.title_ja}
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
                  value={data.slug}
                  onChange={(e) => setData("slug", e.target.value)}
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="font-medium">Subtitle</label>
                <Input
                  value={activeLang === "en" ? data.subtitle : data.subtitle_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("subtitle", e.target.value)
                      : setData("subtitle_ja", e.target.value)
                  }
                />
              </div>

              {/* Hero Description */}
              <div className="space-y-2">
                <label className="font-medium">Hero Description</label>
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
              </div>

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

              {/* How It Works */}
              <div className="space-y-2">
                <label className="font-medium">How It Works</label>
                <ReactQuill
                  key={`how-${activeLang}`}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={
                    activeLang === "en"
                      ? data.how_it_works
                      : data.how_it_works_ja
                  }
                  onChange={(v) =>
                    activeLang === "en"
                      ? setData("how_it_works", v)
                      : setData("how_it_works_ja", v)
                  }
                />
              </div>

              {/* HIGHLIGHTS */}
              <SectionBlock
                title="Highlights"
                items={data.highlights}
                onAdd={() =>
                  addItem("highlights", {
                    value: "",
                    title: "",
                    title_ja: "",
                    description_ja: "",
                    description: "",
                  })
                }
                onRemove={(i) => removeItem("highlights", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input
                      placeholder="Value (99.9%)"
                      value={item.value}
                      onChange={(e) =>
                        updateItem("highlights", i, "value", e.target.value)
                      }
                    />

                    <Input
                      placeholder="Title"
                      value={
                        activeLang === "en"
                          ? item.title
                          : item.title_ja || ""
                      }
                      onChange={(e) =>
                        updateItem(
                          "highlights",
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <ReactQuill
                      key={`${activeLang}-highlight-${i}`}
                      theme="snow"
                      style={{ height: "200px", marginBottom: "50px" }}
                      value={
                        activeLang === "en"
                          ? item.description || ""
                          : item.description_ja || ""
                      }
                      onChange={(v) =>
                        updateItem(
                          "highlights",
                          i,
                          activeLang === "en" ? "description" : "description_ja",
                          v
                        )
                      }
                    />
                  </div>
                )}
              />

              {/* BENEFITS */}
              <SectionBlock
                title="Benefits"
                items={data.benefits}
                onAdd={() =>
                  addItem("benefits", {
                    title: "",
                    title_ja: "",
                    description: "",
                    description_ja: "",
                  })
                }
                onRemove={(i) => removeItem("benefits", i)}
                render={(item, i) => (
                  <div className="space-y-2">
                    <Input
                      placeholder="Title"
                      value={
                        activeLang === "en"
                          ? item.title || ""
                          : item.title_ja || ""
                      }
                      onChange={(e) =>
                        updateItem(
                          "benefits",
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <ReactQuill
                      key={`${activeLang}-benefit-${i}`}
                      theme="snow"
                      style={{ height: "200px", marginBottom: "50px" }}
                      value={
                        activeLang === "en"
                          ? item.description || ""
                          : item.description_ja || ""
                      }
                      onChange={(v) =>
                        updateItem(
                          "benefits",
                          i,
                          activeLang === "en" ? "description" : "description_ja",
                          v
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
                onClick={submit}
              >
                {mode === "edit" ? "Update Service" : "Save Service"}
              </Button>
            </div>
          )}

          {/* ================= VIEW ================= */}
          {mode === "view" && current && (
            <div className="space-y-8 mt-6">

              {/* BASIC INFO */}
              <div>
                <h3 className="text-xl font-bold">{current.title}</h3>
                {current.subtitle && (
                  <p className="text-muted-foreground">{current.subtitle}</p>
                )}
                <p className="text-gray-500 mt-1">Slug: {current.slug}</p>
              </div>

              {/* HERO IMAGE */}
              {current.hero_image && (
                <img
                  src={`/storage/${current.hero_image}`}
                  alt={current.title}
                  className="mt-2 w-64  rounded border object-contain"
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

              {/* HOW IT WORKS */}
              {current.how_it_works && (
                <div>
                  <strong>How It Works</strong>
                  <div
                    className="prose max-w-none mt-2"
                    dangerouslySetInnerHTML={{
                      __html: current.how_it_works,
                    }}
                  />
                </div>
              )}

              {/* HIGHLIGHTS */}
              {current.highlights?.length > 0 && (
                <div>
                  <strong>Highlights</strong>
                  <ul className="space-y-3 mt-2">
                    {current.highlights.map((h, i) => (
                      <li key={i} className="border rounded p-3">
                        <strong>{h.title}</strong>
                        {h.value && (
                          <p className="font-medium">{h.value}</p>
                        )}
                        {h.description && (
                          <div
                            className="prose max-w-none mt-1"
                            dangerouslySetInnerHTML={{
                              __html: h.description,
                            }}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* BENEFITS */}
              {current.benefits?.length > 0 && (
                <div>
                  <strong>Benefits</strong>
                  <ul className="space-y-3 mt-2">
                    {current.benefits.map((b, i) => (
                      <li key={i} className="border rounded p-3">
                        <strong>{b.title}</strong>
                        <div
                          className="prose max-w-none mt-1"
                          dangerouslySetInnerHTML={{
                            __html: b.description ?? "",
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
          {services.map((s, i) => (
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
                <Button title="Delete" size="icon" variant="destructive"
                  onClick={() => deleteItem(s.id)}>
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
            <Button variant="destructive" size="sm"
              onClick={() => onRemove(i)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-3" size="sm" onClick={onAdd}>
        + Add {title}
      </Button>
    </div>
  );
}
