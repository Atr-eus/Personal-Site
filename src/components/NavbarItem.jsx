import Link from "next/link"

export default async function NavbarItem(props) {
  const { link, item } = await props
  return (
    <li className="hover:underline"><Link href={link}>{item}</Link></li>
  )
}
