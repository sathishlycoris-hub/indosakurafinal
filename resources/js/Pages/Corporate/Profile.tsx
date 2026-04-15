import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";
import { ArrowRight, Mail, ChevronRight, Building, Users, Calendar, Globe, MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactCTA from "@/components/layout/Contact";
import { Link } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePage } from "@inertiajs/react";



interface CompanyProfile {
  id: number;
  sub_title: string;
  sub_title_ja?: string | null;
  content: string;
  content_ja?: string | null;
}
interface CorpProfileSettings {
  strengths_heading: string;    strengths_heading_ja: string;
  strengths_para1: string;      strengths_para1_ja: string;
  strengths_para2: string;      strengths_para2_ja: string;
  strengths_cta: string;        strengths_cta_ja: string;
 
  str_stat1_value: string; str_stat1_label: string; str_stat1_label_ja: string; str_stat1_sub: string; str_stat1_sub_ja: string;
  str_stat2_value: string; str_stat2_label: string; str_stat2_label_ja: string; str_stat2_sub: string; str_stat2_sub_ja: string;
  str_stat3_value: string; str_stat3_label: string; str_stat3_label_ja: string; str_stat3_sub: string; str_stat3_sub_ja: string;
  str_stat4_value: string; str_stat4_label: string; str_stat4_label_ja: string; str_stat4_sub: string; str_stat4_sub_ja: string;
 
  str_feat1_title: string; str_feat1_title_ja: string; str_feat1_sub: string; str_feat1_sub_ja: string; str_feat1_desc: string; str_feat1_desc_ja: string;
  str_feat2_title: string; str_feat2_title_ja: string; str_feat2_sub: string; str_feat2_sub_ja: string; str_feat2_desc: string; str_feat2_desc_ja: string;
  str_feat3_title: string; str_feat3_title_ja: string; str_feat3_sub: string; str_feat3_sub_ja: string; str_feat3_desc: string; str_feat3_desc_ja: string;
  str_feat4_title: string; str_feat4_title_ja: string; str_feat4_sub: string; str_feat4_sub_ja: string; str_feat4_desc: string; str_feat4_desc_ja: string;
}

interface CorpProfileSettings {
  // ... existing strengths / stats / feats fields ...
 
  loc1_name: string; loc1_name_ja: string; loc1_address: string; loc1_address_ja: string;
  loc2_name: string; loc2_name_ja: string; loc2_address: string; loc2_address_ja: string;
  loc3_name: string; loc3_name_ja: string; loc3_address: string; loc3_address_ja: string;
  loc4_name: string; loc4_name_ja: string; loc4_address: string; loc4_address_ja: string;
  loc5_name: string; loc5_name_ja: string; loc5_address: string; loc5_address_ja: string;
}
 
// ── STEP 2: Build a locations array from CMS inside your component ────────────
 

const Profile = ({
  companyProfiles,
  corpSettings,        // <-- add this
}: {
  companyProfiles: CompanyProfile[];
  corpSettings: CorpProfileSettings;   // <-- add this
}) => {
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  // Helper to pick EN or JA
  const t = (en: string, ja: string) => (lang === "ja" ? ja || en : en);

  const cs = corpSettings; // shorthand

  // Add this alongside strStats / strFeats:
const locations = [
  { name: t(cs.loc1_name, cs.loc1_name_ja), address: t(cs.loc1_address, cs.loc1_address_ja), Icon: Building },
  { name: t(cs.loc2_name, cs.loc2_name_ja), address: t(cs.loc2_address, cs.loc2_address_ja), Icon: MapPin },
  { name: t(cs.loc3_name, cs.loc3_name_ja), address: t(cs.loc3_address, cs.loc3_address_ja), Icon: Users },
  { name: t(cs.loc4_name, cs.loc4_name_ja), address: t(cs.loc4_address, cs.loc4_address_ja), Icon: Globe },
  { name: t(cs.loc5_name, cs.loc5_name_ja), address: t(cs.loc5_address, cs.loc5_address_ja), Icon: Globe },
];


  // Build stats array from CMS
  const strStats = [
    { value: cs.str_stat1_value, label: t(cs.str_stat1_label, cs.str_stat1_label_ja), sub: t(cs.str_stat1_sub, cs.str_stat1_sub_ja) },
    { value: cs.str_stat2_value, label: t(cs.str_stat2_label, cs.str_stat2_label_ja), sub: t(cs.str_stat2_sub, cs.str_stat2_sub_ja) },
    { value: cs.str_stat3_value, label: t(cs.str_stat3_label, cs.str_stat3_label_ja), sub: t(cs.str_stat3_sub, cs.str_stat3_sub_ja) },
    { value: cs.str_stat4_value, label: t(cs.str_stat4_label, cs.str_stat4_label_ja), sub: t(cs.str_stat4_sub, cs.str_stat4_sub_ja) },
  ];

  // Build feature cards array from CMS
  const strFeats = [
    { Icon: Users,       title: t(cs.str_feat1_title, cs.str_feat1_title_ja), sub: t(cs.str_feat1_sub, cs.str_feat1_sub_ja), desc: t(cs.str_feat1_desc, cs.str_feat1_desc_ja) },
    { Icon: Globe,       title: t(cs.str_feat2_title, cs.str_feat2_title_ja), sub: t(cs.str_feat2_sub, cs.str_feat2_sub_ja), desc: t(cs.str_feat2_desc, cs.str_feat2_desc_ja) },
    { Icon: CheckCircle, title: t(cs.str_feat3_title, cs.str_feat3_title_ja), sub: t(cs.str_feat3_sub, cs.str_feat3_sub_ja), desc: t(cs.str_feat3_desc, cs.str_feat3_desc_ja) },
    { Icon: ArrowRight,  title: t(cs.str_feat4_title, cs.str_feat4_title_ja), sub: t(cs.str_feat4_sub, cs.str_feat4_sub_ja), desc: t(cs.str_feat4_desc, cs.str_feat4_desc_ja) },
  ];


  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    offset: 120,
    delay: 80,
  });

  





  const strengthsData = [
    {
      title: "High Performing\nIndian IT Engineers",
      subtitle: "Proven Excellence",
      description: `Our engineers specialize in innovative IT solutions, ensuring high-quality 
performance and optimal results with nearly 20 years of experience. Our engineers deliver 
tailored, effective solutions that drive growth and success for businesses worldwide.`
    },
    {
      title: "19 years of Experience",
      subtitle: "Specialized in Japanese Companies",
      description: `With nearly two decades of experience, we specialize in understanding and 
meeting the unique needs of Japanese companies.`
    },
    {
      title: "Hybrid Development",
      subtitle: "Flexible & Cost-Effective",
      description: `Offer a blend of on-site and offshore models, providing flexibility, 
cost-efficiency, and high-quality results. This approach allows businesses to scale resources 
as needed.`
    },
    {
      title: "Bilingual Communication",
      subtitle: "Japanese & English Expertise",
      description: `Ensure smooth communication between clients and teams through our bilingual 
capabilities, bridging language barriers for effective collaboration.`
    },
    {
      title: "Cutting-Edge Technology",
      subtitle: "Empowering Growth through Innovation",
      description: `We embrace the latest technologies like GenAI, machine learning, cloud 
services and more, ensuring your business stays ahead in innovation.`
    },
    {
      isCTA: true,
      title: "Ready to innovate and<br/>drive an impact?",
      buttonText: "Let’s talk with us",
    }
  ];



  const contactLocationData = {
    title: "Locations",
    subtitle: "Get in touch with us today to start your technology journey",
    description: `We’re committed to crafting concepts that help you reach new heights with our 
  GenAI, Mobile app, Software Development, AI/ML Development, ERP solutions, Business 
  Intelligence and Cybersecurity Solutions.`,
    image: "/image/LocationEng.png"
  };

  const FeatureCard = ({
    icon,
    title,
    subtitle,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
  }) => (
    <div className="bg-primary rounded-lg p-6 text-center">
      {icon}
      <p className="font-medium">{title}</p>
      <p className="text-white">{subtitle}</p>
      <p className="mt-2 text-white leading-relaxed">{description}</p>
    </div>
  );

  return (
    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Subheader
          currentPage={lang === "ja" ? "会社概要" : "Corporate Profile"}
        />
      </div>







      {/* Our Strengths */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
        
          <h2 className="text-primary text-center mb-2 text-3xl font-bold">
            Our Strengths
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Combining expertise for innovation
          </p>

         
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
         
            <div className="lg:col-span-2 flex flex-col gap-5">
              
              <div className="bg-[#F5E6EE] rounded-xl p-6 h-[380px]">
                <h3 className="text-[#D6387A] mb-3">
                  High Performing<br />Indian IT Engineers
                </h3>
                <h4 className="mb-3">Proven Excellence</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our engineers specialize in innovative IT solutions, ensuring high-quality performance and optimal results with nearly 20 years of experience, we deliver tailored, effective solutions that drive growth and success for businesses worldwide. Our engineers excel in delivering innovative IT solutions, ensuring top-notch performance and quality for businesses across various industries our engineers excel at delivering high-quality solutions that meet the unique needs of each clients.
                </p>
              </div>

            
              <div className="grid grid-cols-1">
               
                <div className="bg-[#E8E8E8] rounded-xl p-6 h-[220px]">
                  <h3 className="text-[#D6387A] mb-3">Cutting-Edge Technology</h3>
                  <h4 className="mb-3">Empowering Growth through Innovation</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We embrace the latest technologies like GenAI, machine learning, cloud services and more, ensuring your business stays ahead in innovation.
                  </p>
                </div>

           
                <div></div>
              </div>
            </div>

          
            <div className="lg:col-span-2 flex flex-col gap-5">
              
              <div className="bg-[#E8E8E8] rounded-xl p-6 h-[160px]">
                <h3 className="text-[#D6387A] mb-3">19 years of Experience</h3>
                <h4 className="mb-3">Specialized in Japanese Companies</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With nearly two decades of experience, we specialize in understanding and meeting the unique needs of Japanese companies
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                
                <div className="bg-pink-100 rounded-xl p-5 h-[200px]">
                  <h3 className="text-[#D6387A] mb-2">
                    Hybrid Development
                  </h3>
                  <h4 className="mb-2">Flexible & Cost-Effective</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Offer a blend of on-site and offshore models, providing flexibility, cost-efficiency, and high-quality results. This approach allows businesses to scale resources as needed.
                  </p>
                </div>

                <div className="bg-[#E8E8E8] rounded-xl p-5 h-[200px]">
                  <h3 className="text-[#D6387A] mb-2">
                    Bilingual Communication
                  </h3>
                  <h4 className="mb-2">
                    Japanese & English Expertise
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ensure smooth communication between clients and teams through our bilingual capabilities, bridging language barriers for effective collaboration.
                  </p>
                </div>
              </div>

  
              <div className="grid grid-cols-1">
             
                <div></div>

                
                <div className="bg-pink-100 rounded-xl p-6 relative overflow-hidden h-[220px] flex flex-col justify-center">
                  <h4 className="mb-4 max-w-xs">
                    Ready to innovate and drive an impact?
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Join us in shaping the future of technology. At Indo-Sakura, we empower great ideas, encourage bold thinking, and turn ambition into meaningful innovation. Let’s build solutions that matter — together.
                  </p>
                  <button className="bg-[#D6387A] text-white px-6 py-3 rounded-md hover:bg-[#B52E68] transition-colors w-fit">
                    Lets talk with us
                  </button>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Our Strengths */}
      {/* Our Strengths */}
      
    <section className="py-20 bg-accent-pink text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8" data-aos="fade-up">

        <div className="section-divider mb-8 border-white/80">
          <h2 className="text-3xl font-semibold text-white">
            {lang === "ja" ? "当社の強み" : "Our Strengths"}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[65%_35%] gap-0">

          {/* LEFT — CMS text */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-6">
              {t(cs.strengths_heading, cs.strengths_heading_ja)}
            </h2>

            <p className="text-white mb-4 leading-relaxed">
              {t(cs.strengths_para1, cs.strengths_para1_ja)}
            </p>

            <p className="text-white mb-8 leading-relaxed">
              {t(cs.strengths_para2, cs.strengths_para2_ja)}
            </p>

            <Link href="/contact">
              <Button
                variant="heroOutline"
                className="bg-white text-sm font-semibold text-pink-800 hover:bg-white/90 rounded-3xl px-8 py-4"
              >
                {t(cs.strengths_cta, cs.strengths_cta_ja)}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* RIGHT — CMS stat boxes */}
          <div className="grid grid-cols-2 gap-4">
            {strStats.map((s, i) => (
              <div key={i} className="bg-primary rounded-xl p-5">
                <div className="text-3xl font-bold mb-1">{s.value}</div>
                <p className="font-medium text-white">{s.label}</p>
                <p className="text-white">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURE CARDS — CMS-driven */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {strFeats.map(({ Icon, title, sub, desc }, i) => (
            <FeatureCard key={i} icon={<Icon className="w-6 h-6 mx-auto mb-3" />} title={title} subtitle={sub} description={desc} />
          ))}
        </div>

      </div>
    </section>



      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="section-divider mb-8 border-pink/80">
            <h2 className="text-3xl font-bold mb-8 text-primary">
              {lang === "ja" ? "会社概要" : "Company Profile"}
            </h2>
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden text-sm">
            {companyProfiles.map((row) => {
              const title =
                lang === "ja"
                  ? row.sub_title_ja || row.sub_title
                  : row.sub_title;

              const content =
                lang === "ja"
                  ? row.content_ja || row.content
                  : row.content;

              return (
                <div
                  key={row.id}
                  className="grid grid-cols-[300px,1fr] border-b border-gray-300"   // ← Changed here
                >
                  {/* LEFT COLUMN - Now narrower */}
                  <div className="bg-pink-100 p-4 font-semibold leading-relaxed">
                    {title}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div
                    className="p-4 space-y-1 leading-relaxed prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </section>



    <section className="py-2">
  <div className="container mx-auto px-4 lg:px-8">
 
    <h2 className="text-primary text-3xl font-bold mb-4">
      {lang === "ja" ? "拠点情報" : "Locations"}
    </h2>
 
    <div className="w-full flex justify-center mb-0">
      <img
        src="/image/LocationEng.png"
        alt="Indo-Sakura Global Locations"
        className="rounded-lg shadow-md w-full"
      />
    </div>
 
    {/* CMS-driven location cards */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5 bg-[#E8E8E8] p-6 rounded-lg shadow-md">
      {locations.map(({ name, address, Icon }, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-9 h-9 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-sm">{address}</p>
          </div>
        </div>
      ))}
    </div>
 
  </div>
</section>


      {/* Contact Form Section */}
      <ContactCTA />
    </Layout>
  );
};

export default Profile;
