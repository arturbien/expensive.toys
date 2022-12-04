import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Glass = styled.div`
  --aspect-ratio: 0.55;
  aspect-ratio: var(--aspect-ratio);
  height: 600px;
  position: relative;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  --r-1: 14%;
  --r-2: calc(var(--r-1) * var(--aspect-ratio));
  border-radius: var(--r-1) / var(--r-2);

  .blur {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.27);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.31);
    border-radius: inherit;
    &::before,
    &::after {
      content: "";
      position: absolute;
      pointer-events: none;
    }
    &::before {
      inset: 0;
      background: url("https://github.com/tromero/BayerMatrix/blob/master/images/bayer16.png?raw=true");
      opacity: 0.5;
      background-size: 10px;
      border-radius: inherit;
      mix-blend-mode: overlay;
    }
    &::after {
      --inset: 0px;
      inset: var(--inset);
      border-width: 2px;
      transform-origin: center;
      border-radius: calc(var(--r-1) - var(--inset)) /
        calc(var(--r-2) - var(--inset));

      border: 4px solid rgba(255, 255, 255, 0.31);
      filter: blur(1px);
    }
  }

  .content {
    position: absolute;
    /* --inset: 20px; */
    /* inset: 40px 12px; */
    inset: 48px 20px;

    background: black;
  }
  .up,
  .down,
  .right {
    position: absolute;
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.27);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.31);
    box-shadow: inset 0 5px 5px -3px rgb(0 0 0 / 50%),
      inset 0 -5px 5px -3px rgb(0 0 0 / 50%);
    transform: translate(0, -50%);
  }
  .up,
  .down {
    left: -1.5%;
    width: 1.5%;
    height: 7.5%;
    border-radius: 2px 0 0 2px;
  }
  .up {
    top: 25%;
  }
  .down {
    top: 34%;
  }
  .right {
    top: 25%;
    right: -1.5%;
    width: 1.5%;
    height: 7.5%;
    border-radius: 0 2px 2px 0;
  }
  iframe {
    zoom: 0.75;
    transform: scale(0.75);
    transform-origin: 0 0;
  }
`;

const Rainbow = styled.div`
  position: absolute;
  bottom: 40px;
  right: 0px;
  left: 0px;
  height: 80px;
  background: linear-gradient(to bottom, pink, red, yellow, green);
  filter: opacity(0.8);
  /* transform: rotate(-45deg); */
  border-radius: inherit;

  filter: opacity(0.5);
  border-radius: inherit;
  transform: scaleX(1.5) rotate(45deg);
`;
const GlassIphone = () => {
  return (
    <Wrapper>
      <Glass>
        <Rainbow />
        <div className="blur">
          <div className="content">
            <iframe src="https://coins95.web.app" width="133%" height="133%" />
          </div>
        </div>

        <div className="up"></div>
        <div className="down"></div>
        <div className="right"></div>
      </Glass>
    </Wrapper>
  );
};

export default GlassIphone;
