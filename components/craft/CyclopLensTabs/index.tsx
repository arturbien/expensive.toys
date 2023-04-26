import React from "react";
import { Frame } from "react95";
import styled from "styled-components";
import { HStack } from "../../UI/Stack";
import CyclopLensTabs from "./CyclopLensTabs";

const Workspace = styled.div`
  padding: 120px 48px;
  background: url(https://img.freepik.com/free-vector/flat-design-geometric-shapes-background_23-2148366514.jpg?w=2000);
  background-size: cover;
`;
const Ruler = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  height: 40px;
  background: ${(p) => p.theme.material};
  /* ol {
    display: inline-flex;
    gap: 1mm;
  }
  li {
    height: 4px;
    width: 2px;
    background: ${(p) => p.theme.materialText};
  }
  li:nth-of-type(5n + 1) {
    height: 8px;
  }
  li:nth-of-type(10n + 1) {
    height: 12px;
  } */

  background-repeat: repeat-x;

  border-top: 2px solid ${(p) => p.theme.borderDarkest};
  border-bottom: 2px solid ${(p) => p.theme.borderDarkest};
  --tick-color: ${(p) => p.theme.borderDark};
  --tick-width: 2px;
  --spacing: 30px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background: linear-gradient(
        90deg,
        var(--tick-color) var(--tick-width),
        transparent 0
      )
      calc(-1 * var(--tick-width) / 2) / var(--spacing);
    height: 12px;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background: linear-gradient(
        90deg,
        var(--tick-color) var(--tick-width),
        transparent 0
      )
      calc(-1 * var(--tick-width) / 2) / calc(var(--spacing) / 5);
    height: 6px;
  }
`;

const Demo = () => {
  return (
    <Frame
      style={{ width: "100%", marginTop: 56, marginBottom: 32, padding: 4 }}
    >
      <Frame style={{ width: "100%" }} variant="field">
        <Workspace>
          <Ruler />
          <HStack justifyContent="space-around">
            <CyclopLensTabs
              tabs={[
                { label: "All Posts" },
                { label: "Engineering" },
                { label: "Community" },
                { label: "Press" },
                { label: "Changelog" },
              ]}
            />
          </HStack>
        </Workspace>
      </Frame>
    </Frame>
  );
};

export default Demo;
