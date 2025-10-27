import { MarkdownRenderer } from "@/components/markdown-renderer";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

// export async function generateMetadata({ params }: BlogPostPageProps) {
//   const { id } = await params
//   return {
//     title: `Blog Post - Portfolio`,
//     description: "Blog post",
//   }
// }

const SAMPLE_MARKDOWN = `# Welcome to My Blog

This is a sample blog post demonstrating various markdown features.

## Markdown Features

### Text Formatting
You can use **bold**, *italic*, and ***bold italic*** text.

### Code
Inline code like \`const x = 5\` works great.

\`\`\`javascript
// Code blocks with syntax highlighting
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
- Item 1
- Item 2
- Item 3

1. First
2. Second
3. Third

### Blockquotes
> This is a blockquote. It can span multiple lines and is great for highlighting important information.

### Links and Images
[Visit my portfolio](/)

### Tables
| Feature | Support |
|---------|---------|
| Markdown| ✓       |
| LaTeX   | ✓       |
| Images  | ✓       |
| Videos  | ✓       |

## Mathematical Notation

You can write inline math like $E = mc^2$ or display math:

$$
\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

This is the quadratic formula!

## Japanese Support

このブログは日本語にも対応しています。

日本語のテキストも美しく表示されます。

## Media Support

You can embed images:
\`\`\`
![Alt text](/placeholder.svg?height=400&width=600&query=sample%20image)
\`\`\`

Videos and audio can be embedded using HTML:
\`\`\`html
<video controls width="100%">
  <source src="video.mp4" type="video/mp4">
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
\`\`\`

## Image Support

![This](https://images2.imgbox.com/94/b8/GHXIvk9j_o.jpg)
`;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <article className="font-sans">
        <MarkdownRenderer content={SAMPLE_MARKDOWN} />
      </article>
    </main>
  );
}
