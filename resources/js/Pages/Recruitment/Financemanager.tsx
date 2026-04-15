// import Layout from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import JobApplicationForm from "@/components/job/JobApplicationForm";
// import Recruitmenthead from "@/components/layout/Recruitmenthead";
// import ContactRecruit from "@/components/layout/ContactRecruitment";
// import {
//   ArrowLeft,
//   ArrowRight,
//   MapPin,
//   Clock,
//   Calendar,
//   DollarSign,
//   CheckCircle,
//   Upload,
// } from "lucide-react";

// import { useState } from "react";

// const JobDetail = () => {
//   // const [formData, setFormData] = useState({
//   //   fullName: "",
//   //   email: "",
//   //   confirmEmail: "",
//   //   phone: "",
//   //   coverLetter: "",
//   //   agreeTerms: false,
//   // });

//   const responsibilities = [
//     "Oversee day-to-day financial operations, including accounting, bookkeeping, and compliance activities.",
//     "Prepare and analyze financial statements, MIS reports, budgets, and forecasts to support business planning.",
//     "Manage accounts payable, accounts receivable, reconciliations, and month-end/year-end closing processes.",
//     "Ensure compliance with Indian accounting standards, taxation rules, and international reporting requirements.",
//     "Monitor cash flow, financial performance, and cost structures to ensure organizational stability.",
//     "Collaborate with internal teams and external auditors for statutory audits, tax filings, and regulatory submissions.",
//     "Implement and improve financial controls, processes, and policies to enhance operational efficiency.",
//     "Support management with financial insights, risk analysis, and strategic decision-making.",
//   ];

//   const requirements = [
//     "Bachelor’s degree in Finance, Accounting, Commerce, or related field (CA Inter / MBA Finance preferred).",
//     "1–3 years of professional experience in finance, accounting, or audit roles.",
//     "Strong knowledge of accounting principles, financial reporting, GST, TDS, and compliance processes.",
//     "Proficiency in accounting software such as Tally, Zoho Books, or QuickBooks.",
//     "Ability to analyze financial data and present insights clearly to management.",
//     "Strong understanding of budgeting, forecasting, and cost control.",
//     "Excellent communication skills and high attention to detail.",
//     "Ability to manage multiple tasks and meet deadlines in a fast-paced environment.",
//   ];

//   const preferredQualifications = [
//     "Experience working in IT, software, or multinational company environments.",
//     "Knowledge of international accounting standards or cross-border finance operations.",
//     "Experience implementing financial automation tools or ERP systems.",
//     "Strong analytical mindset and experience supporting strategic planning.",
//     "Ability to work independently and lead improvements in finance workflows.",
//   ];

//   const whatWeOffer = [
//     "Competitive salary based on experience and industry standards.",
//     "Opportunity to work in a fast-growing IT company with global reach.",
//     "Professional growth through exposure to financial planning, audits, and cross-border operations.",
//     "Collaborative work environment with supportive leadership.",
//     "Modern office space in Bangalore with structured working processes.",
//     "Opportunity to contribute directly to organizational financial strategy and success.",
//   ];

//   // const handleInputChange = (
//   //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   // ) => {
//   //   const { name, value, type } = e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]:
//   //       type === "checkbox"
//   //         ? (e.target as HTMLInputElement).checked
//   //         : value,
//   //   }));
//   // };

//   return (
//     <Layout>
//       <Recruitmenthead />
//       {/* Back Link */}
//       {/* <div className="bg-background border-b border-border">
//         <div className="container mx-auto px-4 lg:px-8 py-3">
//           <Link
//             to="/recruitment"
//             className="inline-flex items-center text-primary text-sm hover:underline"
//           >
//             <ArrowLeft className="w-4 h-4 mr-1" /> Back to All Positions
//           </Link>
//         </div>
//       </div> */}

//       {/* Job Header */}
//       <section className="hero-gradient text-primary-foreground py-12">
//         <div className="container mx-auto px-4 lg:px-8">
//           <p className="text-sm text-primary-foreground/80 mb-2">
//             Finance & Accounts
//           </p>
//           <h1 className="text-3xl lg:text-4xl font-bold mb-4">
//             Finance & Accounts Manager
//           </h1>
//           <div className="flex flex-wrap gap-4 text-sm">
//             <span className="flex items-center gap-1">
//               <MapPin className="w-4 h-4" /> Bangalore, India
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" /> Full-time
//             </span>
//             <span className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" /> 1–3 Years Experience
//             </span>
//             <span className="flex items-center gap-1">
//               <DollarSign className="w-4 h-4" /> Competitive
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-3 gap-12">
//             {/* Job Description */}
//             <div className="lg:col-span-2 space-y-12">
//               {/* About the Role */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">About the Role</h2>
//                 <p className="text-muted-foreground">
//                   We are seeking an experienced Finance & Accounts Manager to join
//                   our Bangalore team. In this role, you will oversee financial operations,
//                   ensure compliance with regulatory standards, and provide insights to
//                   support business decisions. You will work closely with leadership to
//                   optimize financial processes, maintain accurate reporting, and contribute
//                   to the organization’s long-term financial stability and growth.
//                 </p>
//               </div>

//               {/* Key Responsibilities */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Key Responsibilities</h2>
//                 <ul className="space-y-2">
//                   {responsibilities.map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
//                       <span className="text-muted-foreground">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Requirements */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Requirements</h2>
//                 <ul className="space-y-2">
//                   {requirements.map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
//                       <span className="text-muted-foreground">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Preferred Qualifications */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Preferred Qualifications</h2>
//                 <ul className="space-y-2">
//                   {preferredQualifications.map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <span className="text-muted-foreground">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* What We Offer */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
//                 <ul className="space-y-2">
//                   {whatWeOffer.map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <span className="text-muted-foreground">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Application Form */}
//             <div className="lg:col-span-1">

//               <JobApplicationForm />

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Questions CTA */}
      
//     </Layout>
//   );
// };

// export default JobDetail;
