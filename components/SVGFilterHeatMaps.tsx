// https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/
import { Checkbox, Frame } from "react95";
import styled from "styled-components";
import Image from "next/image";
import { createPerlinMatrix } from "./CssHeatMaps";
import React from "react";

const GradientDemo = ({ variant }: { variant: "before" | "after" }) => {
  const withFilter = variant === "after";
  return (
    <div>
      {withFilter && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0"
          height="0"
          style={{ position: "fixed", left: "100%", top: "100%" }}
        >
          <filter id="blue-red" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0 1" />
              <feFuncG type="table" tableValues="0 0" />
              <feFuncB type="table" tableValues="1 0" />
            </feComponentTransfer>
          </filter>
        </svg>
      )}
      <Frame variant="status" style={{ width: "100%" }}>
        <div
          style={{
            background: "linear-gradient(to right, black, white)",
            height: 35,
            filter: withFilter ? "url(#blue-red)" : undefined,
          }}
        />
      </Frame>
    </div>
  );
};

const ThermalDemo = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  background: black;
  overflow: hidden;
  div {
    width: 30%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background: white;
    filter: blur(60px);

    position: absolute;
    top: 50%;
    left: 50%;
  }
  div:first-of-type {
    transform: translate(-100%, -50%);
  }
  div:last-of-type {
    transform: translate(0%, -50%);
  }
  p {
    font-size: 120px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    filter: blur(8px);
    text-align: center;
  }
`;
const ThermalVisionDemo = () => {
  const [filterOn, setFilterOn] = React.useState(true);
  return (
    <div>
      <Checkbox
        label={"Enable filter"}
        onChange={(e) => setFilterOn((state) => !state)}
        checked={filterOn}
      />
      <ThermalDemo
        style={{ filter: filterOn ? "url(#thermal-vision)" : undefined }}
      >
        <div />
        <div />
        <p>thermal vision</p>
      </ThermalDemo>
    </div>
  );
};

const Grid = styled.div<{ x: number; y: number; filterOn: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(p) => p.x}, 1fr);
  grid-template-rows: repeat(${(p) => p.y}, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  position: relative;
  isolation: isolate;

  div {
    aspect-ratio: 1;
    position: relative;
  }
  div::before {
    content: "";
    position: absolute;
    inset: 0;
    background: hsl(0, 0%, calc(100% * var(--intensity)));
    filter: ${(p) => (p.filterOn ? "url(#thermal-vision)" : "none")};
  }
  div:hover::after {
    content: attr(data-intensity);
    position: absolute;
    bottom: 100%;
    pointer-events: none;
    font-size: 14px;
    padding: 4px 8px;
    max-width: 40px;
    border: 2px solid ${(p) => p.theme.borderDarkest};
    background: ${(p) => p.theme.tooltip};
    color: ${(p) => p.theme.materialText};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 1;
  }
`;
const GridDemo = () => {
  const [filterOn, setFilterOn] = React.useState(true);
  const x = 40;
  const y = 20;
  const grid = createPerlinMatrix(x, y, 25, 0.3)
    .flatMap((a) => a)
    .map((value) => Number(((value + 1) / 2).toFixed(2)));

  return (
    <div>
      <Checkbox
        label={"Enable filter"}
        onChange={(e) => setFilterOn((state) => !state)}
        checked={filterOn}
      />
      <Grid x={x} y={y} filterOn={filterOn}>
        {grid.map((dataPoint, index) => (
          <div
            key={index}
            style={{
              // @ts-expect-error
              "--intensity": dataPoint,
            }}
            data-intensity={dataPoint}
          />
        ))}
      </Grid>
    </div>
  );
};

const ImagesStack = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  img {
    display: block;
    width: 50%;
    min-width: 320px;
    object-fit: cover;
  }
`;
const ImagesDemo = () => {
  return (
    <ImagesStack>
      <Image
        src="/thermal-vision-person.png"
        alt="Black and white thermal vision picture of a person"
        width={480}
        height={480}
      />
      <Image
        src="/thermal-vision-person.png"
        alt="Thermal vision picture of a person"
        width={480}
        height={480}
        style={{
          filter: "url(#thermal-vision)",
        }}
      />
    </ImagesStack>
  );
};

const InvertedImagesDemo = () => {
  return (
    <ImagesStack>
      <Image
        src="/thermal-vision-silhouette.png"
        alt="Blurred silhouette of a person"
        width={480}
        height={480}
      />
      <Image
        src="/thermal-vision-silhouette.png"
        alt="Thermal vision picture of a person"
        width={480}
        height={480}
        style={{
          filter: "invert(1) url(#thermal-vision)",
        }}
      />
    </ImagesStack>
  );
};

const ThermalVisionFilter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0"
    height="0"
    style={{ position: "fixed", left: "100%", top: "100%" }}
  >
    <filter id="thermal-vision" colorInterpolationFilters="sRGB">
      <feComponentTransfer>
        <feFuncR type="table" tableValues="0  0.125  0.8    1      1" />
        <feFuncG type="table" tableValues="0  0      0      0.843  1" />
        <feFuncB type="table" tableValues="0  0.549  0.466  0      1" />
      </feComponentTransfer>
    </filter>
  </svg>
);

const SVGFilterHeatMaps = {
  GradientDemo,
  ThermalVisionDemo,
  ImagesDemo,
  InvertedImagesDemo,
  GridDemo,
  ThermalVisionFilter,
};

export default SVGFilterHeatMaps;
