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
import { Grid, Normal } from "../../components/Layout";

const one = () => {
  return (
    <>
      <Article>
        <Grid>
          <Normal>
            <Button size="lg" style={{ marginBottom: 32 }}>
              <LeftArrowIcon /> Back to posts
            </Button>
            <Heading>iOS style disappear gradient</Heading>
            <SubHeading>September 7th, 2022 — 7 min read</SubHeading>
          </Normal>
          <Normal>
            <Card>
              <StyledImage
                src={balenciaga}
                alt="Picture of the author"
                // width={500} automatically provided
                // height={500} automatically provided
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />
            </Card>
          </Normal>
          <Normal>
            <Paragraph>
              I want to take everything I know about building{" "}
              <b>web applications</b> and package it up into a consumable form.
              For years I've envisioned a "KCD.edu" sort of site where I teach
              the 99% of skills every web developer shares. I've always wanted
              to help get people from "I want to learn to program" to "I can
              build and maintain a web application". After building{" "}
              <Anchor href="s">TestingJavaScript.com</Anchor> and{" "}
              <Anchor href="f">EpicReact.dev</Anchor>, I think I'm ready to take
              this on.
            </Paragraph>
            <Warning>
              I'm about to explain some plans I have in place. It's important
              that you understand plans are not promises and can (and do)
              change. But I think it's fun to share my early plans with you, so
              I'm going to. Just take them with a grain of salt.
            </Warning>
            <Paragraph>
              And I'd like to tell you a bit about what I'm thinking for this
              project and how you can participate in it while I work on it.
            </Paragraph>

            <ProTip>
              <TipIcon />
              Write a funny or personal message to make somebody feel good
            </ProTip>
            <CableImage />
          </Normal>
        </Grid>
      </Article>
    </>
  );
};

export default one;

const Article = styled.article`
  padding: 96px 0px;
`;

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
  background: url(data:image/png;base64,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);
  background-size: 100%;
  aspect-ratio: 2.66;
`;
