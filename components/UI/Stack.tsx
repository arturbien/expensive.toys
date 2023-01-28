import styled, { CSSProperties } from "styled-components";

interface StackProps {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  gap?: number;
  children: React.ReactNode;
  m?: number; // margin
  mt?: number; // margin-top
  mr?: number; // margin-right
  mb?: number; // margin-bottom
  ml?: number; // margin-left
  p?: number; // padding
  pt?: number; // padding-top
  pr?: number; // padding-right
  pb?: number; // padding-bottom
  pl?: number; // padding-left
  stretch?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

const side =
  (side?: "top" | "right" | "bottom" | "left") =>
  (prop: string, value: number) =>
    `${prop}${side ? `-${side}` : ""}: ${value}px;
    `;

const Stack = styled.div<
  StackProps & {
    flexDirection: CSSProperties["flexDirection"];
  }
>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap || 0}px;

  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}

  ${(props) =>
    props.stretch &&
    `
    > * {
      flex: 1;
    }
  `}

  ${(props) => props.m && side()("margin", props.m)}
  ${(props) => props.mt && side("top")("margin", props.mt)}
  ${(props) => props.mr && side("right")("margin", props.mr)}
  ${(props) => props.mb && side("bottom")("margin", props.mb)}
  ${(props) => props.ml && side("left")("margin", props.ml)}

  ${(props) => props.p && side()("padding", props.p)}
  ${(props) => props.pt && side("top")("padding", props.pt)}
  ${(props) => props.pr && side("right")("padding", props.pr)}
  ${(props) => props.pb && side("bottom")("padding", props.pb)}
  ${(props) => props.pl && side("left")("padding", props.pl)}
`;

export const HStack = (props: StackProps) => (
  <Stack flexDirection="row" {...props} />
);
export const VStack = (props: StackProps) => (
  <Stack flexDirection="column" {...props} />
);
