// components/SeoFields.tsx
// Drop this inside any admin Add/Edit sheet to manage all SEO fields.
// Usage:
//   <SeoFields data={data} setData={setData} activeLang={activeLang} mode={mode} current={current} />

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

interface SeoData {
  meta_title: string;
  meta_title_ja: string;
  meta_description: string;
  meta_description_ja: string;
  meta_keywords: string;
  meta_keywords_ja: string;
  og_image: File | null;
}

interface SeoFieldsProps {
  data: SeoData;
  setData: (key: keyof SeoData, value: any) => void;
  activeLang: "en" | "ja";
  // For edit mode — show the existing OG image
  mode?: "add" | "edit";
  currentOgImage?: string | null;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {hint && <p className="text-xs text-muted-foreground/60">{hint}</p>}
      {children}
    </div>
  );
}

export default function SeoFields({
  data,
  setData,
  activeLang,
  mode = "add",
  currentOgImage,
}: SeoFieldsProps) {
  const isEn = activeLang === "en";

  const metaTitleValue    = isEn ? data.meta_title    : data.meta_title_ja;
  const metaDescValue     = isEn ? data.meta_description : data.meta_description_ja;
  const metaKeywordsValue = isEn ? data.meta_keywords : data.meta_keywords_ja;

  const metaTitleKey    = isEn ? "meta_title"    : "meta_title_ja"    as keyof SeoData;
  const metaDescKey     = isEn ? "meta_description" : "meta_description_ja" as keyof SeoData;
  const metaKeywordsKey = isEn ? "meta_keywords" : "meta_keywords_ja" as keyof SeoData;

  return (
    <div className="border rounded-xl bg-muted/20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
        <Globe className="w-4 h-4 text-primary" />
        <span className="font-semibold text-sm">SEO Settings</span>
        <span className="text-xs text-muted-foreground ml-1">
          ({activeLang === "en" ? "English" : "Japanese"})
        </span>
      </div>

      <div className="px-4 pb-4 pt-3 space-y-4">

        {/* Meta Title */}
        <Field
          label={`Meta Title (${activeLang.toUpperCase()})`}
          hint="Shown in browser tab & search results. ~60 chars recommended."
        >
          <div className="relative">
            <Input
              placeholder={
                isEn
                  ? "e.g. AI Solutions for Enterprise | CompanyName"
                  : "例: エンタープライズ向けAIソリューション | 会社名"
              }
              value={metaTitleValue}
              maxLength={100}
              onChange={(e) => setData(metaTitleKey, e.target.value)}
            />
            <span
              className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs
                ${metaTitleValue.length > 60 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {metaTitleValue.length}/60
            </span>
          </div>
          {metaTitleValue.length === 0 && (
            <p className="text-xs text-amber-500 mt-1">
              Leave blank to auto-use the page title.
            </p>
          )}
        </Field>

        {/* Meta Description */}
        <Field
          label={`Meta Description (${activeLang.toUpperCase()})`}
          hint="Shown under title in search results. ~155 chars recommended."
        >
          <div className="relative">
            <textarea
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                         shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                         resize-none"
              placeholder={
                isEn
                  ? "Brief description of this page for search engines…"
                  : "検索エンジン向けのページ説明文…"
              }
              value={metaDescValue}
              maxLength={300}
              onChange={(e) => setData(metaDescKey, e.target.value)}
            />
            <span
              className={`absolute right-2 bottom-2 text-xs
                ${metaDescValue.length > 155 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {metaDescValue.length}/155
            </span>
          </div>
        </Field>

        {/* Meta Keywords */}
        <Field
          label={`Meta Keywords (${activeLang.toUpperCase()})`}
          hint="Comma-separated. Low SEO impact but useful for internal search."
        >
          <Input
            placeholder={
              isEn
                ? "AI, machine learning, enterprise automation"
                : "AI, 機械学習, 企業自動化"
            }
            value={metaKeywordsValue}
            onChange={(e) => setData(metaKeywordsKey, e.target.value)}
          />
        </Field>

        {/* OG Image — language-independent, shown once */}
        {activeLang === "en" && (
          <Field
            label="OG Image (Open Graph)"
            hint="Used when shared on social media. Recommended: 1200×630 px, max 4 MB."
          >
            {mode === "edit" && currentOgImage && (
              <div className="mb-2">
                <p className="text-xs text-muted-foreground mb-1">Current OG image:</p>
                <img
                  src={`/storage/${currentOgImage}`}
                  alt="OG"
                  className="h-24 rounded border object-cover"
                />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setData("og_image", e.target.files?.[0] || null)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Falls back to hero image when not set.
            </p>
          </Field>
        )}

      </div>
    </div>
  );
}