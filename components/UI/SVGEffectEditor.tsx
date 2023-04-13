import Image from "next/image";
import React from "react";
import { Button, Frame } from "react95";
import styled from "styled-components";
import BulbIcon from "../../public/icons/bulb.png";
import { HStack, VStack } from "./Stack";
import T from "./Typography";

const LogoText = styled.div`
  font-size: 22px;
  font-weight: bold;
  flex-shrink: 0;
`;

const RGBSplitEditorWrapper = styled.div`
  background: #808080;
  contain: paint, layout, size;
`;

type Props = {
  title: string;
  codeRef: React.RefObject<HTMLDivElement>;
  code: string;
  filterTarget: React.ReactNode;
  controls: React.ReactNode;
  bg?: string;
};
const SVGEffectEditor = ({
  title,
  codeRef,
  filterTarget,
  code,
  controls,
  bg,
}: Props) => {
  const [debugMode, setDebugMode] = React.useState(false);

  return (
    <RGBSplitEditorWrapper style={{ background: bg }}>
      <Frame style={{ width: "100%", zIndex: 1 }}>
        <HStack p={16} alignItems="center" justifyContent="space-between">
          <LogoText>
            <T.Embossed>{title}</T.Embossed>
          </LogoText>
          <Button
            square
            size="lg"
            active={debugMode}
            onClick={() => setDebugMode((state) => !state)}
            aria-label="Toggle debug mode"
            title="Toggle debug mode"
            style={{ fontWeight: "bold" }}
          >
            {"{ }"}
          </Button>
        </HStack>
      </Frame>
      <VStack>
        <div style={{ position: "relative" }}>
          <HStack
            alignItems="center"
            justifyContent="center"
            style={{ position: "relative" }}
          >
            <div>{filterTarget}</div>
          </HStack>

          <Frame
            style={{
              position: "absolute",
              top: -2,
              bottom: -2,
              left: 0,
              right: 0,
              opacity: debugMode ? "1" : "0",
              pointerEvents: debugMode ? "auto" : "none",
            }}
            variant="well"
          >
            <code
              ref={codeRef}
              style={{
                display: "block",
                whiteSpace: "pre",
                fontSize: 12,
                padding: 16,
                height: "100%",
                width: "100%",
                overflow: "auto",
              }}
            >
              {code}
            </code>
          </Frame>
        </div>
        <Frame>
          <VStack gap={16} p={16}>
            {controls}
          </VStack>
        </Frame>
      </VStack>
    </RGBSplitEditorWrapper>
  );
};
export default SVGEffectEditor;
