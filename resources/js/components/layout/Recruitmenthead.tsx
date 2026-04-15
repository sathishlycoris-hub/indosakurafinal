import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export interface Job {
  id: number;
  slug: string;
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
  about_role?: string;
  about_role_ja?: string;
}

interface RecruitmentheadProps {
  jobs?: Job[];
  currentSlug?: string;
}

const Recruitmenthead = ({ jobs = [], currentSlug }: RecruitmentheadProps) => {
  const [showAll, setShowAll] = useState(false);
  const { lang } = usePage<{ lang: "en" | "ja" }>().props;

  // Jobs already arrive in sort_order from the backend — no reversing needed
  const orderedJobs = jobs;

  const visibleJobs = showAll ? orderedJobs : orderedJobs.slice(0, 5);
  const remainingCount = orderedJobs.length - 5;

  return (
    <div className="bg-muted/50 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1 py-3">

          {/* Recruitment TOP */}
          <Link
            href="/recruitment"
            className={`px-3 py-2 text-sm font-medium ${
              !currentSlug
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Recruitment TOP
          </Link>

          {orderedJobs.length > 0 && (
            <span className="mx-1 text-muted-foreground/50">/</span>
          )}

          {/* Job Tabs */}
          {visibleJobs.map((job, index) => {
            const isActive = currentSlug === job.slug;

            return (
              <div key={job.slug} className="flex items-center">
                <Link
                  href={`/recruitment/${job.slug}`}
                  className={`px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {lang === "ja"
                    ? job.title_ja ?? job.title ?? ""
                    : job.title ?? job.title_ja ?? ""}
                </Link>

                {index < visibleJobs.length - 1 && (
                  <span className="mx-1 text-muted-foreground/50">/</span>
                )}
              </div>
            );
          })}

          {/* Show More */}
          {!showAll && remainingCount > 0 && (
            <div className="flex items-center">
              <span className="mx-1 text-muted-foreground/50">/</span>
              <button
                onClick={() => setShowAll(true)}
                className="px-3 py-2 text-sm font-medium text-primary hover:underline"
              >
                +{remainingCount} More
              </button>
            </div>
          )}

        </nav>
      </div>
    </div>
  );
};

export default Recruitmenthead;