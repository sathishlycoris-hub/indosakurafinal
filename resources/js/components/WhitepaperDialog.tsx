import { useForm } from "@inertiajs/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

interface WhitepaperDialogProps {
  lang: "en" | "ja";
  triggerLabel: string; // the visible "whitepaper" link/button text
  triggerClassName?: string;
}

export default function WhitepaperDialog({ lang, triggerLabel, triggerClassName }: WhitepaperDialogProps) {
  const [open, setOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
  });

  const t = (en: string, ja: string) => (lang === "ja" ? ja : en);

  const submit = () => {
    post(route("whitepaper.request"), {
      preserveScroll: true,
      onSuccess: (page: any) => {
        const url = page.props?.flash?.whitepaper_url;
        if (url) {
          window.open(url, "_blank");
        }
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "underline text-primary hover:opacity-80 transition-opacity"}
      >
        {triggerLabel}
      </button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("Download Whitepaper", "ホワイトペーパーをダウンロード")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "Please enter your name and email to access the whitepaper.",
              "ホワイトペーパーをご覧いただくには、お名前とメールアドレスをご入力ください。"
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="wp-name">{t("Name", "お名前")} *</Label>
            <Input
              id="wp-name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder={t("Your name", "山田 太郎")}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="wp-email">{t("Email", "メールアドレス")} *</Label>
            <Input
              id="wp-email"
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button disabled={processing || !data.name || !data.email} onClick={submit} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            {processing ? t("Submitting...", "送信中...") : t("Get Whitepaper", "ダウンロード")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}