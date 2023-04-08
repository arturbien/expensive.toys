import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { Anchor, Button, GroupBox, Frame, Separator } from "react95";
import {
  createDisabledTextStyles,
  createHatchedBackground,
} from "react95/dist/common";
import styled from "styled-components";
import CTAButton from "../../components/UI/CTAButton";
import DisabledIconsDemo from "../../components/DisabledIconsDemo";
import { Center, Grid, Normal } from "../../components/Layout";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import Image from "next/image";
import T from "../../components/UI/Typography";
import Code from "../../components/UI/Code";
import CssHeatMaps from "../../components/CssHeatMaps";
import SVGFilterHeatMaps from "../../components/SVGFilterHeatMaps";
import Typography from "../../components/UI/Typography";
import FancyRevealEffects from "../../components/FancyRevealEffects";
import RGBSplitDemo from "../../components/RGBSplitDemo";

const Card = styled.div`
  position: relative;
  margin: 64px 0px;
  background: ${(p) => p.theme.canvas};
  background: #fefbcc;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${(p) => p.theme.borderDarkest};
  box-shadow: 2px 2px 0px ${(p) => p.theme.borderDarkest};
`;
const Img = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: auto;
  margin: 0;
`;

const h1 = styled(T.H1)`
  margin-top: 3rem;
  margin-bottom: 2rem;
`;
const h2 = styled(T.H2)`
  margin-top: 3rem;
  margin-bottom: 2rem;
`;
const p = styled(T.Body)`
  margin-bottom: 1.5rem;
`;

const ul = styled.ul`
  list-style-type: disc;
  margin-bottom: 1.5rem;
`;
const li = styled(T.Body.withComponent("li"))`
  list-style-type: disc;
  margin-bottom: 1rem;
  margin-inline-start: 2em;
  b,
  strong {
    font-weight: bold;
  }

  list-style-type: square;
`;

const CodeCard = styled(Card)`
  width: 100%;
  font-size: 14px;
  overflow-x: auto;
  padding: 1rem;
  margin: 1rem 0;
`;

export const components = {
  h1: h1,
  h2: h2,
  p: p,
  img: Img,
  code: Code,
  ul,
  li,
  // code: CodeCard,
};

const Warning = styled.div`
  font-family: arial;
  padding: 1em 1.5em;
  font-size: 16px;
  line-height: 1.75;
  position: relative;
  border-radius: 8px;
  border: 2px solid ${(p) => p.theme.borderDarkest};
  background: ${(p) => p.theme.tooltip};

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    ${createHatchedBackground({})};
    transform: translate(8px, 8px);
  }

  margin-bottom: 40px;

  b,
  strong {
    font-weight: bold;
  }
  a {
    color: ${(p) => p.theme.anchor};
    text-decoration: underline;
  }
  p {
    margin-bottom: 0;
  }
`;

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const renderers = {
  CTAButton,
  DisabledIconsDemo,
  CssHeatMaps,
  T: Typography,
  Warning,
  SVGFilterHeatMaps,
  Separator,
  FancyRevealEffects,
  RGBSplitDemo,
  ...components,
};

export default function PostPage({ source, frontMatter }) {
  return (
    <>
      <Head>
        <title>{frontMatter.seoTitle}</title>

        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="675" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@artur_bien" />
        <meta name="theme-color" content="#c6c6c6" />
        <meta name="description" content={frontMatter.abstract} />
        <meta property="og:description" content={frontMatter.abstract} />
        <meta property="og:image" content={frontMatter.heroImgAbsolute} />
        <meta property="og:image:alt" content={frontMatter.heroImgAlt} />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.abstract} />
        <meta name="twitter:image" content={frontMatter.heroImgAbsolute} />
      </Head>
      <Center>
        <Article>
          <Grid>
            <Normal>
              <T.H1>{frontMatter.title}</T.H1>
              <T.Body color="materialTextDisabled" as="span">
                {frontMatter.publishedOn}
              </T.Body>
              <Card>
                <StyledImage
                  src={frontMatter.heroImg}
                  alt={frontMatter.heroImgAlt}
                  width={1280}
                  height={675}
                  // blurDataURL="data:..." automatically provided
                  // placeholder="blur" // Optional blur-up while loading
                />
              </Card>
              <MDXRemote {...source} components={renderers} />
            </Normal>
          </Grid>
        </Article>
      </Center>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        ...data,
        heroImgAbsolute: "https://expensive.toys" + data.heroImg,
        publishedOn: new Date(data.publishedOn).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

const Article = styled.article`
  padding: 96px 0px;
`;

const Paragraph = styled.p`
  font-family: arial;
  font-size: 18px;
  line-height: 1.75;
  margin-bottom: 2em;

  b {
    font-weight: bold;
  }
`;

const StyledImage = styled(Image)`
  display: block;
  object-fit: cover;
  width: 100%;
  height: auto;
  margin: 0;
  /* border-radius: 8px;
  border: 2px solid ${(p) => p.theme.borderDarkest}; */
  /* box-shadow: rgb(0 0 0 / 1%) 0px 1.7px 1.3px, rgb(0 0 0 / 2%) 0px 4.2px 3.1px,
    rgb(0 0 0 / 2%) 0px 7.9px 5.9px, rgb(0 0 0 / 2%) 0px 14.1px 10.5px,
    rgb(0 0 0 / 3%) 0px 26.3px 19.6px, rgb(0 0 0 / 4%) 0px 63px 47px; */
`;

const ProTip = styled(GroupBox)`
  padding: 1em 1.5em;
  font-size: 16px;
  line-height: 1.75;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const TipIcon = styled.div`
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFUlEQVR4Ae3BAYqDQBREwddD7m3/k/eCLIOJOmqyISykiq9PExclhA1VzGzEBeKkhHBCFTMbcYI4kBAuqqKzEQNiICE8qYrORuwQOxLCi6robMQGsSEh/JEqOhvxoPFm08RQ40FC2CGBxIoEEodswoPGSRKdRCfRSVzWWEgIbzBNdDZhoXFSQpfQJXQJlzV2SKwkkLCSQMImiaHGhzU+rLEjAYmXSJAw1PiwxkACEk+RIOFQY0FCvEEVnY1YuHEgAYlZwiGJWcIpYkNC2CAxS1iRmCXcqaKzEQ9uXJAwk1hJWKnikNiREF5QxR0bsUEMJIQnVHHHRuwQB2zCr2liqIoVGzEgTrIJF9iIE8RFNmHARnz9Jz95FW0p2SiA1gAAAABJRU5ErkJggg==);
  background-size: 100%;
`;

const LeftArrowIcon = styled.div`
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDElEQVR4Ae3Bi23DMBBEwceDC2NnXnW2V9mFBBLE+dmSLQsJkBn+ugKKBwT3K0k8KrhPDewh2K4GMpM9BNvUQGayl2C9GshM9hSsUwOZyd6C22ogM3mGE9fVQGZyQ7Fe40LjZzWQmfzENufzmbWWZUESQ+PVie/VQGZyTe+dzOQRwVc1kJkcIfioBjKTowTvaiAzOVJwYVkWbHOk4F2TxGSbowQfNUlMtjlC8FWTxGSbZwu+1yQx2eaZGteVJKbeO5/ZZitJDI1XjdtKElPvnUu2kcRGjQuNdUoSU++dN7aRxNC4U7BOk8Rkmz0F6zVJTLbZS7BNk8Rkmz0E2zVJ7CW4T5PEb1BA8e8vewGhBpAxu0zQswAAAABJRU5ErkJggg==);
  background-size: 100%;
`;

const CableImage = styled.div`
  width: 400px;
  flex-shrink: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABgCAYAAADy8ayIAAALxElEQVR4Ae3BAVJjS65F0Z2E56Uzs5RmJo3sfme01e1fwXsXF1AFONdi27Zt27Zt27Zt27Zt27afbbBtP5S7H/zC3Qfbfw227Qdx94ObOSetqlgyk8XdBxuDbfvm3P3gZs5Jqyr+SWayuPvgm3D3gwe4++DEYNu+IXc/uJlz0qqKR2Qmi7sPviB3P7iZc/KIiKC5++AVg237Jtz94GbOSasqmpmxVBWPyEwWdx/8Ze5+cDPnpFUVjzAzWkSwuPvgzmDbvjB3P7iZc9KqimZmtIigSeJRmcni7oPf4O4HN+4+eCN3P7iZc9KqipaZPMLdBycG2/bFuPvBzZyTVlU0M6NFBE0SHyEzWdx9cMLdD+5IIjNp7j54hbsf3Mw5aVVFy0yau/MId6e5++COux/uPgbb9gW4+8HNnJNWVTQzo0UETRJnzIylqnhEZrK4++COux/ckURmIonMRBKZiSQyk8Xdh7sf3Mw5aVXFvcxkcXfuDB5zcOPuLO4+uDPYtr/E3Q9u5py0qqKZGS0iaJI4Y2a0iKBJ4lGZya8kkZlIIjORRGYiicxEEpmJJDKTNudkqSruZSaLu3Nn8DEO/mNwZ7Btf5C7H9zMOWlVRTMzWkTQJHHGzGgRQZPER8hMFklkJpLITCSRmUgiM5FEZiKJzEQSmYkkMpNFEktmsrg7N4NP5u6Hu4/Btn0ydz+4mXPSqopmZrSIoEnijJnRIoImiTNmxlJVPCIzaZLITCSRmUgiM5FEZiKJzEQSmYkkMpPm7twM/pwDGINt+wTufnAz56RVFc3MaBFBk8QZM6NFBE0SZ8yMFhE0STwqM1kkkZlIIjORRGYiicxEEpmJJDITSWQmkshMFncf/GGDbfsg7n5wM+ekVRXNzGgRQZPEGTOjRQRNEmfMjBYRNEl8hMykSSIzkURmIonMRBKZiSQyE0lkJpLITJq7D/6Qwba9g7sf3Mw5aVXFazKTJokzZkaLCJokzpgZLSJokjhjZixVxSMyk0USmYkkMhNJZCaSyEwkkZlIIjORRGYiicykufvgEw227UHufnAz56RVFR/BzGgRQZPEGTOjRQRNEmfMjBYRNEk8KjNpkshMJJGZSCIzkURmIonMRBKZiSQyE0lkJou7Dz7BYNvewN0PbuactKriI5gZLSJokjhjZrSIoEnijJnRIoImiY+QmSySyEwkkZlIIjORRGYiicxEEpmJJFpm4u5cDT7YYNv+gbsf3Mw5aVXFR8tMmiTOmBktImiSOGNmtIigSeKMmVFVPCozaZLITCSRmUgiM5FEy0zuuTtXgw822LY77n5wM+ekVRV/m5nRIoImiTNmRosImiTOmBktImiSeFRmskgiM5FEy0z+ibtzNfhgF7an5+4HN3NOWlXxt5kZLSJokjhjZrSIoEnijJnRIoImifeQxJKZSCIz+ZsubE/J3Q9u5py0quIriQiaJM6YGS0iaJI4Y2a0iKBJ4oyZsVQVbyGJr+DC9jTc/eBmzkmrKr4qSZwxM1pE0CRxxsxoEUGTxBkzo0UETRJvJYklM/kbBtuP5u4HN3NOWlXxnZkZLSJokjhjZrSIoEnijJnRIoImiY+QmTR3587gEwy2H8fdD27mnLSq4qfITJokzpgZLSJokjhjZrSIoEnijJmxVBWPkMTV4JMNth/B3Q9u5py0quJZmRktImiSOGNmtIigSeKMmdEigiaJM2ZGiwjcffCJLmzflrsf3Mw5aRHBIolnY2a0iKBJ4oyZ0SKCJokzZkaLCJokzpgZrapokrg6gMEnubB9K+5+cDPnpFUVbc7JEhEskngWEUGTxBkzo0UETRJnzIwWETRJnDEzWlXxmszks13YvgV3P7iac9KqitdUFcuckyUiWCTx00nijJnRIoImiTNmRosImiTOmBmtqnhNZvInXdi+PHc/5pwsVcVbVRXLnJMlIlgk8WzMjBYRNEmcMTNaRNAkccbMaFXFazKTv+XC9qW5+zHnpKpYzIylqnirqmKZc7JEBIsknkVE0CRxxsxoEUGTxBkzo1UVr8lMvoIL27dSVSxmxlJVvFVVscw5WSKCRRI/nSTOmBktImiSOGNmtKriNZnJV3Nh+5aqisXMWKqKt6oqljknS0SwSOLZmBktImiSOGNmtKriNZnJV3Zh+9aqisXMWKqKt6oqljknS0SwSOJZRARNEmfMjFZVvCYzeQ9J/CkXth+hqljMjKWqeKuqYplzskQEiyR+OkmcMTNaVfGazOQ9JNEykz/lwvajVBWLmbFUFW9VVSxzTpaIYJHEszEzWlXxmszkPSTRMpO/4cL2I1UVi5mxVBVvVVUsc06WiGCRxE9mZrSq4jWZyXtIomUmf9uF7cerKsyMpap4q6pimXOyRASLJH4KM6NVFa/JTN5DEi0z+UoubD9aVWFmVBWLmbFUFW9VVSxzTpaIYJHEd2RmtKriNZnJe0iiZSaPcnduBp/owvZ0qgozY6kq3qqqWOacLBHBIomvzsxoVcVrMpP3kETLTB7l7twZ/AEXth+vqjAzqoqqwsyoKhYzY6kq3qqqWOacLBHBIomvxMxoVcVrMpP3kETLTB7l7twZ/GEXti/N3QdwSOKzVBVmxlJVvFVVscw5WSKCRRJ/i5nRqorXZCbvIYmWmTzK3bkz+IsG25fn7gc3kvhdZkZVsZgZVcViZlQVi5mxVBWPMjOWiGCRxJ9gZrSq4jWZyXtIomUmj3J37gy+iAvbl+fuAzi4cncWSXyWqsLMWKqKt6oqljknS0SwSOKjmRmtqnhNZvIekmiZyaPcnTuDL2iwfTcHV+7OIolHmBlVxWJmVBWLmVFVLGZGVbGYGUtV8SgzY4kIFkm8h5nRqorXZCbvIYmWmTzK3bkz+OIubN/N4MrdD67cnUUSn6WqMDOWquKtqoplzskSESySeCszo1UVr8lM3kMSLTN5lLtzZ/CNDLbv7uDK3Vkk8Qgzo6pYzIyqYjEzqorFzKgqFjNjqSoeZWYsEcEiideYGa2qeE1m8h6SaJnJo9ydO4Nv6sL23Q2u3P3gyt1ZJPFZqgozY6kq3qqqWOacLBHBIgkzo1UVr8lM3kMSLTN5lLtzZ/ADDLaf5uDK3Vkk8Qgzo6pYzIyqYjEzqorFzKgqFjNjqSoeZWYsEYEkXpOZvIckWmbyKHfnzuCHubD9NIMrdz+4cncWSXyWqsLMWKqKf2NmtKpimXMyxiAzWTKT95BEy0we5e7cGfxgg+2nO7hydxZJPMLMqCoWM6OqWMyMqmIxM6qKxcxYqopmZrSq4ldmxhgDd+d3SaJlJo9yd+4MnsSF7acbXLn7wZW7s0jiM1QVi5nRqorXZCbvIYmWmTzK3bkzeEKD7dkcXLk7iyQeYWZUFYuZUVUsZkZV8Sszo6pomcmvJCEJd+eMJFpm8ih3587gyV3Yns3gyt0PrtydRRKfoaowMyKC3yWJlpk8yt25M9j+a7A9u4Mrd2eRxCPMjKpiMTOqil9lJv9GEpJwd5okWmbyKHfnzmB71YXt2Q2u3P3gyt1ZJPGnSaJlJo9yd+4MtlMXtu0/BlfufnDl7iyS+DdVRasqzIyq4ndkJo9yd+4Mtodc2Lb/b3Dl7gdX7s4iia/C3bkz2H7bhW27cjgcBv8zuHL3gyt3Z5HEv6kqPoO7c2ewfYgL2/bvBlfufnDl7iyS+Gzuzp3B9uEubNvbDK7c/eDK3Vkk8ZHcnTuD7VMNtu3K4XAYvN3BlbuzSOKfZCb/xt25M9j+mAvb9nsGV+5+cOXuLJJ4C3fnzmD7Ky5s2/sMrtz94MrdWSSxZCbN3bkz2P66C9v2MQZX7n5w5e4s7s6dwbZtX4/Dwcc6gINt274+h4N3cDjYvp0Xtm17Wi9s2/a0Xti27Wm9sG3b07o4HGzbtm3b73I42L6dF7Zte1ovbNv2tF7Ytu1pvbBt29N6Ydu2p/XCtm1P64Vt257WC9u2Pa0Xtm17Wi9s2/a0Xti27Wm9sG3b07o4HGzbtm3btm3btm3btm3btm3btm3btm3b9hP8H3HruJoyno7/AAAAAElFTkSuQmCC);
  background-size: 100%;
  aspect-ratio: 2.66;
`;
