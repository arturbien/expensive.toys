import RSS from "rss";
import { getSortedPosts } from "./mdxUtils";
import fs from "fs";

export default async function generateRssFeed() {
  const site_url = process.env.SITE_URL || "https://expensive.toys";

  const allArticles = await getSortedPosts("Article");
  const allToys = await getSortedPosts("Toy");

  // TODO: image_url
  const feedOptions = {
    title: "Blog | Artur Bień",
    description: "Cool experiments and articles about React and CSS.",
    language: "en-us",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    // image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Artur Bień`,
  };
  const feed = new RSS(feedOptions);

  // TODO: categody for each post (tags)?
  const author = "Artur Bień";
  const articlesItems = allArticles.map((post) => {
    const url = `${site_url}/blog/${post.slug}`;
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.abstract,
      url,
      guid: url,
      date: post.frontmatter.publishedOn,
      author: "Artur Bień",
    };
  });
  const toysItems = allToys.map((post) => {
    const url = `${site_url}/toys/${post.slug}`;

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.abstract,
      url,
      guid: url,
      date: post.frontmatter.publishedOn,
      author: "Artur Bień",
    };
  });
  const feedItems = [...articlesItems, ...toysItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  feedItems.map((item) => feed.item(item));
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
