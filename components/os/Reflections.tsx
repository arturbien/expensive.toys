import React from "react";
import styled from "styled-components";
import { useWidgets } from "./Widgets";
import { Cursor } from "./Cursor";

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  filter: url(#hiblur);
`;
const ReflectionsLayer = styled.div`
  isolation: isolate;
  contain: strict;
  position: absolute;
  inset: 0;
  -webkit-mask-image: var(--reflections);
  mask: var(--reflections);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  pointer-events: none;
  /* filter: opacity(0.1); */

  perspective: 800px;
  perspective-origin: 50% 50%;
  /* background: blue; */
  & > * {
    filter: blur(0px) brightness(0.6);
    filter: blur(0.5px) saturate(140%) hue-rotate(-12deg) brightness(0.6);
  }
`;

const Reflections = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { rects } = useWidgets();
  // useEffect that creates a mask image css property from each rect
  React.useLayoutEffect(() => {
    const reflections = rects.map((rect) => {
      const {
        width,
        height,
        left,
        right,
        top,
        bottom,
        radius,
        reflectiveness,
      } = rect;

      // RECTANGLES

      // Center
      let mask = `${left + radius}px ${top + radius}px/${
        width - radius * 2
      }px ${height - radius * 2}px linear-gradient(rgba(0, 0, 0, ${
        reflectiveness / 100
      }), rgba(0, 0, 0, ${reflectiveness / 100}))`;
      // Top
      mask += `, ${left + radius}px ${top}px/${
        width - radius * 2
      }px ${radius}px linear-gradient(rgba(0, 0, 0, ${
        reflectiveness / 100
      }), rgba(0, 0, 0, ${reflectiveness / 100}))`;

      // Right
      mask += `, ${right - radius}px ${top + radius}px/${radius}px ${
        height - radius * 2
      }px linear-gradient(rgba(0, 0, 0, ${
        reflectiveness / 100
      }), rgba(0, 0, 0, ${reflectiveness / 100}))`;

      // Bottom
      mask += `, ${left + radius}px ${bottom - radius}px/${
        width - radius * 2
      }px ${radius}px linear-gradient(rgba(0, 0, 0, ${
        reflectiveness / 100
      }), rgba(0, 0, 0, ${reflectiveness / 100}))`;

      // Left
      mask += `, ${left}px ${top + radius}px/${radius}px ${
        height - radius * 2
      }px linear-gradient(rgba(0, 0, 0, ${
        reflectiveness / 100
      }), rgba(0, 0, 0, ${reflectiveness / 100}))`;

      // CORNERS

      // Top left
      mask += `, ${rect.left}px ${
        rect.top
      }px/${radius}px ${radius}px radial-gradient(at bottom right, rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }), rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }) ${radius}px, transparent ${radius}px)`;

      // Top right
      mask += `, ${rect.right - radius}px ${
        rect.top
      }px/${radius}px ${radius}px radial-gradient(at bottom left, rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }), rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }) ${radius}px, transparent ${radius}px)`;

      // Bottom right
      mask += `, ${rect.right - radius}px ${
        rect.bottom - radius
      }px/${radius}px ${radius}px radial-gradient(at top left, rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }), rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }) ${radius}px, transparent ${radius}px)`;

      // Bottom left
      mask += `, ${rect.left}px ${
        rect.bottom - radius
      }px/${radius}px ${radius}px radial-gradient(at top right, rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }), rgba(0, 0, 0, ${
        rect.reflectiveness / 100
      }) ${radius}px, transparent ${radius}px)`;

      return mask;
    });
    if (ref.current) {
      ref.current.style.setProperty("--reflections", reflections.join(", "));
      ref.current.style.setProperty("--reflections", reflections.join(", "));
    }
  }, [rects]);

  return (
    <Wrapper id="asd">
      <ReflectionsLayer
        ref={ref}
        style={
          {
            //  filter: "url(#hiblur)"
          }
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="800px"
          height="550px"
        >
          <defs>
            <filter id="hiblur" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="luminanceToAlpha"
                in="SourceGraphic"
                result="lumMap"
              />
              <feComponentTransfer in="lumMap" result="highlightMask">
                <feFuncA type="discrete" tableValues="0 0 0 0 0 0 1" />
              </feComponentTransfer>

              <feComposite
                operator="in"
                in="SourceGraphic"
                in2="highlightMask"
                result="highlights"
              />

              <feGaussianBlur
                in="highlights"
                stdDeviation="12"
                result="highBlur"
              />

              <feComposite
                operator="over"
                in="highBlur"
                in2="SourceGraphic"
                result="final"
              />
            </filter>

            <filter id="orton1" colorInterpolationFilters="linearRGB">
              <feColorMatrix
                type="matrix"
                in="SourceGraphic"
                result="brighter"
                values="1.3 0 0 0 0.1                                         0 1.3 0 0 0.1                                         0 0 1.3 0 0.1                                         0 0 0 1 0"
              />
              <feGaussianBlur
                in="brighter"
                stdDeviation="3"
                result="brightblur"
              />
              <feBlend mode="multiply" in="brighter" in2="brightblur" />
            </filter>
          </defs>
        </svg>

        <BackgroundReflection />

        <div
          id="reflections-portal"
          style={{
            position: "absolute",
            inset: 0,
            perspective: 550,
            transformStyle: "preserve-3d",
          }}
        >
          {/* <Cursor id="swag" reflection /> */}
        </div>
      </ReflectionsLayer>
    </Wrapper>
  );
};

export default Reflections;

const BackgroundReflection = styled.div`
  position: fixed;
  inset: 0;

  transform: scaleX(-1) scale(0.7) translate(20%, -12%);
  transform-origin: center;
  background: var(--os-bg);
  background-size: cover;
  filter: blur(0.5px) saturate(95%) hue-rotate(-8deg) brightness(1.3);
`;
