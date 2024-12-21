import Link from "next/link"

export default async function BlogCard(props) {
  const { blogID, blogTitle, blogDescription, blogDate } = await props
  return (
    <Link href={`/blog/${blogID}`} className="bg-dk rounded-lg p-4 hover:shadow-xs hover:rounded-xl transition">
      <h2 className="text-xl font-bold">{blogTitle}</h2>
      <p>{blogDescription}</p>
      <p>{blogDate}</p>
    </Link>
  )
}
