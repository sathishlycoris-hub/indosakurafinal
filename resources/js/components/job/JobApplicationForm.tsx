import { useState, useEffect } from "react";  // ← add useEffect
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";

// Add global type declaration
declare global {
  interface Window {
    onJobRecaptchaVerify: (token: string) => void;
  }
}

interface JobApplicationFormProps {
  jobId: number;
}

const JobApplicationForm = ({ jobId }: JobApplicationFormProps) => {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const [localError, setLocalError] = useState<string | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    full_name: "",
    email: "",
    confirm_email: "",
    phone: "",
    cover_letter: "",
    resume: null as File | null,
    agree_terms: false,
    recaptcha: "",       // ← add this
  });

  // ← add this block
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);

    window.onJobRecaptchaVerify = (token: string) => {
      setData("recaptcha", token);
    };

    return () => {
      document.body.removeChild(script);
      delete (window as any).onJobRecaptchaVerify;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!data.agree_terms) {
      setLocalError(
        lang === "ja"
          ? "プライバシーポリシーおよび利用規約に同意する必要があります。"
          : "You must agree to the privacy policy and terms of service."
      );
      return;
    }

    if (data.email !== data.confirm_email) {
      setLocalError(
        lang === "ja"
          ? "メールアドレスが一致しません。"
          : "Email and Confirm Email must match."
      );
      return;
    }

    // ← add reCAPTCHA check
    if (!data.recaptcha) {
      setLocalError(
        lang === "ja"
          ? "reCAPTCHAを完了してください。"
          : "Please complete the reCAPTCHA verification."
      );
      return;
    }

    post(route("job.apply", jobId), {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setLocalError(null);
      },
    });
  };

  return (
    <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
      <h3 className="font-semibold mb-4">
        {lang === "ja"
          ? "このポジションに応募する"
          : "Apply for this Position"}
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {lang === "ja" ? "氏名 *" : "Full Name *"}
          </label>
          <input
            type="text"
            placeholder={lang === "ja" ? "氏名を入力してください" : "Enter your full name"}
            value={data.full_name}
            onChange={(e) => setData("full_name", e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-sm"
          />
          {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {lang === "ja" ? "メールアドレス *" : "Email *"}
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-sm"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Confirm Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {lang === "ja" ? "メールアドレス（確認） *" : "Email (Confirm) *"}
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={data.confirm_email}
            onChange={(e) => setData("confirm_email", e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-sm"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {lang === "ja" ? "電話番号" : "Phone Number"}
          </label>
          <input
            type="tel"
            placeholder={lang === "ja" ? "電話番号を入力してください" : "Enter your phone number"}
            value={data.phone}
            onChange={(e) => setData("phone", e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-sm"
          />
        </div>

        {/* Resume */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {lang === "ja" ? "履歴書 / CV *" : "Resume / CV *"}
          </label>
          <label className="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors block">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {lang === "ja" ? "クリックまたはドラッグ＆ドロップ" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (Max 5MB)</p>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setData("resume", e.target.files?.[0] || null)}
            />
          </label>
          {errors.resume && <p className="text-xs text-red-500 mt-1">{errors.resume}</p>}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {lang === "ja" ? "志望動機" : "Cover Letter"}
          </label>
          <textarea
            rows={4}
            placeholder={lang === "ja" ? "志望理由をご記入ください..." : "Tell us why you're interested in this position..."}
            value={data.cover_letter}
            onChange={(e) => setData("cover_letter", e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-sm resize-none"
          />
        </div>

        {/* ← reCAPTCHA widget */}
        <div>
          <div
            className="g-recaptcha"
            data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            data-callback="onJobRecaptchaVerify"
          />
          {errors.recaptcha && (
            <p className="text-xs text-red-500 mt-1">{errors.recaptcha}</p>
          )}
        </div>

        {localError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
            {localError}
          </div>
        )}

        {/* Agree Terms */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={data.agree_terms}
            onChange={(e) => setData("agree_terms", e.target.checked)}
            className="mt-1"
          />
          <label className="text-xs text-muted-foreground mt-1">
            {lang === "ja"
              ? "プライバシーポリシーおよび利用規約に同意します"
              : "I agree to the privacy policy and terms of service"}
          </label>
        </div>

        {/* Submit */}
        <Button className="w-full" type="submit" disabled={processing}>
          {lang === "ja" ? "応募する" : "Submit Application"}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {lang === "ja"
            ? "履歴書を送信してキャリアの第一歩を踏み出しましょう。"
            : "Submit your resume today and unlock your full potential."}
        </p>
      </form>
    </div>
  );
};

export default JobApplicationForm;