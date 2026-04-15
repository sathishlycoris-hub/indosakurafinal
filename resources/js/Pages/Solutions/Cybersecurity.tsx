import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Solutionhead from "@/components/layout/Solutionhead";
import ContactCTA from "@/components/layout/Contact";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Lock,
  Globe,
  Eye,
  Server,
  AlertTriangle,
  Briefcase,
  Factory,
  Package,
  ShoppingCart,
  Laptop,
} from "lucide-react";
import { Link } from "@inertiajs/react";

const Cybersecurity = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Threat Detection",
      subtitle: "AI-Powered Monitoring",
      description:
        "Continuously detect suspicious activity using behavioral AI and anomaly pattern recognition.",
      color: "pink",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Zero-Trust Security",
      subtitle: "Identity & Access Control",
      description:
        "Restrict access to sensitive resources with strict identity verification and device authentication.",
      color: "pink",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Cloud Protection",
      subtitle: "Secure Cloud Operations",
      description:
        "Protect cloud infrastructures across AWS, Azure, and GCP with real-time scanning and alerts.",
      color: "pink",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Vulnerability Assessment",
      subtitle: "Proactive Scanning",
      description:
        "Detect system weaknesses early through periodic scans, dashboards, and prioritized risk scoring.",
      color: "pink",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Data Encryption",
      subtitle: "Secure Storage",
      description:
        "Ensure total data security with enterprise-grade encryption for both in-transit and at-rest data.",
      color: "pink",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Incident Response",
      subtitle: "Rapid Mitigation",
      description:
        "Resolve threats quickly with automated alerts, guided playbooks, and AI-assisted root-cause analysis.",
      color: "pink",
    },
  ];

  const useCases = [
    {
      title: "Financial Security",
      subtitle: "Banking & Finance",
      description:
        "Prevent fraud, ensure secure transactions, and maintain compliance with advanced threat monitoring.",
    },
    {
      title: "Healthcare Compliance",
      subtitle: "Clinical Data Safety",
      description:
        "Protect sensitive patient data and enforce HIPAA-level security for hospitals & medical systems.",
    },
    {
      title: "Insurance Security",
      subtitle: "Policy & Claims Protection",
      description:
        "Secure claim processing workflows and protect customer data from unauthorized access or breaches.",
    },
    {
      title: "Corporate Governance",
      subtitle: "Enterprise Security",
      description:
        "Secure internal workflows, employee systems, networks, and endpoints across large enterprises.",
    },
    {
      title: "Education Protection",
      subtitle: "Academic & Admin",
      description:
        "Safeguard student data, assessments, and digital infrastructures for universities and schools.",
    },
    {
      title: "Government Systems",
      subtitle: "Secure Administration",
      description:
        "Protect confidential operations and ensure integrity across mission-critical government applications.",
    },
  ];

  const industries = [
    { icon: <Briefcase className="w-6 h-6" />, name: "Finance", subtitle: "Fraud Prevention" },
    { icon: <Factory className="w-6 h-6" />, name: "Manufacturing", subtitle: "Systems Security" },
    { icon: <Package className="w-6 h-6" />, name: "Logistics", subtitle: "Network Protection" },
    { icon: <ShoppingCart className="w-6 h-6" />, name: "Retail", subtitle: "Secure Payments" },
    { icon: <Laptop className="w-6 h-6" />, name: "Technology", subtitle: "Cyber Defense" },
  ];

  const caseStudies = [
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "AI-Based Threat Detection Reduced Data Breaches by 90%",
      description:
        "A financial institution adopted AI threat analytics to secure high-volume transactions.",
      resultLabel: "Leading Banking Corporation",
      result:
        "Cyber attacks dropped by 90% and incident response time improved from hours to minutes.",
    },
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Healthcare Platform Achieved HIPAA-Ready Security",
      description: "Encrypted patient management workflows with automated compliance tracking.",
      resultLabel: "Major Medical Network",
      result:
        "Ensured 100% compliance readiness and strengthened patient data privacy across all locations.",
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
            {/* Left */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">Cybersecurity Solutions</h1>
              <p className="text-lg text-primary font-medium mb-4">
                Enterprise-Grade Protection for Your Digital Infrastructure
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our Cybersecurity Solutions help organizations defend against advanced cyber threats,
                secure critical data, and maintain compliance across cloud, on-premise, and hybrid systems.
              </p>
              <Button asChild size="lg">
                <a
                  href="https://www.ibm.com/think/topics/cybersecurity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white text-sm font-medium"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center">
              <img
                src="/image/cybersecurity.jpg"
                alt="Cybersecurity Dashboard"
                className="w-full max-w-lg rounded-2xl shadow-xl border border-border object-contain"
              />    
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Key Features of Cybersecurity</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-base text-pink-500">{feature.title}</h3>
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
            Our Cybersecurity Suite is built to meet the evolving security needs of every industry.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition">
                <h3 className="font-semibold mb-1">{useCase.title}</h3>
                <p className="text-sm text-primary mb-2">{useCase.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
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
            Designed for industries where data protection is mission-critical.
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
            <div key={index} className="border border-border rounded-lg p-6 hover:shadow-lg transition bg-card">
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded text-sm font-medium mb-4">
                {study.tag}
              </span>

              <h3 className="text-lg font-semibold mb-2">{study.title}</h3>

              <p className="text-muted-foreground mb-4">{study.description}</p>

              <p className="text-sm font-medium text-pink-600 mb-2">{study.resultLabel}</p>

              <p className="text-sm text-muted-foreground mb-4">{study.result}</p>
            </div>
          ))}
        </div>
      </section>

    
       <ContactCTA />
    </Layout>
  );
};

export default Cybersecurity;
