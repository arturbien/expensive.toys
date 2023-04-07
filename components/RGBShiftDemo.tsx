import React from "react";
import styled, { useTheme } from "styled-components";
import Code from "./UI/Code";
import { HStack, VStack } from "./UI/Stack";
import { Checkbox, Frame, NumberInput, Separator } from "react95";
import ProfilePic from "../public/profile-pic.jpeg";
import Image from "next/image";
import BrokenPopup from "./BrokenPopup";

const RGBShiftEditorWrapper = styled.div`
  background: #808080;
`;
const Highlight = styled.span`
  position: absolute;
  inset: -4px;
`;
const HighlightChange = ({
  children,
  ...otherProps
}: React.ComponentProps<typeof Highlight>) => {
  const theme = useTheme();
  const ref = React.useRef<null | HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.animate(
      [
        { background: "transparent" },
        { background: theme.focusSecondary },
        { background: "transparent" },
      ],
      {
        duration: 600,
        iterations: 1,
      }
    );
  }, [children, theme]);

  return (
    <span style={{ position: "relative" }}>
      <Highlight ref={ref} {...otherProps} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
};

export const Interactive = () => {
  const theme = useTheme();

  const [dxRed, setDxRed] = React.useState(1);
  const [dyRed, setDyRed] = React.useState(2);

  const [dxCyan, setDxCyan] = React.useState(-2);
  const [dyCyan, setDyCyan] = React.useState(-1);

  const filterId = "rgb-shift";
  return (
    <div>
      <svg width="0" height="0">
        <filter id={filterId}>
          <feOffset in="SourceGraphic" dx={dxRed} dy={dyRed} result="red" />
          <feComponentTransfer in="red" result="red-shift">
            <feFuncR type="identity" />
            <feFuncG type="discrete" tableValues="0" />
            <feFuncB type="discrete" tableValues="0" />
          </feComponentTransfer>

          <feOffset in="SourceGraphic" dx={dxCyan} dy={dyCyan} result="cyan" />
          <feComponentTransfer in="cyan" result="cyan-shift">
            <feFuncR type="discrete" tableValues="0" />
            <feFuncG type="identity" />
            <feFuncB type="identity" />
          </feComponentTransfer>

          <feBlend
            in="red-shift"
            in2="cyan-shift"
            mode="screen"
            result="color-shift"
          />
          {/* <feComposite in="color-shift" in2="SourceGraphic" operator="in" /> */}
        </filter>
      </svg>

      <RGBShiftEditorWrapper>
        <VStack>
          <HStack p={32} alignItems="center" justifyContent="center">
            <Image
              src={ProfilePic}
              alt="Artur Bień with a laptop"
              style={{
                filter: `url(#${filterId})`,
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </HStack>
          <Frame>
            <VStack gap={16} p={12}>
              <HStack
                gap={16}
                alignItems="center"
                justifyContent="space-between"
              >
                <span>
                  <strong>Red</strong>
                </span>
                <HStack gap={16}>
                  <HStack gap={8} alignItems="center">
                    <span>dx</span>
                    <NumberInput value={dxRed} onChange={setDxRed} width={76} />
                  </HStack>
                  <HStack gap={8} alignItems="center">
                    <span>dy</span>
                    <NumberInput value={dyRed} onChange={setDyRed} width={76} />
                  </HStack>
                </HStack>
              </HStack>
              <HStack
                gap={16}
                alignItems="center"
                justifyContent="space-between"
              >
                <span>
                  <strong>Cyan</strong>
                </span>
                <HStack gap={16}>
                  <HStack gap={8} alignItems="center">
                    <span>dx</span>
                    <NumberInput
                      value={dxCyan}
                      onChange={setDxCyan}
                      width={76}
                    />
                  </HStack>
                  <HStack gap={8} alignItems="center">
                    <span>dy</span>
                    <NumberInput
                      value={dyCyan}
                      onChange={setDyCyan}
                      width={76}
                    />
                  </HStack>
                </HStack>
              </HStack>
              <Separator />
              <Checkbox label="Clip to source" />
            </VStack>
          </Frame>
        </VStack>
      </RGBShiftEditorWrapper>

      <Code style={{ whiteSpace: "pre" }}>
        {`<svg width="0" height="0">
  <filter id="`}
        {filterId}
        {`">
    <feOffset in="SourceGraphic" dx="`}
        <HighlightChange key={`dxRed-${dxRed}`}>{dxRed}</HighlightChange>
        {`" dy="`}
        <HighlightChange key={`dyRed-${dyRed}`}>{dyRed}</HighlightChange>
        {`" result="red" />
    <feComponentTransfer in="red" result="red-shift">
        <feFuncR type="identity" />
        <feFuncG type="discrete" tableValues="0" />
        <feFuncB type="discrete" tableValues="0" />
    </feComponentTransfer>

    <feOffset in="SourceGraphic" dx="`}
        <HighlightChange key={`dxCyan-${dxCyan}`}>{dxCyan}</HighlightChange>
        {`" dy="`}
        <HighlightChange key={`dyCyan-${dyCyan}`}>{dyCyan}</HighlightChange>
        {`" result="cyan" />
    <feComponentTransfer in="cyan" result="cyan-shift">
        <feFuncR type="discrete" tableValues="0" />
        <feFuncG type="identity" />
        <feFuncB type="identity" />
    </feComponentTransfer>

    <feBlend in="red-shift" in2="cyan-shift" mode="screen" result="color-shift" />
    <feComposite in="color-shift" in2="SourceGraphic" operator="in" />
  </filter>
</svg>
`}
      </Code>
      <div
        style={{
          position: "relative",
          filter: `url(#${filterId})`,
          display: "inline-block",
        }}
      >
        {/* <BrokenPopup /> */}
      </div>
    </div>
  );
};

const RGBShiftDemo = {
  Interactive,
};

export default RGBShiftDemo;
// filter: url(
//   "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1'><filter id='rgb-shift'><feOffset in='SourceGraphic' dx='-4' dy='-2' result='red' /><feComponentTransfer in='red' result='red-shift'><feFuncR type='identity' /><feFuncG type='discrete' tableValues='0' /><feFuncB type='discrete' tableValues='0' /></feComponentTransfer><feOffset in='SourceGraphic' dx='2' dy='4' result='cyan' /><feComponentTransfer in='cyan' result='cyan-shift'><feFuncR type='discrete' tableValues='0' /><feFuncG type='identity' /><feFuncB type='identity' /></feComponentTransfer><feBlend in='red-shift' in2='cyan-shift' mode='screen' result='color-shift' /></filter></svg>#rgb-shift"
// );
