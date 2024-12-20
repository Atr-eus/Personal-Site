import getBlogPosts from "@/lib/getBlogPosts";
import Link from "next/link"

export default function Blog() {
  const postdata = getBlogPosts()
  console.log(postdata)
  return (
    <>
      <h1>BLOG PAGE</h1>
      <ul>
      {
        postdata.map(post => (
          <li>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
            <p>{post.date}</p>
          </li>
        ))
      }
      </ul>
      <Link href="/">visit home</Link>
    </>
  );
}
