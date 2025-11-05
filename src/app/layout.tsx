import { Navigation } from "@/components/nav";
import "./globals.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased dark">
        <BackgroundLines>
          <ScrollArea className="h-screen w-full">
            <Navigation />
            {children}
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </BackgroundLines>
      </body>
    </html>
  );
}
