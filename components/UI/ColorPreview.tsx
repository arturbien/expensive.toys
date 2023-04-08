import styled from "styled-components";

export default styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${(p) => p.theme.borderDarkest};
  background: ${(p) => p.color};
`;
