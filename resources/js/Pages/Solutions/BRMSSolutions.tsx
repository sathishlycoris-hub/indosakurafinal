import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Solutionhead from "@/components/layout/Solutionhead";
import ContactCTA from "@/components/layout/Contact";
import {
  ArrowLeft,
  ArrowRight,
  Settings,
  Layers,
  Database,
  FileCheck,
  Gauge,
  Workflow,
  Briefcase,
  Factory,
  Package,
  ShoppingCart,
  Laptop,
} from "lucide-react";


const BRMSSolutions = () => {
  const features = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Centralized Rule Engine",
      subtitle: "Unified Rule Governance",
      description:
        "Manage all your business rules from a single centralized dashboard, ensuring consistency and reducing manual errors.",
      color: "pink",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Rule Versioning",
      subtitle: "Track Every Change",
      description:
        "Maintain full control over rule updates with historical tracking, rollback options, and audit visibility.",
      color: "pink",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Decision Automation",
      subtitle: "Smart Decision Flows",
      description:
        "Automate complex decision logic with flow-based rule execution and high scalability for enterprise workloads.",
      color: "pink",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Compliance Enforcement",
      subtitle: "Policy Adherence",
      description:
        "Ensure policies, regulations, and industry standards are always reflected in your rule sets with automated compliance.",
      color: "pink",
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "High Performance Engine",
      subtitle: "Real-time Processing",
      description:
        "Execute rule sets in milliseconds with optimized logic execution — ideal for finance, insurance, and retail operations.",
      color: "pink",
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Visual Rule Modeling",
      subtitle: "Drag & Drop UI",
      description:
        "Simplify rule creation with graphical tools that require zero coding experience for business users.",
      color: "pink",
    },
  ];

  const useCases = [
    {
      title: "Underwriting Automation",
      subtitle: "Insurance",
      description:
        "Automate risk assessment, premium calculation, and policy approvals with rule-driven decision flows.",
    },
    {
      title: "Loan Eligibility Rules",
      subtitle: "Banking",
      description:
        "Streamline loan approvals with automated business rules that evaluate customer profiles instantly.",
    },
    {
      title: "Retail Pricing Engine",
      subtitle: "E-commerce",
      description:
        "Manage discounts, dynamic pricing, and promotions without modifying core system code.",
    },
    {
      title: "Manufacturing QA Rules",
      subtitle: "Production",
      description:
        "Automate quality checks, safety compliance, and production decision-making workflows.",
    },
    {
      title: "Healthcare Policy Checks",
      subtitle: "Clinical",
      description:
        "Ensure compliance with medical guidelines, billing rules, and patient management protocols.",
    },
    {
      title: "Logistics & Routing Logic",
      subtitle: "Supply Chain",
      description:
        "Define automated routing decisions, shipment prioritization, and SLA-based rule execution.",
    },
  ];

  const industries = [
    { icon: <Briefcase className="w-6 h-6" />, name: "Finance", subtitle: "Risk Scoring" },
    { icon: <Factory className="w-6 h-6" />, name: "Manufacturing", subtitle: "Operational Rules" },
    { icon: <Package className="w-6 h-6" />, name: "Logistics", subtitle: "Routing Logic" },
    { icon: <ShoppingCart className="w-6 h-6" />, name: "Retail", subtitle: "Pricing Rules" },
    { icon: <Laptop className="w-6 h-6" />, name: "Technology", subtitle: "Workflow Rules" },
  ];

  const caseStudies = [
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Automated Rule Engine Reduced Manual Workload by 70%",
      description:
        "A major insurance company deployed BRMS to automate underwriting and policy processing.",
      resultLabel: "Insurance Enterprise – USA",
      result:
        "Decision-making time reduced from hours to seconds, improving accuracy and customer satisfaction.",
    },
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Retail Pricing Optimization Increased Sales by 22%",
      description:
        "Dynamic pricing rules allowed the company to adjust prices automatically based on demand and market trends.",
      resultLabel: "Global Retail Chain",
      result:
        "Rule automation boosted sales conversions by 22% and reduced pricing errors across 300+ stores.",
    },
  ];

  return (
    <Layout>
      {/* Solution Header Tabs */}
      <Solutionhead />

      {/* Back Link */}
      {/* <div className="bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <Link
            to="/solutions"
            className="inline-flex items-center text-primary text-sm hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Solutions
          </Link>
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">BRMS Solutions</h1>
              <p className="text-lg text-primary font-medium mb-4">
                Centralize, Automate & Optimize Business Rules
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Indo-Sakura’s BRMS simplifies how enterprises manage and automate decision-making.
                By separating business logic from core applications, organizations gain faster
                rule updates, greater accuracy, and enterprise-wide consistency — all without
                modifying code.
              </p>
             <Button asChild size="lg">
                <a
                  href="https://www.ibm.com/think/topics/business-rules-management-system"
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
                src="/image/brmssolution.jpg"
                alt="BRMS Dashboard"
                className="w-full max-w-lg rounded-2xl shadow-xl border border-border object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Key Features of BRMS</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-base text-pink-500">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{feature.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
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
            Indo-Sakura’s BRMS adapts to industries requiring fast, accurate rule execution.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-1">{useCase.title}</h3>
                <p className="text-sm text-primary mb-2">{useCase.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
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
          <p className="text-center text-muted-foreground mb-12">
            Designed for industries where rules drive high-volume operations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="w-full max-w-[220px] bg-gradient-to-br from-pink-50/60 to-white 
                rounded-2xl py-10 px-6 text-center shadow-sm hover:shadow-lg transition-all"
              >
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
            <div
              key={index}
              className="border border-border rounded-lg p-6 hover:shadow-lg transition bg-card"
            >
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded text-sm font-medium mb-4">
                {study.tag}
              </span>

              <h3 className="text-lg font-semibold mb-2">{study.title}</h3>

              <p className="text-muted-foreground mb-4">{study.description}</p>

              <p className="text-sm font-medium text-pink-600 mb-2">
                {study.resultLabel}
              </p>

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

export default BRMSSolutions;
