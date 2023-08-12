import React from "react";
import styled from "styled-components";
import { useWidgets } from "./Widgets";

const ReflectionsLayer = styled.div`
  position: absolute;
  inset: 0;
  -webkit-mask-image: var(--reflections);
  mask: var(--reflections);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  pointer-events: none;
  /* background: blue; */
`;

const Reflections = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { rects } = useWidgets();
  // useEffect that creates a mask image css property from each rect
  React.useLayoutEffect(() => {
    const reflections = rects.map((rect) => {
      const r = rect.radius;
      const l = rect.left + r;
      const w = rect.width - 2 * r;
      const h = rect.width - 2 * r;
      const t = rect.top + r;
      console.log(rect.top);
      // RECTANGLES
      let mask = `${l}px ${rect.top}px/${w}px ${rect.height}px linear-gradient(black, black)`;
      mask += `, ${rect.left}px ${t}px/${rect.width}px ${h}px linear-gradient(black, black)`;

      // CORNERS

      // Left top corner
      mask += `, ${rect.left}px ${rect.top}px/${2 * r}px ${
        2 * r
      }px radial-gradient(black, black ${r}px, transparent ${r}px)`;
      // Right top corner
      mask += `, ${rect.right - 2 * r}px ${rect.top}px/${2 * r}px ${
        2 * r
      }px radial-gradient(black, black ${r}px, transparent ${r}px)`;

      // Left bottom corner
      mask += `, ${rect.left}px ${rect.bottom - 2 * r}px/${2 * r}px ${
        2 * r
      }px radial-gradient(black, black ${r}px, transparent ${r}px)`;

      // Right bottom corner
      mask += `, ${rect.right - 2 * r}px ${rect.bottom - 2 * r}px/${2 * r}px ${
        2 * r
      }px radial-gradient(black, black ${r}px, transparent ${r}px)`;

      return mask;
    });
    if (ref.current) {
      ref.current.style.setProperty("--reflections", reflections.join(", "));
      ref.current.style.setProperty("--reflections", reflections.join(", "));
    }
  }, [rects]);

  return (
    <ReflectionsLayer ref={ref}>
      <OneReflection />
    </ReflectionsLayer>
  );
};

export default Reflections;

const OneReflection = styled.div`
  position: absolute;
  transform: translate(var(--one-x), var(--one-y));
  width: 444px;
  height: 283px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(p) => p.theme.material};
    transform: scale(1.2);
    filter: blur(1px) opacity(0.2);
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: black;
    box-shadow: 0px 0px 2.2px rgba(0, 0, 0, 0.053),
      0px 0px 5.3px rgba(0, 0, 0, 0.077), 0px 0px 9.9px rgba(0, 0, 0, 0.095),
      0px 0px 17.6px rgba(0, 0, 0, 0.113), 0px 0px 33px rgba(0, 0, 0, 0.137),
      0px 0px 79px rgba(0, 0, 0, 0.19);
  }
`;
