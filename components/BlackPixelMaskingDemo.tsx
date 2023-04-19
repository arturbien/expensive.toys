import React from "react";
import {
  Checkbox,
  ProgressBar,
  ScrollView,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import candy from "react95/dist/themes/candy";
import honey from "react95/dist/themes/honey";
import styled, { ThemeProvider } from "styled-components";
import { HStack, VStack } from "./UI/Stack";

const MaskedWindow = styled(Window)`
  h5 {
    font-family: "Times New Roman", Times, serif;
    color: black;
    font-size: 120px;
    text-shadow: -2px 0px 2px ${(p) => p.theme.borderDark},
      0px -2px 2px ${(p) => p.theme.borderDark},
      2px 0px 2px ${(p) => p.theme.borderLightest},
      0px 2px 2px ${(p) => p.theme.borderLightest};
    line-height: 1.2;

    text-align: center;
  }
  p {
    font-size: 24px;
    font-weight: bold;
    text-shadow: -2px 0px 2px ${(p) => p.theme.borderDark},
      0px -2px 2px ${(p) => p.theme.borderDark},
      2px 0px 2px ${(p) => p.theme.borderLightest},
      0px 2px 2px ${(p) => p.theme.borderLightest};
    text-align: center;
  }
`;

const Napkin = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  flex-shrink: 0;
  padding: 16px;

  border-radius: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.6);

  outline: 8px dotted black;
  outline-offset: -20px;

  &::before {
    content: "";
    width: 50%;
    height: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;

    background-image: linear-gradient(135deg, black 25%, transparent 25%),
      linear-gradient(225deg, black 25%, transparent 25%),
      linear-gradient(45deg, black 25%, transparent 25%),
      linear-gradient(315deg, black 25%, transparent 25%);
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 10px 10px;
    background-repeat: repeat;

    outline: 4px dashed black;
    outline-offset: 8px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: transparent;
    background-image: radial-gradient(
      ellipse farthest-corner at 6px 6px,
      black,
      black 50%,
      transparent 50%
    );
    background-size: 6px 6px;
  }
`;

const Plastic = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  flex-shrink: 0;
  padding: 16px;

  --backdrop: blur(4px);
  --bg: rgba(55, 255, 55, 0.4);
  -webkit-backdrop-filter: var(--backdrop);
  backdrop-filter: var(--backdrop);
  border: 2px solid var(--bg);
  padding: 4px;
  background: var(--bg);

  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "50";
    font-family: "Times New Roman", Times, serif;
    font-weight: bold;
    font-size: 120px;
    text-shadow: 0px 2px 0px var(--bg), 2px 0px 0px var(--bg),
      -2px 0px 0px var(--bg), 0px -2px 0px var(--bg);
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' style='filter:grayscale(100%25) brightness(50%25) opacity(70%25); '%3E%3Cfilter id='a' width='100%25' height='100%25' x='0%25' y='0%25'%3E%3CfeTurbulence baseFrequency='.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='none' filter='url(%23a)'/%3E%3C/svg%3E");
    mix-blend-mode: color-burn;
  }
`;

const Box = styled.div`
  padding: 40px;
`;

const Demo = () => {
  const [enableFilter, setEnableFilter] = React.useState(true);
  return (
    <VStack fullWidth gap={8}>
      <div>
        <svg width="0" height="0">
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -255 -255 -255 0 1"
              result="black-pixels"
            />
            <feMorphology
              in="black-pixels"
              operator="dilate"
              radius="0.5"
              result="smoothed"
            />
            <feComposite in="SourceGraphic" in2="smoothed" operator="out" />
          </filter>
        </svg>
        <Checkbox
          label="Remove black pixels"
          checked={enableFilter}
          onChange={(e) => setEnableFilter(e.target.checked)}
        />
      </div>
      <div>
        <ScrollView
          style={{
            background: `url(${water})`,
            width: "100%",
          }}
        >
          <HStack alignItems="center">
            <Box>
              <ThemeProvider theme={candy}>
                <MaskedWindow
                  shadow={false}
                  style={{
                    filter: enableFilter
                      ? "url(#remove-black) drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.5))"
                      : " drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.5))",
                  }}
                >
                  <WindowHeader>Test.exe</WindowHeader>
                  <WindowContent>
                    <h5>Whoa!</h5>
                    <p>This is awesome.</p>
                  </WindowContent>
                </MaskedWindow>
              </ThemeProvider>
            </Box>
            <Box>
              <Napkin
                style={{
                  filter: enableFilter ? "url(#remove-black)" : undefined,
                }}
              />
            </Box>
            <Box>
              <ThemeProvider theme={{ ...honey, progress: "black" }}>
                <Window
                  shadow={false}
                  style={{
                    width: 300,
                    filter: enableFilter ? "url(#remove-black)" : undefined,
                  }}
                >
                  <WindowHeader>Progress</WindowHeader>

                  <WindowContent>
                    <ProgressBar value={78} variant="tile" />
                  </WindowContent>
                </Window>
              </ThemeProvider>
            </Box>
            <Box>
              <Plastic
                style={{
                  filter: enableFilter ? "url(#remove-black)" : undefined,
                }}
              />
            </Box>
          </HStack>
        </ScrollView>
      </div>
    </VStack>
  );
};

const Invert = styled.div`
  position: relative;
  font-size: 120px;
  line-height: 1;
  padding: 24px;
  background: black;
  color: black;

  font-weight: bold;
  overflow: hidden;
  border: 4px dashed white;
  outline: 2px solid white;
  outline-offset: -16px;

  span {
    text-shadow: -2px 0px 0px white, 0px -2px 0px white, 2px -2px 0px white,
      2px 0px 0px white, 2px 10px 0px white, -2px 10px 0px white;
  }
`;

const InvertDemo = () => {
  const [enableFilter, setEnableFilter] = React.useState(true);

  return (
    <div>
      <Checkbox
        label="Remove white pixels"
        checked={enableFilter}
        onChange={(e) => setEnableFilter(e.target.checked)}
      />
      <div
        style={{
          background: `url(${water})`,
        }}
      >
        <Invert
          style={{
            filter: enableFilter
              ? "invert(1) url(#remove-black) invert(1)"
              : undefined,
          }}
        >
          <span>Hello!</span> 😍
        </Invert>
      </div>
    </div>
  );
};

const BlackPixelMaskingDemo = { Demo, InvertDemo };

export default BlackPixelMaskingDemo;

const water = `data:image/gif;base64,R0lGODlh9gDeAJEAALzi92y06Uye4ovJ8CH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5OTk0Mjc1NDU0MDExMUU5QUIwRkFCQjk2QThCMkEyRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5OTk0Mjc1NTU0MDExMUU5QUIwRkFCQjk2QThCMkEyRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk5OTQyNzUyNTQwMTExRTlBQjBGQUJCOTZBOEIyQTJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk5OTQyNzUzNTQwMTExRTlBQjBGQUJCOTZBOEIyQTJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2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`;
