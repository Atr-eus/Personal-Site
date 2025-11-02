import { Navigation } from "@/components/nav";
import "./globals.css";
import Starfield from "@/components/space-bg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased dark">
        <ScrollArea className="h-screen w-full">
          <Starfield />
          <Navigation />
          {children}
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </body>
    </html>
  );
}
