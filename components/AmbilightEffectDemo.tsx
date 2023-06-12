import * as Dialog from "@radix-ui/react-dialog";
import copy from "copy-to-clipboard";
import Image from "next/image";
import React from "react";
import { browserName } from "react-device-detect";
import { renderToString } from "react-dom/server";
import { Button, Checkbox, Separator, Tooltip } from "react95";
import styled, { keyframes } from "styled-components";
import ThermalVisionHero from "../public/svg-heat-maps-hero.png";
import SVGEffectEditor from "./UI/SVGEffectEditor";
import { HStack, VStack } from "./UI/Stack";
import { SliderControl } from "./SliderControl";
import process from "../lib/process";

const BasicDemo = () => {
  const codeRef = React.useRef<HTMLDivElement>(null);

  const [saturation, setSaturation] = React.useState(3);
  const [colorCutoff, setColorCutoff] = React.useState(132);
  const [spread, setSpread] = React.useState(10);
  const [blur, setBlur] = React.useState(30);

  const [hideSource, setHideSource] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const svg = (
    <svg width="0" height="0" ref={svgRef}>
      <filter
        id="ambilight"
        width="300%"
        height="300%"
        x="-0.75"
        y="-0.75"
        colorInterpolationFilters="sRGB"
      >
        <feOffset in="SourceGraphic" result="source-copy" />
        <feColorMatrix
          in="source-copy"
          type="saturate"
          values={saturation.toString()}
          result="saturated-copy"
        />
        <feColorMatrix
          in="saturated-copy"
          type="matrix"
          values={`1 0 0 0 0
                     0 1 0 0 0
                     0 0 1 0 0
                     33 33 33 101 -${colorCutoff}`}
          result="bright-colors"
        />
        <feMorphology
          in="bright-colors"
          operator="dilate"
          radius={spread}
          result="spread"
        />
        <feGaussianBlur
          in="spread"
          stdDeviation={blur}
          result="ambilight-light"
        />

        {hideSource ? (
          false
        ) : (
          <>
            <feOffset in="SourceGraphic" result="source" />
            <feComposite in="source" in2="ambilight-light" operator="over" />
          </>
        )}
      </filter>
    </svg>
  );

  const code = mounted ? renderToString(svg) : "";

  //   const isChrome = useIsChrome();

  return (
    <div>
      {svg}
      <SVGEffectEditor
        title="Ambilight"
        codeRef={codeRef}
        code={process(code)}
        filterTarget={
          <div
            style={{
              padding: 60,
              filter: "url(#ambilight)",

              //   transform: "translateZ(0)",
            }}
          >
            {/* {isChrome ? (
              <iframe
                width="560"
                height="315"
                //   src="https://www.youtube.com/embed/G1hKzCkywM8?autoplay=1"
                src="https://www.youtube.com/embed/tO01J-M3g0U?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            ) : (
              <Image
                src={ThermalVisionHero}
                alt="Heat map"
                style={{
                  filter: "url(#ambilight)",
                  maxWidth: "100%",
                  height: "auto",
                  transform: "translateZ(0)",
                }}
              />
            )} */}
            <Image
              src={ThermalVisionHero}
              //   "key" used to force update on Safari
              key={hideSource.toString()}
              alt="Heat map"
              style={{
                filter: "url(#ambilight)",
                maxWidth: "100%",
                height: "auto",
                transform: "translateZ(0)",
              }}
            />
          </div>
        }
        controls={
          <VStack gap={16}>
            <SliderControl
              label="Saturation:"
              value={saturation}
              onChange={(value) => setSaturation(value)}
              min={1}
              max={4}
              step={0.5}
            />
            <SliderControl
              label="Color cutoff:"
              value={colorCutoff}
              onChange={(value) => setColorCutoff(value)}
              min={100}
              max={200}
              step={1}
              getLabelValue={(value) => value - 100 + "%"}
            />
            <SliderControl
              label="Spread:"
              value={spread}
              onChange={(value) => setSpread(value)}
              min={0}
              max={40}
              step={1}
            />
            <SliderControl
              label="Blur:"
              value={blur}
              onChange={(value) => setBlur(value)}
              min={0}
              max={40}
              step={1}
            />
            <Separator />
            <HStack justifyContent="space-between" alignItems="center">
              <Checkbox
                label="Hide source"
                checked={hideSource}
                onChange={() => setHideSource((state) => !state)}
              />
              <HStack gap={4}>
                <Button
                  style={{ whiteSpace: "nowrap" }}
                  size="lg"
                  primary
                  onClick={() => copy(code)}
                >
                  Copy filter
                </Button>
              </HStack>
            </HStack>
          </VStack>
        }
      />
    </div>
  );
};

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  backdrop-filter: brightness(0.1) blur(30px);
  z-index: 999;
`;

const DialogContent = styled(Dialog.Content)`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const IframeWrapper = styled.div`
  filter: url(#ambilight);
  padding: 40px;
  isolation: isolate;
  will-change: filter;
  overflow: hidden;

  @media only screen and (max-width: 660px) {
    iframe {
      transform: scale(0.6);
    }
  }
`;

function useIsChrome() {
  const [isChrome, setIsChrome] = React.useState(false);

  React.useEffect(() => {
    setIsChrome(browserName === "Chrome");
  }, []);

  return isChrome;
}

const spin = keyframes`
 0% { --deg: 0deg; }
 100% { --deg: 360deg; }
`;
const AmbilightButtonWrapper = styled.div`
  position: relative;
  margin: 24px 0;
  @property --deg {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }

  &::before {
    --deg: 0deg;
    content: "";
    position: absolute;
    inset: 0;
    background: conic-gradient(
      from var(--deg),
      red,
      yellow,
      lime,
      aqua,
      cyan,
      magenta,
      red
    );
    filter: blur(24px);
    animation: ${spin} 6s linear infinite;
    pointer-events: none;
  }
`;

const TVDemo = () => {
  const isChrome = useIsChrome();

  if (!isChrome)
    return (
      <HStack fullWidth justifyContent="center" alignItems="center">
        <AmbilightButtonWrapper>
          <Tooltip text="Browser not supported. Try Chrome.">
            <Button
              size="lg"
              disabled
              style={{ minWidth: 160, fontWeight: "bold" }}
            >
              Try Ambilight on Video !
            </Button>
          </Tooltip>
        </AmbilightButtonWrapper>
      </HStack>
    );

  return (
    <>
      <Dialog.Root>
        <HStack fullWidth justifyContent="center" alignItems="center">
          <AmbilightButtonWrapper>
            <Dialog.Trigger asChild>
              <Button
                size="lg"
                primary
                style={{ minWidth: 240, fontWeight: "bold" }}
              >
                Try Ambilight on Video !
              </Button>
            </Dialog.Trigger>
          </AmbilightButtonWrapper>
        </HStack>

        <Dialog.Portal container={document.getElementById("portal-root")!}>
          <DialogOverlay />
          <DialogContent>
            <VStack gap={24}>
              <Dialog.Title style={{ opacity: 0 }}>
                Ambilight video demo
              </Dialog.Title>
              <IframeWrapper>
                <iframe
                  width="560"
                  height="315"
                  // src="https://www.youtube.com/embed/G1hKzCkywM8?autoplay=1"
                  // src="https://www.youtube.com/embed/tO01J-M3g0U?autoplay=1"
                  // src="https://www.youtube.com/embed/mkggXE5e2yk"
                  src="https://www.youtube.com/embed/yAkVfopBbN0?autoplay=1&start=160"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </IframeWrapper>
            </VStack>
            <Dialog.Close asChild>
              <Button
                aria-label="Close"
                size="lg"
                style={{ position: "fixed", top: 16, right: 16 }}
              >
                Close
              </Button>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
const AmbilightEffectDemo = {
  BasicDemo,
  TVDemo,
};

export default AmbilightEffectDemo;
