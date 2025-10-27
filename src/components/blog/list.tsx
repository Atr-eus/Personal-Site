import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface BlogPost {
  id: string;
  title: string;
  titleJp?: string;
  excerpt: string;
  excerptJp?: string;
  date: string;
  readTime: number;
  lang: "en" | "jp";
}

interface BlogListProps {
  lang: "en" | "jp" | "all";
  searchQuery?: string;
}

function getExcerpt(content: string, maxLength = 150) {
  const plain = content.replace(/[#_*~`>]/g, "");
  return plain.length > maxLength ? plain.slice(0, maxLength) + "…" : plain;
}

function estimateReadTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function BlogList({ lang, searchQuery = "" }: BlogListProps) {
  let posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(lang !== "all"
        ? {
          language: {
            code: lang,
          },
        }
        : {}),
    },
    include: {
      language: true,
      tags: { include: { tag: true } },
    },
    orderBy: { created_at: "desc" },
  });

  const mappedPosts: BlogPost[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    titleJp: post.language.code === "ja" ? post.title : undefined,
    excerpt: getExcerpt(post.content_md),
    excerptJp:
      post.language.code === "ja" ? getExcerpt(post.content_md) : undefined,
    date: post.created_at.toISOString(),
    readTime: estimateReadTime(post.content_md),
    lang: post.language.code === "ja" ? "jp" : "en",
  }));

  const filteredPosts = searchQuery
    ? mappedPosts.filter((post) => {
      const q = searchQuery.toLowerCase();
      const titleEn = post.title.toLowerCase();
      const titleJp = (post.titleJp || "").toLowerCase();
      const excerptEn = post.excerpt.toLowerCase();
      const excerptJp = (post.excerptJp || "").toLowerCase();
      return (
        titleEn.includes(q) ||
        titleJp.includes(q) ||
        excerptEn.includes(q) ||
        excerptJp.includes(q)
      );
    })
    : mappedPosts;

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {filteredPosts.map((post) => {
        const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <article
            key={post.id}
            className="border-b border-border pb-8 last:border-b-0"
          >
            <Link href={`/blog/${post.id}`} className="group">
              <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {post.lang === "jp" ? post.titleJp || post.title : post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.lang === "jp"
                ? post.excerptJp || post.excerpt
                : post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>·</span>
              <span>{post.readTime} min read</span>
              <span>·</span>
              <span className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground">
                {post.lang === "jp" ? "日本語" : "English"}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
