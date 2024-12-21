import BlogCard from "@/components/BlogCard";
import getBlogPosts from "@/lib/getBlogPosts";
import Link from "next/link"

export default function Blog() {
  const postdata = getBlogPosts()
  console.log(postdata)
  return (
    <>
      <h1>BLOG PAGE</h1>
      <div className="flex flex-col gap-2 m-4">
        {
          postdata.map((post, i) => (
            <BlogCard blogID={post.id} blogTitle={post.title} blogDate={post.date} blogDescription={post.description} key={i} />
          ))
        }
      </div>
      <Link href="/">visit home</Link>
    </>
  );
}
