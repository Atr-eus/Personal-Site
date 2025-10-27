import { PrismaClient } from "@/generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  const english = await prisma.language.upsert({
    where: { code: "en" },
    update: {},
    create: {
      code: "en",
      name: "English",
    },
  });

  const japanese = await prisma.language.upsert({
    where: { code: "jp" },
    update: {},
    create: {
      code: "jp",
      name: "Japanese",
    },
  });

  const prismaTag = await prisma.tag.upsert({
    where: { name: "Prisma" },
    update: {},
    create: { name: "Prisma" },
  });

  const nextTag = await prisma.tag.upsert({
    where: { name: "Next.js" },
    update: {},
    create: { name: "Next.js" },
  });

  const post1 = await prisma.post.upsert({
    where: { slug: "prisma-nextjs" },
    update: {},
    create: {
      slug: "prisma-nextjs",
      title: "Check out Prisma with Next.js",
      summary: "A short introduction to Prisma with Next.js",
      content_md: "https://www.prisma.io/nextjs",
      published: true,
      language_id: english.id,
    },
  });
  await prisma.postTag.createMany({
    data: [
      { post_id: post1.id, tag_id: prismaTag.id },
      { post_id: post1.id, tag_id: nextTag.id },
    ],
  });

  const post2 = await prisma.post.upsert({
    where: { slug: "follow-prisma-twitter" },
    update: {},
    create: {
      slug: "follow-prisma-twitter",
      title: "Follow Prisma on Twitter",
      content_md: "https://twitter.com/prisma",
      published: true,
      language_id: english.id,
    },
  });
  await prisma.postTag.create({
    data: { post_id: post2.id, tag_id: prismaTag.id },
  });

  const post3 = await prisma.post.upsert({
    where: { slug: "follow-nexus-twitter" },
    update: {},
    create: {
      slug: "follow-nexus-twitter",
      title: "Follow Nexus on Twitter",
      content_md: "https://twitter.com/nexusgql",
      published: true,
      language_id: english.id,
    },
  });

  console.log({ english, japanese, prismaTag, nextTag, post1, post2, post3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
