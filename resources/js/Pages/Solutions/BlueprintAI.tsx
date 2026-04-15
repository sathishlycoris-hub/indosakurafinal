import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Solutionhead from "@/components/layout/Solutionhead";
import ContactCTA from "@/components/layout/Contact";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart,
  Brain,
  MessageSquare,
  Briefcase,
  Laptop,
  Shield,
  FileText,
  FolderGit2,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "@inertiajs/react";

const BlueprintEditorAI = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI Document Understanding",
      subtitle: "Smarter Analysis",
      description:
        "Automatically read, classify, and analyze documents using AI-powered OCR, entity extraction, and document intelligence.",
      color: "pink",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Workflow Automation",
      subtitle: "Streamline Operations",
      description:
        "Automate approvals, routing, version control, and document lifecycle processes with customizable rule-based workflows.",
      color: "pink",
    },
    {
      icon: <FolderGit2 className="w-6 h-6" />,
      title: "Version & Revision Control",
      subtitle: "Document Accuracy",
      description:
        "Maintain complete revision history, compare versions instantly, and eliminate human error with automated change tracking.",
      color: "pink",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Compliance & Audit",
      subtitle: "Policy Enforcement",
      description:
        "Ensure regulatory compliance with automated document tagging, audit trails, policy enforcement, and secure retention rules.",
      color: "pink",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Collaborative Editing",
      subtitle: "Real-Time Workspaces",
      description:
        "Enable real-time comments, annotations, and collaborative editing across teams, departments, and global workforces.",
      color: "pink",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      subtitle: "Full Protection",
      description:
        "Protect sensitive documents using encryption, access control, SOC2-aligned security, and secure cloud environments.",
      color: "pink",
    },
  ];

  const useCases = [
    {
      title: "Corporate Operations",
      subtitle: "Document Compliance",
      description:
        "Automate document approvals, manage SOPs, enforce policies, and maintain complete compliance with organizational standards.",
    },
    {
      title: "Human Resources",
      subtitle: "Employee Documentation",
      description:
        "Digitize onboarding paperwork, streamline contract management, and maintain secure employee document archives.",
    },
    {
      title: "Legal Department",
      subtitle: "Contract Review",
      description:
        "Use AI to accelerate contract review, monitor obligations, extract key clauses, and maintain controlled version histories.",
    },
    {
      title: "Finance",
      subtitle: "Audit & Reporting",
      description:
        "Automate invoice processing, expense approvals, and audit documentation with full traceability and accuracy.",
    },
    {
      title: "Procurement",
      subtitle: "Vendor Documentation",
      description:
        "Standardize procurement workflows, track compliance certificates, and manage vendor document submissions effortlessly.",
    },
    {
      title: "Quality Management",
      subtitle: "SOP & Policy Control",
      description:
        "Centralize SOPs, automate distribution, manage deviations, and ensure teams follow up-to-date controlled documents.",
    },
  ];

  const industries = [
    { icon: <FileText className="w-6 h-6" />, name: "Corporate", subtitle: "Enterprise Operations" },
    { icon: <ClipboardCheck className="w-6 h-6" />, name: "Compliance", subtitle: "Policy & Audits" },
    { icon: <Briefcase className="w-6 h-6" />, name: "Legal", subtitle: "Contracts & Governance" },
    { icon: <Shield className="w-6 h-6" />, name: "Finance", subtitle: "Risk & Control" },
    { icon: <Laptop className="w-6 h-6" />, name: "Technology", subtitle: "Secure Workflows" },
  ];

  const caseStudies = [
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "AI-Driven Document Control Eliminates Manual Errors and Improves Compliance",
      description:
        "A global enterprise streamlined its internal document lifecycle using BlueprintEditor.AI.",
      resultLabel: "Enterprise Operations Division",
      result:
        "Reduced document processing time by 60% and improved compliance adherence by over 45% with automated approval workflows.",
    },
    {
      tag: "Case Study",
      tagColor: "pink",
      title: "Automated Revision Tracking Enhances Accuracy for Enterprise Contract Teams",
      description:
        "Legal teams achieved seamless contract versioning and automated clause extraction.",
      resultLabel: "International Legal Firm",
      result:
        "Achieved 70% faster contract review cycles and eliminated document mix-ups with AI version intelligence.",
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
      
      {/* Back Navigation */}
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-foreground">
                BlueprintEditor.AI
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                AI-Powered Document Workflow & Compliance Automation
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                BlueprintEditor.AI helps organizations centralize, govern, and automate business-critical
                documents with intelligent processing, workflow automation, and full compliance support.
                From contract management to policy enforcement, BlueprintEditor.AI ensures accuracy,
                efficiency, and enterprise-wide document intelligence.
              </p>
               <Button asChild size="lg">
                <a
                  href="https://blueprinteditor.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white text-sm font-medium"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            {/* Right-Side Image */}
            <div className="relative flex justify-center">
              <img
                src="/image/blueprint.jpg"
                alt="BlueprintEditor Dashboard"
                className="w-full max-w-lg rounded-2xl shadow-xl border border-border object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Key Features of BlueprintEditor.AI</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color);
              return (
                <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className={`font-semibold text-base ${colorClasses.text}`}>{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{feature.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Use Cases</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            See how BlueprintEditor.AI empowers enterprise teams with seamless and intelligent document workflows.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">{useCase.title}</h3>
                <p className="text-sm text-primary mb-2">{useCase.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Industry We Serve</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12">
            Enterprise-grade AI workflows built for multiple industries
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="w-full max-w-[220px] bg-gradient-to-br from-pink-50/60 to-white rounded-2xl py-10 px-6 text-center shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-3xl">{industry.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{industry.name}</h3>
                <p className="text-xs text-muted-foreground">{industry.subtitle}</p>
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
                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-medium mb-4 ${
                    study.tagColor === "pink" ? "bg-pink-100 text-pink-600" : "bg-green-100 text-green-600"
                  }`}
                >
                  {study.tag}
                </span>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{study.title}</h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <p
                  className={`text-sm font-medium mb-2 ${
                    study.tagColor === "pink" ? "text-pink-600" : "text-green-600"
                  }`}
                >
                  {study.resultLabel}
                </p>
                <p className="text-sm text-muted-foreground mb-4">{study.result}</p>
                <Link href="#" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
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

export default BlueprintEditorAI;
