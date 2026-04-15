import Layout from "@/components/layout/Layout";
import { Link } from "@inertiajs/react";

const CookiePolicy = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-primary">Cookie Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 30, 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="max-w-6xl mx-auto prose prose-lg dark:prose-invert">
          
          <section className="mb-7">
            <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
              They help us make your experience better by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve our website performance and user experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 bg-section-light">
                <h3 className="text-xl font-medium text-foreground mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 bg-section-light">
                <h3 className="text-xl font-medium text-foreground mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 bg-section-light">
                <h3 className="text-xl font-medium text-foreground mb-2">Functional Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies enable enhanced functionality and personalization, such as remembering your language preference or region.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 bg-section-light">
                <h3 className="text-xl font-medium text-foreground mb-2">Marketing Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are used to track visitors across websites to display relevant advertisements based on their interests.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Through your browser settings - most browsers allow you to refuse or accept cookies</li>
              <li>By using our cookie consent banner when you first visit our website</li>
              <li>By clearing your browser's cookie cache</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Please note that disabling certain cookies may affect the functionality of our website and your user experience.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some cookies on our website are set by third-party services that appear on our pages. We do not control the use of these cookies. 
              Please refer to the respective third-party privacy policies for more information about their cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. 
              Please revisit this page periodically to stay informed about our use of cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our use of cookies, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>.
            </p>
          </section>

        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
