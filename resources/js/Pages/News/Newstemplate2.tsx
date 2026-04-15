import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";

const Newstemplate2 = () => {
  return (
    <Layout>
      <Subheader currentPage="Events" />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Title */}
          <h1 className="text-primary text-3xl lg:text-4xl font-bold mb-2">
            Indo-Sakura Software Takes the Spotlight at SusHi Tech Tokyo 2025
          </h1>
          <p className="text-muted-foreground mb-8">May 12, 2025</p>

          {/* Single Long Banner Image */}
          <div className="w-full mb-10">
            <img
              src="/image/News-2.png"   // ← replace with your uploaded long image
              alt="SusHi Tech Tokyo 2025"
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Page Content */}
          <div className="prose max-w-none text-foreground">
            <h2 className="text-xl font-semibold mb-3">
              A Game-Changing Moment in Innovation and Global Connections
            </h2>
            <p>
              At Indo-Sakura Software Japan, we are passionate about pushing the limits of technology,
              and SusHi Tech Tokyo 2025 gave us the perfect stage to showcase our latest innovations…
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">What We Showcased</h2>
            <ul className="list-disc pl-6">
              <li><b>Source</b> – AI platform transforming automation.</li>
              <li><b>MedicaAI</b> – Healthcare communication improvement.</li>
              <li><b>Analytics AI</b> – Smarter data-driven decisions.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              Building Connections, Gaining Insights
            </h2>
            <p>
              We connected with investors, leaders, and innovators who are shaping the future of technology…
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">The Future Is Bright</h2>
            <p>
              The positive response motivates us to continue driving technology that creates meaningful impact…
            </p>

            {/* Event Details */}
            <h2 className="text-xl font-semibold mt-8 mb-3">Event Details</h2>
            <p><b>Location:</b> Tokyo Big Sight, Kokusai Tenjijo</p>
            <p><b>Date:</b> May 8–10, 2025</p>

            {/* Navigation */}
            {/* <div className="flex justify-between mt-12 text-primary font-medium">
              <a href="/news">Previous</a>
              <a href="/news">Next</a>
            </div> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Newstemplate2;
