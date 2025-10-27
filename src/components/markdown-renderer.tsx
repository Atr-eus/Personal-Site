"use client";

import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none dark:prose-invert">
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
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
          code: ({ node, inline, ...props }) => {
            if (inline) {
              return (
                <code
                  {...props}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono text-sm"
                />
              );
            }
            return (
              <code
                {...props}
                className="block bg-secondary text-secondary-foreground p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4"
              />
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
