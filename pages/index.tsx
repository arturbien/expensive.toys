import styled from "styled-components";
import BrokenPopup from "../components/BrokenPopup";
import HeroMain from "../components/HeroMain";
import { Center } from "../components/Layout";
import Projects from "../components/Projects";

const Home = () => (
  <>
    <Center>
      <HeroMain />
      <Projects />

      {/* <Fence />
      <DottedBackground /> */}
    </Center>
    {/* <BrokenPopup /> */}
  </>
);
export default Home;

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

const DottedBackground = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  background: linear-gradient(to bottom, #c0be7a, #f8f4a5);
  background: #f8f4a5;
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
