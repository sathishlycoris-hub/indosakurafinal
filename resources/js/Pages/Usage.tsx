import Layout from "@/components/layout/Layout";
import { Link, usePage } from "@inertiajs/react";
import { ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsageSettings {
  usage_hero_title_en?: string | null;
  usage_hero_title_ja?: string | null;
  usage_intro_1_en?: string | null;
  usage_intro_1_ja?: string | null;
  usage_intro_2_en?: string | null;
  usage_intro_2_ja?: string | null;
  usage_copyright_en?: string | null;
  usage_copyright_ja?: string | null;
  usage_sentence_en?: string | null;
  usage_sentence_ja?: string | null;
  usage_countries_en?: string | null;
  usage_countries_ja?: string | null;
  usage_links_intro_en?: string | null;
  usage_links_intro_ja?: string | null;
  usage_trademark_note_en?: string | null;
  usage_trademark_note_ja?: string | null;
}

const DEFAULTS = {
  usage_hero_title_en:   "Use of the Site",
  usage_hero_title_ja:   "サイトのご利用について",
  usage_intro_1_en:      'This website (hereinafter referred to as the "Site") is operated by Indo-Sakura Software Japan K.K. (hereinafter referred to as "the Company"). By using this site, you agree to these terms of use. These terms of use are subject to change without notice. Please note.',
  usage_intro_1_ja:      '本ウェブサイト（以下「本サイト」といいます）は、インド桜ソフトウェアジャパン株式会社（以下「当社」といいます）が運営しています。本サイトをご利用になることで、これらの利用規約に同意したものとみなされます。これらの利用規約は予告なく変更される場合がありますのでご了承ください。',
  usage_intro_2_en:      'In addition, there are places on this site where the terms of use are set separately from these terms of use. Please note that in that case, you must also agree to the terms and conditions set in that section in addition to these Terms of Use.',
  usage_intro_2_ja:      'また、本サイトには、本利用規約とは別に利用規約が設定されている場所があります。その場合は、本利用規約に加えて、その箇所に設定されている利用規約にも同意いただく必要がありますのでご了承ください。',
  usage_copyright_en:    'All information such as documents and images on this site (hereinafter referred to as "content"). Unless otherwise noted, the copyright belongs to the Company. Unauthorized reproduction, modification, or redistribution of content is prohibited.',
  usage_copyright_ja:    '本サイト上のすべての情報（ドキュメント、画像など、以下「コンテンツ」といいます）の著作権は、特に明記されている場合を除き、当社に帰属します。コンテンツの無断転載、改変、再配布は禁止されています。',
  usage_sentence_en:     'The information posted on this site is current at the time of posting. Please note that it is subject to change without notice after the time of posting. The Company has confirmed and posted the information on this site to ensure that there are no errors or defects, but the Company cannot be held responsible for any errors or defects in the information posted. In addition, the Company shall not be liable for any damages caused by the use of this site.',
  usage_sentence_ja:     '本サイトに掲載されている情報は、掲載時点のものです。掲載後予告なく変更される場合がありますのでご了承ください。当社は、本サイトに掲載されている情報に誤りや不備がないことを確認の上掲載しておりますが、掲載されている情報に誤りや不備があった場合でも、当社は責任を負いかねます。また、本サイトの利用により生じた損害について、当社は責任を負いません。',
  usage_countries_en:    'The information on this site is information about products and services provided to customers in Japan and is only available to those who reside in Japan. If the country/region of provision is specified for individual content, those conditions will take precedence.',
  usage_countries_ja:    '本サイトの情報は、日本国内のお客様に提供する製品・サービスに関する情報であり、日本国内に居住されている方のみを対象としています。個別のコンテンツで提供国・地域が指定されている場合は、その条件が優先されます。',
  usage_links_intro_en:  'Links to this site are permitted only to links to the top page of this site. If individual content allows links to sites other than the top page, those terms will take precedence. Pages other than the top page may be changed or deleted without notice, so links may be broken. Please note.',
  usage_links_intro_ja:  '本サイトへのリンクは、本サイトのトップページへのリンクのみ許可されています。個別のコンテンツでトップページ以外のサイトへのリンクが許可されている場合は、その条件が優先されます。トップページ以外のページは予告なく変更または削除される場合があり、リンク切れになる可能性がありますのでご了承ください。',
  usage_trademark_note_en: '*The contents and specifications described on this site are subject to change without notice.',
  usage_trademark_note_ja: '*本サイトに記載されている内容および仕様は、予告なく変更される場合があります。',
};

const Usage = () => {
  const { lang, siteSettings } = usePage<{
    lang: "en" | "ja";
    siteSettings?: UsageSettings;
  }>().props;

  const s = { ...DEFAULTS, ...(siteSettings ?? {}) };

  const getValue = (en?: string | null, ja?: string | null): string =>
    (lang === "ja" ? ja || en : en) || "";

  const trademarks = [
    {
      en: "Indo-Sakura and related logos are registered trademarks of Indo-Sakura Software Japan K.K.",
      ja: "インド桜および関連ロゴは、インド桜ソフトウェアジャパン株式会社の登録商標です。",
    },
    {
      en: "Microsoft, Windows, Azure, and related products are registered trademarks of Microsoft Corporation.",
      ja: "Microsoft、Windows、Azureおよび関連製品はMicrosoft Corporationの登録商標です。",
    },
    {
      en: "Amazon Web Services and other AWS trademarks are trademarks of Amazon.com, Inc. or its affiliates.",
      ja: "Amazon Web Servicesおよびその他のAWS商標は、Amazon.com, Inc.またはその関連会社の商標です。",
    },
    {
      en: "SAP, SAP HANA, SAP S/4HANA, SAP ERP and other SAP products are registered trademarks of SAP SE.",
      ja: "SAP、SAP HANA、SAP S/4HANA、SAP ERPおよびその他のSAP製品は、SAP SEの登録商標です。",
    },
    {
      en: "Other company names and product names mentioned are registered trademarks or trademarks of their respective companies.",
      ja: "その他記載されている会社名、製品名は、各社の登録商標または商標です。",
    },
  ];

  const linkRules = [
    { en: "Specify the name of the company",   ja: "会社名を明記してください" },
    { en: "The use of logos is prohibited.",    ja: "ロゴの使用は禁止されています。" },
    {
      en: "Clarify that it is our site. Display in a separate window, and display in a frame window is prohibited.",
      ja: "当社のサイトであることを明記してください。別ウィンドウでの表示、フレームウィンドウでの表示は禁止されています。",
    },
  ];

  const prohibitedLinks = [
    { en: "(1) Websites that infringe on the rights of the Company and third parties.",                                ja: "(1) 当社および第三者の権利を侵害するウェブサイト。" },
    { en: "(2) Websites with content that misleads, misunderstands, or causes inconvenience to the Company or a third party.", ja: "(2) 当社または第三者に誤解を与え、誤解させ、または不便を生じさせる内容のウェブサイト。" },
    { en: "(3) Websites with content that is contrary to public order and morals.",                                    ja: "(3) 公序良俗に反する内容のウェブサイト。" },
    { en: "(4) Websites with content related to illegal or potentially illegal expressions and activities.",            ja: "(4) 違法または違法の可能性のある表現・活動に関する内容のウェブサイト。" },
    { en: "(5) Other websites that the Company deems inappropriate as a source of links.",                             ja: "(5) その他、当社がリンク元として不適切と判断するウェブサイト。" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {getValue(s.usage_hero_title_en, s.usage_hero_title_ja)}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl text-left">

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {getValue(s.usage_intro_1_en, s.usage_intro_1_ja)}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {getValue(s.usage_intro_2_en, s.usage_intro_2_ja)}
            </p>
          </div>

          {/* Copyright */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Copyright", "著作権")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {getValue(s.usage_copyright_en, s.usage_copyright_ja)}
            </p>
          </div>

          {/* Sentence and Content */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Sentence and its Content", "文章とその内容")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {getValue(s.usage_sentence_en, s.usage_sentence_ja)}
            </p>
          </div>

          {/* Countries */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Countries/Regions Offered", "対象国・地域")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {getValue(s.usage_countries_en, s.usage_countries_ja)}
            </p>
          </div>

          {/* Links */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Links to this Site", "本サイトへのリンク")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {getValue(s.usage_links_intro_en, s.usage_links_intro_ja)}
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
              {linkRules.map((rule, i) => (
                <li key={i}>{getValue(rule.en, rule.ja)}</li>
              ))}
              <li>
                {getValue(
                  "Links from the following websites are strictly prohibited:",
                  "以下のウェブサイトからのリンクは固くお断りします："
                )}
                <ul className="list-none ml-4 mt-2 space-y-1">
                  {prohibitedLinks.map((item, i) => (
                    <li key={i} className="text-muted-foreground">
                      {getValue(item.en, item.ja)}
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
          </div>

          {/* Trademark */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {getValue("Trademark", "商標")}
            </h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {trademarks.map((item, i) => (
                <li key={i}>{getValue(item.en, item.ja)}</li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
              {getValue(s.usage_trademark_note_en, s.usage_trademark_note_ja)}
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-4">
            <Mail className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-6">
            {getValue("Contact Form", "お問い合わせフォーム")}
          </h2>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              {getValue("Contact us here", "こちらからお問い合わせ")}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Usage;