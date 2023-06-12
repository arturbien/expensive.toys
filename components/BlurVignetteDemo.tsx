import copy from "copy-to-clipboard";
import { renderToString } from "react-dom/server";
import { Separator, Checkbox, Button } from "react95";
import { SliderControl } from "./SliderControl";
import SVGEffectEditor from "./UI/SVGEffectEditor";
import { VStack, HStack } from "./UI/Stack";
import process from "../lib/process";
import React from "react";
import ProfilePic from "../public/profile-pic.jpeg";
import Image from "next/image";
import styled, { css } from "styled-components";

const Tile = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  width: 300px;
  background: url(https://media.istockphoto.com/id/910527852/photo/taxi-ride-in-new-york-city.jpg?s=612x612&w=0&k=20&c=ueaQ7ZPYwOgSsfWOloyI41HmXaLIlYT853vG6x9xa1I=);
  background-size: cover;
`;

const BlurVignetteBackdrop = styled.div`
  /* ##### customize only these properties ##### */
  --radius: 32px;
  --inset: 16px;
  --transition-length: 16px;
  --blur: 15px;
  /* ###################################### */

  position: absolute;
  inset: 0;

  border-radius: var(--radius);
  -webkit-backdrop-filter: blur(var(--blur));
  backdrop-filter: blur(var(--blur));

  --r: max(var(--transition-length), calc(var(--radius) - var(--inset)));
  --corner-size: calc(var(--r) + var(--inset)) calc(var(--r) + var(--inset));
  --corner-gradient: transparent 0px,
    transparent calc(var(--r) - var(--transition-length)), black var(--r);
  --fill-gradient: black, black var(--inset),
    transparent calc(var(--inset) + var(--transition-length)),
    transparent calc(100% - var(--transition-length) - var(--inset)),
    black calc(100% - var(--inset));
  --fill-narrow-size: calc(100% - (var(--inset) + var(--r)) * 2);
  --fill-farther-position: calc(var(--inset) + var(--r));

  mask-image: linear-gradient(to right, var(--fill-gradient)),
    linear-gradient(to bottom, var(--fill-gradient)),
    radial-gradient(at bottom right, var(--corner-gradient)),
    radial-gradient(at bottom left, var(--corner-gradient)),
    radial-gradient(at top left, var(--corner-gradient)),
    radial-gradient(at top right, var(--corner-gradient));

  mask-size: 100% var(--fill-narrow-size), var(--fill-narrow-size) 100%,
    var(--corner-size), var(--corner-size), var(--corner-size),
    var(--corner-size);

  mask-position: 0 var(--fill-farther-position), var(--fill-farther-position) 0,
    0 0, 100% 0, 100% 100%, 0 100%;

  mask-repeat: no-repeat;
`;

const BasicDemo = () => {
  const codeRef = React.useRef<HTMLDivElement>(null);

  const [boxRadius, setBoxRadius] = React.useState(32);
  const [transitionLength, setTransitionLength] = React.useState(16);
  const [inset, setInset] = React.useState(8);
  const [blur, setBlur] = React.useState(15);

  const code = `
.blur-vignette {
  --radius: ${boxRadius}px;
  --inset: ${inset}px;
  --transition-length: ${transitionLength}px;
  --blur: ${blur}px;


  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  -webkit-backdrop-filter: blur(var(--blur));
  backdrop-filter: blur(var(--blur));
  --r: max(var(--transition-length), calc(var(--radius) - var(--inset)));
  --corner-size: calc(var(--r) + var(--inset)) calc(var(--r) + var(--inset));
  --corner-gradient: transparent 0px,
    transparent calc(var(--r) - var(--transition-length)), black var(--r);
  --fill-gradient: black, black var(--inset),
    transparent calc(var(--inset) + var(--transition-length)),
    transparent calc(100% - var(--transition-length) - var(--inset)),
    black calc(100% - var(--inset));
  --fill-narrow-size: calc(100% - (var(--inset) + var(--r)) * 2);
  --fill-farther-position: calc(var(--inset) + var(--r));
  -webkit-mask-image: linear-gradient(to right, var(--fill-gradient)),
    linear-gradient(to bottom, var(--fill-gradient)),
    radial-gradient(at bottom right, var(--corner-gradient)),
    radial-gradient(at bottom left, var(--corner-gradient)),
    radial-gradient(at top left, var(--corner-gradient)),
    radial-gradient(at top right, var(--corner-gradient));
  -webkit-mask-size: 100% var(--fill-narrow-size), var(--fill-narrow-size) 100%,
    var(--corner-size), var(--corner-size), var(--corner-size),
    var(--corner-size);
  -webkit-mask-position: 0 var(--fill-farther-position), var(--fill-farther-position) 0,
    0 0, 100% 0, 100% 100%, 0 100%;
  -webkit-mask-repeat: no-repeat;
}
  `;
  return (
    <div>
      <SVGEffectEditor
        title="Blur Vignette"
        codeRef={codeRef}
        code={code}
        filterTarget={
          <div
            style={{
              padding: 40,
            }}
          >
            <Tile
              style={{
                borderRadius: boxRadius + "px",
              }}
            >
              <style>{code}</style>
              <div className="blur-vignette"></div>
            </Tile>
          </div>
        }
        controls={
          <VStack gap={16}>
            <SliderControl
              label="Radius:"
              value={boxRadius}
              onChange={(value) => setBoxRadius(value)}
              min={0}
              max={64}
              step={2}
            />
            <SliderControl
              label="Inset:"
              value={inset}
              onChange={(value) => setInset(value)}
              min={0}
              max={40}
              step={2}
            />
            <SliderControl
              label="Transition:"
              value={transitionLength}
              onChange={(value) => setTransitionLength(value)}
              min={0}
              max={60}
              step={2}
            />

            <SliderControl
              label="Blur:"
              value={blur}
              onChange={(value) => setBlur(value)}
              min={0}
              max={50}
              step={1}
            />
            <Separator />
            <HStack justifyContent="flex-end" alignItems="center">
              <HStack gap={4}>
                <Button
                  style={{ whiteSpace: "nowrap" }}
                  size="lg"
                  primary
                  onClick={() => copy(code)}
                >
                  Copy CSS
                </Button>
              </HStack>
            </HStack>
          </VStack>
        }
      />
    </div>
  );
};

const Masks = () => (
  <Image
    src="/blur-vignette-mask.png"
    alt="Vignette mask composition made of 2 linear gradients and 4 radial gradients"
    width={1280}
    height={675}
    style={{
      width: "100%",
      height: "auto",
    }}
  />
);
const Filters = () => (
  <Image
    src="/vignette-filters.png"
    alt="Three images with three different Vignette Filter effects"
    width={1280}
    height={675}
    style={{
      width: "100%",
      height: "auto",
    }}
  />
);
const BlurVignetteDemo = {
  BasicDemo,
  Masks,
  Filters,
};

export default BlurVignetteDemo;
