import { prisma } from "@/lib/prisma";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import Loading from "@/components/loading";

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: BlogPostPageProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: id },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Blog`,
    description: post.summary || post.content_md.substring(0, 150),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: id },
    include: {
      language: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = post.content_md.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <Suspense fallback={<Loading />}>
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap mb-4">
            <time dateTime={post.created_at.toISOString()}>
              {formattedDate}
            </time>
            <span>·</span>
            <span>{readTime} min read</span>
            <span>·</span>
            <span className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground">
              {post.language.name}
            </span>
          </div>

          {post.summary && (
            <p className="text-lg text-muted-foreground italic">
              {post.summary}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {post.tags.map((postTag) => (
                <span
                  key={postTag.tag.id}
                  className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {postTag.tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="font-sans prose prose-sm dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content_md} />
        </article>
      </main>
    </Suspense>
  );
}
