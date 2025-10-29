import { prisma } from "@/lib/prisma";
import { CreatePostForm } from "@/components/blog/create";

export default async function CreatePostPage() {
  const languages = await prisma.language.findMany();

  if (languages.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No languages available</h1>
          <p className="text-muted-foreground">
            Please set up languages first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Create Post
        </h1>
        <p className="text-lg text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <CreatePostForm languages={languages} />
    </main>
  );
}
