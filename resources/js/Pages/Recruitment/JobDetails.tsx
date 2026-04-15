import Layout from "@/components/layout/Layout";
import { getLangValue } from "@/utils/lang";
import { usePage } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import JobApplicationForm from "@/components/job/JobApplicationForm";
import Recruitmenthead from "@/components/layout/Recruitmenthead";


interface JobSection {
  section_type: "responsibilities" | "requirements" | "preferred" | "offer";
  content?: string;
  content_ja?: string;
}

interface Job {
  id: number;

  title?: string;
  title_ja?: string;

  department?: string;
  department_ja?: string;

  location?: string;
  location_ja?: string;

  employment_type?: string;
  employment_type_ja?: string;

  experience?: string;
  experience_ja?: string;

  salary?: string;
  salary_ja?: string;

  short_description?: string;
  short_description_ja?: string;

  sections: JobSection[];
  slug: string;
}
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
  delay: 80,
});

export default function JobDetail({ job }: { job: Job }) {
  const getSection = (type: JobSection["section_type"]) =>
    job.sections.filter((s) => s.section_type === type);
  // const { jobs } = usePage<{ jobs: Job[] }>().props;
  const { jobs, lang } = usePage<{ jobs: Job[]; lang: "en" | "ja" }>().props;

  return (


    <Layout>
      <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
        <Recruitmenthead
          jobs={jobs}
          currentSlug={job.slug}
        />
      </div>
      {/* Job Header */}
      <section className="hero-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-4 lg:px-8" data-aos="fade-right">
          <p className="text-sm mb-2">
            {getLangValue(lang, job.department, job.department_ja)}
          </p>

          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {getLangValue(lang, job.title, job.title_ja)}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm">
            <span>
              {getLangValue(lang, job.location, job.location_ja)}
            </span>
            <span>
              {getLangValue(lang, job.employment_type, job.employment_type_ja)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {getLangValue(lang, job.experience, job.experience_ja)}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {getLangValue(lang, job.salary, job.salary_ja)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {getLangValue(lang, "About the Role", "仕事内容")}
                </h2>

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: getLangValue(
                      lang,
                      job.short_description,
                      job.short_description_ja
                    ),
                  }}
                />
              </div>

              {/* Sections */}
              {[
                [
                  "responsibilities",
                  getLangValue(lang, "Key Responsibilities", "主な業務内容"),
                ],
                [
                  "requirements",
                  getLangValue(lang, "Requirements", "応募条件"),
                ],
                [
                  "preferred",
                  getLangValue(lang, "Preferred Qualifications", "歓迎条件"),
                ],
                [
                  "offer",
                  getLangValue(lang, "What We Offer", "待遇・福利厚生"),
                ],
              ].map(([type, title]) => {
                const items = getSection(
                  type as JobSection["section_type"]
                );
                if (!items.length) return null;

                return (
                  <div key={type}>
                    <h2 className="text-xl font-semibold mb-4">
                      {title}
                    </h2>
                    <ul className="space-y-2">
                      {items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-muted-foreground">
                            {getLangValue(lang, item.content, item.content_ja)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-1">
              <JobApplicationForm jobId={job.id} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
