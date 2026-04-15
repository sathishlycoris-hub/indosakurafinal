import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import ContactCTA from "@/components/layout/Contact";
import { usePage } from "@inertiajs/react";

interface Philosophy {
  id: number;
  title: string;
  title_ja?: string | null;
  content: string;
  content_ja?: string | null;
  description: string;
  description_ja?: string | null;
  image?: string | null;
}

export default function Philosophy({
  philosophies,
}: {
  philosophies: Philosophy[];
}) {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Subheader
          currentPage={
            lang === "ja" ? "企業理念" : "Corporate Philosophy"
          }
        />
      </div>

      {/* Philosophy Sections */}
      {philosophies.map((item, index) => {
        const title =
          lang === "ja"
            ? item.title_ja || item.title
            : item.title;

        const content =
          lang === "ja"
            ? item.content_ja || item.content
            : item.content;

        const description =
          lang === "ja"
            ? item.description_ja || item.description
            : item.description;

        return (
          <section
            key={item.id}
            className={`py-20 ${index % 2 === 0
                ? "bg-section-light"
                : "bg-primary/5"
              }`}
          >
            <div className="container">
              <h2 className="text-3xl font-bold text-center text-primary mb-2">
                {title}
              </h2>

              <div
                className="text-center text-muted-foreground mb-12 prose max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                {item.image && (
                  <div className="flex justify-center">
                    <img
                      src={`/storage/${item.image}`}
                      alt={title}
                      className="w-80 rounded-lg shadow-md"
                    />
                  </div>
                )}

                {/* Description */}
                <div
                  className="text-muted-foreground leading-relaxed prose max-w-3xl"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </div>
            </div>
          </section>
        );
      })}

      {/* Contact CTA */}
      <ContactCTA />
    </Layout>
  );
}