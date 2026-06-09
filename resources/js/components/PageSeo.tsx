// components/PageSeo.tsx
// Place inside <Layout> (or directly inside the page component) to inject
// per-page meta tags via Inertia's <Head>.
//
// Usage (Solutions/Show.tsx):
//   import PageSeo from "@/components/PageSeo";
//   const { pageSeo } = usePage<{ pageSeo: PageSeoProps }>().props;
//   ...
//   <PageSeo {...pageSeo} />

import { Head } from "@inertiajs/react";

export interface PageSeoProps {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image?: string | null;
}

export default function PageSeo({
  meta_title,
  meta_description,
  meta_keywords,
  og_image,
}: PageSeoProps) {
  return (
    <Head>
      {/* Primary meta */}
      {meta_title       && <title>{meta_title}</title>}
      {meta_description && <meta name="description" content={meta_description} />}
      {meta_keywords    && <meta name="keywords" content={meta_keywords} />}

      {/* Open Graph */}
      {meta_title       && <meta property="og:title"       content={meta_title} />}
      {meta_description && <meta property="og:description" content={meta_description} />}
      {og_image         && <meta property="og:image"       content={og_image} />}
      {og_image         && <meta property="og:image:width"  content="1200" />}
      {og_image         && <meta property="og:image:height" content="630" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {meta_title       && <meta name="twitter:title"       content={meta_title} />}
      {meta_description && <meta name="twitter:description" content={meta_description} />}
      {og_image         && <meta name="twitter:image"       content={og_image} />}
    </Head>
  );
}