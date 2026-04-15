import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Solutionhead from "@/components/layout/Solutionhead";
import { ArrowLeft, ArrowRight, Sparkles, Zap, BarChart, Brain, MessageSquare, Shield, Briefcase, Factory, Package, ShoppingCart, Laptop } from "lucide-react";
import { Link } from "@inertiajs/react";
import ContactCTA from "@/components/layout/Contact";

const SourceBytesAI = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Document Recognition",
      subtitle: "Smarter Processing",
      description: "Integrate with 100+ data sources including APIs, SQL, NoSQL databases, cloud storage, and legacy systems.",
      color: "pink",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Automation",
      subtitle: "Transform Workflow",
      description: "AI-driven data discovery and automated workflow orchestration with 99%+ accuracy.",
      color: "pink",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Actionable Insights",
      subtitle: "Real-time Analytics",
      description: "Real-time analytics and actionable insights to improve business outcomes and efficiencies.",
      color: "pink",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Intelligent Extraction",
      subtitle: "Analyze Patterns",
      description: "Unlock hidden patterns, forecast business trends, and maps with AI-powered advanced AI.",
      color: "pink",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Chatbots",
      subtitle: "Enhanced Support",
      description: "Create custom AI chatbots for enhanced customer support and employee assistance.",
      color: "pink",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      subtitle: "Complete Safe",
      description: "Offer robust security with advanced encryption, SOC2 compliance, and block chain integration.",
      color: "pink",
    },
  ];

  const useCases = [
    { title: "Banking & Finance", subtitle: "Financial Services", description: "Automate loan processing, enable analytics, and ensure AML compliance using highly scalable AI-backed processing systems." },
    { title: "Healthcare", subtitle: "Medical & Clinical", description: "Simplify patient record handling, streamline data-driven insights processes for better care delivery." },
    { title: "Insurance", subtitle: "Policy & Claims", description: "Accelerate claim processing, improve underwriting and risk engineering with intelligent AI operations." },
    { title: "Legal Services", subtitle: "Contract Management", description: "Resolve complex contract review, improve negotiations management, and drive operational efficiency." },
    { title: "Education", subtitle: "Academic Management", description: "Digitize student data entry, automate grading tasks, and provide better learning experience." },
    { title: "Research & Development", subtitle: "Data Analysis", description: "Automate research, manage IP data for scientific studies, and accelerate discoveries with AI models." },
  ];

  const industries = [
    { icon: <Briefcase className="w-6 h-6" />, name: "Construction", subtitle: "Strategic Partnership" },
    { icon: <Factory className="w-6 h-6" />, name: "Manufacturing", subtitle: "Production Efficiency" },
    { icon: <Package className="w-6 h-6" />, name: "Logistics", subtitle: "Supply Chain" },
    { icon: <ShoppingCart className="w-6 h-6" />, name: "Retail", subtitle: "Business Analytics" },
    { icon: <Laptop className="w-6 h-6" />, name: "Technology", subtitle: "IT Services" },
  ];

  const caseStudies = [
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Automated Extraction: Makes Core Operations Smoother and More Efficient",
      description: "High scalability development design and improved improvements led to operational advancements.",
      resultLabel: "INSUR: USA Life & Health Co. Agent",
      result: "Some tasks that were previously automated manually have been automated, significantly boosting productivity and streamlining tasks while enhancing processing times by 50%.",
    },
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Integrated Multiple Core Systems with AI to Optimize Business Processes",
      description: "Complete digital transformation across enterprise operations.",
      resultLabel: "Major Manufacturing Corporation",
      result: "Successfully reduced data processing time by 57% and increased detection rate by over 90%, leading to greater test savings and improved accuracy rates of 40 percent or so.",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      pink: { bg: "bg-pink-50", text: "text-pink-500" },
      blue: { bg: "bg-blue-50", text: "text-blue-500" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <Layout>
      {/* Solution Header Tabs */}
      <Solutionhead />

      {/* Back Link */}
      {/* <div className="bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <Link to="/solutions" className="inline-flex items-center text-primary text-sm hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Solutions
          </Link>
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-background bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-foreground">
                SourceBytes.AI
              </h1>
              <p className="text-lg text-primary mb-4">
                Unified GenAI Platform Powering Enterprise Intelligence
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                SourceBytes.AI is a powerful Enterprise Knowledge Discovery Platform built to help organizations manage and access their data more efficiently. It connects to multiple sources like URLs, APIs, S3, Google Drive, and FTP, allowing you to centralize knowledge from across your enterprise. With advanced AI capabilities, SourceBytes.AI enables intelligent document processing, data extraction, and real-time analytics, empowering businesses to make informed decisions and drive innovation.
              </p>
              <Button asChild size="lg">
                <a
                  href="https://sourcebytes.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white text-sm font-medium"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>

            </div>

            {/* RIGHT IMAGE (replaces mockup) */}
            <div className="relative flex justify-center">
              <img
                src="/image/sourcebyte.jpg"   // <-- update your actual file path
                alt="SourceBytes.AI Dashboard"
                className="w-full max-w-lg rounded-2xl shadow-xl border border-border object-contain"
              />
            </div>

          </div>
        </div>
      </section>


      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Key Features Of SourceBytes.AI</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color);
              return (
                <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h2 className={`font-bold text-lg text-primary ${colorClasses.text}`}>{feature.title}</h2>
                  <p className=" text-muted-foreground mb-2">{feature.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Header */}
          <h2 className="text-2xl font-bold text-center mb-2">Use Cases</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Indo-Sakura's SourceBytes.AI solutions are tailored to meet the unique needs of
            businesses across various industries.
          </p>

          {/* Modern Card Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-foreground mb-1">
                  {useCase.title}
                </h3>
                <p className="text-primary mb-2">{useCase.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Industry We Serve */}
      {/* Industry We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-2">Industry We Serve</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Various professional services to suit every industry
          </p>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">

            {industries.map((industry, index) => (
              <div
                key={index}
                className="w-full max-w-[220px] bg-gradient-to-br from-pink-50/60 to-white 
          rounded-2xl py-10 px-6 text-center shadow-sm hover:shadow-lg transition-all"
              >

                {/* Icon bubble */}
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-3xl">{industry.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-1">
                  {industry.name}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-muted-foreground">
                  {industry.subtitle}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* Case Studies */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="section-divider mb-8">
            <h2 className="text-2xl font-semibold">Case Studies</h2>
          </div>

          <div className="space-y-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card">
                <span className={`inline-block px-3 py-1 rounded text-sm font-medium mb-4 ${study.tagColor === 'pink' ? 'bg-pink-100 text-pink-600' : 'bg-green-100 text-green-600'}`}>
                  {study.tag}
                </span>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{study.title}</h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <p className={`text-lg font-medium mb-2 ${study.tagColor === 'pink' ? 'text-pink-600' : 'text-green-600'}`}>
                  {study.resultLabel}
                </p>
                <p className="text-muted-foreground mb-4">{study.result}</p>
                {/* <Link href="/casestudies/1" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactCTA />
    </Layout>
  );
};

export default SourceBytesAI;
