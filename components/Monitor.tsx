import React from "react";
import styled from "styled-components";
import { Monitor as React95Monitor } from "react95";

const Wrapper = styled.div<{ width?: number }>`
  width: ${(p) => p.width || 195}px;
  aspect-ratio: 1.04;
  & > * {
    transform: scale(${(p) => p.width / 195});
    transform-origin: 0 0;
  }
`;
type Props = React.ComponentProps<typeof React95Monitor> & {
  width?: number;
};
const Monitor = ({ width, ...otherProps }: Props) => {
  return (
    <Wrapper width={width}>
      <React95Monitor {...otherProps} />
    </Wrapper>
  );
};

export default Monitor;
