import { createHatchedBackground } from "react95/dist/common";
import styled from "styled-components";

const StyledEmbossedText = styled.div`
  flex-shrink: 0;
  position: relative;
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: ${(p) => p.theme.borderDark};
  text-shadow: -1px -1px 0px ${(p) => p.theme.materialText},
    1px 1px 0px ${(p) => p.theme.borderLightest};
  font-style: italic;
  &::before {
    display: block;
    pointer-events: none;
    content: attr(data-text);
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    ${(p) =>
      createHatchedBackground({
        mainColor: p.theme.material,
        pixelSize: 1,
      })}
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: none;
  }
`;

import React from "react";

type Props = {
  text: string;
};
const EmbossedText = ({ text }: Props) => {
  return <StyledEmbossedText data-text={text}>{text}</StyledEmbossedText>;
};

export default EmbossedText;
