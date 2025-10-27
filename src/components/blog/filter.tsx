"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogFilterProps {
  currentLang: string;
}

export function BlogFilter({ currentLang }: BlogFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", value);
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <Select value={currentLang} onValueChange={handleSelect}>
      <SelectTrigger className="w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="jp">日本語</SelectItem>
      </SelectContent>
    </Select>
  );
}
