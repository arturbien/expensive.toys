import React from "react";
import styled from "styled-components";
import GlassIphone from "./GlassIphone";
import { Grid } from "./Layout";

const Wrapper = styled.div`
  padding: 0 0;
  position: relative;
  /* https://www.color-morph.com/ */

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
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
    /* background-image: radial-gradient(
        at 34% 80%,
        hsla(49, 88%, 64%, 1) 0,
        hsla(49, 88%, 64%, 0) 50%
      ),
      radial-gradient(
        at 85% 73%,
        hsla(242, 86%, 62%, 1) 0,
        hsla(242, 86%, 62%, 0) 50%
      ); */
  }
`;
const Left = styled.div`
  grid-column: 1 / span 6;

  h1 {
    font-size: 40px;
    line-height: 1.5;
    font-family: "Times New Roman", Times, serif;
    font-family: arial;
    font-weight: bold;
    filter: url(#filter4196);
  }
`;
const Right = styled.div`
  grid-column: 8 / span 5;
`;

const SprayText = styled.span`
  color: red;
  font-weight: bold;
  font-style: oblique;
  filter: url(#spray);
`;

const Projects = () => {
  return (
    <Wrapper>
      <Grid style={{ alignItems: "center", height: "100vh" }}>
        <Left>
          <h1>
            Sick of material design, ads with{" "}
            <SprayText>upbeat music</SprayText> and jogging.
          </h1>
        </Left>
        <Right>
          <GlassIphone />
        </Right>
      </Grid>
      <svg width="0">
        <filter id="spray">
          <feTurbulence
            id="turbulence"
            type="fractalNoise"
            baseFrequency=".9"
            numOctaves="1"
          />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </svg>
    </Wrapper>
  );
};

export default Projects;
