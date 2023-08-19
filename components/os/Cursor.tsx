import styled from "styled-components";

export const Cursor = styled.div<{ reflection?: boolean }>`
  --cursor-color: white;
  --cursor-thickness: 4px;
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  ::before,
  ::after {
    content: "";
    position: absolute;
    background: var(--cursor-color);
    outline: 1px solid black;
  }
  ::before {
    height: 100%;
    width: var(--cursor-thickness);
    left: 50%;
    transform: translateX(-50%);
  }
  ::after {
    width: 100%;
    height: var(--cursor-thickness);
    top: 50%;
    transform: translateY(-50%);
  }
  transform: translate3d(
    calc(var(--mouse-x) - 50%),
    calc(var(--mouse-y) - 50%),
    -100px
  );
  pointer-events: none;
`;
