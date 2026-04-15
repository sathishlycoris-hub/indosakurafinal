import Layout from "@/components/layout/Layout";
import Subheader from "@/components/layout/Subheader";

const NewTemplate1 = () => {
  return (
    <Layout>
      {/* Subheader */}
      <Subheader currentPage="Press Release" />

      {/* Main Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Main Title */}
          <h1 className="text-primary text-2xl lg:text-3xl font-bold leading-snug mb-6">
            Indo-Sakura Software Japan Partners with Aletyx to Bring Enterprise-Grade<br />
            Open-Source Rule and Process Engines to Japan
          </h1>

          {/* Logos Section */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <img 
              src="/image/News1.png" 
              alt="Indo-Sakura × Aletyx" 
              className="w-full max-w-lg"
            />

            <div className="bg-black text-white px-4 py-2 text-sm rounded-md">
              Indo-Sakura Software Japan Partners with Aletyx
            </div>
          </div>

          {/* Content Section */}
          <div className="prose prose-sm lg:prose-base max-w-none text-foreground">
            <p className="font-semibold">FOR IMMEDIATE RELEASE<br />September 12, 2025</p>

            <p>
              <strong>Tokyo, Japan –</strong> Indo-Sakura Software Japan K.K. (Headquarters: Tokyo, Japan, 
              https://indosakura.com/jp/) today announced a strategic partnership with Aletyx Inc. 
              (Headquarters: North Carolina, USA, https://aletyx.ai/) to introduce and support Aletyx’s flagship 
              enterprise solutions in Japan: <strong>Aletyx Intelligent Decisioning</strong> (Enterprise build of Drools) and 
              <strong> Aletyx Intelligent Orchestration</strong> (Enterprise build of Kogito).
            </p>

            <p>
              These solutions are designed to help enterprises modernize IT systems, enhance governance, and accelerate 
              digital transformation by leveraging rule-driven development—an approach that dramatically improves both 
              development efficiency and maintainability.
            </p>

            <h2 className="font-bold text-lg mt-10 mb-3">Meeting the Challenges of Modern Enterprise IT</h2>
            <p>
              Traditional monolithic application development using COBOL or Java is increasingly burdened by legacy 
              system risks, security challenges, and difficulties adapting to rapid business change. On the other hand, 
              RPA and no-code/low-code tools often lack governance, making them unsuitable for mission-critical systems.
            </p>
            <p>
              Indo-Sakura is championing <strong>rule-driven development</strong>—an architecture and methodology built on 
              microservices—as a next-generation standard for enterprise IT in Japan.
            </p>

            <h2 className="font-bold text-lg mt-10 mb-3">About Aletyx</h2>
            <p>
              Aletyx is recognized as a global leader in open-source enterprise software. The company's core developers 
              are behind Drools, the de facto standard open-source rule engine, and Kogito, a next-generation process 
              engine. These technologies are widely adopted in mission-critical systems across Japanese government 
              agencies and major corporations, ensuring long-term stability and scalability.
            </p>
            <p>
              Through this partnership, Indo-Sakura and Aletyx aim to deliver robust IT platforms that withstand 
              constant change, empowering Japanese enterprises with digital agility and resilience.
            </p>

            {/* Product Highlights */}
            <h2 className="font-bold text-lg mt-10 mb-3">Product Highlights</h2>

            <h3 className="font-semibold text-primary mt-4 mb-2">
              Aletyx Intelligent Decisioning (Enterprise Build of Drools)
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>High-performance, Java-based open-source rule engine</li>
              <li>Fully DMN-compliant (Decision Model and Notation)</li>
              <li>MLOps support for safe integration with Generative AI within policy-based guardrails</li>
              <li>Cloud-native and hybrid deployment ready</li>
              <li>Compatible with the Apache KIE ecosystem</li>
              <li>Deterministic, explainable rule execution with enterprise-grade observability</li>
            </ul>

            <h3 className="font-semibold text-primary mt-6 mb-2">
              Aletyx Intelligent Orchestration (Enterprise Build of Kogito)
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Cloud-native workflow engine based on industry-standard BPMN (BPM)</li>
              <li>Simplifies business process management through human-centric orchestration</li>
              <li>Developer-friendly modular structure with tools for Web and VSCode</li>
              <li>Embedded Drools and DMN rule engines</li>
              <li>100% compatibility with Apache KIE open source</li>
              <li>Framework support for building scalable cloud-native applications</li>
            </ul>

            <h2 className="font-bold text-lg mt-10 mb-3">Looking Ahead</h2>
            <p>
              Together, Indo-Sakura and Aletyx will help accelerate Japan’s digital transformation by promoting 
              rule-driven development and AI integration, delivering a sustainable and future-ready foundation for 
              enterprise system development.
            </p>

            <h2 className="font-bold text-lg mt-10 mb-3">Media Contact</h2>
            <p>
              <strong>Indo-Sakura Software Japan K.K.</strong><br />
              Media Relations<br />
              Email: info.japan@indosakura.com<br />
              Web: https://indosakura.com/jp/
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewTemplate1;
