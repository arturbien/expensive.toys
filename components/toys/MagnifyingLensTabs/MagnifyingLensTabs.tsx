import React from "react";
import styled from "styled-components";
import { useFocusVisible } from "react-aria";

const Highlights = styled.div`
  position: relative;
  --shadows-small: 0 5px 10px rgba(0, 0, 0, 0.12);
  --shadows-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
  --shadows-large: 0 30px 60px rgba(0, 0, 0, 0.12);
  --edge-grey: rgba(180, 180, 180, 1);
  box-shadow: var(--shadows-medium), 0 0 0px 0.5px var(--edge-grey);
  border-radius: 999px;
  display: flex;
  /* background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' style='filter:grayscale(100%25) brightness(50%25) opacity(70%25); '%3E%3Cfilter id='a' width='100%25' height='100%25' x='0%25' y='0%25'%3E%3CfeTurbulence baseFrequency='.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='none' filter='url(%23a)'/%3E%3C/svg%3E"); */
`;
// Shadows on Tabs component radically decrease performance
const Tabs = styled.div`
  display: inline-block;
  user-select: none;
  --safe-pad: 20px;
  --duration: 0s;
  --scale: 1.4;
  --ph: 8px;
  --pv: 8px;

  isolation: isolate;
  contain: paint layout style;
  /*   line-height: 1; */
  overflow: hidden;
  border-radius: 999px;
  padding: 16px 30px;
  --backdrop: blur(25px) saturate(170%) brightness(0.96);
  -webkit-backdrop-filter: var(--backdrop);
  backdrop-filter: var(--backdrop);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;

  position: relative;
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid rgba(255, 255, 255, 0.4);
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

const Nav = styled.div`
  display: inline-flex;
  gap: 16px;
  white-space: nowrap;
  font-size: 14px;
`;

const Tab = styled.button`
  all: unset;
  font-weight: 500;
  border-radius: 999px;
  padding: var(--pv) var(--ph);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  :focus-visible,
  &[data-focus] {
    box-shadow: inset 0px 0px 0px 2px -webkit-focus-ring-color;
    box-shadow: inset 0px 0px 0px 2px Highlight;
  }
  color: #0a0a0a;
  :hover,
  :active {
    opacity: 0.6;
  }
  isolation: isolate;
  text-shadow: 0px 1px 0.5px rgba(0, 0, 0, 0.2),
    -0.5px -0.5px 0px rgba(254, 254, 254, 1);
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
  pointer-events: none;
  position: absolute;
  top: 50%;
  display: inline-block;
  overflow: hidden;
  border-radius: 999px;
  --border-thickness: 2px;
  border: var(--border-thickness) solid transparent;

  box-sizing: content-box;
  height: 42px;
  --offset: calc((var(--scale) * var(--width) - var(--width)) / 2);
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
  box-sizing: border-box;
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
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0.4);
  --glass-filter: blur(0.25px);
  -webkit-backdrop-filter: var(--glass-filter);
  backdrop-filter: var(--glass-filter);
  box-shadow: 0 0 0px 0.5px rgba(0, 0, 0, 0.2),
    2px 2px 3px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0px 0.5px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.8));
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    top: 6px;
    height: 8px;
    border-radius: 4px;
    background: white;
    filter: opacity(0.7) blur(2px);
  }
`;
const LensShadow = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 6px;
  height: 4px;
  border-radius: 2px;
  background: white;
  /* filter: blur(3px); */
  filter: opacity(0.2) blur(3px);
`;

type Tab = {
  id: string;
  label: string;
  onClick?: () => void;
};
const MagnifyingLensTabs = ({
  tabs,
  selectedTabId,
  onSelectedTabChange,
}: {
  tabs: Tab[];
  selectedTabId: string;
  onSelectedTabChange: (tab: Tab) => void;
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLDivElement>(null);

  const updateMagnifierPosition = React.useCallback(
    (selectedTabId: string) => {
      const wrapper = wrapperRef.current;

      const selectedTabIndex = tabs.findIndex(
        (tab) => tab.id === selectedTabId
      );

      const nav = navRef.current;
      const tabsElements = Array.from(nav.children);
      const tab = tabsElements[selectedTabIndex];
      const rect = tab.getBoundingClientRect();
      const parentRect = nav.getBoundingClientRect();

      const x1 = rect.left - parentRect.left;

      wrapper.style.setProperty("--width", rect.width + "px");
      wrapper.style.setProperty("--x", x1 + "px");
    },
    [tabs]
  );
  // Not needed?
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateMagnifierPosition(selectedTabId);
      }
    });
    resizeObserver.observe(wrapperRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [selectedTabId, updateMagnifierPosition]);

  React.useLayoutEffect(() => {
    updateMagnifierPosition(selectedTabId);
  }, [selectedTabId, updateMagnifierPosition]);

  React.useEffect(() => {
    setTimeout(() => {
      wrapperRef.current.style.setProperty("--duration", "0.6s");
    }, 10);
  }, []);

  let { isFocusVisible } = useFocusVisible();
  const isFocusVisibleRef = React.useRef(isFocusVisible);

  React.useEffect(() => {
    isFocusVisibleRef.current = isFocusVisible;
  }, [isFocusVisible]);
  const magnifierRef = React.useRef<HTMLDivElement>(null);

  const onFocus: React.FocusEventHandler = React.useCallback((e) => {
    if (!isFocusVisibleRef.current) return;
    // get index of focused element within parent
    const index = Array.from(e.target.parentElement.children).indexOf(e.target);

    const magnifier = magnifierRef.current;
    const tabs = Array.from(magnifier.children);
    tabs[index].setAttribute("data-focus", "true");
  }, []);

  const onBlur: React.FocusEventHandler = React.useCallback((e) => {
    const magnifier = magnifierRef.current;
    magnifier.querySelector("[data-focus]")?.removeAttribute("data-focus");
  }, []);

  return (
    <Highlights>
      <Tabs ref={wrapperRef}>
        <Layers>
          <NormalLayer>
            <NormalNav ref={navRef}>
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onClick={() => onSelectedTabChange(tab)}
                >
                  {tab.label}
                </Tab>
              ))}
            </NormalNav>
            <NormalMask />
          </NormalLayer>

          <MagnifierLayer aria-hidden>
            <MagnifierNav ref={magnifierRef}>
              {tabs.map((tab) => (
                <Tab key={tab.id} as="div">
                  {tab.label}
                </Tab>
              ))}
            </MagnifierNav>
            <MangifierMask />
          </MagnifierLayer>

          <Lens>
            <LensShadow></LensShadow>
          </Lens>
        </Layers>

        <svg
          width="0"
          height="0"
          style={{ position: "absolute", pointerEvents: "none" }}
        >
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
    </Highlights>
  );
};

export default MagnifyingLensTabs;
