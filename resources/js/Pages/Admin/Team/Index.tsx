import { useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2, Plus, Search, Tags } from "lucide-react";

// ── Types ──────────────────────────────────────────────────
interface TeamCategory {
  id: number;
  name: string;
  name_ja: string | null;
  sort_order: number;
}

interface TeamMember {
  id: number;
  name: string;
  name_ja: string | null;
  designation: string;
  designation_ja: string | null;
  category: string;
  description: string | null;
  description_ja: string | null;
  image: string | null;
}

// ── Sub-components outside parent to prevent focus loss ───
interface CategoryRowProps {
  cat: TeamCategory;
  onEdit: (cat: TeamCategory) => void;
  onDelete: (id: number) => void;
}

function CategoryRow({ cat, onEdit, onDelete }: CategoryRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{cat.name}</TableCell>
      <TableCell className="text-muted-foreground">{cat.name_ja ?? "—"}</TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center gap-2">
          <Button size="icon" variant="outline" title="Edit" onClick={() => onEdit(cat)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            title="Delete"
            onClick={() => {
              if (confirm(`Delete category "${cat.name}"?`)) onDelete(cat.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface MemberRowProps {
  member: TeamMember;
  lang: "en" | "ja";
  onView: (m: TeamMember) => void;
  onEdit: (m: TeamMember) => void;
  onDelete: (id: number) => void;
}

function MemberRow({ member, lang, onView, onEdit, onDelete }: MemberRowProps) {
  return (
    <TableRow>
      <TableCell>{lang === "en" ? member.name : member.name_ja || member.name}</TableCell>
      <TableCell>{lang === "en" ? member.designation : member.designation_ja || member.designation}</TableCell>
      <TableCell>{member.category}</TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center gap-2">
          {/* <Button size="icon" title="View" onClick={() => onView(member)}>
            <Eye className="w-4 h-4" />
          </Button> */}
          <Button size="icon" title="Edit" onClick={() => onEdit(member)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            title="Delete"
            onClick={() => {
              if (confirm("Delete this team member?")) onDelete(member.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function Index() {
  const { teams, categories } = usePage<{
    teams: TeamMember[];
    categories: TeamCategory[];
  }>().props;

  // ── UI state ───────────────────────────────────────────
  type MainTab = "members" | "categories";
  const [mainTab, setMainTab] = useState<MainTab>("members");
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [search, setSearch] = useState("");

  // ── Member sheet state ─────────────────────────────────
  const [memberOpen, setMemberOpen] = useState(false);
  const [memberMode, setMemberMode] = useState<"add" | "edit" | "view">("add");
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);

  const {
    data: memberData,
    setData: setMemberData,
    post: postMember,
    reset: resetMember,
  } = useForm({
    name: "",        name_ja: "",
    designation: "", designation_ja: "",
    category: "",
    description: "", description_ja: "",
    image: null as File | null,
  });

  // ── Category sheet state ───────────────────────────────
  const [catOpen, setCatOpen] = useState(false);
  const [catMode, setCatMode] = useState<"add" | "edit">("add");
  const [currentCat, setCurrentCat] = useState<TeamCategory | null>(null);

  const {
    data: catData,
    setData: setCatData,
    post: postCat,
    put: putCat,
    reset: resetCat,
  } = useForm({ name: "", name_ja: "" });

  // ── Filtered members ───────────────────────────────────
  const filtered = teams.filter((t) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.name?.toLowerCase().includes(q) ||
      t.designation?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q)
    );
  });

  // ── Member CRUD handlers ───────────────────────────────
  const openAddMember = () => {
    resetMember();
    setMemberMode("add");
    setCurrentMember(null);
    setMemberOpen(true);
  };

  const openEditMember = (item: TeamMember) => {
    setCurrentMember(item);
    setMemberMode("edit");
    setMemberData({
      name: item.name ?? "",           name_ja: item.name_ja ?? "",
      designation: item.designation ?? "", designation_ja: item.designation_ja ?? "",
      category: item.category ?? "",
      description: item.description ?? "", description_ja: item.description_ja ?? "",
      image: null,
    });
    setMemberOpen(true);
  };

  const openViewMember = (item: TeamMember) => {
    setCurrentMember(item);
    setMemberMode("view");
    setMemberOpen(true);
  };

  const submitMember = () => {
    if (memberMode === "add") {
      postMember(route("admin.team.store"), { forceFormData: true });
    } else {
      postMember(route("admin.team.update", currentMember!.id), {
        forceFormData: true,
        data: { _method: "PUT" },
      });
    }
    setMemberOpen(false);
  };

  const deleteMember = (id: number) => router.delete(route("admin.team.destroy", id));

  // ── Category CRUD handlers ─────────────────────────────
  const openAddCat = () => {
    resetCat();
    setCatMode("add");
    setCurrentCat(null);
    setCatOpen(true);
  };

  const openEditCat = (cat: TeamCategory) => {
    setCurrentCat(cat);
    setCatMode("edit");
    setCatData({ name: cat.name, name_ja: cat.name_ja ?? "" });
    setCatOpen(true);
  };

 const submitCat = () => {
  if (catMode === "add") {
    postCat(route("admin.team-category.store"), {
      onSuccess: () => { resetCat(); setCatOpen(false); },
    });
  } else {
    putCat(route("admin.team-category.update", currentCat!.id), {
      onSuccess: () => { resetCat(); setCatOpen(false); },
    });
  }
};

  const deleteCat = (id: number) => router.delete(route("admin.team-category.destroy", id));

  // ── Main tabs ──────────────────────────────────────────
  const mainTabs: { key: MainTab; label: string; icon: React.ReactNode }[] = [
    { key: "members",    label: "Team Members", icon: null },
    { key: "categories", label: "Categories",   icon: <Tags className="w-4 h-4" /> },
  ];

  return (
    <Authenticated header={<h2 className="text-xl font-bold">Team Management</h2>}>

      {/* ── MAIN TABS ────────────────────────────────────── */}
      <div className="flex gap-1 border-b mb-6">
        {mainTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setMainTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              mainTab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════
          TAB: TEAM MEMBERS
      ════════════════════════════════════════════════════ */}
      {mainTab === "members" && (
        <>
          <div className="mb-5">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Team Members</h1>
              <div className="flex items-center gap-3">
                {/* Language toggle for table display */}
                <div className="flex gap-1">
                  {/* <Button
                    type="button" size="sm"
                    variant={activeLang === "en" ? "default" : "outline"}
                    onClick={() => setActiveLang("en")}
                  >
                    EN
                  </Button>
                  <Button
                    type="button" size="sm"
                    variant={activeLang === "ja" ? "default" : "outline"}
                    onClick={() => setActiveLang("ja")}
                  >
                    JA
                  </Button> */}
                </div>
                <Button onClick={openAddMember}>
                  <Plus className="w-4 h-4 mr-2" /> Add Member
                </Button>
              </div>
            </div>

            <div className="mb-4 max-w-sm relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, designation, category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Designation</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No records found
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((t) => (
                <MemberRow
                  key={t.id}
                  member={t}
                  lang={activeLang}
                  onView={openViewMember}
                  onEdit={openEditMember}
                  onDelete={deleteMember}
                />
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {/* ════════════════════════════════════════════════════
          TAB: CATEGORIES
      ════════════════════════════════════════════════════ */}
      {mainTab === "categories" && (
        <>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold">Team Categories</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Categories appear as section headings on the Team page and in the member form dropdown.
              </p>
            </div>
            <Button onClick={openAddCat}>
              <Plus className="w-4 h-4 mr-2" /> Add Category
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white">Name (EN)</TableHead>
                <TableHead className="text-white">Name (JA)</TableHead>
                <TableHead className="text-white text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    No categories yet — add one above.
                  </TableCell>
                </TableRow>
              )}
              {categories.map((cat) => (
                <CategoryRow
                  key={cat.id}
                  cat={cat}
                  onEdit={openEditCat}
                  onDelete={deleteCat}
                />
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {/* ════════════════════════════════════════════════════
          MEMBER SHEET
      ════════════════════════════════════════════════════ */}
      <Sheet open={memberOpen} onOpenChange={setMemberOpen}>
        <SheetContent side="right" className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {memberMode === "add"  && "Add Team Member"}
              {memberMode === "edit" && "Edit Team Member"}
              {memberMode === "view" && "Team Member Details"}
            </SheetTitle>
          </SheetHeader>

          {/* VIEW */}
          {memberMode === "view" ? (
            <div className="space-y-4 mt-6">
              <div className="flex gap-2 mb-4">
                <Button type="button" size="sm" variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>English</Button>
                <Button type="button" size="sm" variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>Japanese</Button>
              </div>
              <p><strong>Name:</strong> {activeLang === "en" ? currentMember?.name : currentMember?.name_ja || currentMember?.name}</p>
              <p><strong>Designation:</strong> {activeLang === "en" ? currentMember?.designation : currentMember?.designation_ja || currentMember?.designation}</p>
              <p><strong>Category:</strong> {currentMember?.category}</p>
              {currentMember?.description && (
                <div>
                  <strong>Description:</strong>
                  <p className="mt-1">{activeLang === "en" ? currentMember.description : currentMember.description_ja || currentMember.description}</p>
                </div>
              )}
              {currentMember?.image && (
                <div>
                  <strong>Image:</strong>
                  <img src={`/storage/${currentMember.image}`} className="mt-2 h-32 rounded-md border object-contain" alt={currentMember.name} />
                </div>
              )}
            </div>
          ) : (
            /* ADD / EDIT */
            <div className="space-y-5 mt-6">
              <div className="flex gap-2">
                <Button type="button" size="sm" variant={activeLang === "en" ? "default" : "outline"} onClick={() => setActiveLang("en")}>English</Button>
                <Button type="button" size="sm" variant={activeLang === "ja" ? "default" : "outline"} onClick={() => setActiveLang("ja")}>Japanese</Button>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Name <span className="text-xs text-primary">({activeLang.toUpperCase()})</span></label>
                <Input
                  placeholder="Name"
                  value={activeLang === "en" ? memberData.name : memberData.name_ja}
                  onChange={(e) => activeLang === "en" ? setMemberData("name", e.target.value) : setMemberData("name_ja", e.target.value)}
                />
              </div>

              {/* Designation */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Designation <span className="text-xs text-primary">({activeLang.toUpperCase()})</span></label>
                <Input
                  placeholder="Designation"
                  value={activeLang === "en" ? memberData.designation : memberData.designation_ja}
                  onChange={(e) => activeLang === "en" ? setMemberData("designation", e.target.value) : setMemberData("designation_ja", e.target.value)}
                />
              </div>

              {/* Category — driven from DB categories */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Category</label>
                <Select value={memberData.category} onValueChange={(v) => setMemberData("category", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Description <span className="text-xs text-primary">({activeLang.toUpperCase()})</span></label>
                <Textarea
                  placeholder="Description"
                  rows={4}
                  value={activeLang === "en" ? memberData.description : memberData.description_ja}
                  onChange={(e) => activeLang === "en" ? setMemberData("description", e.target.value) : setMemberData("description_ja", e.target.value)}
                />
              </div>

              {/* Existing image (edit only) */}
              {memberMode === "edit" && currentMember?.image && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Image</label>
                  <img src={`/storage/${currentMember.image}`} className="h-32 rounded-md border object-contain" alt="" />
                </div>
              )}

              {/* Upload */}
              <div className="space-y-1">
                <label className="text-sm font-medium">{memberMode === "edit" ? "Replace Image" : "Upload Image"}</label>
                <Input type="file" accept="image/*" onChange={(e) => setMemberData("image", e.target.files?.[0] || null)} />
              </div>

              <Button onClick={submitMember} className="w-full">
                {memberMode === "add" ? "Add Member" : "Update Member"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ════════════════════════════════════════════════════
          CATEGORY SHEET
      ════════════════════════════════════════════════════ */}
      <Sheet open={catOpen} onOpenChange={setCatOpen}>
        <SheetContent side="right" className="w-[90%] sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {catMode === "add" ? "Add Category" : "Edit Category"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-6">
            <div className="space-y-1">
              <label className="text-sm font-medium">Category Name (English)</label>
              <Input
                placeholder="e.g. Management Team"
                value={catData.name}
                onChange={(e) => setCatData("name", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This is also used as the category key — it must match what you select in the member form.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Category Name (Japanese)</label>
              <Input
                placeholder="e.g. マネジメントチーム"
                value={catData.name_ja}
                onChange={(e) => setCatData("name_ja", e.target.value)}
              />
            </div>

            <Button onClick={submitCat} className="w-full">
              {catMode === "add" ? "Add Category" : "Update Category"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

    </Authenticated>
  );
}