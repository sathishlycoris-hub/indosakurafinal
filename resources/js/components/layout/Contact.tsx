import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";

export default function ContactCTA() {
  const { lang, siteSettings } = usePage<{
    lang: "en" | "ja";
    siteSettings?: Record<string, string>;
  }>().props;

  const s = siteSettings ?? {};
  const t = (en: string, ja: string) => (lang === "ja" ? ja || en : en);

  const title       = t(s.cta_title_en       || "Contact Form",     s.cta_title_ja       || "お問い合わせフォーム");
  const description = t(s.cta_description_en || "Have questions about our solutions or need a quote? Get in touch with our team today.", s.cta_description_ja || "ソリューションについてのご質問やお見積りのご依頼は、お気軽にお問い合わせください。");
  const buttonLabel = t(s.cta_button_en      || "Contact Us",       s.cta_button_ja      || "お問い合わせ");
  const buttonHref  = s.cta_button_href || "/contact";

  return (
    <section className="py-8 text-black/80 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-center bg-[#eeeded] rounded-xl p-8 max-w-8xl mx-auto text-center">
          <div className="text-center max-w-xl">

            <div className="w-14 h-14 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl font-semibold mb-2">{title}</h2>

            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{description}</p>

            <Link href={buttonHref}>
              <Button className="hover:bg-primary">
                {buttonLabel}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}