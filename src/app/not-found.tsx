import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="relative">
            <div className="w-64 h-64 mx-auto mb-8 relative">
              <Image
                src="/404.jpg"
                alt="Lost character illustration"
                className="w-full h-full object-contain"
                height={400}
                width={400}
                loading="eager"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-black text-foreground tracking-tight">
              404
            </h1>
            <h2 className="text-3xl font-bold text-foreground text-balance">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
          </div>

          <div className="grid grid-cols-1 max-w-md mx-auto">
            <Button asChild className="h-12">
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Or try these pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/blog"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Still can&apos;t find what you&apos;re looking for?{" "}
            <Link
              target="_blank"
              href="https://github.com/Atr-eus/Personal-Site/issues"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Report this issue
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
