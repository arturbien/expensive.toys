import React from "react";
import styled from "styled-components";

const Tabs = styled.div`
  display: inline-block;

  --safe-pad: 20px;
  --duration: 0.8s;
  --scale: 1.4;

  isolation: isolate;
  contain: paint layout style;
  /*   line-height: 1; */
  overflow: hidden;
  border-radius: 34px;
  padding: 24px 38px;
  --backdrop: blur(35px) saturate(170%);
  -webkit-backdrop-filter: var(--backdrop);
  backdrop-filter: var(--backdrop);
  border: 2px solid rgba(255, 255, 255, 0.4);
  font-family: arial;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  position: relative;

  svg {
    position: absolute;
    pointer-events: none;
  }
`;

const Layers = styled.div`
  position: relative;
`;

const RemoveBlack = styled.div`
  display: flex;
  isolation: isolate;
  contain: layout paint;
  filter: invert(1) url(#remove-black) invert(1);
`;

const NormalLayer = styled(RemoveBlack)`
  position: relative;
`;

const MagnifierLayer = styled(RemoveBlack)`
  position: absolute;
  pointer-events: none;
  contain: strict;
  box-sizing: content-box;
  inset: 0 calc(-1 * var(--safe-pad));
`;

const Nav = styled.nav`
  display: inline-flex;
  gap: 32px;
  white-space: nowrap;
  font-size: 14px;
`;

const NormalNav = styled(Nav)``;

const MagnifierNav = styled(Nav)`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 50%;
  perspective: 800px;
  transform: translateY(-50%) scale(var(--scale));
  transform-origin: calc(var(--x) + var(--width) / 2 + var(--safe-pad)) center;

  transition-duration: var(--duration);
  transition-property: transform-origin;
  transition-timing-function: ease;
  will-change: transform-origin;

  padding: var(--safe-pad);
  text-shadow: 0.25px 0.25px 0px rgba(255, 0, 0, 0.8), -0.25px -0.25px 0px cyan;
`;

const Mask = styled.div`
  position: absolute;
  top: 50%;
  display: inline-block;
  overflow: hidden;
  border-radius: 26px;
  --ph: 12px;
  --border-thickness: 2px;
  border: var(--border-thickness) solid transparent;

  padding: 8px var(--ph);
  box-sizing: content-box;
  height: calc(var(--scale) * 100%);
  --offset: calc(
    (var(--scale) * var(--width) - var(--width)) / 2 + var(--ph) +
      var(--border-thickness)
  );
  width: calc(var(--scale) * var(--width));
  /*   For some reason animating X in translate instead of "left" breaks the effect */
  left: calc(var(--x) - var(--offset));
  transform: translate(0, -50%);
  transition-duration: var(--duration);
  transition-property: left, width;
  transition-timing-function: ease;
  will-change: left, width;
  contain: strict;
  isolation: isolate;
`;
const NormalMask = styled(Mask)`
  background: white;
`;
const MangifierMask = styled(Mask)`
  left: calc(var(--x) - var(--offset) + var(--safe-pad));
  width: calc(var(--scale) * var(--width));
  background: black;
  outline: 100vw solid white;
  overflow: auto;
  filter: url(#remove-black-smooth);
`;
const Lens = styled(Mask)`
  border-color: rgba(255, 255, 255, 0.4);
  --glass-filter: blur(0.5px);
  -webkit-backdrop-filter: var(--glass-filter);
  backdrop-filter: var(--glass-filter);
  box-shadow: 0 0 0px 0.5px rgba(0, 0, 0, 0.2),
    2px 2px 3px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0px 0.5px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.8));
    /*   background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' style='filter:grayscale(100%25) brightness(50%25) opacity(70%25); '%3E%3Cfilter id='a' width='100%25' height='100%25' x='0%25' y='0%25'%3E%3CfeTurbulence baseFrequency='.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='none' filter='url(%23a)'/%3E%3C/svg%3E"); */
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    top: 8px;
    height: 8px;
    border-radius: 4px;
    background: white;
    filter: blur(3px);
  }
`;

const CyclopLensTabs = ({
  tabs,
}: {
  tabs: {
    label: string;
    onClick?: () => void;
  }[];
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const center = wrapperRef.current;

    center.addEventListener("mousemove", (e) => {
      var rect = center.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top; //y position within the element.
      center.style.setProperty("--mouse-x", x + "px");
      center.style.setProperty("--mouse-y", y + "px");
    });

    const nav = navRef.current;
    const tabs = Array.from(nav.children);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // remove active class from all tabs
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });

        // add active class to clicked tab
        tab.classList.add("active");

        // get position of clicked tab
        const rect = tab.getBoundingClientRect();
        const parentRect = nav.getBoundingClientRect();

        // calculate clip path coordinates
        const x1 = rect.left - parentRect.left;

        center.style.setProperty("--width", rect.width + "px");
        center.style.setProperty("--x", x1 + "px");
      });
    });
  }, [tabs]);

  return (
    <Tabs ref={wrapperRef}>
      <Layers>
        <NormalLayer>
          <NormalNav ref={navRef}>
            {tabs.map((tab, i) => (
              <div key={i}>{tab.label}</div>
            ))}
          </NormalNav>
          <NormalMask />
        </NormalLayer>

        <MagnifierLayer>
          <MagnifierNav>
            {tabs.map((tab, i) => (
              <div key={i}>{tab.label}</div>
            ))}
          </MagnifierNav>
          <MangifierMask />
        </MagnifierLayer>

        <Lens />
      </Layers>

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
          <feComposite in="SourceGraphic" in2="black-pixels" operator="out" />
        </filter>
        <filter id="remove-black-smooth" colorInterpolationFilters="sRGB">
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
    </Tabs>
  );
};

export default CyclopLensTabs;
