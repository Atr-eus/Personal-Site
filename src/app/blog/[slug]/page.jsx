import getBlogPosts from "@/lib/getBlogPosts";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import { notFound } from "next/navigation";

const mdi = new MarkdownIt()

async function fetchBlog(slug) {
  const blogs = getBlogPosts()
  return blogs.find(post => post.id == slug)
}

export default async function Home({ params }) {
  const blog = await fetchBlog((await params).slug.replace(/%20/g, " "))
  if (!blog) return notFound

  const blogHTML = mdi.render(blog.content)

  return (
    <>
      <h1>BLOG: {blog?.id}</h1>
      <article>
        <h2>{blog.title}</h2>
        <p>{blog.date}</p>
        <div dangerouslySetInnerHTML={{ __html: blogHTML }} />
      </article>
      <Link href="/blog">go back to blog</Link>
    </>
  );
}
