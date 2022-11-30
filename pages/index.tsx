import { Button, Counter, Frame, Separator } from "react95";
import counterStrike from "react95/dist/themes/counterStrike";
import eggPlant from "react95/dist/themes/eggPlant";
import honey from "react95/dist/themes/honey";
import original from "react95/dist/themes/original";
import plum from "react95/dist/themes/plum";
import rose from "react95/dist/themes/rose";
import vaporTeal from "react95/dist/themes/vaporTeal";
import vermillion from "react95/dist/themes/vermillion";
import candy from "react95/dist/themes/candy";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "../components/Navbar";
import BrokenPopup from "../components/BrokenPopup";
import HeroMain from "../components/HeroMain";
import Projects from "../components/Projects";

const GlassBar = styled.nav`
  z-index: 2;
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);

  /* background: rgba(0, 0, 0, 0.2); */
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  border-right: 2px solid rgba(0, 0, 0, 0.2);
`;
const AppBar = styled(Frame)`
  z-index: 2;
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 10;
  /* filter: drop-shadow(4px 0px 12px black); */
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  left: 180px;
  top: 50%;
  transform: translateY(-50%);
  text-shadow: 1px 1px 1px #ddd;
`;

const Glass = styled.div`
  z-index: 2;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 80px;

  background: rgba(200, 200, 255, 0.5);
  mix-blend-mode: normal;
  border-radius: 4px;
  border-bottom: 4px solid rgba(150, 150, 255, 0.8);
  /* backdrop-filter: blur(1px); */
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-bottom: 4px solid rgba(150, 150, 255, 0.8);
  border-right: 4px solid rgba(150, 150, 255, 0.8);
`;

const ButtonCutout = styled.div`
  display: inline-block;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2px;
  border: 4px solid rgba(150, 150, 255, 0.8);
  outline: 1px solid black;
  outline-offset: -4px;
  border-bottom: 4px solid rgba(150, 150, 255, 0.8);
  border-right: 4px solid rgba(150, 150, 255, 0.8);
`;

const Footer = styled(Frame)`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  padding: 32px;
`;

const LayoutGrid = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;

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

const Swag = () => (
  <main>
    <ThemeProvider theme={original}>
      <Navbar />
    </ThemeProvider>
    {/* <GlassBar>
      <Title>expensive toys</Title>
    </GlassBar> */}
    {/* <Glass>
      <ButtonCutout>
        <ThemeProvider theme={candy}>
          <Button variant="raised" size="lg">
            Wassup!
          </Button>
        </ThemeProvider>
      </ButtonCutout>
    </Glass> */}
    {/* <Hero /> */}
    <HeroMain />
    <Projects />
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
    <Fence />
    <DottedBackground />
    <ThemeProvider theme={eggPlant}>
      <Footer>
        <div>
          <Counter minLength={7} value={10467} />
        </div>
      </Footer>
    </ThemeProvider>
    <BrokenPopup />
  </main>
);
export default Swag;

const Card = styled.div`
  position: absolute;
  left: 64.5%;
  height: 260px;
  width: 300px;
  padding: 16px;
  background: ${(p) => p.theme.canvas};
  background: #fefbcc;
  border: 2px solid ${(p) => p.theme.borderDarkest};
  box-shadow: 2px 2px 0px ${(p) => p.theme.borderDarkest};
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

const DottedBackground = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  background: linear-gradient(to bottom, #c0be7a, #f8f4a5);
  &:before,
  &:after {
    content: "";
    position: absolute;
    inset: 0;
  }
  &:before {
    background-size: 40px 40px;
    background-image: repeating-linear-gradient(
      0deg,
      #444cf7,
      #444cf7 1px,
      transparent 1px,
      transparent
    );
  }
`;

const Fence = styled.div`
  position: relative;
  height: 400px;
  width: 400px;
  border-radius: 50%;
  overflow: hidden;

  filter: brightness(1.25);
  mix-blend-mode: multiply;
  &::before {
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    --u: 2vmin;
    --c1: #fff;
    --c2: #b3b3b3;
    --c3: #adadad;
    --c4: #9b9b9b;
    --c5: #6c6c6c;
    --grid-size: 29%;
    --gp: 50% / calc(var(--u) * 2) calc(var(--u) * 2);
    background: conic-gradient(
          from 225deg at var(--grid-size) 50%,
          var(--c1) 0 90deg,
          #fff0 0 100%
        )
        var(--gp),
      conic-gradient(
          from 135deg at 50% calc(100% - var(--grid-size)),
          var(--c1) 0 90deg,
          #fff0 0 100%
        )
        var(--gp),
      conic-gradient(
          from 45deg at calc(100% - var(--grid-size)) 50%,
          var(--c1) 0 90deg,
          #fff0 0 100%
        )
        var(--gp),
      conic-gradient(
          from -45deg at 50% var(--grid-size),
          var(--c1) 0 90deg,
          #fff0 0 100%
        )
        var(--gp),
      conic-gradient(
          from -45deg at 50% 50%,
          var(--c3) 0 45deg,
          var(--c2) 0 90deg,
          var(--c4) 0 135deg,
          var(--c3) 0 180deg,
          var(--c5) 0 225deg,
          var(--c4) 0 270deg,
          var(--c2) 0 315deg,
          var(--c5) 0 360deg,
          #fff0 0 100%
        )
        var(--gp),
      var(--c1);
  }
`;
