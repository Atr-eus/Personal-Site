import Navbar from "@/components/Navbar"
import "@/styles/globals.css"

export const metadata = {
  title: "Personal Site",
  description: "Anindya's personal site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white/75 bg-lt">
        <Navbar />
        <div className="mt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
