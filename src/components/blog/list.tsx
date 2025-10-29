import Link from "next/link";
import { prisma } from "@/lib/prisma";

type BlogListProps = {
  lang: string;
  searchQuery?: string;
};

export async function BlogList({ lang, searchQuery = "" }: BlogListProps) {
  let posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      language: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (lang !== "all") {
    posts = posts.filter((post) => post.language.code === lang);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    posts = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const summaryMatch = post.summary?.toLowerCase().includes(query) || false;
      const contentMatch = post.content_md.toLowerCase().includes(query);
      return titleMatch || summaryMatch || contentMatch;
    });
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => {
        const formattedDate = new Date(post.created_at).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        );

        const wordCount = post.content_md.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        return (
          <article
            key={post.id}
            className="border-b border-border pb-8 last:border-b-0"
          >
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.summary || post.content_md.substring(0, 150) + "..."}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <time dateTime={post.created_at.toISOString()}>
                {formattedDate}
              </time>
              <span>·</span>
              <span>{readTime} min read</span>
              <span>·</span>
              <span className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground">
                {post.language.name}
              </span>
              {post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((postTag) => (
                      <span
                        key={postTag.tag.id}
                        className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                      >
                        {postTag.tag.name}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
