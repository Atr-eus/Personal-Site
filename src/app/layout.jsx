import Navbar from "@/components/Navbar"
import "@/styles/globals.css"

export const metadata = {
  title: "Personal Site",
  description: "Anindya's personal site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white/75 bg-[#1e2229]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
