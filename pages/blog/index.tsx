import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import { Button, Separator } from "react95";
import eggplant from "react95/dist/themes/eggplant";
import styled, { ThemeProvider } from "styled-components";
import { Center, Grid, Normal } from "../../components/Layout";
import { HStack, VStack } from "../../components/UI/Stack";
import T from "../../components/UI/Typography";
import Head from "next/head";
import { getSortedPosts, Article } from "../../utils/mdxUtils";
import generateRssFeed from "../../utils/generateRSSFeed";
import React from "react";

const BlogPost = ({
  title,
  abstract,
  slug,
  publishedOn,
  tags,
  views,
}: {
  title: string;
  abstract: string;
  slug: string;
  publishedOn: string;
  tags: string[];
  views: number;
}) => {
  return (
    <VStack as="article" gap={20} pt={32} pb={32}>
      <VStack gap={4}>
        <Link href={`/blog/${slug}`}>
          <T.H2 color="anchor" style={{ textDecoration: "underline" }}>
            {title}
          </T.H2>
        </Link>
        <HStack>
          <T.BodySmall color="materialTextDisabled">
            <span>{publishedOn}</span> • {tags.join(" • ")}{" "}
            {views ? `• ${views}` : ""}
          </T.BodySmall>
        </HStack>
      </VStack>
      <T.Body>{abstract}</T.Body>
    </VStack>
  );
};

const Blog = ({ posts }: { posts: Article[] }) => {
  const { filter } = useRouter().query;
  const router = useRouter();

  const filterTags = filter ? (Array.isArray(filter) ? filter : [filter]) : [];

  const filteredPosts = filterTags.length
    ? posts.filter((post) =>
        post.frontmatter.tags.some((tag) => filterTags.includes(tag))
      )
    : posts;

  const tags = posts.reduce<string[]>((tags, post) => {
    post.frontmatter.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, []);

  const [pageViewsPerSlug, setPageViewsPerSlug] = React.useState(
    {} as Record<string, number>
  );
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await fetch(`/api/blog-page-views`).then((res) =>
          res.json()
        );
        console.log({ data });
        setPageViewsPerSlug(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const articlesWithPageViews = filteredPosts.map((post) => ({
    ...post,
    pageViews: pageViewsPerSlug[post.slug] ?? 0,
  }));

  return (
    <>
      <Head>
        <title>Blog | Artur Bień</title>
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="675" />

        {/* <meta name="description" content={frontMatter.abstract} /> */}
        <meta name="og:title" content={"Blog | Artur Bień"} />
        <meta
          name="og:description"
          content={"Building user interfaces for fun."}
        />
        {/* <meta name="og:image" content={frontMatter.heroImg} /> */}
        {/* <meta name="og:image:alt" content={frontMatter.heroImg} /> */}

        <meta name="twitter:title" content={"Artur Bień"} />
        <meta
          name="twitter:description"
          content={"Building user interfaces for fun."}
        />
        {/* <meta name="twitter:image" content={frontMatter.heroImg} /> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@artur_bien" />
      </Head>
      <Center>
        <Grid>
          <Normal>
            <VStack mt={96} mb={96}>
              <HStack justifyContent={"space-between"} alignItems="baseline">
                <T.H1>Blog</T.H1>
                <T.BodyLarge>
                  {articlesWithPageViews.length} Articles
                </T.BodyLarge>
              </HStack>
              {tags.length && (
                <HStack mt={16} gap={4}>
                  <ThemeProvider theme={eggplant} key={eggplant.name}>
                    <Button
                      variant="raised"
                      active={!filterTags.length}
                      onClick={() => router.push(`/blog`)}
                    >
                      All
                    </Button>
                    {tags.map((tag) => (
                      <Button
                        style={{ flexShrink: 0 }}
                        variant="raised"
                        key={tag}
                        active={filterTags.includes(tag)}
                        onClick={() =>
                          router.push(`/blog?filter=${encodeURIComponent(tag)}`)
                        }
                      >
                        {tag}
                      </Button>
                    ))}
                  </ThemeProvider>
                </HStack>
              )}
              <VStack as="ul" mt={48}>
                {articlesWithPageViews.map((post) => (
                  <li key={post.slug}>
                    <BlogPost
                      slug={post.slug}
                      title={post.frontmatter.title}
                      abstract={post.frontmatter.abstract}
                      publishedOn={post.frontmatter.publishedOn}
                      tags={post.frontmatter.tags}
                      views={post.pageViews}
                    />
                    <Separator />
                  </li>
                ))}
              </VStack>
            </VStack>
          </Normal>
        </Grid>
      </Center>
    </>
  );
};

export default Blog;

export const getStaticProps = async () => {
  await generateRssFeed();
  const posts = getSortedPosts("Article");

  return {
    props: {
      posts,
    },
  };
};

const TagsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;
