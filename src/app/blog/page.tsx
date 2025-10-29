import { Suspense } from "react";
import { BlogList } from "@/components/blog/list";
import { BlogSearch } from "@/components/blog/search";
import { BlogFilter } from "@/components/blog/filter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my blog posts in English and Japanese.",
};

type BlogPageProps = {
  searchParams: Promise<{ q?: string; lang?: "all" | "en" | "jp" }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q, lang = "all" } = await searchParams;

  if (!["all", "en", "jp"].includes(lang)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Invalid language filter</p>
      </div>
    );
  }

  const title = "Blog";
  const subtitle = "Articles and thoughts";

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
        <div className="flex-1">
          <BlogSearch initialQuery={q} />
        </div>
        <BlogFilter currentLang={lang} />
      </div>

      <Suspense
        fallback={<div className="text-muted-foreground">Loading...</div>}
      >
        <BlogList lang={lang} searchQuery={q} />
      </Suspense>
    </main>
  );
}
