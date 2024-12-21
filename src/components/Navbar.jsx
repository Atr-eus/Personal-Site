import NavbarItem from "./NavbarItem"

export default function Navbar() {
  return (
    <ul className="bg-dk flex flex-row justify-around items-center w-[100%] px-[30vw] h-16 fixed top-0 left-0 z-50">
      <NavbarItem link="/" item="Home" />
      <NavbarItem link="/work" item="Work" />
      <NavbarItem link="/blog" item="Blog" />
      <NavbarItem link="/contact" item="Contact" />
    </ul>
  )
}
