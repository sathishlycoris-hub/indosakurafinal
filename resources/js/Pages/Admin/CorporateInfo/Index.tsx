import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Pencil, Trash2, Settings } from "lucide-react";

interface CorporateItem {
  id: number;
  title: string;
  title_ja?: string;
  path?: string;
  image?: string | null;
}

interface PageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
}

export default function Index({
  items,
  pageData,
}: {
  items: CorporateItem[];
  pageData: PageData | null;
}) {
  /* ── item sheet state ── */
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<CorporateItem | null>(null);
  const [open, setOpen] = useState(false);

  /* ── page-settings sheet state ── */
  const [pageOpen, setPageOpen] = useState(false);
  const [pageLang, setPageLang] = useState<"en" | "ja">("en");
  const [pageProcessing, setPageProcessing] = useState(false);

  // ✅ Plain useState instead of useForm for page settings
  const [pageFields, setPageFields] = useState({
    hero_title:       "",
    hero_title_ja:    "",
    hero_subtitle:    "",
    hero_subtitle_ja: "",
  });

  const { data, setData, post, reset, processing } = useForm({
    title: "",
    title_ja: "",
    path: "",
    image: null as File | null,
  });

  /* ── item sheet helpers ── */
  const openAdd = () => { reset(); setMode("add"); setCurrent(null); setOpen(true); };

  const openEdit = (item: CorporateItem) => {
    setMode("edit"); setCurrent(item); setOpen(true);
    setData({ title: item.title, title_ja: item.title_ja || "", path: item.path || "", image: null });
  };

  const openView = (item: CorporateItem) => { setMode("view"); setCurrent(item); setOpen(true); };

  const submitAdd = () => post(route("admin.corporate.store"), {
    forceFormData: true,
    onSuccess: () => { reset(); setOpen(false); },
  });

  const submitUpdate = () => {
    if (!current) return;
    router.post(route("admin.corporate.update", current.id), { _method: "PUT", ...data }, {
      forceFormData: true,
      onSuccess: () => { reset(); setOpen(false); },
    });
  };

  const deleteItem = (id: number) => {
    if (confirm("Delete this item?")) router.delete(route("admin.corporate.destroy", id));
  };

  /* ── page settings open ── */
  const openPageSettings = () => {
    // ✅ Set all values at once from current pageData prop
    setPageFields({
      hero_title:       pageData?.hero_title       ?? "",
      hero_title_ja:    pageData?.hero_title_ja    ?? "",
      hero_subtitle:    pageData?.hero_subtitle    ?? "",
      hero_subtitle_ja: pageData?.hero_subtitle_ja ?? "",
    });
    setPageLang("en");
    setPageOpen(true);
  };

  /* ── page settings submit ── */
  const submitPage = () => {
    setPageProcessing(true);
    router.post(
      route("admin.corporate.updatePage"),
      pageFields,
      {
        onSuccess: () => {
          setPageOpen(false);
          setPageProcessing(false);
        },
        onError: () => setPageProcessing(false),
      }
    );
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Corporate Info</h2>}>

      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Corporate Info</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openPageSettings}>
            <Settings className="w-4 h-4 mr-2" /> Page Settings
          </Button>
          <Button onClick={openAdd}>
            <Plus className="w-4 h-4 mr-2" /> Add Info
          </Button>
        </div>
      </div>

      {/* ── Page Settings Sheet ── */}
      <Sheet open={pageOpen} onOpenChange={setPageOpen}>
        <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Page Settings — Hero Section</SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-6">
            <Tabs value={pageLang} onValueChange={v => setPageLang(v as "en" | "ja")}>
              <TabsList className="mb-2">
                <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  English
                </TabsTrigger>
                <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Japanese
                </TabsTrigger>
              </TabsList>

              <TabsContent value="en" className="space-y-4">
                <FieldRow label="Hero Title (EN)">
                  <Input
                    value={pageFields.hero_title}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_title: e.target.value }))}
                    placeholder="Company Information"
                  />
                </FieldRow>
                <FieldRow label="Hero Subtitle (EN)">
                  <Input
                    value={pageFields.hero_subtitle}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                    placeholder="Learn more about who we are"
                  />
                </FieldRow>
              </TabsContent>

              <TabsContent value="ja" className="space-y-4">
                <FieldRow label="Hero Title (JA)">
                  <Input
                    value={pageFields.hero_title_ja}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_title_ja: e.target.value }))}
                    placeholder="企業情報"
                  />
                </FieldRow>
                <FieldRow label="Hero Subtitle (JA)">
                  <Input
                    value={pageFields.hero_subtitle_ja}
                    onChange={e => setPageFields(prev => ({ ...prev, hero_subtitle_ja: e.target.value }))}
                    placeholder="私たちについて"
                  />
                </FieldRow>
              </TabsContent>
            </Tabs>

            <Button disabled={pageProcessing} className="w-full" onClick={submitPage}>
              {pageProcessing ? "Saving..." : "Save Page Settings"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Item Sheet ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Item"}
              {mode === "edit" && "Edit Item"}
              {mode === "view" && "View Item"}
            </SheetTitle>
          </SheetHeader>

          {mode === "view" && current && (
            <div className="space-y-4 mt-6">
              <p><strong>Title:</strong> {current.title}</p>
              <p><strong>Path:</strong> {current.path}</p>
              {current.image && <img src={`/storage/${current.image}`} className="w-64 rounded border" />}
            </div>
          )}

          {mode !== "view" && (
            <div className="space-y-5 mt-6">
              <div className="flex gap-2">
                <Button variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>Japanese</Button>
                <Button variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>English</Button>
              </div>

              <Input
                placeholder="Title"
                value={activeLang === "en" ? data.title : data.title_ja}
                onChange={e => activeLang === "en" ? setData("title", e.target.value) : setData("title_ja", e.target.value)}
              />

              {mode === "edit" && current?.image && <img src={`/storage/${current.image}`} className="h-24 rounded" />}

              <Input type="file" onChange={e => setData("image", e.target.files?.[0] ?? null)} />
              <span className="text-xs text-gray-500">Max: 2048 KB (625px x 242px)</span>

              <Button disabled={processing} className="w-full" onClick={mode === "edit" ? submitUpdate : submitAdd}>
                {mode === "edit" ? "Update" : "Save"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Table ── */}
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
                {item.image && <img src={`/storage/${item.image}`} className="w-12 h-12 object-cover rounded" />}
              </TableCell>
              <TableCell className="text-center space-x-2">
                <Button size="icon" onClick={() => openView(item)}><Eye className="w-4 h-4" /></Button>
                <Button size="icon" onClick={() => openEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="destructive" onClick={() => deleteItem(item.id)}><Trash2 className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Authenticated>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}