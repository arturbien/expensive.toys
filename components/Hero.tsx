import React from "react";
import { Monitor } from "react95";
import maple from "react95/dist/themes/maple";
import styled, { ThemeProvider } from "styled-components";

const Hero = () => (
  <Wrapper>
    <CloudRing>
      <ComputerScene>
        <BlurredSomething />
        <div className="left-monitor">
          <ThemeProvider theme={maple}>
            <Monitor
              backgroundStyles={{
                backgroundColor: "black",
              }}
            />
          </ThemeProvider>
        </div>

        <div className="right-monitor">
          <ThemeProvider theme={maple}>
            <Monitor backgroundStyles={{}} />
          </ThemeProvider>
        </div>

        <div className="center-monitor">
          {/* <ThemeProvider theme={maple}> */}
          <Monitor
            backgroundStyles={{
              backgroundColor: "#dead25",
              backgroundImage: `url(https://i.pinimg.com/originals/a7/a2/0e/a7a20e9a4c0c5ed6af6cbaf3c268d701.png)`,
              backgroundSize: "cover",
            }}
          />
          {/* </ThemeProvider> */}
        </div>
        <BlurredSomething2 />
      </ComputerScene>
    </CloudRing>
    <div id="text">expensive toys</div>
  </Wrapper>
);
export default Hero;

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  #text {
    font-size: 76px;
    position: absolute;
    left: 50%;
    filter: url(#heat);
    transform: translate(-50%);
  }
`;
const ComputerScene = styled.div`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  left: 200px;

  .left-monitor {
    display: inline-block;
    position: absolute;
    transform: scale(2);
    top: 500px;
    -webkit-mask-image: linear-gradient(to right, black, transparent);
    filter: opacity(0.5) brightness(0.2) blur(3px);
  }
  .center-monitor {
    display: inline-block;
    position: absolute;
    transform: scale(2.4);
    top: 500px;
    left: 260px;
    filter: brightness(0.45) blur(1px);
  }
  .right-monitor {
    display: inline-block;
    position: absolute;
    top: 500px;
    left: 500px;
    transform: scale(2.3);
    -webkit-mask-image: linear-gradient(to top left, black, transparent);
    filter: opacity(0.8) brightness(0.2) blur(1px);
  }
`;

const CloudWrapper = styled.div`
  padding: 100px;
  /* -webkit-mask-image: radial-gradient(
    black,
    black 500px,
    transparent 600px,
    transparent
  ); */

  #cloud-ring-wrapper {
    position: relative;
    width: 1100px;
    height: 1100px;
    /* filter: url(#heat); */
  }
  .cloud-ring {
    position: absolute;

    border-radius: 50%;
    inset: 0;
  }

  #cloud-ring-back {
    filter: blur(30px) url(#filter-back);
    border: 100px solid #dead25;
  }

  #cloud-ring-mid {
    filter: blur(30px) url(#filter-mid);
    border: 30px solid #824b27;

    /* transform: scale(0.85); */
  }

  #cloud-ring-front {
    filter: blur(30px) url(#filter-front);
    border: 30px solid #ad6004;
    transform: scale(0.95);
  }
`;

const BlurredSomething = styled.div`
  position: absolute;
  top: 600px;
  left: 300px;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 1200px;
  background: radial-gradient(#ad6004, #dead25);
  border-radius: 50%;
  filter: blur(100px);
`;
const BlurredSomething2 = styled.div`
  position: absolute;
  top: 0px;
  /* -webkit-transform: translate(-50%,-50%); */
  -ms-transform: translate(-50%, -50%);
  /* transform: translate(-50%,-50%); */
  width: 1000px;
  height: 1000px;
  background: radial-gradient(#ad6004bb, #dead25);
  border-radius: 50%;
  -webkit-filter: blur(100px);
  filter: blur(100px);
  mix-blend-mode: multiply;
`;

const CloudRing = ({ children }: { children: React.ReactNode }) => {
  return (
    <CloudWrapper>
      <div id="cloud-ring-wrapper">
        <div id="heats">{children}</div>
        <div className="cloud-ring" id="cloud-ring-back"></div>
        <div className="cloud-ring" id="cloud-ring-mid"></div>
        <div className="cloud-ring" id="cloud-ring-front"></div>
      </div>
      <svg width="0" height="0">
        <filter id="filter-back">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="13"
            seed="0"
          />
          <feDisplacementMap in="SourceGraphic" scale="170" />
        </filter>
        <filter id="filter-mid">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="1"
            seed="0"
          />
          <feDisplacementMap in="SourceGraphic" scale="150" />
        </filter>
        <filter id="filter-front">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="1"
            seed="0"
          />
          <feDisplacementMap in="SourceGraphic" scale="100" />
        </filter>
        <filter id="heat">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005"
            numOctaves="3"
            result="warp"
          ></feTurbulence>
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="B"
            scale="40"
            in="SourceGraphic"
            in2="warp"
          >
            <animate
              attributeName="scale"
              dur="5s"
              values="0 ; 10 ; 30 ; 10 ; 0"
              keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </svg>
    </CloudWrapper>
  );
};
