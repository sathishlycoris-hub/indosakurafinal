import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Trash2, Download, Search } from "lucide-react";

const formatDate = (d: string) => {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
};

interface Whitepaper {
  id: number;
  title?: string | null;
  title_ja?: string | null;
  description?: string | null;
  description_ja?: string | null;
  file?: string | null;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface PaginatedLeads {
  data: Lead[];
  links: { url: string | null; label: string; active: boolean }[];
  total: number;
}

export default function Index({
  whitepaper,
  leads,
  filters,
}: {
  whitepaper: Whitepaper;
  leads: PaginatedLeads;
  filters: { search?: string };
}) {
  const [langTab, setLangTab] = useState<"en" | "ja">("en");
  const [search, setSearch] = useState(filters.search ?? "");

  const { data, setData, post, processing } = useForm({
    title: whitepaper.title ?? "",
    title_ja: whitepaper.title_ja ?? "",
    description: whitepaper.description ?? "",
    description_ja: whitepaper.description_ja ?? "",
    file: null as File | null,
  });

  const submit = () => {
    const form = new FormData();
    form.append("title", data.title ?? "");
    form.append("title_ja", data.title_ja ?? "");
    form.append("description", data.description ?? "");
    form.append("description_ja", data.description_ja ?? "");
    if (data.file) form.append("file", data.file);

    router.post(route("admin.whitepaper.update"), form, {
      preserveScroll: true,
      onSuccess: () => setData("file", null),
    });
  };

  const deleteLead = (id: number) => {
    if (!confirm("Delete this lead?")) return;
    router.delete(route("admin.whitepaper.leads.destroy", id), { preserveScroll: true });
  };

  const runSearch = () => {
    router.get(route("admin.whitepaper.index"), { search }, { preserveState: true, preserveScroll: true });
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Whitepaper</h2>}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Whitepaper</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the gated whitepaper PDF shown on the Corporate Profile page, and view everyone who has requested it.
        </p>
      </div>

      {/* ── Settings ── */}
      <div className="border rounded-xl p-6 bg-muted/20 space-y-5 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Whitepaper File & Text</h2>
        </div>

        {whitepaper.file && (
          <div className="flex items-center gap-3 bg-white border rounded-lg p-3">
            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Current file uploaded</p>
              <a
                href={`/storage/${whitepaper.file}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> View current PDF
              </a>
            </div>
          </div>
        )}

        <Tabs value={langTab} onValueChange={(v) => setLangTab(v as "en" | "ja")}>
          <TabsList className="mb-2">
            <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">English</TabsTrigger>
            <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">Japanese</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Link Text / Title (EN)</Label>
              <Input
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                placeholder="whitepaper"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Caption (EN)</Label>
              <Textarea
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                placeholder="Please download Corporate whitepaper of Indo-sakura here (Japanese only)."
                rows={2}
              />
            </div>
          </TabsContent>

          <TabsContent value="ja" className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Link Text / Title (JA)</Label>
              <Input
                value={data.title_ja}
                onChange={(e) => setData("title_ja", e.target.value)}
                placeholder="ホワイトペーパー"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Caption (JA)</Label>
              <Textarea
                value={data.description_ja}
                onChange={(e) => setData("description_ja", e.target.value)}
                placeholder="インドサクラの企業ホワイトペーパーをこちらからダウンロードいただけます（日本語のみ）。"
                rows={2}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">
            {whitepaper.file ? "Replace PDF (optional)" : "Upload PDF"}
          </Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setData("file", e.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-muted-foreground">PDF only, max 10 MB. Leaving this empty keeps the current file.</p>
        </div>

        <Button disabled={processing} onClick={submit}>
          {processing ? "Saving..." : "Save Whitepaper Settings"}
        </Button>
      </div>

      {/* ── Leads ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">
          Leads <span className="text-sm font-normal text-muted-foreground">({leads.total} total)</span>
        </h2>
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Search name or email..."
            className="w-64"
          />
          <Button variant="outline" size="icon" onClick={runSearch}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Submitted At</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.data.length === 0 && (
            <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No leads yet.</TableCell></TableRow>
          )}
          {leads.data.map((lead, i) => (
            <TableRow key={lead.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{formatDate(lead.created_at)}</TableCell>
              <TableCell className="text-center">
                <Button size="icon" variant="destructive" onClick={() => deleteLead(lead.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {leads.links.length > 3 && (
        <div className="flex flex-wrap gap-1 mt-4">
          {leads.links.map((link, i) => (
            <button
              key={i}
              disabled={!link.url}
              onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true, preserveState: true })}
              className={`px-3 py-1.5 text-sm rounded border ${
                link.active ? "bg-primary text-white border-primary" : "bg-white text-muted-foreground border-border"
              } ${!link.url ? "opacity-40 cursor-not-allowed" : "hover:border-primary"}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      )}
    </Authenticated>
  );
}