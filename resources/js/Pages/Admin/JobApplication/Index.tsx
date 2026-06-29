import { useState, useCallback } from "react";
import { router, Link, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
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
import { Eye, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Job {
  title: string;
  department: string;
}

interface Application {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  cover_letter?: string;
  resume: string;
  status: string;
  job: Job;
  created_at: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Paginated<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  links: PaginationLink[];
}

interface Props {
  applications: Paginated<Application>;
  filters: { search?: string };
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

export default function Index({ applications, filters }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Application | null>(null);
  const [search, setSearch] = useState(filters?.search ?? "");

  const openView = (app: Application) => {
    setCurrent(app);
    setOpen(true);
  };

  const deleteItem = (id: number) => {
    if (confirm("Delete this application?")) {
      router.delete(route("admin.job-applications.destroy", id));
    }
  };

  // Debounced server search
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      router.get(
        route("admin.job-applications.index"),
        { search: value || undefined },
        { preserveState: true, replace: true }
      );
    },
    []
  );

  const goToPage = (url: string | null) => {
    if (!url) return;
    router.get(url, {}, { preserveState: true });
  };

  const { data, current_page, last_page, total, from, to } = applications;

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Job Applications</h2>}>
      <div className="flex items-center gap-3 mb-4">
        <Link
          href={route("admin.jobs.index")}
          className="text-sm text-pink-600 hover:underline"
        >
          ← Back to Jobs
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

      {/* Search */}
      <div className="mb-4 max-w-sm relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search candidate, email, job..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Table className="w-full border text-sm bg-white">
        <TableHeader className="bg-primary text-white text-left">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Candidate</TableHead>
            <TableHead className="text-white">Applied Job</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Department</TableHead>
            <TableHead className="text-white">Applied At</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No matching applications found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((a, i) => (
              <TableRow key={a.id}>
                <TableCell>{(from ?? 0) + i}</TableCell>
                <TableCell>{a.full_name}</TableCell>
                <TableCell>{a.job.title}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>{a.job.department}</TableCell>
                <TableCell>{a.created_at ? formatDate(a.created_at) : "-"}</TableCell>
                <TableCell className="space-x-2 text-center">
                  <Button title="View" size="icon" onClick={() => openView(a)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    title="Delete"
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteItem(a.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {last_page > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <p>
            Showing <span className="font-medium">{from}</span>–
            <span className="font-medium">{to}</span> of{" "}
            <span className="font-medium">{total}</span> applications
          </p>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              disabled={current_page === 1}
              onClick={() =>
                goToPage(applications.links.find((l) => l.label === "&laquo; Previous")?.url ?? null)
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {applications.links
              .filter((l) => !["&laquo; Previous", "Next &raquo;"].includes(l.label))
              .map((link) => (
                <Button
                  key={link.label}
                  size="icon"
                  variant={link.active ? "default" : "outline"}
                  disabled={!link.url}
                  onClick={() => goToPage(link.url)}
                  className="min-w-[2rem]"
                >
                  {link.label}
                </Button>
              ))}

            <Button
              size="icon"
              variant="outline"
              disabled={current_page === last_page}
              onClick={() =>
                goToPage(applications.links.find((l) => l.label === "Next &raquo;")?.url ?? null)
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[90%] sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Application Details</SheetTitle>
          </SheetHeader>

          {current && (
            <div className="space-y-4 mt-6">
              <p><strong>Name:</strong> {current.full_name}</p>
              <p><strong>Email:</strong> {current.email}</p>
              <p><strong>Phone:</strong> {current.phone || "-"}</p>
              <p><strong>Job:</strong> {current.job.title}</p>

              {current.cover_letter && (
                <div>
                  <strong>Cover Letter:</strong>
                  <p className="mt-1">{current.cover_letter}</p>
                </div>
              )}

              {current.resume && (
                <div>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={`/storage/${current.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary underline"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Authenticated>
  );
}