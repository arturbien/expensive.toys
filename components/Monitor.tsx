import React from "react";
import styled from "styled-components";
import { Monitor as React95Monitor } from "react95";

const Wrapper = styled.div<{ width?: number }>`
  width: calc(var(--monitor-width, 195) * 1px);
  aspect-ratio: 1.04;
  & > * {
    transform: scale(calc(var(--monitor-width) / 195));
    transform-origin: 0 0;
  }
`;
type Props = React.ComponentProps<typeof React95Monitor> &
  React.ComponentProps<typeof Wrapper>;

const Monitor = ({ className, ...otherProps }: Props) => {
  return (
    <Wrapper className={className}>
      <React95Monitor {...otherProps} />
    </Wrapper>
  );
};

export default Monitor;
