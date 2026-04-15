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
//     "Implement, configure, and support SAP modules such as MM, PP, SD, FI, and ABAP based on business requirements.",
//     "Collaborate with cross-functional teams to analyze business processes and translate them into SAP solutions.",
//     "Perform gap analysis, requirement gathering, solution design, and documentation.",
//     "Troubleshoot SAP-related issues and provide timely resolutions to stakeholders.",
//     "Work closely with clients and project managers to ensure successful SAP deployment and upgrades.",
//     "Coordinate with technical and functional teams for system testing, integration testing, and user training.",
//     "Prepare project documentation including functional specs, test scripts, and user manuals.",
//     "Support client meetings, status reviews, and discussions during different stages of the project lifecycle.",
//   ];

//   const requirements = [
//     "2 to 7 years of hands-on experience working with SAP modules: MM, PP, SD, FI, or ABAP.",
//     "Strong understanding of SAP configuration, workflows, process integration, and troubleshooting.",
//     "Ability to analyze client requirements and convert them into actionable SAP solutions.",
//     "Strong communication skills for interacting with clients, managers, and technical teams.",
//     "Experience participating in technical, managerial, and HR interview rounds is an added advantage.",
//     "Japanese + English bilingual ability is preferred but not mandatory.",
//   ];

//   const preferredQualifications = [
//     "Experience working in offshore delivery environments.",
//     "Knowledge of SAP best practices and implementation methodologies.",
//     "Ability to work independently and manage multiple tasks.",
//     "Willingness to travel to Japan occasionally for project assignments.",
//     "Experience collaborating with multicultural and multilingual teams.",
//   ];

//   const whatWeOffer = [
//     "Opportunity to work across multiple SAP domains including MM, PP, SD, FI, and ABAP.",
//     "Career growth through challenging projects and client-facing opportunities.",
//     "Supportive offshore work environment with exposure to Japanese clients.",
//     "Chance to participate in international travel (Japan) for project coordination.",
//     "Structured interview process with clear evaluation in technical, managerial, and HR rounds.",
//     "Competitive compensation based on experience and skills.",
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
//           <p className="text-sm text-primary-foreground/80 mb-2">SAP Consulting</p>
//           <h1 className="text-3xl lg:text-4xl font-bold mb-4">
//             SAP Consultants (MM, PP, SD, FI, ABAP)
//           </h1>
//           <div className="flex flex-wrap gap-4 text-sm">
//             <span className="flex items-center gap-1">
//               <MapPin className="w-4 h-4" /> Bangalore, India (Offshore)
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" /> Full-time
//             </span>
//             <span className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" /> 2 – 7 Years Experience
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
//                   We are hiring SAP Consultants across modules including MM, PP,
//                   SD, FI, and ABAP. The ideal candidates should have strong SAP 
//                   implementation and support experience along with excellent 
//                   communication skills. Both bilingual (Japanese + English) and 
//                   non-bilingual consultants are welcome to apply. Consultants may 
//                   be required to travel to Japan occasionally based on project needs.
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

//                 <h3 className="text-md font-semibold mt-6 mb-2">Interview Process</h3>
//                 <ul className="space-y-1 text-muted-foreground">
//                   <li>• Technical Round</li>
//                   <li>• Client Managerial Round</li>
//                   <li>• HR Round</li>
//                 </ul>

//                 <p className="text-muted-foreground mt-2">
//                   Interviews will be held on <strong>December 5th from 9 AM onward.</strong>
//                 </p>
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
//                 <p className="text-muted-foreground mt-4">
//                   Consultants may be required to travel to Japan occasionally as part of project delivery.
//                 </p>
//               </div>
//             </div>

//             {/* Application Form */}
//             <div className="lg:col-span-1">
//                <JobApplicationForm />
//             </div>

//           </div>
//         </div>
//       </section>


//     </Layout>
//   );
// };

// export default JobDetail;
