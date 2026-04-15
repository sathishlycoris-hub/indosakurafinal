import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import ContactCTA from "@/components/layout/Contact";
import { usePage } from "@inertiajs/react";

interface ClientSection {
  section_type: "customer" | "alliance" | "contract" | "partner";
  name: string;
  name_ja?: string | null;
  link?: string | null;
}

interface Client {
  id: number;
  description: string;
  description_ja?: string | null;
  sections: ClientSection[];
}

export default function Clients() {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;
  const page = usePage();
  const client = page.props.client as Client | null;

  const getCompanyName = (s: ClientSection) =>
    lang === "en" ? s.name : s.name_ja || s.name;

  const getDescription = () =>
    lang === "en"
      ? client?.description
      : client?.description_ja || client?.description;

  const getCompanies = (type: ClientSection["section_type"]) =>
    client?.sections.filter((s) => s.section_type === type) ?? [];

  const renderCompanyList = (companies: ClientSection[]) => (
     <div className="columns-1 md:columns-2 gap-8">
      {companies.map((s, index) => (
        <div key={index} className="flex items-center gap-2 py-2">
          <div className="w-2 h-2 bg-primary flex-shrink-0" />
          {/* {s.link ? (
            <a
              href={s.link}
              target={s.link.startsWith("http") ? "_blank" : "_self"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {getCompanyName(s)}
            </a>
          ) : (
            <span className="text-muted-foreground">
              {getCompanyName(s)}
            </span>
          )} */}
           <span className="text-muted-foreground">
              {getCompanyName(s)}
            </span>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Subheader
          currentPage={
            lang === "en"
              ? "Clients / Biz Partners"
              : "取引先・ビジネスパートナー"
          }
        />
      </div>

      {/* Customer */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-primary text-3xl lg:text-4xl font-bold mb-8">
            {lang === "en" ? "Customer Company" : "顧客企業"}
          </h2>

          {renderCompanyList(getCompanies("customer"))}
        </div>
      </section>

      {/* Alliance */}
      <section className="py-8 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-primary">
            {lang === "en" ? "Alliance Companies" : "アライアンス企業"}
          </h2>

          {renderCompanyList(getCompanies("alliance"))}
        </div>
      </section>

      {/* Contract */}
      {/* <section className="py-8 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-primary">
            {lang === "en"
              ? "Product/Service Agency Companies"
              : "製品/サービス代理店契約企業"}
          </h2>

          {renderCompanyList(getCompanies("contract"))}
        </div>
      </section> */}

      {/* Partner */}
      <section className="py-8 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-primary">
            {lang === "en" ? "Partner Companies" : "パートナー企業"}
          </h2>

          {renderCompanyList(getCompanies("partner"))}

          {getDescription() && (
            <div
              className="prose max-w-none mt-8 text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: getDescription() || "",
              }}
            />
          )}

          {/* <p className="text-sm text-muted-foreground mt-8 text-center">
            {lang === "en"
              ? "*Only companies that have permission to publish are listed. (Company names in alphabetical order, honorifics omitted)"
              : "※掲載許可をいただいた企業のみ掲載しています。（五十音順・敬称略）"}
          </p> */}
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
}