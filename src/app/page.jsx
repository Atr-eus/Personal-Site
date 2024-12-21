import Link from "next/link"
export default function Home() {
  return (
    <>
      <h1 className="font-extrabold">HOME PAGE</h1>
      <Link href="/blog">visit blog</Link>
    </>
  );
}
