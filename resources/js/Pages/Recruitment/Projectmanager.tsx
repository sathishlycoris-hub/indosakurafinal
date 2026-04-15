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
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     confirmEmail: "",
// //     phone: "",
// //     coverLetter: "",
// //     agreeTerms: false,
// //   });

//   const responsibilities = [
//     "Lead planning, execution, and progress management of large-scale IT and AI projects in Japan, India, and Dubai.",
//     "Collaborate closely with multinational engineering teams and external partners to drive results and mitigate risks.",
//     "Facilitate communication between global stakeholders, ensuring transparency, timely reporting, and smooth coordination.",
//     "Support overseas expansion initiatives and contribute to business growth strategies.",
//     "Manage client relationships with major Japanese companies such as Panasonic, Hitachi, Rakuten, and Recruit.",
//     "Conduct monthly travel to India and Dubai for on-site coordination and project oversight.",
//     "Leverage AI tools and digital frameworks to optimize workflow efficiency and project success.",
//     "Ensure projects align with company vision, quality standards, and operational goals.",
//   ];

//   const requirements = [
//     "No prior project management or IT/AI industry experience required — AI tools will be utilized to support workflow.",
//     "Strong interest in business development, sales, consulting, or global project roles.",
//     "Motivation to work on 0→1 business-building initiatives and support new venture creation.",
//     "High interest in leading teams, driving execution, and achieving measurable results.",
//     "Strong communication skills in Japanese and English (mandatory).",
//     "Ability to collaborate effectively within multicultural teams spanning India, Japan, and Dubai.",
//     "Willingness to travel internationally (India and Dubai approximately once a month).",
//   ];

//   const preferredQualifications = [
//     "Experience or interest in global business strategy or cross-cultural management.",
//     "Understanding of project workflows, task prioritization, and process improvement.",
//     "Interest in AI-driven tools and modern project management systems.",
//     "Ability to work in a fast-paced, multinational work environment.",
//     "Strong leadership mindset and problem-solving orientation.",
//   ];

//   const whatWeOffer = [
//     "Annual salary range: ¥5,000,000 – ¥8,000,000 (with monthly pay between ¥416,666 – ¥666,666).",
//     "Preferential compensation based on skills, performance, and contribution.",
//     "Opportunity to work directly with top Japanese enterprises and global clients.",
//     "A unique role bridging India and Japan, contributing to the solution of Japan’s IT talent shortage.",
//     "Professional growth through exposure to international business development and large enterprise projects.",
//     "Work alongside talented Indian engineers in their 20s and 30s and experienced Japanese project leaders.",
//     "Annual performance evaluation directly by the company President.",
//     "120 holidays per year, including weekends and national holidays.",
//     "Standard work hours: 9:00 AM – 6:00 PM (1-hour break), ~10 hours overtime/month.",
//     "Work from Tokyo headquarters with monthly travel opportunities to India and Dubai.",
//     "Chance to shape the future of Japan-originated global business expansion.",
//   ];

// //   const handleInputChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value, type } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]:
// //         type === "checkbox"
// //           ? (e.target as HTMLInputElement).checked
// //           : value,
// //     }));
// //   };

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
//             Global Project Management
//           </p>
//           <h1 className="text-3xl lg:text-4xl font-bold mb-4">
//             Global Project Manager (PM) Candidate
//           </h1>
//           <div className="flex flex-wrap gap-4 text-sm">
//             <span className="flex items-center gap-1">
//               <MapPin className="w-4 h-4" /> Tokyo, Japan
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" /> Full-time
//             </span>
//             <span className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" /> Start Date: October 2025
//             </span>
//             <span className="flex items-center gap-1">
//               <DollarSign className="w-4 h-4" /> ¥5M – ¥8M / year
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
//                   As a Global Project Manager, you will help drive Japan-originated
//                   business initiatives across India and Dubai. Working closely with
//                   multicultural engineering teams, you will oversee strategic IT and AI
//                   projects, ensuring timely delivery, client satisfaction, and effective
//                   risk management. This role is ideal for individuals passionate about
//                   global collaboration, leadership, and contributing to Japan’s rapidly
//                   evolving technology landscape.
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
//              <JobApplicationForm />

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Questions CTA */}
    
//     </Layout>
//   );
// };

// export default JobDetail;
