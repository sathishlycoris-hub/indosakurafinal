import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import ContactCTA from "@/components/layout/Contact";
import { usePage } from "@inertiajs/react";

interface Greeting {
  id: number;
  title: string;
  description: string;
  title_ja?: string | null;
  description_ja?: string | null;
  image?: string | null;
}

export default function Greetings({ greeting }: { greeting: Greeting | null }) {

  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  const title =
    lang === "ja"
      ? greeting?.title_ja || greeting?.title
      : greeting?.title;

  const description =
    lang === "ja"
      ? greeting?.description_ja || greeting?.description
      : greeting?.description;

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Subheader currentPage={lang === "ja" ? "ご挨拶" : "Greetings"} />
      </div>
      <section className="py-12 lg:py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                {title ?? (lang === "ja"
                  ? "代表メッセージ"
                  : "Message from the President")}
              </h1>

              <div
                className="space-y-4 text-muted-foreground leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    description ??
                    (lang === "ja"
                      ? "<p>ご挨拶は現在ありません。</p>"
                      : "<p>No greeting message available.</p>"),
                }}
              />
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-96 rounded-lg overflow-hidden bg-muted">
                <img
                  src={
                    greeting?.image
                      ? `/storage/${greeting.image}`
                      : "/image/founder.webp"
                  }
                  alt="President Message"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
}