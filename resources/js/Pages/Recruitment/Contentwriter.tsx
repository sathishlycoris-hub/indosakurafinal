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
//     "Write and edit clear, engaging, and accurate technical content such as product documentation, user guides, manuals, FAQs, and API references.",
//     "Produce high-quality blogs, articles, whitepapers, and case studies explaining complex technical concepts in simple terms.",
//     "Develop compelling marketing content for websites, newsletters, email campaigns, and social media platforms.",
//     "Collaborate closely with engineering, product, marketing, and design teams to gather information and ensure accuracy.",
//     "Ensure all written materials follow branding, tone, and style guidelines across platforms.",
//     "Apply SEO best practices to improve content visibility and ranking.",
//     "Research industry trends, competitor content, and emerging technologies to create informative and relevant content.",
//     "Review and proofread content to maintain clarity, consistency, and grammatical accuracy.",
//   ];

//   const requirements = [
//     "Bachelor’s degree in English, Communications, Journalism, Computer Science, or a related field.",
//     "1–2 years of proven experience as a technical writer or content writer in the IT/software domain.",
//     "Excellent English writing, editing, and proofreading skills.",
//     "Ability to translate technical information into easily understandable content for different audience levels.",
//     "Basic understanding of SEO principles, keyword research, and on-page optimization.",
//     "Familiarity with content management systems such as WordPress.",
//     "Knowledge of design tools (Canva, Figma, or similar) will be an added advantage.",
//     "Strong attention to detail with the ability to manage multiple projects simultaneously.",
//   ];

//   const preferredQualifications = [
//     "Experience writing for SaaS, AI, or software development companies.",
//     "Understanding of software development lifecycle and technical terminology.",
//     "Basic knowledge of HTML, Markdown, or documentation tools.",
//     "Experience creating visual content such as infographics or diagrams.",
//     "Ability to conduct interviews with subject matter experts (SMEs).",
//   ];

//   const whatWeOffer = [
//     "Competitive salary with performance-based growth opportunities.",
//     "A collaborative and creative work environment with supportive team members.",
//     "Opportunity to work closely with engineering, AI, and product teams.",
//     "Access to training programs and upskilling resources.",
//     "Work-from-office setup promoting teamwork, discipline, and learning.",
//     "Exposure to global clients and multinational projects.",
//     "Modern office facilities and a dynamic, growth-focused culture.",
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
//             Content & Communication
//           </p>
//           <h1 className="text-3xl lg:text-4xl font-bold mb-4">
//             Technical Content Writer
//           </h1>
//           <div className="flex flex-wrap gap-4 text-sm">
//             <span className="flex items-center gap-1">
//               <MapPin className="w-4 h-4" /> Bangalore, India
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" /> Full-time (Work from Office)
//             </span>
//             <span className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" /> 2+ Years
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
//                   We are looking for a talented Technical Content Writer with strong writing 
//                   and communication skills to create high-quality documentation and marketing content. 
//                   You will translate complex technical concepts into simple, engaging, and accurate content 
//                   for diverse audiences, helping bridge the gap between product teams and end users.
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
             
//                <JobApplicationForm />
            
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Questions CTA */}
    

      
//     </Layout>
//   );
// };

// export default JobDetail;
