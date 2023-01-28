import React from "react";
import {
  createDisabledTextStyles,
  createHatchedBackground,
} from "react95/dist/common";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import holo from "../../public/holo.png";
import balenciaga from "../../public/balenciaga.png";
import Image from "next/image";
import { Anchor, Button, GroupBox } from "react95";
import { Center, Grid, Normal } from "../../components/Layout";
const Heading = styled.h1`
  font-size: 40px;
  font-family: arial;
  font-weight: 500;
`;

const SubHeading = styled.h1`
  font-size: 18px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  ${createDisabledTextStyles()}
  margin-top: 8px;
`;

const Paragraph = styled.p`
  font-family: arial;
  font-size: 18px;
  line-height: 1.75;
  margin-bottom: 2em;

  b,
  strong {
    font-weight: bold;
  }
  a {
    color: ${(p) => p.theme.anchor};
    text-decoration: underline;
  }
`;
// const StyledImage = styled(Image)`
//   display: block;
//   object-fit: cover;
//   width: 100%;
//   height: auto;
//   margin: 0;
//   /* border-radius: 8px;
//   border: 2px solid ${(p) => p.theme.borderDarkest}; */
//   /* box-shadow: rgb(0 0 0 / 1%) 0px 1.7px 1.3px, rgb(0 0 0 / 2%) 0px 4.2px 3.1px,
//     rgb(0 0 0 / 2%) 0px 7.9px 5.9px, rgb(0 0 0 / 2%) 0px 14.1px 10.5px,
//     rgb(0 0 0 / 3%) 0px 26.3px 19.6px, rgb(0 0 0 / 4%) 0px 63px 47px; */
// `;

const StyledImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: auto;
  margin: 0;
`;
export const components = {
  h1: Heading,
  p: Paragraph,
  img: StyledImage,
};

export type BlogPostMeta = {
  title: string;
  metaTitle: string;
  heroImage: string;
  heroImageAlt: string;
  date: string;
  tags: string[];
};
const BlogPost = ({
  children,
  meta,
  ...otherProps
}: {
  children: React.ReactNode;
  meta: BlogPostMeta;
}) => {
  console.log({ otherProps });
  return (
    <Center>
      <Article>
        <Grid>
          <Normal>
            {meta.tags.map((tag) => (
              <mark key={tag}>{tag}</mark>
            ))}
            <Button size="lg" style={{ marginBottom: 32 }}>
              <LeftArrowIcon /> Back to posts
            </Button>
            <Heading>{meta.title}</Heading>
            <SubHeading>{meta.date}</SubHeading>
          </Normal>

          <Normal>
            <Card>
              <StyledImage src={meta.heroImage} alt={meta.heroImageAlt} />
            </Card>
          </Normal>

          <Normal>{children}</Normal>
        </Grid>
      </Article>
    </Center>
  );
};

export default BlogPost;

const Article = styled.article`
  padding: 96px 0px;
`;

const LeftArrowIcon = styled.div`
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDElEQVR4Ae3Bi23DMBBEwceDC2NnXnW2V9mFBBLE+dmSLQsJkBn+ugKKBwT3K0k8KrhPDewh2K4GMpM9BNvUQGayl2C9GshM9hSsUwOZyd6C22ogM3mGE9fVQGZyQ7Fe40LjZzWQmfzENufzmbWWZUESQ+PVie/VQGZyTe+dzOQRwVc1kJkcIfioBjKTowTvaiAzOVJwYVkWbHOk4F2TxGSbowQfNUlMtjlC8FWTxGSbZwu+1yQx2eaZGteVJKbeO5/ZZitJDI1XjdtKElPvnUu2kcRGjQuNdUoSU++dN7aRxNC4U7BOk8Rkmz0F6zVJTLbZS7BNk8Rkmz0E2zVJ7CW4T5PEb1BA8e8vewGhBpAxu0zQswAAAABJRU5ErkJggg==);
  background-size: 100%;
`;
const Card = styled.div`
  position: relative;
  margin: 64px 0px;
  background: ${(p) => p.theme.canvas};
  background: #fefbcc;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${(p) => p.theme.borderDarkest};
  box-shadow: 2px 2px 0px ${(p) => p.theme.borderDarkest};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: url("https://github.com/tromero/BayerMatrix/blob/master/images/bayer16.png?raw=true");
    background-size: 25px;
    /* opacity: 0.49; */
    mix-blend-mode: soft-light;
    /* filter: contrast(2); */
  }
`;
