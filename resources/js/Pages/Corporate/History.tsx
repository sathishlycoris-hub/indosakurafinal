import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import ContactCTA from "@/components/layout/Contact";
import { usePage } from "@inertiajs/react";
interface HistoryItem {
  id: number;
  year: string;
  year_ja?: string | null;
  month: string;
  month_ja?: string | null;
  description: string;
  description_ja?: string | null;
}
const History = ({
  histories,
}: {
  histories: HistoryItem[];
}) => {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  // Convert data into table-friendly structure (year / month / description)
  // const historyTable = [
  //   {
  //     year: "2025",
  //     month: "January",
  //     description:
  //       "At South Tech Expo 2025, Indo-Sakura Software Japan showcased its flagship AI products — SourceBytes AI, MediChat, and MediAnalytics AI. The event helped build global connections and receive excellent feedback."
  //   },
  //   {
  //     year: "2022",
  //     month: "August",
  //     description:
  //       "Established Cyber Security Solutions division in partnership with BluSapphire Inc. (USA) and expanded cybersecurity offerings."
  //   },
  //   {
  //     year: "2021",
  //     month: "April",
  //     description:
  //       "Selected as an AI Vendor by SoftBank for high-quality deliveries and contributions to AI-related services."
  //   },
  //   {
  //     year: "2020",
  //     month: "March",
  //     description:
  //       "Formed a business alliance with SoftBank Group companies to enhance DevOps solution sales."
  //   },
  //   {
  //     year: "2019",
  //     month: "June",
  //     description:
  //       "Launched World HR (now world-hr.com) to meet the increasing demand for highly skilled IT professionals in Japan."
  //   },
  //   {
  //     year: "2017",
  //     month: "December",
  //     description:
  //       "Participated in cultural events for the 85th birthday celebration of the Emperor of Japan, hosted by the Consulate General of Japan in Bengaluru."
  //   },
  //   {
  //     year: "2015",
  //     month: "April",
  //     description:
  //       "Partnered with KOKUYO Japan to market and distribute digital stationery products in India."
  //   },
  //   {
  //     year: "2012",
  //     month: "May",
  //     description:
  //       "Expanded IT services to Japanese firms in the USA through a partnership with System 7 Inc., Los Angeles."
  //   },
  //   {
  //     year: "2009",
  //     month: "October",
  //     description:
  //       "Relocated Japan head office to Mimasaka (Okayama) and expanded services in the Kansai region. Launched Data Analysis Division."
  //   },
  //   {
  //     year: "2008",
  //     month: "July",
  //     description:
  //       "Launched full-time Japanese language training program with Omron Group for IT graduates."
  //   },
  //   {
  //     year: "2007",
  //     month: "March",
  //     description:
  //       "Established an Offshore Development Center to deliver IT services to the Omron Group in Japan."
  //   },
  //   {
  //     year: "2006",
  //     month: "September",
  //     description:
  //       "Opened the Bangalore Development Center and launched a 6-month Japanese language program."
  //   },
  //   {
  //     year: "2005",
  //     month: "December",
  //     description:
  //       "Indo-Sakura Software Japan K.K. was founded by Mr. Atul Prasann, beginning its Japan–India IT innovation journey."
  //   }
  // ];

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Subheader
          currentPage={lang === "ja" ? "沿革" : "History"}
        />
      </div>

      {/* HERO SECTION */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-3xl font-bold text-primary mb-4">
            {lang === "ja" ? "会社沿革" : "Company History"}
          </h1>

          <p className="text-lg text-muted-foreground">
            {lang === "ja"
              ? "2005年から現在までの革新と成長の歩み"
              : "Our journey of innovation and growth from 2005 to the present day"}
          </p>
        </div>
      </section>

      {/* TABLE STYLE HISTORY (Matches Uploaded Image) */}
      <section className="py-5 bg-sec">
        <div className="container mx-auto px-4 lg:px-8">

          <h2 className="text-2xl font-bold mb-8">
            {lang === "ja" ? "沿革一覧" : "History"}
          </h2>

          <div className="border border-border rounded-lg overflow-hidden bg-white shadow-sm">

            {histories.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 border border-border [&>div]:border-r last:[&>div]:border-r-0 text-sm"
              >
                <div className="col-span-1 p-4 font-semibold bg-pink-100">
                  {lang === "ja"
                    ? item.year_ja || item.year
                    : item.year}
                </div>

                <div className="col-span-1 p-4 font-semibold bg-pink-100">
                  {lang === "ja"
                    ? item.month_ja || item.month
                    : item.month}
                </div>

                <div
                  className="col-span-8 p-4 leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html:
                      lang === "ja"
                        ? item.description_ja || item.description
                        : item.description,
                  }}
                />
              </div>
            ))}

          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default History;
