import fs from "fs";
import matter from "gray-matter";
import path from "path";

type PostBase = {
  title: string;
  heroImg: string;
  heroImgAlt: string;
  tags: string[];
  seoTitle: string;
  abstract: string;
  isPublished: boolean;
  publishedOn: string;
};
export type Article = {
  frontmatter: PostBase & {
    layout: "Article";
  };
  body: string;
  slug: string;
};
export type Toy = {
  frontmatter: PostBase & {
    layout: "Toy";
  };
  body: string;
  slug: string;
};

export const POSTS_PATH = path.join(process.cwd(), "posts");
// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const TOYS_PATH = path.join(process.cwd(), "toys");
// postFilePaths is the list of all mdx files inside the TOYS_PATH directory
export const toysFilePaths = fs
  .readdirSync(TOYS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export function getSortedPosts<T extends "Article" | "Toy">(variant: T) {
  const postsFolder = variant === "Article" ? "./posts" : "./toys";
  const files = fs.readdirSync(postsFolder);

  const posts = files
    .map((file) => {
      const filePath = `${postsFolder}/${file}`;
      const { name: fileName } = path.parse(filePath);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data, content: body } = matter(content);

      return {
        frontmatter: {
          ...data,
          publishedOn: new Date(data.publishedOn).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
        body,
        slug: fileName,
      } as T extends "Article" ? Article : Toy;
    })
    .filter((p) => p.frontmatter.isPublished)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedOn).getTime() -
        new Date(a.frontmatter.publishedOn).getTime()
    );
  return posts;
}
