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
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

interface Faq {
  id: number;
  question: string;
  question_ja?: string | null;
  answer_ja?: string | null;
  answer: string;
  sort_order?: number | null;
}

export default function Index({ faqs }: { faqs: Faq[] }) {
  const [activeLang, setActiveLang] = useState<"en" | "ja">("ja");
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Faq | null>(null);
  const [open, setOpen] = useState(false);
  

  const { data, setData, post, reset, processing } = useForm({
    question: "",
    question_ja: "",
    answer: "",
    answer_ja: "",
    sort_order: "",
  });

  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    reset();
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (faq: Faq) => {
    setMode("edit");
    setCurrent(faq);
    setOpen(true);

    setData({
      question: faq.question,
      answer: faq.answer,
      question_ja: (faq as any).question_ja || "",
      answer_ja: (faq as any).answer_ja || "",
      sort_order:
        faq.sort_order !== null && faq.sort_order !== undefined
          ? String(faq.sort_order)
          : "",
    });
  };

  /* ================= OPEN VIEW ================= */
  const openView = (faq: Faq) => {
    setMode("view");
    setCurrent(faq);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const submitAdd = () => {
    post(route("admin.faqs.store"), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const submitUpdate = () => {
    if (!current) return;

    router.post(
      route("admin.faqs.update", current.id),
      { _method: "PUT", ...data },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  };

  /* ================= DELETE ================= */
  const deleteItem = (id: number) => {
    if (confirm("Delete this FAQ?")) {
      router.delete(route("admin.faqs.destroy", id));
    }
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">FAQs</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">FAQs</h1>

        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      {/* ================= SHEET ================= */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add FAQ"}
              {mode === "edit" && "Edit FAQ"}
              {mode === "view" && "FAQ Details"}
            </SheetTitle>
          </SheetHeader>

          {/* VIEW */}
          {mode === "view" && current && (
            <div className="space-y-4 mt-6">
              <div>
                <strong>Question:</strong>
                <p>{current.question}</p>
              </div>

              <div>
                <strong>Answer:</strong>
                <p className="whitespace-pre-line">{current.answer}</p>
              </div>

              {/* <div>
                <strong>Sort Order:</strong>{" "}
                {current.sort_order ?? "-"}
              </div> */}
            </div>
          )}

          {/* ADD / EDIT */}
          {mode !== "view" && (
            <div className="space-y-4 mt-6">
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
             <label className="text-sm font-medium">Question</label>
              <Input
                placeholder="Question"
                value={activeLang === "en" ? data.question : data.question_ja}
                onChange={(e) =>
                  activeLang === "en"
                    ? setData("question", e.target.value)
                    : setData("question_ja", e.target.value)
                }
              />
              <label className="text-sm font-medium">Answer</label>
              <Textarea
                placeholder="Answer"
                rows={5}
                value={activeLang === "en" ? data.answer : data.answer_ja}
                onChange={(e) =>
                  activeLang === "en"
                    ? setData("answer", e.target.value)
                    : setData("answer_ja", e.target.value)
                }
              />

              {/* <Input
                type="number"
                placeholder="Sort Order"
                value={data.sort_order}
                onChange={(e) => setData("sort_order", e.target.value)}
              /> */}

              <Button
                className="w-full"
                disabled={processing}
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit" ? "Update FAQ" : "Save FAQ"}
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
            <TableHead className="text-white">Question</TableHead>
            <TableHead className="text-white">Answer</TableHead>
            <TableHead className="text-white text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {faqs.map((faq, i) => (
            <TableRow key={faq.id}>
              <TableCell>{faq.sort_order ?? i + 1}</TableCell>
              <TableCell>
                {faq.question}
              </TableCell>
              <TableCell className="line-clamp-2 max-w-xl">
                {faq.answer}
              </TableCell>
              <TableCell className="space-x-2 text-center">
                <Button title="View" size="icon" onClick={() => openView(faq)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button title="Edit" size="icon" onClick={() => openEdit(faq)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  title="Delete"
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteItem(faq.id)}
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
