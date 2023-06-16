import React from "react";
import styled from "styled-components";

const OutlinedStickerWrapper = styled.div`
  user-select: none;
  display: inline-block;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.65));
  & > svg {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
`;

const BorderedStickerInner = styled.div`
  position: relative;
  filter: url(#outlineColored);
`;

const Text = styled.div`
  &::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(
        130deg,
        red,
        orange,
        yellow,
        green,
        blue,
        indigo,
        violet,
        red
      ),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 310' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");

    background-size: 100% 100%, 250px;
    mix-blend-mode: hard-light;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-blend-mode: color-dodge;
    background-blend-mode: overlay;
    opacity: 0.75;
  }
`;

// TODO: rainbow outline, allow for customizing outline color
export const OutlinedSticker = ({
  children,
  outline = 4,
  shiny,
}: {
  outline?: number;
  children: React.ReactNode;
  shiny?: boolean;
}) => {
  const filterId = React.useId();

  return (
    <OutlinedStickerWrapper>
      <svg width="0" height="0">
        <filter id={filterId}>
          <feMorphology
            in="SourceAlpha"
            result="Dilated"
            operator="dilate"
            radius={outline}
          />
          <feFlood floodColor="#ffffff" result="OutlineColor" />
          <feComposite
            in="OutlineColor"
            in2="Dilated"
            operator="in"
            result="Outline"
          />
          <feMerge>
            <feMergeNode in="Outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <BorderedStickerInner
        style={{
          filter: `url(#${filterId})`,
        }}
      >
        {children}
      </BorderedStickerInner>
    </OutlinedStickerWrapper>
  );
};

export const TextSticker = ({
  text,
  fontSize,
  outline = 4,
  shiny,
}: {
  outline?: number;
  text: string;
  fontSize: number;
  shiny?: boolean;
}) => {
  const filterId = React.useId();

  return (
    <OutlinedStickerWrapper>
      <svg width="0" height="0">
        <filter id={filterId}>
          <feMorphology
            in="SourceAlpha"
            result="Dilated"
            operator="dilate"
            radius={outline}
          />
          <feFlood floodColor="#ffffff" result="OutlineColor" />
          <feComposite
            in="OutlineColor"
            in2="Dilated"
            operator="in"
            result="Outline"
          />
          <feMerge>
            <feMergeNode in="Outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <BorderedStickerInner
        style={{
          filter: `url(#${filterId})`,
        }}
      >
        <Text style={{ fontSize }} data-text={text}>
          {text}
        </Text>
      </BorderedStickerInner>
    </OutlinedStickerWrapper>
  );
};

const PuffyStickerWrapper = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.45));

  & > svg {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    /* These width and height rules are important. */
    /* Otherwise it will not work in Safari  */
    width: 100%;
    height: 100%;
  }
`;

export const PuffySticker = ({
  children,
  ...otherProps
}: { children: React.ReactNode } & React.ComponentProps<
  typeof PuffyStickerWrapper
>) => {
  const filterId = React.useId();
  const filterRef = React.useRef<SVGFilterElement>(null);
  const childrenWrapperRef = React.useRef<HTMLDivElement>(null);
  const mouse = React.useRef({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const children = childrenWrapperRef.current;
    const filterElement = filterRef.current;
    const light = filterElement.querySelector("fePointLight");

    document.addEventListener("pointermove", function (event) {
      const childrenBox = children.getBoundingClientRect();
      mouse.current = {
        x: event.pageX - window.pageXOffset,
        y: event.pageY - window.pageYOffset,
      };
      light.setAttribute("y", (mouse.current.y - childrenBox.top).toString());
      light.setAttribute("x", (mouse.current.x - childrenBox.left).toString());
    });
    document.addEventListener("scroll", (event) => {
      const childrenBox = children.getBoundingClientRect();
      light.setAttribute("y", (mouse.current.y - childrenBox.top).toString());
      light.setAttribute("x", (mouse.current.x - childrenBox.left).toString());
    });
  }, []);

  return (
    <PuffyStickerWrapper {...otherProps}>
      <svg width="0" height="0">
        <filter id={filterId} ref={filterRef} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur1" />
          <feSpecularLighting
            result="spec1"
            in="blur1"
            // represents the height of the surface for a light filter primitive
            surfaceScale="5"
            // The bigger the value the bigger the reflection
            specularConstant="0.5"
            // controls the focus for the light source. The bigger the value the brighter the light
            specularExponent="120"
            lightingColor="#ffffff"
          >
            <fePointLight id="light" x="60" y="69" z="300" />
          </feSpecularLighting>
          <feComposite
            in="spec1"
            in2="SourceAlpha"
            operator="in"
            result="specOut2"
          />
          <feComposite
            in="SourceGraphic"
            in2="specOut2"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />
        </filter>
      </svg>
      <div
        style={{ filter: `url(#${filterId})`, isolation: "isolate" }}
        ref={childrenWrapperRef}
      >
        {children}
      </div>
    </PuffyStickerWrapper>
  );
};

const StickerWrapper = styled.div<{ shadow?: boolean }>`
  position: relative;
  /* display: inline-block; */
  user-select: none;
  filter: ${(p) =>
    p.shadow ? `drop-shadow(0.5px 0.5px 2px rgba(0, 0, 0, 0.45))` : ""};

  & > svg {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
`;

export const Sticker = ({
  children,
  outline,
  type,
  seed = 1,
  ...otherProps
}: {
  children: React.ReactNode;
  outline?: number;
  type:
    | "comic"
    | "holographic"
    | "holographic-monochrome"
    | "outlined"
    | "holographic-outline";
  seed?: number;
} & React.ComponentProps<typeof StickerWrapper>) => {
  const filterId = React.useId();
  return (
    <StickerWrapper {...otherProps}>
      <svg>
        {type === "holographic-monochrome" ? (
          <filter
            id={filterId}
            //  colorInterpolationFilters="sRGB"
          >
            <feMorphology
              in="SourceAlpha"
              result="Dilated"
              operator="dilate"
              radius={outline}
            />
            <feTurbulence
              baseFrequency="0.03 0.03"
              seed={seed}
              numOctaves="3"
              type="fractalNoise"
              result="turb"
            ></feTurbulence>

            <feComponentTransfer in="turb" result="gradient">
              <feFuncR type="table" tableValues="1 1 0.3 0 0.98 1" />
              <feFuncG type="table" tableValues="0 0 1 0.3 1 0" />
              <feFuncB type="table" tableValues="0 0.82 0 1 0 0" />
              <feFuncA type="table" tableValues="0 1" />
            </feComponentTransfer>
            <feComposite
              operator="in"
              in="gradient"
              in2="Dilated"
              result="holo"
            />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="-1 0 0 0 0
              0 -1 0 0 0
              0 0 -1 0 0
              -21.25 -71.54 -7.21 50 0"
              result="shape"
            ></feColorMatrix>
            <feComposite operator="over" in2="holo" in="shape" result="swa" />
            <feComponentTransfer in="swa" result="gradient">
              <feFuncA type="discrete" tableValues="0 1 1 1 1 1" />
            </feComponentTransfer>
          </filter>
        ) : null}
        {type === "holographic-outline" ? (
          <filter
            id={filterId}
            //  colorInterpolationFilters="sRGB"
          >
            <feMorphology
              in="SourceAlpha"
              result="Dilated"
              operator="dilate"
              radius={outline}
            />
            <feTurbulence
              baseFrequency="0.03 0.03"
              seed={seed}
              numOctaves="3"
              type="fractalNoise"
              result="turb"
            ></feTurbulence>

            <feComponentTransfer in="turb" result="gradient">
              <feFuncR type="table" tableValues="1 1 0.3 0 0.98 1" />
              <feFuncG type="table" tableValues="0 0 1 0.3 1 0" />
              <feFuncB type="table" tableValues="0 0.82 0 1 0 0" />
              <feFuncA type="table" tableValues="0 1" />
            </feComponentTransfer>
            <feComposite
              operator="in"
              in="gradient"
              in2="Dilated"
              result="holo"
            />

            <feComposite
              operator="over"
              in2="holo"
              in="SourceGraphic"
              result="swa"
            />
            <feComponentTransfer in="swa">
              <feFuncA type="discrete" tableValues="0 1 1 1 1 1" />
            </feComponentTransfer>
          </filter>
        ) : null}
        {type === "holographic" ? (
          <filter id={filterId} color-interpolation-filters="sRGB">
            <feOffset in="SourceAlpha" />
            <feColorMatrix
              type="matrix"
              values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"
              result="invert"
            />

            <feTurbulence
              baseFrequency="0.04 0.04"
              seed={seed}
              numOctaves="3"
              type="fractalNoise"
              result="turb"
            ></feTurbulence>

            <feComponentTransfer in="turb" result="gradient">
              <feFuncR type="table" tableValues="1 1 0.3 0 0.98 1" />
              <feFuncG type="table" tableValues="0 0 1 0.3 1 0" />
              <feFuncB type="table" tableValues="0 0.82 0 1 0 0" />
              <feFuncA type="table" tableValues="0 1" />
            </feComponentTransfer>
            <feComposite operator="in" in="gradient" in2="SourceAlpha" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                                           0 1 0 0 0
                                           0 0 1 0 0
                                           0 0 0 1.4 0 "
              result="colors"
            />
            <feBlend
              in2="SourceGraphic"
              in="colors"
              mode="multiply"
              result="B"
            />
          </filter>
        ) : null}
        {type === "comic" ? (
          <filter id={filterId}>
            <feMorphology
              in="SourceAlpha"
              result="Dilated"
              operator="dilate"
              radius={outline}
            />
            <feFlood floodColor="#ffffff" result="OutlineColor" />
            <feComposite
              in="OutlineColor"
              in2="Dilated"
              operator="in"
              result="Outline"
            />
            <feMerge>
              <feMergeNode in="Outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 0.5 1" />
              <feFuncG type="discrete" tableValues="0 0.5 1" />
              <feFuncB type="discrete" tableValues="0 0.5 1" />
            </feComponentTransfer>
          </filter>
        ) : null}
        {type === "outlined" ? (
          <filter id={filterId}>
            <feMorphology
              in="SourceAlpha"
              result="Dilated"
              operator="dilate"
              radius={outline}
            />
            <feFlood floodColor="#ffffff" result="OutlineColor" />
            <feComposite
              in="OutlineColor"
              in2="Dilated"
              operator="in"
              result="Outline"
            />
            <feMerge>
              <feMergeNode in="Outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ) : null}
      </svg>
      <div
        style={{
          filter:
            type === "holographic"
              ? `grayscale(1) url(#${filterId}) saturate(170%) brightness(1.2)`
              : `url(#${filterId})`,
        }}
      >
        {children}
      </div>
    </StickerWrapper>
  );
};
