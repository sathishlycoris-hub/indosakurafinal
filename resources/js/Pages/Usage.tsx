import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Link } from "@inertiajs/react";
import { ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Usage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-muted py-8 bg-primary">
        <div className="container mx-auto px-4">
          {/* <div className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">
              {language === 'en' ? "Home" : "ホーム"}
            </Link>
            <span className="mx-2">›</span>
            <span>{language === 'en' ? "Use of the Site" : "サイトのご利用について"}</span>
          </div> */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-white">
            {language === 'en' ? "Use of the Site" : "サイトのご利用について"}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl text-left">
          {/* Introduction */}
          <div className="mb-10">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en' 
                ? 'This website (hereinafter referred to as the "Site") is operated by Indo-Sakura Software Japan K.K. (hereinafter referred to as "the Company"). By using this site, you agree to these terms of use. These terms of use are subject to change without notice. Please note.'
                : '本ウェブサイト（以下「本サイト」といいます）は、インド桜ソフトウェアジャパン株式会社（以下「当社」といいます）が運営しています。本サイトをご利用になることで、これらの利用規約に同意したものとみなされます。これらの利用規約は予告なく変更される場合がありますのでご了承ください。'}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'In addition, there are places on this site where the terms of use are set separately from these terms of use. Please note that in that case, you must also agree to the terms and conditions set in that section in addition to these Terms of Use.'
                : 'また、本サイトには、本利用規約とは別に利用規約が設定されている場所があります。その場合は、本利用規約に加えて、その箇所に設定されている利用規約にも同意いただく必要がありますのでご了承ください。'}
            </p>
          </div>

          {/* Copyright Section */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'en' ? "Copyright" : "著作権"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'All information such as documents and images on this site (hereinafter referred to as "content"). Unless otherwise noted, the copyright belongs to the Company. Unauthorized reproduction, modification, or redistribution of content is prohibited.'
                : '本サイト上のすべての情報（ドキュメント、画像など、以下「コンテンツ」といいます）の著作権は、特に明記されている場合を除き、当社に帰属します。コンテンツの無断転載、改変、再配布は禁止されています。'}
            </p>
          </div>

          {/* Sentence and Content Section */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'en' ? "Sentence and its Content" : "文章とその内容"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'The information posted on this site is current at the time of posting. Please note that it is subject to change without notice after the time of posting. The Company has confirmed and posted the information on this site to ensure that there are no errors or defects, but the Company cannot be held responsible for any errors or defects in the information posted. In addition, the Company shall not be liable for any damages caused by the use of this site.'
                : '本サイトに掲載されている情報は、掲載時点のものです。掲載後予告なく変更される場合がありますのでご了承ください。当社は、本サイトに掲載されている情報に誤りや不備がないことを確認の上掲載しておりますが、掲載されている情報に誤りや不備があった場合でも、当社は責任を負いかねます。また、本サイトの利用により生じた損害について、当社は責任を負いません。'}
            </p>
          </div>

          {/* Countries/Regions Section */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'en' ? "Countries/Regions Offered" : "対象国・地域"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'The information on this site is information about products and services provided to customers in Japan and is only available to those who reside in Japan. If the country/region of provision is specified for individual content, those conditions will take precedence.'
                : '本サイトの情報は、日本国内のお客様に提供する製品・サービスに関する情報であり、日本国内に居住されている方のみを対象としています。個別のコンテンツで提供国・地域が指定されている場合は、その条件が優先されます。'}
            </p>
          </div>

          {/* Links Section */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'en' ? "Links to this Site" : "本サイトへのリンク"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'Links to this site are permitted only to links to the top page of this site. If individual content allows links to sites other than the top page, those terms will take precedence. Pages other than the top page may be changed or deleted without notice, so links may be broken. Please note.'
                : '本サイトへのリンクは、本サイトのトップページへのリンクのみ許可されています。個別のコンテンツでトップページ以外のサイトへのリンクが許可されている場合は、その条件が優先されます。トップページ以外のページは予告なく変更または削除される場合があり、リンク切れになる可能性がありますのでご了承ください。'}
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
              <li>{language === 'en' ? 'Specify the name of the company' : '会社名を明記してください'}</li>
              <li>{language === 'en' ? 'The use of logos is prohibited.' : 'ロゴの使用は禁止されています。'}</li>
              <li>{language === 'en' ? 'Clarify that it is our site. Display in a separate window, and display in a frame window is prohibited.' : '当社のサイトであることを明記してください。別ウィンドウでの表示、フレームウィンドウでの表示は禁止されています。'}</li>
              <li>
                {language === 'en' ? 'Links from the following websites are strictly prohibited:' : '以下のウェブサイトからのリンクは固くお断りします：'}
                <ul className="list-none ml-4 mt-2 space-y-1">
                  <li className="text-muted-foreground">{language === 'en' ? '(1) Websites that infringe on the rights of the Company and third parties.' : '(1) 当社および第三者の権利を侵害するウェブサイト。'}</li>
                  <li className="text-muted-foreground">{language === 'en' ? '(2) Websites with content that misleads, misunderstands, or causes inconvenience to the Company or a third party.' : '(2) 当社または第三者に誤解を与え、誤解させ、または不便を生じさせる内容のウェブサイト。'}</li>
                  <li className="text-muted-foreground">{language === 'en' ? '(3) Websites with content that is contrary to public order and morals.' : '(3) 公序良俗に反する内容のウェブサイト。'}</li>
                  <li className="text-muted-foreground">{language === 'en' ? '(4) Websites with content related to illegal or potentially illegal expressions and activities.' : '(4) 違法または違法の可能性のある表現・活動に関する内容のウェブサイト。'}</li>
                  <li className="text-muted-foreground">{language === 'en' ? '(5) Other websites that the Company deems inappropriate as a source of links.' : '(5) その他、当社がリンク元として不適切と判断するウェブサイト。'}</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Trademark Section */}
          <div className="mb-10">
            <div className="border-t-2 border-primary w-16 mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'en' ? "Trademark" : "商標"}
            </h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>{language === 'en' ? 'Indo-Sakura and related logos are registered trademarks of Indo-Sakura Software Japan K.K.' : 'インド桜および関連ロゴは、インド桜ソフトウェアジャパン株式会社の登録商標です。'}</li>
              <li>{language === 'en' ? 'Microsoft, Windows, Azure, and related products are registered trademarks of Microsoft Corporation.' : 'Microsoft、Windows、Azureおよび関連製品はMicrosoft Corporationの登録商標です。'}</li>
              <li>{language === 'en' ? 'Amazon Web Services and other AWS trademarks are trademarks of Amazon.com, Inc. or its affiliates.' : 'Amazon Web Servicesおよびその他のAWS商標は、Amazon.com, Inc.またはその関連会社の商標です。'}</li>
              <li>{language === 'en' ? 'SAP, SAP HANA, SAP S/4HANA, SAP ERP and other SAP products are registered trademarks of SAP SE.' : 'SAP、SAP HANA、SAP S/4HANA、SAP ERPおよびその他のSAP製品は、SAP SEの登録商標です。'}</li>
              <li>{language === 'en' ? 'Other company names and product names mentioned are registered trademarks or trademarks of their respective companies.' : 'その他記載されている会社名、製品名は、各社の登録商標または商標です。'}</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
              {language === 'en'
                ? '*The contents and specifications described on this site are subject to change without notice.'
                : '*本サイトに記載されている内容および仕様は、予告なく変更される場合があります。'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-4">
            <Mail className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-6">
            {language === 'en' ? "Contact Form" : "お問い合わせフォーム"}
          </h2>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              {language === 'en' ? "Contact us here" : "こちらからお問い合わせ"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Usage;
