"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Playground() {
  const [content, setContent] = React.useState("");

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-start pt-8 px-4 md:px-8 lg:px-16 bg-transparent">
      <div
        className="
          w-full max-w-7xl
          grid gap-6
          grid-cols-1 lg:grid-cols-2
          transition-all
        "
      >
        <Card className="flex flex-col h-full bg-background/80 backdrop-blur border-border/50 shadow-md">
          <CardHeader>
            <CardTitle>Editor</CardTitle>
            <CardDescription>Write here in Markdown</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write in Markdown..."
              rows={20}
              className="flex-1 font-mono text-sm resize-none bg-transparent focus-visible:ring-0 focus-visible:border-border"
              required
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full bg-background/80 backdrop-blur border-border/50 shadow-md">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Your rendered Markdown output</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <MarkdownRenderer content={content} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
