import Layout from "@/components/layout/Layout";
import { Link, usePage, Head } from "@inertiajs/react";
import { Mail } from "lucide-react";

const ContactThankYou = () => {
  const { props } = usePage<{ lang: "en" | "ja" }>();
  const lang = props.lang;

  const t = (en: string, ja: string) => (lang === "ja" ? ja || en : en);

  return (
    <Layout>
      <Head>
        <title>
          {t("Thanks for submitting! | Indo Sakura", "送信ありがとうございました | インドサクラ")}
        </title>
      </Head>

      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50 dark:bg-zinc-950 py-20">
        <div className="text-center px-6">
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Mail className="w-9 h-9 text-primary" strokeWidth={1.75} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {t("Thanks for submitting!", "ご送信ありがとうございました！")}
          </h1>
          <p className="text-muted-foreground mb-10">
            {t("Your message has been sent!", "メッセージが送信されました！")}
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold
                       bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Go Home", "ホームへ戻る")}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ContactThankYou;
