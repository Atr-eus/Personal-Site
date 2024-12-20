import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogDir = path.join(process.cwd(), "src/blogs")

export default function getBlogPosts() {
  console.log("from post func")
  const filenames = fs.readdirSync(blogDir)
  const postdata = filenames.map(filename => {
    const id = filename.replace(/\.md$/, "")

    const fullpath = path.join(blogDir, filename)
    const filecontent = fs.readFileSync(fullpath, "utf8")

    const { content, data } = matter(filecontent)

    return {
      id,
      content,
      ...data
    }
  })
  return postdata.sort((a, b) => a.date < b.date ? 1 : -1)
}
