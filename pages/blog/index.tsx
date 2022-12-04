import React from "react";
import { Button, Separator } from "react95";
import counterStrike from "react95/dist/themes/counterStrike";
import eggPlant from "react95/dist/themes/eggPlant";
import honey from "react95/dist/themes/honey";
import original from "react95/dist/themes/original";
import plum from "react95/dist/themes/plum";
import rose from "react95/dist/themes/rose";
import vaporTeal from "react95/dist/themes/vaporTeal";
import vermillion from "react95/dist/themes/vermillion";
import styled, { ThemeProvider } from "styled-components";
import { Center, Grid } from "../../components/Layout";

const LayoutGrid = styled.div`
  padding-top: 200px;
  grid-column: 2 / span 10;
  width: 100%;
  position: relative;
  display: grid;
  -webkit-box-align: start;
  align-items: start;
  grid-template:
    "newest categories" auto
    "newest popular" 1fr / 2fr 1fr;
  gap: 64px 96px;

  padding-bottom: 164px;

  h1 {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 36px;
    font-family: Arial, Helvetica, sans-serif;
  }
  article + * {
    margin: 24px 0;
  }

  article h2 {
    font-size: 22px;
    font-weight: 600;
  }
  article {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: Arial, Helvetica, sans-serif;
  }
  article mark {
    align-self: flex-start;
  }
  article a {
    color: blue;
    text-decoration: underline;
  }
`;
const Newest = styled.section`
  grid-area: newest / newest / newest / newest;
`;
const TopCategories = styled.section`
  grid-area: categories / categories / categories / categories;
`;
const PopularContent = styled.section`
  grid-area: popular / popular / popular / popular;
`;
const Post = () => {
  return (
    <article>
      <h2>How to make iOS style disappear effect</h2>
      <p>{`No developer blog or technical documentation site is complete without an interactive code playground. The CodeSandbox team recently released a wonderful tool called Sandpack, to help us create these live-updating code editors. In this tutorial, I'll show you how I use it on this blog.`}</p>
      <a>Read more</a>
    </article>
  );
};

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoriesTags = () => {
  return (
    <Tags>
      {[original, vaporTeal, vermillion, rose, counterStrike, honey, plum].map(
        (theme) => (
          <ThemeProvider theme={eggPlant} key={theme.name}>
            <Button variant="raised">{theme.name}</Button>
          </ThemeProvider>
        )
      )}
    </Tags>
  );
};
const Blog = () => {
  return (
    <Center>
      <Grid>
        <LayoutGrid>
          <Newest>
            <h1>Recently published</h1>

            <Post />
            <Separator />
            <Post />
            <Separator />
            <Post />
            <Separator />
          </Newest>
          <TopCategories>
            <h1>Top Categories</h1>
            <CategoriesTags />
          </TopCategories>
          <PopularContent>
            <h1>PopularContent</h1>
          </PopularContent>
        </LayoutGrid>
      </Grid>
    </Center>
  );
};

export default Blog;
