import { useState, useRef, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  GripVertical,
} from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

interface Job {
  id: number;
  title?: string;
  title_ja?: string;
  department?: string;
  department_ja?: string;
  location?: string;
  location_ja?: string;
  employment_type?: string;
  employment_type_ja?: string;
  experience?: string;
  experience_ja?: string;
  salary?: string;
  salary_ja?: string;
  short_description?: string;
  short_description_ja?: string;
  about_role?: string;
  about_role_ja?: string;
  status: "published" | "draft";
  sort_order: number;
  sections: {
    section_type: string;
    content?: string;
    content_ja?: string;
  }[];
}

function csrfToken() {
  return (
    (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
      ?.content ?? ""
  );
}

function apiPost(url: string, body: object) {
  return axios.post(url, body, {
    headers: {
      "X-CSRF-TOKEN": csrfToken(),
      "Content-Type": "application/json",
    },
  });
}

export default function Index({ jobs: initialJobs }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const [current, setCurrent] = useState<Job | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Drag state — track by ID
  const dragId = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const { data, setData, post, reset, processing } = useForm({
    title: "",
    department: "",
    location: "",
    employment_type: "",
    experience: "",
    salary: "",
    short_description: "",
    about_role: "",
    status: "draft" as "draft" | "published",
    sections: [] as { type: string; content: string; content_ja: string }[],
    title_ja: "",
    department_ja: "",
    location_ja: "",
    employment_type_ja: "",
    experience_ja: "",
    salary_ja: "",
    short_description_ja: "",
    about_role_ja: "",
  });

  /* ================= SEARCH FILTER ================= */
  const filteredJobs = useMemo(() => {
    if (!search) return jobs;
    const q = search.toLowerCase();
    return jobs.filter((job) =>
      [job.title, job.title_ja, job.department, job.department_ja, job.status]
        .filter((f): f is string => typeof f === "string")
        .some((f) => f.toLowerCase().includes(q))
    );
  }, [search, jobs]);

  /* ================= DRAG & DROP ================= */
  const handleDragStart = (id: number) => {
    dragId.current = id;
    setDraggingId(id);
  };

  const handleDragEnter = (targetId: number) => {
    if (dragId.current === null || dragId.current === targetId) return;
    setJobs((prev) => {
      const updated = [...prev];
      const from = updated.findIndex((j) => j.id === dragId.current);
      const to = updated.findIndex((j) => j.id === targetId);
      if (from === -1 || to === -1) return prev;
      const [dragged] = updated.splice(from, 1);
      updated.splice(to, 0, dragged);
      return updated;
    });
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    dragId.current = null;
    setJobs((prev) => {
      apiPost(route("admin.jobs.reorder"), { ids: prev.map((j) => j.id) });
      return prev;
    });
  };

  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    reset();
    setData({
      title: "",
      department: "",
      location: "",
      employment_type: "",
      experience: "",
      salary: "",
      short_description: "",
      about_role: "",
      status: "published",
      sections: [
        { type: "responsibilities", content: "", content_ja: "" },
        { type: "requirements", content: "", content_ja: "" },
        { type: "preferred", content: "", content_ja: "" },
        { type: "offer", content: "", content_ja: "" },
      ],
      title_ja: "",
      department_ja: "",
      location_ja: "",
      employment_type_ja: "",
      experience_ja: "",
      salary_ja: "",
      short_description_ja: "",
      about_role_ja: "",
    });
    setMode("add");
    setCurrent(null);
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (job: Job) => {
    setMode("edit");
    setCurrent(job);
    setOpen(true);
    setData({
      title: job.title ?? "",
      department: job.department ?? "",
      location: job.location ?? "",
      employment_type: job.employment_type ?? "",
      experience: job.experience ?? "",
      salary: job.salary ?? "",
      short_description: job.short_description ?? "",
      about_role: job.about_role ?? "",
      status: job.status,
      sections: job.sections.map((s) => ({
        type: s.section_type,
        content: s.content ?? "",
        content_ja: s.content_ja ?? "",
      })),
      title_ja: job.title_ja ?? "",
      department_ja: job.department_ja ?? "",
      location_ja: job.location_ja ?? "",
      employment_type_ja: job.employment_type_ja ?? "",
      experience_ja: job.experience_ja ?? "",
      salary_ja: job.salary_ja ?? "",
      short_description_ja: job.short_description_ja ?? "",
      about_role_ja: job.about_role_ja ?? "",
    });
  };

  /* ================= SAVE ================= */
  const submitAdd = () => {
    post(route("admin.jobs.store"), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const submitUpdate = () => {
    if (!current) return;
    router.post(
      route("admin.jobs.update", current.id),
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
    if (confirm("Delete this job?")) {
      router.delete(route("admin.jobs.destroy", id), {
        onSuccess: () => setJobs((prev) => prev.filter((j) => j.id !== id)),
      });
    }
  };

  /* ================= SECTION HELPERS ================= */
  const renderSection = (type: string, title: string) => (
    <div className="space-y-3">
      <h4 className="font-semibold">{title}</h4>
      {data.sections
        .map((s, i) => ({ ...s, i }))
        .filter((s) => s.type === type)
        .map(({ content, content_ja, i }) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              value={activeLang === "en" ? content : content_ja}
              onChange={(e) => {
                const updated = [...data.sections];
                if (activeLang === "en") {
                  updated[i].content = e.target.value;
                } else {
                  updated[i].content_ja = e.target.value;
                }
                setData("sections", updated);
              }}
              placeholder="Enter point"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => {
                const updated = [...data.sections];
                updated.splice(i, 1);
                setData("sections", updated);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          setData("sections", [
            ...data.sections,
            { type, content: "", content_ja: "" },
          ])
        }
      >
        + Add Point
      </Button>
    </div>
  );

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Jobs</h2>}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recruitments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Drag rows to reorder — changes save automatically.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Job
        </Button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 max-w-sm relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* SHEET */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" && "Add Job"}
              {mode === "edit" && "Edit Job"}
            </SheetTitle>
          </SheetHeader>

          {mode !== "view" && (
            <div className="space-y-5 mt-6">
              {/* Language toggle */}
              <div className="flex gap-3 mb-6">
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

              <div className="space-y-1">
                <label className="text-sm font-medium">Job Title</label>
                <Input
                  value={activeLang === "en" ? data.title : data.title_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("title", e.target.value)
                      : setData("title_ja", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Department</label>
                <Input
                  value={
                    activeLang === "en" ? data.department : data.department_ja
                  }
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("department", e.target.value)
                      : setData("department_ja", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={activeLang === "en" ? data.location : data.location_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("location", e.target.value)
                      : setData("location_ja", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Employment Type</label>
                <Input
                  value={
                    activeLang === "en"
                      ? data.employment_type
                      : data.employment_type_ja
                  }
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("employment_type", e.target.value)
                      : setData("employment_type_ja", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Experience</label>
                <Input
                  value={
                    activeLang === "en" ? data.experience : data.experience_ja
                  }
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("experience", e.target.value)
                      : setData("experience_ja", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Salary</label>
                <Input
                  value={activeLang === "en" ? data.salary : data.salary_ja}
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("salary", e.target.value)
                      : setData("salary_ja", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Short Description</label>
                <Input
                  placeholder="Short description"
                  value={
                    activeLang === "en"
                      ? data.short_description
                      : data.short_description_ja
                  }
                  onChange={(e) =>
                    activeLang === "en"
                      ? setData("short_description", e.target.value)
                      : setData("short_description_ja", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={data.status}
                  onValueChange={(v) =>
                    setData("status", v as "draft" | "published")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">About Role</label>
                <ReactQuill
                  key={activeLang}
                  theme="snow"
                  style={{ height: "200px", marginBottom: "50px" }}
                  value={
                    activeLang === "en" ? data.about_role : data.about_role_ja
                  }
                  onChange={(value) =>
                    activeLang === "en"
                      ? setData("about_role", value)
                      : setData("about_role_ja", value)
                  }
                />
              </div>

              <div className="space-y-6">
                {renderSection("responsibilities", "Responsibilities")}
                {renderSection("requirements", "Requirements")}
                {renderSection("preferred", "Preferred Skills")}
                {renderSection("offer", "What We Offer")}
              </div>

              <Button
                className="w-full mt-4"
                disabled={processing}
                onClick={mode === "edit" ? submitUpdate : submitAdd}
              >
                {mode === "edit" ? "Update Job" : "Save Job"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* TABLE */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white w-10"></TableHead>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Department</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Applications</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {filteredJobs.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-gray-500"
              >
                No jobs found
              </TableCell>
            </TableRow>
          )}

          {filteredJobs.map((job, i) => (
            <TableRow
              key={job.id}
              draggable
              onDragStart={() => handleDragStart(job.id)}
              onDragEnter={() => handleDragEnter(job.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`transition-opacity ${
                draggingId === job.id ? "opacity-40" : "opacity-100"
              }`}
            >
              {/* Drag Handle */}
              <TableCell className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                <GripVertical className="w-4 h-4" />
              </TableCell>

              <TableCell>{i + 1}</TableCell>
              <TableCell>{job.title ?? "-"}</TableCell>
              <TableCell>{job.department ?? "-"}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${
                    job.status === "published"
                      ? "bg-green-100 text-grey-700"
                      : "bg-yellow-100 text-grey-700"
                  }`}
                >
                  {job.status}
                </span>
              </TableCell>
              <TableCell>
                <button
                  onClick={() =>
                    router.visit(
                      route("admin.job-applications.index", { job: job.id })
                    )
                  }
                  className="text-pink-600 hover:underline font-medium text-sm"
                >
                  View Applications
                </button>
              </TableCell>
              <TableCell className="space-x-2 text-center">
                <Button
                  title="Edit"
                  size="icon"
                  onClick={() => openEdit(job)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  title="Delete"
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteItem(job.id)}
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