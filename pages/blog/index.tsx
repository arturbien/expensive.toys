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

const Post = ({
  title,
  abstract,
  slug,
  publishedOn,
  tags,
}: {
  title: string;
  abstract: string;
  slug: string;
  publishedOn: string;
  tags: string[];
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
            <span>{publishedOn}</span> • {"1,624 views"} • {tags.join(" • ")}
          </T.BodySmall>
        </HStack>
      </VStack>
      <T.Body>{abstract}</T.Body>
    </VStack>
  );
};

const Blog = ({ posts }: { posts: Post[] }) => {
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

  return (
    <>
      <Center>
        <Grid>
          <Normal>
            <VStack mt={96} mb={96}>
              <HStack justifyContent={"space-between"} alignItems="baseline">
                <T.H1>Blog</T.H1>
                <T.BodyLarge>{filteredPosts.length} Articles</T.BodyLarge>
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
                {filteredPosts.map((post) => (
                  <li key={post.slug}>
                    <Post
                      slug={post.slug}
                      title={post.frontmatter.title}
                      abstract={post.frontmatter.abstract}
                      publishedOn={post.frontmatter.publishedOn}
                      tags={post.frontmatter.tags}
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

interface Post {
  frontmatter: {
    title: string;
    heroImg: string;
    tags: string[];
    seoTitle: string;
    abstract: string;
    isPublished: boolean;
    publishedOn: string;
    layout: string;
  };
  body: string;
  slug: string;
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const postsFodler = "./posts";
  const files = fs.readdirSync(postsFodler);

  const posts = files
    .map((file) => {
      const filePath = `${postsFodler}/${file}`;
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
      } as Post;
    })
    .filter((p) => p.frontmatter.isPublished);

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
