import React from "react";
import styled from "styled-components";
import Image from "next/image";

const BlurDownFrom = styled.div`
  position: absolute;
  inset: 0;
  background-position: 50% 50%;
  background-size: 100% 100%;
  image-rendering: pixelated;
`;

const BlurDownTo = styled.div``;
const StyledBlurDownImage = styled.div<{ loaded: boolean; blur: number }>`
  --duration: 1000ms;
  position: relative;
  isolation: isolate;
  svg {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  /* ${BlurDownFrom} {
    transition: opacity 0.6s ease-in-out;
    transition-delay: var(--duration);
    opacity: ${(p) => (p.loaded ? 0 : 1)};
  } */
  ${BlurDownTo} {
    transition: all var(--duration) cubic-bezier(0.4, 0, 0.2, 1);
    opacity: ${(p) => (p.loaded ? 1 : 0)};
    filter: blur(${(p) => (p.loaded ? 0 : p.blur)}px);
    /* mix-blend-mode: plus-lighter; */
    /* mix-blend-mode: color-dodge; */
  }
`;
const BlurDownImage = ({
  blurDataURL,
  blur = 20,
  style,
  ...otherProps
}: Omit<
  React.ComponentProps<typeof Image> & {
    alt: string;
  } & {
    blurDataURL: string;
    blur?: number;
  },
  "onLoad"
>) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <StyledBlurDownImage loaded={loaded} blur={blur}>
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <filter id="blur-down-from" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={blur} />
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 1" />
        </filter>
      </svg>
      <BlurDownFrom
        style={{
          backgroundImage: `url(${blurDataURL})`,
          filter: `url(#blur-down-from)`,
        }}
      />
      <BlurDownTo>
        <Image
          style={{
            position: "relative",
            zIndex: 1,
            ...style,
          }}
          {...otherProps}
          onLoad={() => {
            setLoaded(true);
          }}
          alt={otherProps.alt}
        />
      </BlurDownTo>
    </StyledBlurDownImage>
  );
};

export default BlurDownImage;
