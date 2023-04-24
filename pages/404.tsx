import React from "react";
import styled, { ThemeProvider } from "styled-components";
import BrokenPopup from "../components/BrokenPopup";
import { addParticleEffect } from "../lib/particleEffect";
import T from "../components/UI/Typography";
import { HStack, VStack } from "../components/UI/Stack";
import CTAButton from "../components/UI/CTAButton";
import peggysPastels from "react95/dist/themes/peggysPastels";
import wmii from "react95/dist/themes/wmii";
import vaporTeal from "react95/dist/themes/vaporTeal";
import counterStrike from "react95/dist/themes/counterStrike";
import cherry from "react95/dist/themes/cherry";
import {
  Button,
  ColorInput,
  Counter,
  Frame,
  ScrollView,
  Slider,
  Window,
  WindowHeader,
  WindowContent,
  ProgressBar,
} from "react95";
import Link from "next/link";

const Card = styled.div`
  position: relative;
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

const Sticker = styled.div`
  width: 56px;
  height: 56px;
  line-height: 56px;
  font-size: 56px;
  text-align: center;
  transition: all 0.4s ease-in-out;
`;

const Mess = styled.div`
  position: absolute;

  inset: 0;
  pointer-events: none;
  & > * {
    pointer-events: auto;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  .color-input {
    position: absolute;
    right: 300px;
    top: 200px;
    transform: rotate(35deg);
  }
  .scroll-view {
    position: fixed;
    right: -10px;
    top: 200px;
    transform: rotate(10deg);
  }
  .sticker-pack {
    position: fixed;
    right: 0px;
    top: 40px;
    transform: rotate(-10deg);
  }
  .counter {
    position: fixed;
    bottom: 80px;
    right: 70px;
    transform: rotate(-24deg);
  }
  .popup {
    position: absolute;
    right: 78px;
    top: 325px;
    transform: rotate(15deg);
  }
  .temp-slider {
    position: fixed;
    bottom: 80px;
    right: 50px;
    transform: rotate(-20deg);
  }
  .go-home {
    position: fixed;
    bottom: 30px;
    right: 130px;
    transform: rotate(3deg);
  }
  .progress-bar {
    position: fixed;
    bottom: 30px;
    left: 70px;
    transform: rotate(3deg);
  }
  .yellow-card {
    position: fixed;
    bottom: 30px;
    left: -30px;
    transform: rotate(-13deg);
  }
  @media only screen and (max-width: 880px) {
    .progress-bar {
      display: none;
    }

    .yellow-card {
      display: none;
    }
  }
  @media only screen and (max-width: 600px) {
    .temp-slider {
      bottom: -10px;
    }
  }
`;

const Center = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const FourOFour = styled.div`
  font-size: 240px;
  line-height: 1;
  flex-shrink: 0;
  @media only screen and (max-width: 448px) {
    font-size: 160px;
  }
`;

const Fixed = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: ${(props) => props.theme.material};
  overscroll-behavior: contain;
  isolation: isolate;
  contain: strict;
`;

function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty array ensures effect is only run on mount and unmount
}
const NotFoundPage = () => {
  const [counter, setCounter] = React.useState(404000);
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPercent((previousPercent) => {
        if (previousPercent === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(previousPercent + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [stickerInPlace, setStickerInPlace] = React.useState(false);
  return (
    <Fixed>
      <Center>
        <div>
          <VStack justifyContent="center" alignItems="center">
            {/* <ThemeProvider theme={wmii}> */}
            <FourOFour>
              <T.Embossed pixelSize={2}>404</T.Embossed>
            </FourOFour>
            {/* </ThemeProvider> */}
            <T.BodyLarge style={{ fontFamily: "ms_sans_serif" }} disabled>
              {`Looks like you're lost.`}
            </T.BodyLarge>
          </VStack>
        </div>
      </Center>
      <Mess>
        <div className="color-input">
          <ColorInput disabled />
        </div>
        <div className="scroll-view">
          <ThemeProvider theme={wmii}>
            <Frame style={{ padding: 24 }}>
              <ThemeProvider theme={peggysPastels}>
                <ScrollView style={{ height: 200, width: 200 }}>
                  <div style={{ position: "relative" }}>
                    {`hahaha you found the secret page! I'm not sure what to put
                    here, but I'm glad you found it. I'm not sure what to put
                    here, but I'm glad you found it. I'm not sure what to put
                    here, but I'm glad you found it. I'm not sure what to put`}
                    <Sticker
                      style={{
                        position: "absolute",
                        bottom: 40,
                        right: 20,
                        transform: "rotate(13deg)",
                      }}
                    >
                      🖖
                    </Sticker>
                  </div>
                </ScrollView>
                {/* <TextInput
                multiline
                rows={8}
                defaultValue={`
                  hahaha you found the secret page! I'm not sure what to put
                  here, but I'm glad you found it. I'm not sure what to put
                  here, but I'm glad you found it. I'm not sure what to put
                  here, but I'm glad you found it. I'm not sure what to put
              `}
                fullWidth
              /> */}
              </ThemeProvider>
            </Frame>
          </ThemeProvider>
        </div>
        <div className="sticker-pack">
          {/* <ThemeProvider theme={vaporTeal}> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ pointerEvents: "none", width: 0, height: 0 }}
          >
            <defs>
              <filter id="empty-sticker">
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.1
0 0 0 0 0.1
0 0 0 0 0.1
-10 -10 -10 55 0"
                  result="matr"
                />

                <feFlood floodColor="grey" result="flood" />

                <feComposite in="flood" in2="matr" operator="in" />
                <feDropShadow
                  dx="-1"
                  dy="-1"
                  stdDeviation="0"
                  floodColor="black"
                />
                <feDropShadow
                  dx="1"
                  dy="1"
                  stdDeviation="0"
                  floodColor="white"
                />
              </filter>
              <filter id="sticker">
                <feDropShadow
                  dx="-1"
                  dy="-1"
                  stdDeviation="0"
                  floodColor="black"
                />
                <feDropShadow
                  dx="1"
                  dy="1"
                  stdDeviation="0"
                  floodColor="white"
                />
              </filter>
            </defs>
          </svg>
          <Window>
            <WindowHeader>Sticker pack</WindowHeader>
            <WindowContent>
              <VStack gap={12}>
                <HStack gap={12}>
                  <div style={{ position: "relative", perspective: 200 }}>
                    <Sticker
                      style={{
                        filter: "url(#empty-sticker)",
                        pointerEvents: "none",
                      }}
                    >
                      💩
                    </Sticker>
                    <Sticker
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transformOrigin: "center left",
                        transform: stickerInPlace
                          ? "none"
                          : "rotate(6deg) rotateY(-28deg)",
                        filter: stickerInPlace
                          ? "saturate(1) brightness(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))"
                          : "saturate(0.3) brightness(1.7) drop-shadow(8px 3px 4px rgba(0,0,0,0.5))",
                      }}
                      onClick={() => setStickerInPlace(true)}
                    >
                      💩
                    </Sticker>
                  </div>
                  <Sticker style={{ filter: "url(#sticker)" }}>🦷</Sticker>
                </HStack>
                <HStack gap={12}>
                  <Sticker style={{ filter: "url(#sticker)" }}>👻</Sticker>
                  <Sticker
                    style={{
                      filter: "url(#empty-sticker)",
                      pointerEvents: "none",
                    }}
                  >
                    🖖
                  </Sticker>
                </HStack>
              </VStack>
            </WindowContent>
            <div style={{ padding: 4 }}>
              <Frame
                variant="well"
                style={{
                  height: 31,
                  lineHeight: "28px",
                  paddingLeft: 8,
                  width: "100%",
                }}
              >
                Stickers left: {stickerInPlace ? 3 : 2}
              </Frame>
            </div>
          </Window>
          {/* </ThemeProvider> */}
        </div>
        <div className="counter">
          <Frame className="wrapper" style={{ padding: 12 }}>
            <HStack gap={8} alignItems="center">
              <Counter value={counter} minLength={6} size="lg" />
              <Button
                size="lg"
                style={{ height: 73, width: 80 }}
                onClick={() => setCounter((state) => state + 1)}
              >
                Click!
              </Button>
            </HStack>
          </Frame>
        </div>
        <div className="popup">
          <ThemeProvider theme={vaporTeal}>
            <BrokenPopup />
          </ThemeProvider>
        </div>
        <div className="temp-slider">
          <Frame style={{ padding: "32px 24px" }} shadow>
            <Slider
              size="300px"
              min={0}
              max={6}
              step={1}
              defaultValue={2}
              disabled
              marks={[
                { value: 0, label: "0°C" },
                { value: 2, label: "2°C" },
                { value: 4, label: "4°C" },
                { value: 6, label: "6°C" },
              ]}
              orientation="vertical"
            />
          </Frame>
        </div>
        <div className="go-home">
          <Link href={"/"} passHref>
            <Button size="lg" as="span">
              Go home
            </Button>
          </Link>
        </div>
        <div className="yellow-card">
          <Card style={{ width: 300, height: 300 }} />
        </div>
        <div className="progress-bar">
          <ThemeProvider theme={counterStrike}>
            <Frame style={{ padding: 24, display: "flex" }} shadow>
              <ProgressBar
                value={percent}
                variant="tile"
                style={{ width: 400 }}
              />
            </Frame>
          </ThemeProvider>
        </div>
      </Mess>
      <FlashLight />
    </Fixed>
  );
};

NotFoundPage.getLayout = (page) => <>{page}</>;
export default NotFoundPage;

const FlashLightWrapper = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;

  position: absolute;
  inset: 0;
  overflow: hidden;

  --x: 50vw;
  --y: 50vh;

  --gradient-length: 10px;
  --b: 0.08;
  --inverse-b: calc(1 / var(--b));
  --beam-d: 150px;
  @media only screen and (max-width: 600px) {
    --beam-d: 110px;
  }
  --beam-length: 0px;
  --deg: -60deg;

  #spotlight-wrapper {
    position: absolute;
    inset: 0;
    mask-image: radial-gradient(
      circle at var(--x) var(--y),
      transparent 0px,
      transparent calc(var(--beam-d) - var(--gradient-length)),
      rgba(0, 0, 0, 0.95) var(--beam-d),
      black 270px
    );
    mask-size: 100% 100%;
    --backdrop-filter: brightness(var(--b));
    -webkit-backdrop-filter: var(--backdrop-filter);
    backdrop-filter: var(--backdrop-filter);
  }

  #beam-light,
  #beams,
  #beam-outer,
  #beam-wrapper,
  #canvas,
  #beam,
  #beams-bg {
    position: absolute;
    inset: 0;
  }

  #beam,
  #beams-bg {
    background: black;
  }
  #canvas {
    mix-blend-mode: multiply;
  }

  #beam::before,
  #beams-bg::before,
  #beam-light::before {
    content: "";
    display: inline-block;
    width: calc(var(--beam-d) * 2);
    border-radius: var(--beam-d);
    /* Setting perspective and rotateX causes particles to disappear on Safari */
    transform: translate(-50%, calc(-1 * var(--beam-d)))
      translate(var(--x), var(--y)) rotate(180deg) rotate(var(--deg))
      perspective(100px) rotateX(-5deg) scale(0.9);
    /* transform: translate(-50%, calc(-1 * var(--beam-d)))
      translate(var(--x), var(--y)) rotate(180deg) rotate(var(--deg)); */
    transform-origin: 50% var(--beam-d);
    filter: blur(10px);
    height: var(--beam-length);
  }
  #beam::before,
  #beams-bg::before {
    background: white;
  }
  #beam-light::before {
    /* blue tinted beam of light */
    background: #cde8f0;
  }
  #beam-light {
    /* Crop the circle where the focus is because we don't
        need the blue tint within the focus circle */
    mask-image: radial-gradient(
      circle at var(--x) var(--y),
      transparent 0px,
      transparent calc(var(--beam-d) - var(--gradient-length)),
      rgba(0, 0, 0, 0.3) calc(var(--beam-d) + var(--gradient-length)),
      black 430px
    );
    mix-blend-mode: soft-light;
  }

  @media only screen and (max-width: 600px) {
    #beam-light {
      /* Crop the circle where the focus is because we don't
        need the blue tint within the focus circle */
      mask-image: radial-gradient(
        circle at var(--x) var(--y),
        transparent 0px,
        transparent calc(var(--beam-d) - var(--gradient-length)),
        rgba(0, 0, 0, 0.3) calc(var(--beam-d) + var(--gradient-length)),
        black 230px
      );
    }
  }

  #beams {
    isolation: isolate;
    mix-blend-mode: screen;
    mask-image: radial-gradient(
      circle at var(--x) var(--y),
      transparent 0px,
      transparent calc(var(--beam-d) - var(--gradient-length)),
      black,
      black 430px
    );
  }

  #beam-outer {
    mix-blend-mode: difference;
  }
  #aura {
    position: absolute;
    display: inline-block;
    width: calc(var(--beam-d) * 2);
    height: calc(var(--beam-d) * 2);
    border-radius: 50%;
    left: var(--x);
    top: var(--y);
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle at center,
      transparent 0px,
      transparent calc(var(--beam-d) - 24px),
      #00ff00 calc(var(--beam-d) - 20px),
      #ffff00 calc(var(--beam-d) - 16px),
      #ff7f00 calc(var(--beam-d) - 12px),
      #ff0000 calc(var(--beam-d) - 8px),
      #ff0000 calc(var(--beam-d) - 4px),
      transparent calc(var(--beam-d))
    );
    opacity: 0.2;
    mix-blend-mode: overlay;
    filter: blur(4px);
  }
`;
const FlashLight = () => {
  useLockBodyScroll();
  const wrapperRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const updatePosition = (x: number, y: number) => {
      wrapper.style.setProperty("--x", x + "px");
      wrapper.style.setProperty("--y", y + "px");
      const radians = Math.atan2(x / 1.2, y * 1.5);
      const deg = -(radians * 150) / Math.PI;
      wrapper.style.setProperty("--deg", deg + "deg");
    };
    wrapper.style.setProperty("--beam-length", "7000px");
    updatePosition(window.innerWidth / 2, window.innerHeight / 2);

    const stopAnimating = addParticleEffect("#canvas");

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      updatePosition(x, y);
    };
    document.body.addEventListener("pointermove", onMouseMove);

    return () => {
      stopAnimating();
      document.body.removeEventListener("pointermove", onMouseMove);
    };
  }, []);

  return (
    <FlashLightWrapper ref={wrapperRef}>
      <div id="aura"></div>

      <div id="spotlight-wrapper"></div>

      <div id="beams">
        <div id="beams-bg"></div>
        <div id="beam-outer">
          <div id="beam-wrapper">
            <div id="beam"></div>
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>
      <div id="beam-light"></div>
    </FlashLightWrapper>
  );
};
