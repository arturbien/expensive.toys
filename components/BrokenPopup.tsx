import React from "react";
import { Window, WindowContent, WindowHeader } from "react95";
import styled from "styled-components";

const Outer = styled.div`
  position: absolute;
  top: 200px;
  left: 100px;
`;
const Inner = styled.div``;
const Win95Left = styled.div`
  filter: drop-shadow(2px 0px 0px ${(p) => p.theme.borderDark})
    drop-shadow(2px 0px 0px ${(p) => p.theme.borderDarkest});
  & > * {
    /* clip-path: polygon(0 0, 65% 0, 39% 100%, 0% 100%); */
    clip-path: polygon(61% 24%, 48% 69%, 53% 86%, 44% 100%, 0 100%, 0 0, 57% 0);
  }
`;
const Win95Right = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  filter: drop-shadow(-1px -2px 0px ${(p) => p.theme.borderLight})
    drop-shadow(-1px -1px 0px ${(p) => p.theme.borderLightest});
  & > * {
    clip-path: polygon(
      73% 41%,
      56% 70%,
      55% 86%,
      46% 100%,
      100% 100%,
      100% 33%,
      87% 37%
    );
  }
`;
const Glass = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.27);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.31);
  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: url("https://github.com/tromero/BayerMatrix/blob/master/images/bayer16.png?raw=true");
    opacity: 0.5;
    background-size: 5px;
    border-radius: 14px;
    mix-blend-mode: overlay;
  }
`;

const BrokenPopup = () => {
  return (
    <Outer>
      <Inner>
        <Glass></Glass>
        <Win95Left>
          <Window style={{ width: 400, height: 250 }}>
            <WindowHeader>Critical error</WindowHeader>
            <WindowContent>
              Something went really fucking wrong right now.
            </WindowContent>
          </Window>
        </Win95Left>
        <Win95Right>
          <Window style={{ width: 400, height: 250 }}>
            <WindowHeader>Critical error</WindowHeader>
            <WindowContent>
              Something went really fucking wrong right now.
            </WindowContent>
          </Window>
        </Win95Right>
      </Inner>
    </Outer>
  );
};

export default BrokenPopup;
