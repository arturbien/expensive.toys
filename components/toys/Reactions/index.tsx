import React from "react";
import { Counter, Frame } from "react95";
import styled from "styled-components";
import { HStack, VStack } from "../../UI/Stack";
import Reactions from "./Reactions";
import balloons from "../../balloons";

const Workspace = styled.div`
  padding: 160px 0;
  background: ${(p) => p.theme.canvas};
  background-image: radial-gradient(
    ${(p) => p.theme.canvasText} 1px,
    transparent 0
  );
  background-size: 40px 40px;
  overflow: auto;
  touch-action: manipulation;
  overflow: hidden;
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

const Demo = () => {
  const initialCount = 10;
  const [counter, setCounter] = React.useState(initialCount);

  const onLikeCountChange = (count: number) => {
    if (initialCount - count === 0) {
      balloons();
    }
    setCounter(Math.max(initialCount - count, 0));
  };
  return (
    <>
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
            <HStack justifyContent="center">
              <Reactions onLikeCountChange={onLikeCountChange} />
            </HStack>
          </Workspace>
        </Frame>
        <HStack justifyContent="center" pb={4} pt={6}>
          <Counter minLength={3} value={counter} size="md" />
        </HStack>
      </Frame>
    </>
  );
};

export default Demo;
