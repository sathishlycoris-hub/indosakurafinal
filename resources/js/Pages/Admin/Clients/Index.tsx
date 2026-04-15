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
import { Pencil, Trash2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* ================= TYPES ================= */

interface ClientSection {
  type: "customer" | "alliance" | "contract" | "partner";
  name: string;
  name_ja: string;
  link?: string; // ✅ link added
}

interface Client {
  id: number;
  description: string;
  description_ja?: string;
  sections: {
    section_type: string;
    name: string;
    name_ja?: string;
    link?: string;
  }[];
}

/* ================= COMPONENT ================= */

export default function Index({ clients }: { clients: Client[] }) {
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");

  const { data, setData, post, reset, processing } = useForm<{
    description: string;
    description_ja: string;
    sections: ClientSection[];
  }>({
    description: "",
    description_ja: "",
    sections: [],
  });

  /* ================= OPEN ================= */

  const openEdit = (client: Client) => {
    setMode("edit");
    setCurrent(client);
    setOpen(true);

    setData({
      description: client.description ?? "",
      description_ja: client.description_ja ?? "",
      sections: client.sections.map((s) => ({
        type: s.section_type as ClientSection["type"],
        name: s.name ?? "",
        name_ja: s.name_ja ?? "",
        link: s.link ?? "", // ✅ load link
      })),
    });
  };

  /* ================= SAVE ================= */

  const submitUpdate = () => {
    if (!current) return;

    router.post(
      route("admin.clients.update", current.id),
      {
        _method: "PUT",
        description: data.description,
        description_ja: data.description_ja,
        sections: data.sections
          .filter((s) => s.name.trim() !== "")
          .map((s) => ({
            type: s.type,
            name: s.name,
            name_ja: s.name_ja,
            link: s.link, // ✅ send link
          })),
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  };

  /* ================= HELPERS ================= */

  const removeSectionItem = (index: number) => {
    const updated = [...data.sections];
    updated.splice(index, 1);
    setData("sections", updated);
  };

  const addSection = (type: ClientSection["type"]) => {
    setData("sections", [
      ...data.sections,
      { type, name: "", name_ja: "", link: "" }, // ✅ include link
    ]);
  };

  const updateSection = (
    index: number,
    field: "name" | "name_ja" | "link",
    value: string
  ) => {
    const updated = [...data.sections];
    updated[index][field] = value;
    setData("sections", updated);
  };

  /* ================= SECTION UI ================= */

  const renderSection = (
    type: ClientSection["type"],
    title: string
  ) => (
    <div className="space-y-3">
      <h4 className="font-semibold">{title}</h4>

      {data.sections
        .map((s, i) => ({ ...s, i }))
        .filter((s) => s.type === type)
        .map(({ i }) => (
          <div key={i} className="border p-3 rounded space-y-2">

            {/* Name */}
            <Input
              value={
                activeLang === "en"
                  ? data.sections[i].name
                  : data.sections[i].name_ja
              }
              onChange={(e) =>
                activeLang === "en"
                  ? updateSection(i, "name", e.target.value)
                  : updateSection(i, "name_ja", e.target.value)
              }
              placeholder="Company name"
            />

            {/* Link */}
            {/* <Input
              placeholder="https://example.com"
              value={data.sections[i].link || ""}
              onChange={(e) =>
                updateSection(i, "link", e.target.value)
              }
            /> */}

            {/* Remove */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => removeSectionItem(i)}
            >
              Remove
            </Button>
          </div>
        ))}

      <Button
        size="sm"
        variant="outline"
        onClick={() => addSection(type)}
      >
        + Add Company
      </Button>
    </div>
  );

  /* ================= UI ================= */

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Clients</h2>}>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
      </div>

      {/* SHEET */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Clients</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">

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

            {renderSection("customer", "Customer Company")}
            {renderSection("alliance", "Alliance Companies")}
            {/* {renderSection("contract", "Contract Companies")} */}
            {renderSection("partner", "Partner Companies")}

            {/* Description */}
            <ReactQuill
              key={activeLang}
              theme="snow"
              style={{ height: "200px", marginBottom: "50px" }}
              value={
                activeLang === "en"
                  ? data.description
                  : data.description_ja
              }
              onChange={(v) =>
                activeLang === "en"
                  ? setData("description", v)
                  : setData("description_ja", v)
              }
            />

            <Button
              disabled={processing}
              className="w-full"
              onClick={submitUpdate}
            >
              Update Clients
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* TABLE */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Customer</TableHead>
            <TableHead className="text-white">Alliance</TableHead>
            {/* <TableHead className="text-white">Contract</TableHead> */}
            <TableHead className="text-white">Partner</TableHead>
            <TableHead className="text-white text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients.map((c, i) => (
            <TableRow key={c.id}>
              <TableCell>{i + 1}</TableCell>

              {["customer", "alliance", "partner"].map((type) => (
                <TableCell key={type}>
                  {c.sections
                    .filter((s) => s.section_type === type)
                    .map((s, idx) => (
                      <div key={idx}>
                        {s.link ? (
                          <a
                            href={s.link}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            {s.name}
                          </a>
                        ) : (
                          s.name
                        )}
                      </div>
                    ))}
                </TableCell>
              ))}

              <TableCell className="text-center">
                <Button size="icon" onClick={() => openEdit(c)}>
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