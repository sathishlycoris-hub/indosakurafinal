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

interface Section {
  title: string;
  title_ja?: string;
  description: string;
  description_ja?: string;
}

interface CaseStudy {
  id: number;
  title: string;
  title_ja?: string;

  subtitle?: string;
  subtitle_ja?: string;

  slug: string;

  hero_description?: string;
  hero_description_ja?: string;

  content?: string;
  content_ja?: string;

  benefit?: string;
  benefit_ja?: string;

  implementation?: string;
  implementation_ja?: string;

  tags?: string;

  hero_image?: string | null;
  secondary_image?: string | null;
}

export default function Index({ caseStudies }: { caseStudies: CaseStudy[] }) {

  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<CaseStudy | null>(null);
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  const { data, setData, reset, processing } = useForm({
    title: "",
    title_ja: "",

    subtitle: "",
    subtitle_ja: "",

    slug: "",

    hero_description: "",
    hero_description_ja: "",

    content: "",
    content_ja: "",

    benefit: "",
    benefit_ja: "",

    implementation: "",
    implementation_ja: "",

    tags: "",

    hero_image: null as File | null,
    secondary_image: null as File | null,
  });

  /* ================= OPEN ================= */

  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  const openEdit = (item: CaseStudy) => {
    setMode("edit");
    setCurrent(item);
    setOpen(true);

    setData({
      title: item.title,
      title_ja: item.title_ja || "",

      subtitle: item.subtitle || "",
      subtitle_ja: item.subtitle_ja || "",

      slug: item.slug,

      hero_description: item.hero_description || "",
      hero_description_ja: item.hero_description_ja || "",

      content: item.content || "",
      content_ja: item.content_ja || "",

      benefit: item.benefit || "",
      benefit_ja: item.benefit_ja || "",

      implementation: item.implementation || "",
      implementation_ja: item.implementation_ja || "",

      tags: item.tags || "",

      hero_image: null,

      secondary_image: null,


    });
  };

  const openView = (item: CaseStudy) => {
    setMode("view");
    setCurrent(item);
    setOpen(true);
  };

  /* ================= SAVE ================= */

  const submitAdd = () => {

    const form = new FormData();

    form.append("title", data.title);
    form.append("title_ja", data.title_ja);
    form.append("slug", data.slug);

    form.append("hero_description", data.hero_description);
    form.append("hero_description_ja", data.hero_description_ja);

    form.append("benefit", data.benefit);
    form.append("benefit_ja", data.benefit_ja);

    form.append("implementation", data.implementation);
    form.append("implementation_ja", data.implementation_ja);

    form.append("subtitle", data.subtitle);
    form.append("subtitle_ja", data.subtitle_ja);

    form.append("content", data.content);
    form.append("content_ja", data.content_ja);

    form.append("tags", data.tags);

    if (data.hero_image) {
      form.append("hero_image", data.hero_image);
    }

    if (data.secondary_image) {
      form.append("secondary_image", data.secondary_image);
    }

    // form.append("sections", JSON.stringify(data.sections));

    router.post(route("admin.casestudies.store"), form, {
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

    form.append("title", data.title);
    form.append("title_ja", data.title_ja);

    form.append("subtitle", data.subtitle);       
    form.append("subtitle_ja", data.subtitle_ja); 

    form.append("content", data.content);        
    form.append("content_ja", data.content_ja);

    form.append("slug", data.slug);

    form.append("hero_description", data.hero_description);
    form.append("hero_description_ja", data.hero_description_ja);

    form.append("benefit", data.benefit);
    form.append("benefit_ja", data.benefit_ja);

    form.append("implementation", data.implementation);
    form.append("implementation_ja", data.implementation_ja);

    form.append("tags", data.tags);
    if (data.hero_image) {
      form.append("hero_image", data.hero_image);
    }

    if (data.secondary_image) {
      form.append("secondary_image", data.secondary_image);
    }

    // form.append("sections", JSON.stringify(data.sections));

    router.post(route("admin.casestudies.update", current.id), form, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  /* ================= DELETE ================= */

  const deleteItem = (id: number) => {

    if (!confirm("Delete this case study?")) return;

    router.delete(route("admin.casestudies.destroy", id));
  };

  /* ================= HELPERS ================= */

  // const addSection = () => {
  //   setData("sections", [
  //     ...data.sections,
  //     { title: "", title_ja: "", description: "", description_ja: "" },
  //   ]);
  // };

  // const updateSection = (
  //   index: number,
  //   field: string,
  //   value: string
  // ) => {
  //   const updated = [...data.sections];
  //   (updated[index] as any)[field] = value;
  //   setData("sections", updated);
  // };

  // const removeSection = (index: number) => {
  //   const updated = [...data.sections];
  //   updated.splice(index, 1);
  //   setData("sections", updated);
  // };

  /* ================= UI ================= */

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Case Studies</h2>}>

      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Case Studies</h1>

        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Case Study
        </Button>
      </div>


      {/* ================= SHEET ================= */}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[95%] sm:max-w-5xl overflow-y-auto">

          <SheetHeader>
            <SheetTitle>

              {mode === "add" && "Add Case Study"}
              {mode === "edit" && "Edit Case Study"}
              {mode === "view" && "Case Study Details"}

            </SheetTitle>
          </SheetHeader>


          {/* ================= ADD / EDIT ================= */}

          {mode !== "view" && (
            <div className="space-y-6 mt-6">

              {/* Language toggle */}

              <div className="flex gap-2">

                <Button
                  type="button"
                  variant={activeLang === "en" ? "default" : "outline"}
                  onClick={() => setActiveLang("en")}
                >
                  English
                </Button>

                <Button
                  type="button"
                  variant={activeLang === "ja" ? "default" : "outline"}
                  onClick={() => setActiveLang("ja")}
                >
                  Japanese
                </Button>

              </div>


              {/* TITLE */}

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
              <div>
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

              {/* SLUG */}

              <div>
                <label className="font-medium">Slug</label>

                <Input
                  value={data.slug}
                  onChange={(e) => setData("slug", e.target.value)}
                />
              </div>
              <div>
                <label className="font-medium">Tag</label>

                <Input
                  placeholder="Example: DX"
                  value={data.tags}
                  onChange={(e) => setData("tags", e.target.value)}
                />
              </div>
              <div>
                <label className="font-medium">Description Image</label>

                <Input
                  type="file"
                  onChange={(e) =>
                    setData("secondary_image", e.target.files?.[0] || null)
                  }
                />
                {mode === "edit" && current?.secondary_image && (
                  <img
                    src={`/storage/${current.secondary_image}`}
                    className="h-32 rounded border"
                  />
                )}
              </div>

              {/* HERO DESCRIPTION */}
              <div>
                <label className="font-medium">Descriptions</label>
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

              <div>
                <label className="font-medium">Benefit</label>

                <ReactQuill
                  key={`benefit-${activeLang}`}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.benefit : data.benefit_ja}
                  onChange={(v) =>
                    activeLang === "en"
                      ? setData("benefit", v)
                      : setData("benefit_ja", v)
                  }
                />
              </div>
              <div>
                <label className="font-medium">Implementation</label>

                <ReactQuill
                  key={`implementation-${activeLang}`}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.implementation : data.implementation_ja}
                  onChange={(v) =>
                    activeLang === "en"
                      ? setData("implementation", v)
                      : setData("implementation_ja", v)
                  }
                />
              </div>
              <div>
                <label className="font-medium">Content</label>

                <ReactQuill
                  key={`content-${activeLang}`}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={activeLang === "en" ? data.content : data.content_ja}
                  onChange={(v) =>
                    activeLang === "en"
                      ? setData("content", v)
                      : setData("content_ja", v)
                  }
                />
              </div>

              {/* EXISTING IMAGE */}

              {mode === "edit" && current?.hero_image && (
                <img
                  src={`/storage/${current.hero_image}`}
                  className="h-32 rounded border"
                />
              )}


              {/* IMAGE */}

              <Input
                type="file"
                onChange={(e) =>
                  setData("hero_image", e.target.files?.[0] || null)
                }
              />


              {/* ================= SECTIONS ================= */}

              {/* <div>

                <h3 className="font-semibold mb-3">Sections</h3>

                {data.sections.map((sec, i) => (

                  <div key={i} className="border p-4 rounded space-y-3 mb-4">

                    <Input
                      placeholder="Section Title"
                      value={activeLang === "en" ? sec.title : sec.title_ja}
                      onChange={(e) =>
                        updateSection(
                          i,
                          activeLang === "en" ? "title" : "title_ja",
                          e.target.value
                        )
                      }
                    />

                    <ReactQuill
                      key={activeLang}
                      theme="snow"
                      value={
                        activeLang === "en"
                          ? sec.description
                          : sec.description_ja
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
                      Remove
                    </Button>

                  </div>

                ))}

                <Button variant="outline" onClick={addSection}>
                  + Add Section
                </Button>

              </div> */}


              {/* SAVE */}

              <Button
                disabled={processing}
                className="w-full"
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit" ? "Update Case Study" : "Save Case Study"}
              </Button>

            </div>
          )}


          {/* ================= VIEW ================= */}

          {mode === "view" && current && (

            <div className="space-y-6 mt-6">

              <h3 className="text-xl font-semibold">{current.title}</h3>

              {current.hero_image && (
                <img
                  src={`/storage/${current.hero_image}`}
                  className="w-64 rounded border"
                />
              )}

              <div
                dangerouslySetInnerHTML={{
                  __html: current.hero_description || "",
                }}
              />

              {/* {current.sections?.map((sec, i) => (

                <div key={i} className="border rounded p-4">

                  <h4 className="font-semibold">{sec.title}</h4>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: sec.description || "",
                    }}
                  />

                </div>

              ))} */}

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

          {caseStudies.map((c, i) => (

            <TableRow key={c.id}>

              <TableCell>{i + 1}</TableCell>
              <TableCell>{c.title}</TableCell>
              <TableCell>{c.slug}</TableCell>

              <TableCell className="text-center space-x-2">

                {/* <Button size="icon" onClick={() => openView(c)}>
                  <Eye className="w-4 h-4" />
                </Button> */}

                <Button size="icon" onClick={() => openEdit(c)}>
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteItem(c.id)}
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