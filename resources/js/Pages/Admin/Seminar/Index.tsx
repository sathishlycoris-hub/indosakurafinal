import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

interface Seminar {
  id: number;

  title: string;
  title_ja?: string;

  description?: string;
  description_ja?: string;

  location?: string;
  location_ja?: string;

  organizer?: string;
  organizer_ja?: string;

  date: string;
  time: string;

  tags?: string[] | string;

  status: "upcoming" | "archived";
  image?: string | null;

  participation_fee?: string;
  participation_fee_ja?: string;

  sponsorship?: string;
  sponsorship_ja?: string;

  cooperation?: string;
  cooperation_ja?: string;
}
interface SeminarForm {
  title: string;
  title_ja: string;

  description: string;
  description_ja: string;

  location: string;
  location_ja: string;

  organizer: string;
  organizer_ja: string;

  tags: string;
  date: string;
  time: string;

  participation_fee: string;
  participation_fee_ja: string;

  sponsorship: string;
  sponsorship_ja: string;

  cooperation: string;
  cooperation_ja: string;

  status: "upcoming" | "archived";
  image: File | null;
}
export default function Index({ seminars }: { seminars: Seminar[] }) {
  const [editItem, setEditItem] = useState<Seminar | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeLang, setActiveLang] = useState<"en" | "ja">("en");
  const { data, setData, post, reset, processing } = useForm<SeminarForm>({
    title: "",
    title_ja: "",

    description: "",
    description_ja: "",

    location: "",
    location_ja: "",

    organizer: "",
    organizer_ja: "",

    participation_fee: "",
    participation_fee_ja: "",

    sponsorship: "",
    sponsorship_ja: "",

    cooperation: "",
    cooperation_ja: "",

    tags: "",
    date: "",
    time: "",
    status: "upcoming",
    image: null,
  });
  /* ================= SEARCH FILTER ================= */

  const filteredSeminars = seminars.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();

    return (
      s.title.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q) ||
      s.date.includes(q) ||
      s.time.includes(q)
    );
  });

  /* ================= ADD ================= */

  const submitAdd = () => {
    post(route("admin.seminars.store"), {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setIsOpen(false);
      },
    });
  };

  /* ================= EDIT ================= */

  const openEdit = (item: Seminar) => {
    setEditItem(item);
    setIsOpen(true);

    setData({
      title: item.title,
      title_ja: item.title_ja ?? "",

      description: item.description ?? "",
      description_ja: item.description_ja ?? "",

      location: item.location ?? "",
      location_ja: item.location_ja ?? "",

      organizer: item.organizer ?? "",
      organizer_ja: item.organizer_ja ?? "",

      participation_fee: item.participation_fee ?? "",
      participation_fee_ja: item.participation_fee_ja ?? "",
      sponsorship: item.sponsorship ?? "",
      sponsorship_ja: item.sponsorship_ja ?? "",
      cooperation: item.cooperation ?? "",
      cooperation_ja: item.cooperation_ja ?? "",

      tags: Array.isArray(item.tags)
        ? item.tags.join(", ")
        : item.tags ?? "",

      date: item.date,
      time: item.time,
      status: item.status,
      image: null,
    });
  };



  const submitUpdate = () => {
    if (!editItem) return;

    router.post(
      route("admin.seminars.update", editItem.id),
      { _method: "PUT", ...data },
      {
        forceFormData: true,
        onSuccess: () => {
          setEditItem(null);
          setIsOpen(false);
          reset();
        },
      }
    );
  };

  /* ================= DELETE ================= */

  const deleteItem = (id: number) => {
    if (confirm("Delete this seminar?")) {
      router.delete(route("admin.seminars.destroy", id));
    }
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <Authenticated header={<h2 className="font-bold text-xl">Seminars</h2>}>
      {/* HEADER */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Seminars List</h1>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button onClick={() => reset()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Seminar
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[90%] sm:max-w-3xl overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>
                  {editItem ? "Edit Seminar" : "Add Seminar"}
                </SheetTitle>
              </SheetHeader>

              {/* ================= FORM ================= */}
              <div className="space-y-5 mt-6">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={activeLang === "en" ? "default" : "outline"}
                    onClick={() => setActiveLang("en")}
                  >
                    English
                  </Button>

                  <Button
                    type="button"
                    variant={activeLang === "ja" ? "default" : "outline"}
                    onClick={() => setActiveLang("ja")}
                  >
                    Japanese
                  </Button>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="font-medium">Title</label>
                  <Input
                    value={
                      activeLang === "en"
                        ? data.title
                        : data.title_ja || data.title
                    }
                    onChange={(e) =>
                      activeLang === "en"
                        ? setData("title", e.target.value)
                        : setData("title_ja", e.target.value)
                    }
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="font-medium">Description</label>
                  <Textarea
                    value={
                      activeLang === "en"
                        ? data.description
                        : data.description_ja
                    }
                    onChange={(e) =>
                      activeLang === "en"
                        ? setData("description", e.target.value)
                        : setData("description_ja", e.target.value)
                    }
                  />
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="font-medium">Date</label>
                  <DatePicker
                    value={data.date}
                    onChange={(value) => setData("date", value)}
                  />
                </div>


                {/* Time */}
                <div className="space-y-1">
                  <label className="font-medium">Time</label>
                  <Input
                    placeholder="Time"
                    value={data.time}
                    onChange={(e) => setData("time", e.target.value)}
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="font-medium">Location</label>
                  <Input
                    value={
                      activeLang === "en"
                        ? data.location
                        : data.location_ja
                    }
                    onChange={(e) =>
                      activeLang === "en"
                        ? setData("location", e.target.value)
                        : setData("location_ja", e.target.value)
                    }
                  />
                </div>

                {/* Organizer */}
                <div className="space-y-1">
                  <label className="font-medium">Organizer</label>
                  <Input
                    value={
                      activeLang === "en"
                        ? data.organizer
                        : data.organizer_ja
                    }
                    onChange={(e) =>
                      activeLang === "en"
                        ? setData("organizer", e.target.value)
                        : setData("organizer_ja", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium">Participation Fee</label>
                  <Input
                    value={
                      activeLang === "en"
                        ? data.participation_fee
                        : data.participation_fee_ja
                    }
                    onChange={(e) =>
                      activeLang === "en"
                        ? setData("participation_fee", e.target.value)
                        : setData("participation_fee_ja", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium">Cooperation</label>
                  <Input
                    value={
                      activeLang === "en"
                        ? data.cooperation
                        : data.cooperation_ja
                    }
                    onChange={(e) =>
                      activeLang === "en"
                        ? setData("cooperation", e.target.value)
                        : setData("cooperation_ja", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium">Sponsorship</label>
                  <Input
                    value={
                      activeLang === "en"
                        ? data.sponsorship
                        : data.sponsorship_ja
                    }
                    onChange={(e) =>
                      activeLang === "en"
                        ? setData("sponsorship", e.target.value)
                        : setData("sponsorship_ja", e.target.value)
                    }
                  />
                </div>

                {/* Existing Image (EDIT ONLY) */}
                {editItem?.image && (
                  <div className="space-y-2">
                    <label className="font-medium">Existing Image</label>
                    <img
                      src={`/storage/${editItem.image}`}
                      alt="Seminar"
                      className="h-32 rounded-md border object-contain"
                    />
                  </div>
                )}

                {/* Upload Image */}
                <div className="space-y-1">
                  <label className="font-medium">Upload Image</label>

                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file && file.size > 2048 * 1024) {
                          alert("Image size must be less than 2MB");
                          e.target.value = "";
                          return;
                        }

                        setData("image", file ?? null);
                      }}
                    />

                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      Max: 2048 KB
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {/* <div className="space-y-1">
                  <label className="font-medium">
                    Tags (comma separated)
                  </label>
                  <Input
                    placeholder="Tags"
                    value={data.tags}
                    onChange={(e) => setData("tags", e.target.value)}
                  />
                </div> */}

                {/* Status */}
                <div className="space-y-1">
                  <label className="font-medium">Status</label>
                  <Select
                    value={data.status}
                    onValueChange={(v) =>
                      setData("status", v as "upcoming" | "archived")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


                {/* Submit */}
                <Button
                  className="w-full"
                  onClick={editItem ? submitUpdate : submitAdd}
                  disabled={processing}
                >
                  {editItem ? "Update" : "Save"}
                </Button>

              </div>
            </SheetContent>

          </Sheet>
        </div>

        {/* SEARCH */}
        <div className="mb-4 max-w-sm relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search seminars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Time</TableHead>
            <TableHead className="text-white text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {filteredSeminars.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No records found
              </TableCell>
            </TableRow>
          )}

          {filteredSeminars.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{s.title}</TableCell>
              <TableCell>{s.status}</TableCell>
              <TableCell>{formatDate(s.date)}</TableCell>
              <TableCell>{s.time}</TableCell>
              <TableCell className="space-x-2 text-center">
                <Button size="icon" onClick={() => openEdit(s)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteItem(s.id)}
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
