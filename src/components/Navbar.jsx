import NavbarItem from "./NavbarItem"

export default function Navbar() {
  return (
    <div className="flex flex-row">
      <div className="w-[50vw]"></div>
      <ul className="flex flex-row justify-around items-center w-[50vw] h-10 border border-red-400">
        <NavbarItem link="/" item="Home" />
        <NavbarItem link="/work" item="Work" />
        <NavbarItem link="/blog" item="Blog" />
        <NavbarItem link="/contact" item="Contact" />
      </ul>
    </div>
  )
}
