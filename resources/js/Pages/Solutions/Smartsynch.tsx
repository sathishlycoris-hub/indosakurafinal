import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Solutionhead from "@/components/layout/Solutionhead";
import { ArrowLeft, ArrowRight, Sparkles, Zap, BarChart, Brain, MessageSquare, Shield, Briefcase, Factory, Package, ShoppingCart, Laptop } from "lucide-react";
import { Link } from "@inertiajs/react";
import ContactCTA from "@/components/layout/Contact";

const SmartSyncAI = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Unified Data Sync",
      subtitle: "Cross-Platform Integration",
      description: "Connect ERP, CRM, HRMS, databases, and cloud apps with seamless real-time data flow.",
      color: "pink",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Conflict Resolution",
      subtitle: "Smart Data Accuracy",
      description: "Automatically detect duplicates and mismatches with intelligent AI-driven data validation.",
      color: "pink",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Workflow Synchronization",
      subtitle: "Event-Driven Actions",
      description: "Trigger automated workflows instantly based on business events across connected systems.",
      color: "pink",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Multi-System Orchestration",
      subtitle: "End-to-End Visibility",
      description: "Manage enterprise-wide integrations through a unified orchestration dashboard.",
      color: "pink",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Scalable Integration",
      subtitle: "Enterprise Load Ready",
      description: "Sync millions of records effortlessly with high scalability and performance optimization.",
      color: "pink",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Data Transfer",
      subtitle: "Encrypted Sync",
      description: "Protect all synchronization pipelines with end-to-end encryption and strict security protocols.",
      color: "pink",
    },
  ];

  const useCases = [
    { title: "ERP ↔ CRM Sync", subtitle: "Business Operations", description: "Ensure customer, product, and transaction data stay consistently updated across systems." },
    { title: "Inventory Sync", subtitle: "Logistics & Supply Chain", description: "Maintain real-time stock updates across warehouses, retail outlets, and vendors." },
    { title: "Cloud Migration Sync", subtitle: "Hybrid Architecture", description: "Keep legacy and new systems synchronized throughout cloud adoption cycles." },
    { title: "HR Data Alignment", subtitle: "HR & Payroll", description: "Synchronize employee records, attendance, and payroll information automatically." },
    { title: "Finance Data Sync", subtitle: "Accounting Systems", description: "Ensure real-time financial updates and avoid manual reconciliation errors." },
    { title: "Retail Omni-Channel Sync", subtitle: "E-Commerce", description: "Align product catalogs, orders, and pricing rules across multiple channels." },
  ];

  const industries = [
    { icon: <Briefcase className="w-6 h-6" />, name: "Retail", subtitle: "Omni-Channel Sync" },
    { icon: <Factory className="w-6 h-6" />, name: "Manufacturing", subtitle: "Production Data" },
    { icon: <Package className="w-6 h-6" />, name: "Logistics", subtitle: "Supply Chain" },
    { icon: <ShoppingCart className="w-6 h-6" />, name: "E-Commerce", subtitle: "Unified Catalog" },
    { icon: <Laptop className="w-6 h-6" />, name: "Technology", subtitle: "System Integration" },
  ];

  const caseStudies = [
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Real-Time Sync Reduced Data Errors by 80%",
      description: "A global retailer unified 8 platforms with zero manual reconciliation.",
      resultLabel: "Large Retail Chain",
      result: "Achieved 80% reduction in data duplication and 60% improvement in operational efficiency.",
    },
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Manufacturing Operations Improved Through Live Inventory Sync",
      description: "Integrated production and supply systems with SmartSyncAI.",
      resultLabel: "Automotive Parts Manufacturer",
      result: "Better inventory accuracy and 40% faster production scheduling were achieved.",
    },
  ];

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
      <section className="py-12 lg:py-20 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">SmartSync.AI</h1>
              <p className="text-lg text-primary font-medium mb-4">Real-Time Data Synchronization Across Your Enterprise</p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                SmartSync.AI seamlessly connects enterprise systems, eliminating data silos and ensuring real-time accuracy across applications,
                databases, and cloud environments with automated AI-driven conflict resolution.
              </p>
             <Button asChild size="lg">
                <a
                  href="https://smartsync-ai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white text-sm font-medium"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="relative flex justify-center">
              <img
                src="/image/smartsynch.jpg"
                alt="SmartSync.AI Dashboard"
                className="w-full max-w-lg rounded-2xl shadow-xl border border-border object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Key Features Of SmartSync.AI</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4`}>{feature.icon}</div>
                <h3 className={`font-semibold text-base text-pink-500`}>{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{feature.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Use Cases</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            SmartSync.AI adapts to any enterprise environment, supporting seamless synchronization across diverse business operations.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-primary mb-2">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Industry We Serve</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12">SmartSync.AI supports multiple industries with adaptable integrations.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
            {industries.map((industry, index) => (
              <div key={index} className="w-full max-w-[220px] bg-gradient-to-br from-pink-50/60 to-white rounded-2xl py-10 px-6 text-center shadow-sm hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4 text-primary text-3xl">
                  {industry.icon}
                </div>
                <h3 className="font-semibold text-sm">{industry.name}</h3>
                <p className="text-xs text-muted-foreground">{industry.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8 space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
          {caseStudies.map((study, index) => (
            <div key={index} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card">
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded text-sm font-medium mb-4">{study.tag}</span>
              <h3 className="text-lg font-semibold mb-2">{study.title}</h3>
              <p className="text-muted-foreground mb-4">{study.description}</p>
              <p className="text-sm font-medium text-pink-600 mb-2">{study.resultLabel}</p>
              <p className="text-sm text-muted-foreground mb-4">{study.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
     <ContactCTA />
    </Layout>
  );
};

export default SmartSyncAI;
