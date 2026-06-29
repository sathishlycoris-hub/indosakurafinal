import { useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const formatDate = (d: string) => {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

interface Contact {
  id: number;
  name_en: string;
  email: string;
  telephone: string;
  address: string;
  product_service: string;
  classification: string[] | null;
  created_at: string;
  [key: string]: any;
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
  contacts: Paginated<Contact>;
  filters: { search?: string };
}

export default function Index({ contacts, filters }: Props) {
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState(filters?.search ?? "");

  const deleteContact = (id: number) => {
    if (confirm("Delete this enquiry?")) {
      router.delete(route("admin.contacts.destroy", id));
    }
  };

  // Server-side search
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    router.get(
      route("admin.contacts.index"),
      { search: value || undefined },
      { preserveState: true, replace: true }
    );
  }, []);

  const goToPage = (url: string | null) => {
    if (!url) return;
    router.get(url, {}, { preserveState: true });
  };

  const { data, current_page, last_page, total, from, to } = contacts;

  return (
    <Authenticated header={<h2 className="text-xl font-bold">Contact List</h2>}>
      <h1 className="text-2xl font-bold mb-4">Contact Inquiries</h1>

      {/* Search */}
      <div className="mb-4 max-w-sm relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search name, email, company..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <table className="w-full border text-sm bg-white">
        <thead className="bg-primary text-white text-left">
          <tr>
            <th className="p-2">S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Project Details</th>
            <th>Enquired</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-4 text-center text-gray-500">
                No matching records found.
              </td>
            </tr>
          ) : (
            data.map((c, i) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{(from ?? 0) + i}</td>
                <td>{c.name_en}</td>
                <td>{c.email}</td>
                <td>{c.telephone}</td>
                <td className="max-w-[150px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                  {c.address}
                </td>
                <td>{c.product_service}</td>
                <td className="text-sm text-gray-600">{formatDate(c.created_at)}</td>
                <td className="flex gap-3 p-2 justify-center">
                  <Button title="View" size="icon" onClick={() => setViewContact(c)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    title="Delete"
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteContact(c.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {last_page > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <p>
            Showing <span className="font-medium">{from}</span>–
            <span className="font-medium">{to}</span> of{" "}
            <span className="font-medium">{total}</span> enquiries
          </p>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              disabled={current_page === 1}
              onClick={() =>
                goToPage(contacts.links.find((l) => l.label === "&laquo; Previous")?.url ?? null)
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {contacts.links
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
                goToPage(contacts.links.find((l) => l.label === "Next &raquo;")?.url ?? null)
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Sheet */}
      <Sheet open={!!viewContact} onOpenChange={() => setViewContact(null)}>
        <SheetContent side="right" className="w-[90%] sm:max-w-3xl overflow-y-auto">
          {viewContact && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>Enquiry Details</SheetTitle>
              </SheetHeader>

              <div className="space-y-4 mt-6">
                <p><strong>Name:</strong> {viewContact.name_en || "-"}</p>
                <p><strong>Email:</strong> {viewContact.email || "-"}</p>
                <p><strong>Mobile:</strong> {viewContact.telephone || "-"}</p>
                <p><strong>Address:</strong> {viewContact.address || "-"}</p>
                <p><strong>Project Details:</strong> {viewContact.product_service || "-"}</p>
              </div>

              <div className="space-y-4 mt-8">
                <p>
                  <strong>Enquiry Date:</strong> {formatDate(viewContact.created_at)}
                </p>
              </div>

              <div className="mt-6">
                <SheetClose className="text-blue-600 cursor-pointer">Close</SheetClose>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Authenticated>
  );
}