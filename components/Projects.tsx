import React from "react";
import styled from "styled-components";
import GlassIphone from "./GlassIphone";
import { Grid } from "./Layout";
import T from "./UI/Typography";
import { VStack } from "./UI/Stack";

const Gradients = styled.div`
  /* https://www.color-morph.com/ */
  pointer-events: none;
  position: absolute;
  bottom: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  min-height: 2000px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  min-width: 2000px;
  /* background-image: radial-gradient(
        at 58% 69%,
        hsla(16, 93%, 57%, 1) 0,
        hsla(16, 93%, 57%, 0) 50%
      ),
      radial-gradient(
        at 28% 88%,
        hsla(201, 90%, 63%, 1) 0,
        hsla(201, 90%, 63%, 0) 50%
      ); */
  /* background-image: radial-gradient(
        at 14% 98%,
        hsla(99, 91%, 65%, 1) 0,
        hsla(99, 91%, 65%, 0) 50%
      ),
      radial-gradient(
        at 49% 62%,
        hsla(312, 86%, 58%, 1) 0,
        hsla(312, 86%, 58%, 0) 50%
      ); */

  /* background-image: radial-gradient(
        at 7% 34%,
        hsla(52, 90%, 52%, 1) 0,
        hsla(52, 90%, 52%, 0) 50%
      ),
      radial-gradient(
        at 81% 64%,
        hsla(281, 85%, 70%, 1) 0,
        hsla(281, 85%, 70%, 0) 50%
      ); */
  /* background-image: radial-gradient(
        at 60% 16%,
        hsla(25, 94%, 64%, 1) 0,
        hsla(25, 94%, 64%, 0) 50%
      ),
      radial-gradient(
        at 75% 61%,
        hsla(193, 87%, 60%, 1) 0,
        hsla(193, 87%, 60%, 0) 50%
      ); */
  background-image: radial-gradient(
      at 34% 80%,
      hsla(49, 88%, 64%, 1) 0,
      hsla(49, 88%, 64%, 0) 30%
    ),
    radial-gradient(
      at 85% 73%,
      hsla(242, 86%, 62%, 1) 0,
      hsla(242, 86%, 62%, 0) 50%
    );
`;
const Wrapper = styled.div`
  contain: layout;
  padding: 0 0;
  position: relative;
  min-height: 60vh;
  padding-top: 96px;
  margin-bottom: 96px;
`;
const Left = styled.div`
  grid-column: 1 / span 6;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media only screen and (max-width: 1176px) {
    grid-column: 3 / span 8;
    margin-top: 48px;
    gap: 24px;

    text-align: center;
    order: 2;
  }
  @media only screen and (max-width: 796px) {
    grid-column: 2 / span 10;
    margin-top: 48px;
  }
  @media only screen and (max-width: 510px) {
    align-items: flex-start;
    text-align: left;
  }
`;
const Right = styled.div`
  order: 1;
  grid-column: 8 / span 5;
  @media only screen and (max-width: 1176px) {
    grid-column: 1 / span 12;
    display: flex;
    justify-content: center;
  }
  @media only screen and (max-width: 796px) {
    height: 320px;
    -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent);
  }
`;

const Projects = () => {
  return (
    <>
      <Wrapper>
        <Grid style={{ alignItems: "center" }}>
          <Left>
            <T.H1>
              Sick of material design, ads with <T.Spray>upbeat music</T.Spray>{" "}
              and jogging.
            </T.H1>
            <T.BodyLarge>
              I like to prototype, build useless stuff that looks cool and be
              excited about things.
            </T.BodyLarge>
          </Left>
          <Right>
            <GlassIphone />
          </Right>
        </Grid>
        <Gradients />
      </Wrapper>
    </>
  );
};

export default Projects;
