import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
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
import { Settings, ExternalLink } from "lucide-react";

interface CaseStudy {
  slug: string;
  title: string; title_ja?: string;
  hero_image?: string | null;
  logo?: string | null;
  india_desk_id: number;
  india_desk_slug: string;
  india_desk_title: string;
}

interface PageData {
  hero_title?: string | null;
  hero_title_ja?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_ja?: string | null;
}

export default function Index() {
  const { caseStudies, pageData } = usePage<{
    caseStudies: CaseStudy[];
    pageData: PageData | null;
  }>().props;

  const [pageOpen, setPageOpen] = useState(false);
  const [pageLang, setPageLang] = useState<"en" | "ja">("en");
  const [pageProcessing, setPageProcessing] = useState(false);
  const [pageFields, setPageFields] = useState({
    hero_title: "", hero_title_ja: "", hero_subtitle: "", hero_subtitle_ja: "",
  });

  const openPageSettings = () => {
    setPageFields({
      hero_title:       pageData?.hero_title ?? "",
      hero_title_ja:    pageData?.hero_title_ja ?? "",
      hero_subtitle:    pageData?.hero_subtitle ?? "",
      hero_subtitle_ja: pageData?.hero_subtitle_ja ?? "",
    });
    setPageLang("en");
    setPageOpen(true);
  };

  const submitPage = () => {
    setPageProcessing(true);
    router.post(route("admin.case_studies.updatePage"), pageFields, {
      onSuccess: () => { setPageOpen(false); setPageProcessing(false); },
      onError:   () => setPageProcessing(false),
    });
  };

  // Case studies are edited from within the owning India Desk's sheet.
  const editInIndiaDesk = (deskId: number) => {
    router.visit(route("admin.india_desks.index", { open: deskId }));
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Case Studies</h2>}>
      <div className="mb-5 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Case Studies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Case studies now live under each India Desk. Edit them from the desk's edit sheet.
          </p>
        </div>
        <Button variant="outline" onClick={openPageSettings}>
          <Settings className="w-4 h-4 mr-2" /> Page Settings
        </Button>
      </div>

      {/* Page Settings Sheet */}
      <Sheet open={pageOpen} onOpenChange={setPageOpen}>
        <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Page Settings — Hero Section</SheetTitle>
          </SheetHeader>
          <div className="space-y-5 mt-6">
            <Tabs value={pageLang} onValueChange={v => setPageLang(v as "en" | "ja")}>
              <TabsList className="mb-2">
                <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white">English</TabsTrigger>
                <TabsTrigger value="ja" className="data-[state=active]:bg-primary data-[state=active]:text-white">Japanese</TabsTrigger>
              </TabsList>
              <TabsContent value="en" className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Title (EN)</Label>
                  <Input value={pageFields.hero_title} onChange={e => setPageFields(p => ({ ...p, hero_title: e.target.value }))} placeholder="Case Studies" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Subtitle (EN)</Label>
                  <Input value={pageFields.hero_subtitle} onChange={e => setPageFields(p => ({ ...p, hero_subtitle: e.target.value }))} placeholder="Real-world results from our client engagements" />
                </div>
              </TabsContent>
              <TabsContent value="ja" className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Title (JA)</Label>
                  <Input value={pageFields.hero_title_ja} onChange={e => setPageFields(p => ({ ...p, hero_title_ja: e.target.value }))} placeholder="事例" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Hero Subtitle (JA)</Label>
                  <Input value={pageFields.hero_subtitle_ja} onChange={e => setPageFields(p => ({ ...p, hero_subtitle_ja: e.target.value }))} placeholder="お客様との取り組みから得られた実際の成果" />
                </div>
              </TabsContent>
            </Tabs>
            <Button disabled={pageProcessing} className="w-full" onClick={submitPage}>
              {pageProcessing ? "Saving..." : "Save Page Settings"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Read-only aggregated table */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">India Desk</TableHead>
            <TableHead className="text-white">Slug</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {caseStudies.length === 0 && (
            <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No case studies yet.</TableCell></TableRow>
          )}
          {caseStudies.map((c, i) => (
            <TableRow key={`${c.india_desk_id}-${c.slug}`}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="font-medium">{c.title}</TableCell>
              <TableCell className="text-sm">{c.india_desk_title}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{c.slug}</TableCell>
              <TableCell className="text-center">
                <Button size="sm" variant="outline" onClick={() => editInIndiaDesk(c.india_desk_id)}>
                  <ExternalLink className="w-3.5 h-3.5 mr-1" /> Edit in India Desk
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authenticated>
  );
}