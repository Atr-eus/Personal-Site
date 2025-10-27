"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface BlogSearchProps {
  initialQuery?: string;
}

export function BlogSearch({ initialQuery = "" }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== currentQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (query.trim()) {
          params.set("q", query);
        } else {
          params.delete("q");
        }

        router.replace(`/blog?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
