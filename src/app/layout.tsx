import { Navigation } from "@/components/nav";
import "./globals.css";
import Starfield from "@/components/space-bg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased dark">
        <Starfield />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
