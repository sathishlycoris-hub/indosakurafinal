import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";

const Newstemplate3 = () => {
  return (
    <Layout>
      <Subheader currentPage="Press Release" />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">

          {/* TOP IMAGE */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <img 
              src="/image/News3.jpg" 
              alt="Indo-Sakura × Aletyx" 
              className="w-full max-w-lg"
            />

          </div>

          {/* DATE + LOCATION */}
          <p className="text-muted-foreground mb-1">Date: 1 July 2024</p>
          <p className="text-muted-foreground mb-6">Location: Bangalore, India</p>

          {/* TITLE */}
          <h1 className="text-primary text-3xl lg:text-4xl font-bold leading-snug mb-8">
            Doerning Services Pvt. Ltd. Appoints Indo-Sakura Software Pvt. Ltd. as Franchise 
            Headquarters to Boost HR and Payroll Solutions in India
          </h1>

          {/* CONTENT BODY */}
          <div className="prose max-w-none text-foreground">

            <p>
              Doerning Services Pvt. Ltd. appoints Indo-Sakura Software Pvt. Ltd. as Franchise Headquarters 
              to Boost HR and Payroll Solutions in India Bangalore, India – 1 July 2024 – In a strategic move 
              to strengthen its foothold in the Indian market, Doerning Services Pvt. Ltd., a leader in HR, attendance, 
              and payroll outsourcing services, has appointed Indo-Sakura Software Pvt. Ltd. as its franchise 
              headquarters. This collaboration aims to enhance customer support and expand the reach of Doerning’s 
              innovative HR and payroll solutions across India.
            </p>

            <p>
              Atul Paswan, CEO of Indo-Sakura Software Pvt. Ltd., highlighted the synergies between the two companies, 
              stating, “Partnering with Doerning allows us to offer an even more comprehensive suite of services to our 
              clients. We see tremendous synergy in combining our strengths to provide exceptional HR and payroll 
              solutions, further solidifying our market leadership.”
            </p>

            <p>
              Indo-Sakura Software, renowned for its proficiency in system development and IT outsourcing for Japanese 
              companies, and its exclusive distribution of Kingfins’ high-quality stationery products, is now set to 
              promote and expand Doerning’s outsourcing services. Yoshikazu Takasaki, CEO of Doerning Services Pvt. Ltd., 
              also emphasized his enthusiasm about the partnership, saying, “Our collaboration with Indo-Sakura 
              Software marks a significant milestone in our expansion strategy. We are confident that their market 
              expertise and established client relationships will accelerate the adoption of Doerning’s services. 
              Ultimately, enhancing workplace morale and productivity for our clients in India.”
            </p>

            <p>
              This strategic partnership focuses on sales, developing new outsourcing partners, and comprehensive 
              training programs to ensure robust customer support. The initiative is designed to leverage Indo-Sakura 
              Software’s established market presence and client base, enhancing Doerning’s service delivery and market 
              penetration in India.
            </p>

            {/* KEY DETAILS */}
            <h2 className="text-xl font-semibold mt-12 mb-4">Key Details:</h2>
            <ul className="list-disc pl-6">
              <li>Who: Yoshikazu Takasaki, CEO of Doerning Services Pvt. Ltd., and Atul Paswan, CEO of Indo-Sakura Software Pvt. Ltd.</li>
              <li>What: Appointment of Indo-Sakura Software as the franchise headquarters for Doerning Services in India.</li>
              <li>Where: Bangalore, India</li>
              <li>Why: To leverage Indo-Sakura Software’s established market presence and client base, enhancing Doerning’s service delivery and expanding market penetration.</li>
              <li>How: Through a structured partnership focusing on sales promotion, partner development, and training initiatives.</li>
            </ul>

            {/* ABOUT DOERNING */}
            <h2 className="text-xl font-semibold mt-12 mb-4">About Doerning Services</h2>
            <p>
              Doerning Services Pvt. Ltd. provides comprehensive outsourcing services covering HR, attendance management, 
              payroll processing, and year-end adjustments. Their solutions include on-demand salary services that help 
              employees manage expenses, reduce workplace stress, and improve motivation and productivity. With operations 
              spanning the United States, the United Kingdom, Vietnam, Saudi Arabia, and Singapore, they are dedicated to 
              improving employee morale, particularly in the Indian market, by addressing cultural challenges and rewarding 
              desirable employee actions.
            </p>

            {/* ABOUT INDO-SAKURA */}
            <h2 className="text-xl font-semibold mt-12 mb-4">About Indo-Sakura Software</h2>
            <p>
              Indo-Sakura Software Pvt. Ltd. specializes in system development and IT outsourcing services for Japanese 
              companies. Additionally, it is the exclusive distributor of high-quality stationery products in India. With 
              a robust portfolio of long-term customers and a strong presence in the Indian market, Indo-Sakura Software is 
              well-positioned to drive growth in the outsourcing and HR segment. This collaboration underscores their 
              commitment to enhancing clients’ ability to adopt top-notch HR and payroll systems for Japanese companies in India, 
              ensuring improved employee morale and productivity. The partnership not only aims to meet current market demands 
              but also acts as a foundation for future innovations and expansions.
            </p>

            {/* MEDIA CONTACT */}
            <h2 className="text-xl font-semibold mt-12 mb-4">Multimedia Assets</h2>
            <p>
              For more information or to inquire about our services, please contact us at Doerning Services or Indo-Sakura 
              Software. Distribution Information: Press releases will be distributed through major industry publications, 
              Japanese business networks, and targeted online platforms to reach Japanese companies operating in India.
            </p>

            <h2 className="text-xl font-semibold mt-12 mb-4">For further details, please contact:</h2>

            <p><b>Primary Contact:</b></p>
            <p>Chirag: +91-70644-44273, chirag@indosakura.com</p>

            <p className="mt-4"><b>Secondary Contact:</b></p>
            <p>Masahiro Takasaki, 73534-1124, masahiro@doerning.com</p>

          </div>

          {/* NAVIGATION */}
          {/* <div className="flex justify-between mt-12 text-primary font-medium">
            <a href="/news">Previous</a>
            <a href="/news">Next</a>
          </div> */}

        </div>
      </section>
    </Layout>
  );
};

export default Newstemplate3;
