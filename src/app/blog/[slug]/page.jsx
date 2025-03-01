import getBlogPosts from "@/lib/getBlogPosts";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import { notFound } from "next/navigation";

const mdi = new MarkdownIt({
  highlight: (code, lang) => {
    console.log(lang);
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(code, { language: lang }).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${mdi.utils.escapeHtml(code)}</code></pre>`;
  },
});

async function fetchBlog(slug) {
  const blogs = getBlogPosts();
  return blogs.find((post) => post.id == slug);
}

export default async function Home({ params }) {
  const blog = await fetchBlog((await params).slug.replace(/%20/g, " "));
  if (!blog) return notFound;

  const blogHTML = mdi.render(blog.content);

  return (
    <div className="bg-dk mt-24 mb-8 mx-8 p-8">
      <h1 className="font-extrabold text-5xl mb-4">{blog.title}</h1>
      <p className="italic text-lg mb-4 opacity-80">"{blog.description}"</p>
      <p className="mb-8 underline opacity-70">{blog.date}</p>
      <div
        className="prose prose-invert prose-pre:bg-lt"
        dangerouslySetInnerHTML={{ __html: blogHTML }}
      />
    </div>
  );
}
