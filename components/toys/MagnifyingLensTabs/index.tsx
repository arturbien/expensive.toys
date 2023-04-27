import React from "react";
import { Checkbox, Frame } from "react95";
import styled from "styled-components";
import { HStack } from "../../UI/Stack";
import MagnifyingLensTabs from "./MagnifyingLensTabs";
import shapesBg from "../../../public/shapes-bg.png";

const Workspace = styled.div`
  background: url(${shapesBg.src});
  background-size: 200%;
  background-size: cover;
`;
const Ruler = styled.div`
  position: relative;
  display: flex;

  height: 40px;
  background: ${(p) => p.theme.material};

  background-repeat: repeat-x;
  border-bottom: 2px solid ${(p) => p.theme.borderDarkest};
  box-shadow: inset 0px -2px 0px 0px ${(p) => p.theme.borderDark};

  --tick-color: ${(p) => p.theme.materialText};
  --tick-width: 2px;
  --spacing: 60px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 2px;
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
    bottom: 2px;
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

const items = [
  { label: "Sweets", id: "Sweets" },
  { label: "Games", id: "Games" },
  { label: "Toys", id: "Toys" },
  { label: "Balloons", id: "Balloons" },
];
const Demo = () => {
  const [selectedTabId, setSelectedTabId] = React.useState(items[0].id);
  return (
    <Frame
      style={{
        display: "block",
        marginTop: 32,
        marginBottom: 32,
        marginLeft: -16,
        marginRight: -16,
        padding: 4,
      }}
    >
      <Frame style={{ width: "100%", padding: 4 }} variant="field">
        <Ruler
          style={{
            alignSelf: "flex-start",
            marginLeft: -2,
            marginRight: -2,
            marginTop: -2,
          }}
        />
        <Workspace>
          <HStack justifyContent="space-around" style={{ padding: "120px 0" }}>
            <MagnifyingLensTabs
              selectedTabId={selectedTabId}
              onSelectedTabChange={(tab) => setSelectedTabId(tab.id)}
              tabs={items}
            />
          </HStack>
        </Workspace>
      </Frame>
      <HStack pl={4}>
        <Checkbox label="Slow motion" />
      </HStack>
    </Frame>
  );
};

export default Demo;
