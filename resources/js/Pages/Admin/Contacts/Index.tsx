import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, Search } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const formatDate = (d: string) => {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export default function Index({ contacts }: any) {
  const [viewContact, setViewContact] = useState<any>(null);
  const [search, setSearch] = useState("");

  const deleteContact = (id: number) => {
    if (confirm('Delete this enquiry?')) {
      router.delete(route('admin.contacts.destroy', id));
    }
  };

  //  FILTER LOGIC
  const filteredContacts = useMemo(() => {
    if (!search) return contacts;

    const q = search.toLowerCase();

    return contacts.filter((c: any) =>
      [
        c.name_en,
        c.email,
        c.telephone,
        c.address,
        c.product_service,
      ]
        .filter(Boolean)
        .some((field: string) =>
          field.toLowerCase().includes(q)
        )
    );
  }, [search, contacts]);

  return (
    <Authenticated header={<h2 className="text-xl font-bold">Contact List</h2>}>

      <h1 className="text-2xl font-bold mb-4">Contact Inquiries</h1>

      {/*  SEARCH */}
      <div className="mb-4 max-w-sm relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search name, email, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
          {filteredContacts.length === 0 && (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                No matching records found
              </td>
            </tr>
          )}

          {filteredContacts.map((c: any, i: number) => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{i + 1}</td>
              <td>{c.name_en}</td>
              <td>{c.email}</td>
              <td>{c.telephone}</td>
              <td className="max-w-[150px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
  {c.address}
</td>
              <td>{c.product_service}</td>
              <td className="text-sm text-gray-600">
                {formatDate(c.created_at)}
              </td>
              <td className="flex gap-3 p-2 justify-center">

                <Button
                  title="View"
                  size="icon"
                 
                  onClick={() => setViewContact(c)}
                >
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
          ))}
        </tbody>
      </table>

      {/* SHEET */}
    <Sheet open={!!viewContact} onOpenChange={() => setViewContact(null)}>
  <SheetContent side="right" className="w-[90%] sm:max-w-3xl overflow-y-auto">
    {viewContact && (
      <>
        <SheetHeader className="mb-6">
          <SheetTitle></SheetTitle>
        </SheetHeader>

      {/* =========================
    Inquiry Details
========================== */}
<div className="space-y-4 mt-6">
 

  {/* <p>
    <strong>Classification:</strong>{" "}
    {Array.isArray(viewContact.classification)
      ? viewContact.classification.join(", ")
      : JSON.parse(viewContact.classification || "[]").join(", ")}
  </p> */}

  {/* <p>
    <strong>Message:</strong>
    <span className="block mt-1">
      {viewContact.requests || "-"}
    </span>
  </p> */}

  {/* <p>
    <strong>Expected Date:</strong>{" "}
    {viewContact.expected_date || "-"}
  </p> */}
</div>

{/* =========================
    Contact Information
========================== */}
<div className="space-y-4 mt-8">
  {/* <p>
    <strong>Company:</strong>{" "}
    {viewContact.product_service || "-"}
  </p>

  <p>
    <strong>Department:</strong>{" "}
    {viewContact.department || "-"}
  </p>

  <p>
    <strong>Customer Position:</strong>{" "}
    {viewContact.customer_position || "-"}
  </p>

  <p>
    <strong>Post:</strong>{" "}
    {viewContact.post || "-"}
  </p> */}

  <p>
    <strong>Name:</strong>{" "}
    {viewContact.name_en || "-"}
  </p>

  {/* <p>
    <strong>Name (JP):</strong>{" "}
    {viewContact.name_ja || "-"}
  </p>

  <p>
    <strong>Prefecture:</strong>{" "}
    {viewContact.prefecture || "-"}
  </p>

  <p>
    <strong>Post Code:</strong>{" "}
    {viewContact.zip_code || "-"}
  </p> */}

 

  

  <p>
    <strong>Email:</strong>{" "}
    {viewContact.email || "-"}
  </p>
  <p>
    <strong>Mobile:</strong>{" "}
    {viewContact.telephone || "-"}
  </p>

   <p>
    <strong>Address:</strong>
    
      {viewContact.address || "-"}
    
  </p>

   <p>
    <strong>Project Details:</strong>{" "}
    {viewContact.product_service || "-"}
  </p>
</div>



{/* =========================
    Meta
========================== */}
<div className="space-y-4 mt-8">
  <p>
    <strong>Enquiry Date:</strong>{" "}
    {formatDate(viewContact.created_at)}
  </p>
</div>


        <div className="mt-6">
          <SheetClose className="text-blue-600">
            Close
          </SheetClose>
        </div>
      </>
    )}
  </SheetContent>
</Sheet>

    </Authenticated>
  );
}

function Field({ label, value }: any) {
  return (
    <div className="mb-3">
      <div className="text-gray-500">{label}</div>
      <div className="">{value || '-'}</div>
    </div>
  );
}
