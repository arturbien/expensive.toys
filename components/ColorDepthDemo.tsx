import React from "react";
import { Frame } from "react95";
import styled from "styled-components";
import { HStack } from "./UI/Stack";
const Wrapper = styled.div`
  svg {
    position: absolute;
  }
`;
const ColorWheel = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
`;
const DemoImg = styled.img`
  flex-grow: 0;
  flex-shrink: 0;
  display: block;
  height: 300px;
`;
const FourBitRGBI = ({ variant }: { variant: "before" | "after" }) => {
  const withFilter = variant === "after";
  return (
    <Wrapper>
      {withFilter && (
        <svg>
          <filter
            id="color-depth-4-bit-rgbi"
            x="0"
            y="0"
            width="100%"
            height="100%"
            color-interpolation-filters="sRGB"
          >
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1"></feFuncR>
              <feFuncG type="discrete" tableValues="0 0.333 0.666 1"></feFuncG>
              <feFuncB type="discrete" tableValues="0 1"></feFuncB>
            </feComponentTransfer>
          </filter>
        </svg>
      )}
      <Frame variant="status" style={{ width: "100%" }}>
        <div
          style={{
            background: "linear-gradient(to right, rgb(0,0,0), rgb(0, 255, 0))",
            height: 35,
            filter: withFilter ? "url(#color-depth-4-bit-rgbi)" : undefined,
          }}
        />
      </Frame>
      <HStack gap={16}>
        <DemoImg
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/RGB_24bits_palette_sample_image.jpg"
          style={{
            filter: withFilter ? "url(#color-depth-4-bit-rgbi)" : undefined,
          }}
        />
        <ColorWheel
          style={{
            filter: withFilter ? "url(#color-depth-4-bit-rgbi)" : undefined,
          }}
        />
      </HStack>
    </Wrapper>
  );
};
const ThreeBit = ({ variant }: { variant: "before" | "after" }) => {
  const withFilter = variant === "after";
  return (
    <Wrapper>
      {withFilter && (
        <svg>
          <filter
            id="color-depth-3-bit"
            x="0"
            y="0"
            width="100%"
            height="100%"
            color-interpolation-filters="sRGB"
          >
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1"></feFuncR>
              <feFuncG type="discrete" tableValues="0 1"></feFuncG>
              <feFuncB type="discrete" tableValues="0 1"></feFuncB>
            </feComponentTransfer>
          </filter>
        </svg>
      )}

      <Frame variant="status" style={{ width: "100%" }}>
        <div
          style={{
            background: "linear-gradient(to right, rgb(0,0,0), rgb(0, 255, 0))",
            height: 35,
            filter: withFilter ? "url(#color-depth-3-bit)" : undefined,
          }}
        />
      </Frame>
      <HStack gap={16}>
        <DemoImg
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/RGB_24bits_palette_sample_image.jpg"
          style={{
            filter: withFilter ? "url(#color-depth-3-bit)" : undefined,
          }}
        />
        <ColorWheel
          style={{
            filter: withFilter ? "url(#color-depth-3-bit)" : undefined,
          }}
        />
      </HStack>
    </Wrapper>
  );
};
const SixBit = ({ variant }: { variant: "before" | "after" }) => {
  const withFilter = variant === "after";
  return (
    <Wrapper>
      {withFilter && (
        <svg>
          <filter
            id="color-depth-6-bit"
            x="0"
            y="0"
            width="100%"
            height="100%"
            color-interpolation-filters="sRGB"
          >
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 0.333 0.666 1"></feFuncR>
              <feFuncG type="discrete" tableValues="0 0.333 0.666 1"></feFuncG>
              <feFuncB type="discrete" tableValues="0 0.333 0.666 1"></feFuncB>
            </feComponentTransfer>
          </filter>
        </svg>
      )}

      <Frame variant="status" style={{ width: "100%" }}>
        <div
          style={{
            background: "linear-gradient(to right, rgb(0,0,0), rgb(0, 255, 0))",
            height: 35,
            filter: withFilter ? "url(#color-depth-6-bit)" : undefined,
          }}
        />
      </Frame>
      <HStack gap={16}>
        <DemoImg
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/RGB_24bits_palette_sample_image.jpg"
          style={{
            filter: withFilter ? "url(#color-depth-6-bit)" : undefined,
          }}
        />
        <ColorWheel
          style={{
            filter: withFilter ? "url(#color-depth-6-bit)" : undefined,
          }}
        />
      </HStack>
    </Wrapper>
  );
};
const NineBit = ({ variant }: { variant: "before" | "after" }) => {
  const withFilter = variant === "after";
  return (
    <Wrapper>
      {withFilter && (
        <svg>
          <filter
            id="color-depth-9-bit"
            x="0"
            y="0"
            width="100%"
            height="100%"
            color-interpolation-filters="sRGB"
          >
            <feComponentTransfer>
              <feFuncR
                type="discrete"
                tableValues="0 0.143 0.286 0.428 0.571 0.714 0.857 1"
              ></feFuncR>
              <feFuncG
                type="discrete"
                tableValues="0 0.143 0.286 0.428 0.571 0.714 0.857 1"
              ></feFuncG>
              <feFuncB
                type="discrete"
                tableValues="0 0.143 0.286 0.428 0.571 0.714 0.857 1"
              ></feFuncB>
            </feComponentTransfer>
          </filter>
        </svg>
      )}

      <Frame variant="status" style={{ width: "100%" }}>
        <div
          style={{
            background: "linear-gradient(to right, rgb(0,0,0), rgb(0, 255, 0))",
            height: 35,
            filter: withFilter ? "url(#color-depth-9-bit)" : undefined,
          }}
        />
      </Frame>
      <HStack gap={16}>
        <DemoImg
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/RGB_24bits_palette_sample_image.jpg"
          style={{
            filter: withFilter ? "url(#color-depth-9-bit)" : undefined,
          }}
        />
        <ColorWheel
          style={{
            filter: withFilter ? "url(#color-depth-9-bit)" : undefined,
          }}
        />
      </HStack>
    </Wrapper>
  );
};

const TwelveBit = ({ variant }: { variant: "before" | "after" }) => {
  const withFilter = variant === "after";
  return (
    <Wrapper>
      {withFilter && (
        <svg>
          <filter
            id="color-depth-12-bit"
            x="0"
            y="0"
            width="100%"
            height="100%"
            color-interpolation-filters="sRGB"
          >
            <feComponentTransfer>
              <feFuncR
                type="discrete"
                tableValues="0.0625 0.125 0.1875 0.25 0.3125 0.375 0.4375 0.5 0.5625 0.625 0.6875 0.75 0.8125 0.875 0.9375 1"
              ></feFuncR>
              <feFuncG
                type="discrete"
                tableValues="0.0625 0.125 0.1875 0.25 0.3125 0.375 0.4375 0.5 0.5625 0.625 0.6875 0.75 0.8125 0.875 0.9375 1"
              ></feFuncG>
              <feFuncB
                type="discrete"
                tableValues="0.0625 0.125 0.1875 0.25 0.3125 0.375 0.4375 0.5 0.5625 0.625 0.6875 0.75 0.8125 0.875 0.9375 1"
              ></feFuncB>
            </feComponentTransfer>
          </filter>
        </svg>
      )}

      <Frame variant="status" style={{ width: "100%" }}>
        <div
          style={{
            background: "linear-gradient(to right, rgb(0,0,0), rgb(0, 255, 0))",
            height: 35,
            filter: withFilter ? "url(#color-depth-12-bit)" : undefined,
          }}
        />
      </Frame>
      <HStack gap={16}>
        <DemoImg
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/RGB_24bits_palette_sample_image.jpg"
          style={{
            filter: withFilter ? "url(#color-depth-12-bit)" : undefined,
          }}
        />
        <ColorWheel
          style={{
            filter: withFilter ? "url(#color-depth-12-bit)" : undefined,
          }}
        />
      </HStack>
    </Wrapper>
  );
};

const ColorDepthDemo = {
  ThreeBit,
  FourBitRGBI,
  SixBit,
  NineBit,
  TwelveBit,
};

export default ColorDepthDemo;
