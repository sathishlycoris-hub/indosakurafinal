import { useState, useMemo } from "react";
import { router, Link } from "@inertiajs/react";
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
import { Eye, Trash2, Search } from "lucide-react";

interface Application {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  cover_letter?: string;
  resume: string;
  status: string;
  job: {
    title: string;
    department: string;
  };
  created_at: string;
}

export default function Index({ applications }: { applications: Application[] }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Application | null>(null);
  const [search, setSearch] = useState("");

  const openView = (app: Application) => {
    setCurrent(app);
    setOpen(true);
  };

  const deleteItem = (id: number) => {
    if (confirm("Delete this application?")) {
      router.delete(route("admin.job-applications.destroy", id));
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  // 🔍 FILTER
  const filteredApplications = useMemo(() => {
    if (!search) return applications;

    const q = search.toLowerCase();

    return applications.filter((a) =>
      [
        a.full_name,
        a.email,
        a.job?.title,
        a.job?.department,
      ]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(q)
        )
    );
  }, [search, applications]);

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

      {/* 🔍 SEARCH */}
      {/* <div className="mb-4 max-w-sm relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search candidate, email, job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div> */}

      <Table className="w-full border text-sm bg-white">
        <TableHeader className="bg-primary text-white text-left">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Candidate</TableHead>
            <TableHead className="text-white">Applied Jobs</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Department</TableHead>
            <TableHead className="text-white">Applied at</TableHead>
            <TableHead className="text-white text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredApplications.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No matching applications found
              </TableCell>
            </TableRow>
          )}

          {filteredApplications.map((a, i) => (
            <TableRow key={a.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{a.full_name}</TableCell>
              <TableCell>{a.job.title}</TableCell>
              <TableCell>{a.email}</TableCell>
              <TableCell>{a.job.department}</TableCell>
              <TableCell>
                {a.created_at ? formatDate(a.created_at) : "-"}
              </TableCell>
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
          ))}
        </TableBody>
      </Table>

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
                  <strong>Resume:</strong>

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
