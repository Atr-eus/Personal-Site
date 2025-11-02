"use client";

import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";
import { extractTextFromCodeBlock } from "@/lib/utils";
import { useState } from "react";

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none dark:prose-invert">
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="max-w-full h-auto rounded-lg my-4"
              alt={props.alt || "Image"}
            />
          ),
          video: ({ node, ...props }) => (
            <video
              {...props}
              className="max-w-full h-auto rounded-lg my-4"
              controls
            />
          ),
          audio: ({ node, ...props }) => (
            <audio {...props} className="w-full my-4" controls />
          ),
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6 mt-8"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-3xl font-bold text-foreground mb-4 mt-6"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-2xl font-bold text-foreground mb-3 mt-4"
            />
          ),
          p: ({ node, ...props }) => (
            <p
              {...props}
              className="text-base leading-relaxed text-foreground mb-4"
            />
          ),
          code: ({ node, className, children, ...props }) => {
            const isInline = !className;
            const [copied, setCopied] = useState(false);

            if (isInline) {
              return (
                <code
                  {...props}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono text-sm"
                >
                  {children}
                </code>
              );
            }

            const codeString = extractTextFromCodeBlock(children).replace(
              /\n$/,
              "",
            );
            const handleCopy = async () => {
              await navigator.clipboard.writeText(codeString);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            };

            return (
              <div className="relative group mb-4">
                <ScrollArea className="w-full rounded-lg">
                  <code
                    {...props}
                    className={`block ${className} bg-secondary text-secondary-foreground p-4 rounded-lg font-mono text-sm whitespace-pre`}
                  >
                    {children}
                  </code>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleCopy}
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            );
          },
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="list-disc list-inside space-y-2 mb-4 text-foreground"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="list-decimal list-inside space-y-2 mb-4 text-foreground"
            />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="text-foreground" />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4"
            />
          ),
          a: ({ node, ...props }) => (
            <a {...props} className="text-primary hover:underline" />
          ),
          table: ({ node, ...props }) => (
            <table
              {...props}
              className="w-full border-collapse border border-border my-4"
            />
          ),
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="border border-border bg-secondary p-2 text-left"
            />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="border border-border p-2" />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
