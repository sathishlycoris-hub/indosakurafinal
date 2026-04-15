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
//     "Design, build, and deploy end-to-end AI/ML solutions across NLP, GenAI, and Computer Vision domains.",
//     "Work with both proprietary LLMs (GPT, Claude, Gemini) and open-source models (LLaMA, Mistral, BERT, Gemma).",
//     "Architect and optimize Retrieval-Augmented Generation (RAG) pipelines using LangChain, LangGraph, CrewAI, and LlamaIndex.",
//     "Develop AI agents, chatbot systems, and automation workflows for real-world applications.",
//     "Implement semantic search and retrieval systems using vector databases like FAISS, Milvus, Qdrant, Weaviate, pgvector, and ChromaDB.",
//     "Apply prompt engineering, few-shot learning, and fine-tuning techniques to maximize LLM performance.",
//     "Build and deploy computer vision pipelines using YOLO and OpenCV for object detection and tracking.",
//     "Develop scalable APIs and backend services using FastAPI or Flask for AI model integration.",
//     "Perform EDA, data preprocessing, feature engineering, and maintain model interpretability.",
//     "Deploy, monitor, and optimize ML models in AWS, Azure, or GCP environments.",
//     "Collaborate with cross-functional teams to build rapid POCs and validate AI-driven solutions.",
//     "Maintain clean, reproducible, and version-controlled ML workflows.",
//   ];

//   const requirements = [
//     "Bachelor’s or Master’s degree in Computer Science, Data Science, AI/ML, or related field.",
//     "2+ years of hands-on experience in AI/ML engineering or data science roles.",
//     "Strong proficiency in Python and experience with FastAPI or Flask.",
//     "Hands-on expertise in Large Language Models, Transformers, and Generative AI methods.",
//     "Experience with frameworks such as LangChain, LangGraph, LlamaIndex, CrewAI, and HuggingFace.",
//     "Solid understanding of RAG pipelines, embeddings, and semantic retrieval strategies.",
//     "Experience with vector databases like FAISS, Qdrant, Milvus, Weaviate, or ChromaDB.",
//     "Hands-on experience with YOLO, OpenCV, or other CV pipelines.",
//     "Knowledge of model training, fine-tuning, quantization, and deployment processes.",
//     "Cloud experience with AWS, Azure, or Google Cloud Platform.",
//     "Knowledge of SQL/NoSQL databases such as PostgreSQL, SQLite, MySQL, or MongoDB.",
//     "Experience with visualization tools such as Plotly, Matplotlib, Seaborn, or Streamlit.",
//   ];

//   const preferredQualifications = [
//     "Open-source contributions or active GitHub portfolio.",
//     "Experience with multimodal LLMs and advanced transformer architectures.",
//     "Strong statistical background or academic research in AI/ML.",
//     "Experience with rapid POC development and startup-style experimentation.",
//     "Familiarity with Docker or containerized ML deployments.",
//     "Understanding of distributed systems or scalable ML architecture design.",
//   ];

//   const whatWeOffer = [
//     "Competitive compensation package aligned with skills and experience.",
//     "Opportunity to work with cutting-edge AI, GenAI, and agent-based technologies.",
//     "Continuous learning support, certifications, and professional development programs.",
//     "Flexible working arrangements and a collaborative work culture.",
//     "Exposure to international clients and real-world AI applications.",
//     "Access to modern tools, cloud infrastructure, and advanced compute resources.",
//     "A supportive, innovation-driven environment encouraging experimentation and creativity.",
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
//           <p className="text-sm text-primary-foreground/80 mb-2">AI & Data</p>
//           <h1 className="text-3xl lg:text-4xl font-bold mb-4">
//             Data Scientist / AI-ML Engineer (AI Agents & Machine Learning)
//           </h1>
//           <div className="flex flex-wrap gap-4 text-sm">
//             <span className="flex items-center gap-1">
//               <MapPin className="w-4 h-4" /> Bangalore, India
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" /> Full-time
//             </span>
//             <span className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" /> 2+ Years (Immediate)
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
//                   We are looking for a highly skilled Data Scientist / AI-ML Engineer
//                   with deep hands-on experience in building intelligent AI systems.
//                   You will work across the full AI lifecycle—research, design,
//                   experimentation, development, deployment, and optimization.
//                   This role involves building advanced GenAI solutions, RAG pipelines,
//                   AI agents, and ML-driven applications that solve real-world problems
//                   at scale.
//                 </p>
//               </div>

//               {/* Key Responsibilities */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Key Responsibilities</h2>
//                 <ul className="space-y-2">
//                   {responsibilities.map((item, index) => (
//                     <li
//                       key={index}
//                       className="flex items-start gap-3"
//                     >
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
//                     <li
//                       key={index}
//                       className="flex items-start gap-3"
//                     >
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
//                     <li
//                       key={index}
//                       className="flex items-start gap-3"
//                     >
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
//                     <li
//                       key={index}
//                       className="flex items-start gap-3"
//                     >
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
