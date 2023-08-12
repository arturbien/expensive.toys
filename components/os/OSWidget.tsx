import styled from "styled-components";

const OSWidget = styled.div.attrs<{ radius: number }>((props) => ({
  "data-widget": true,
  "data-radius": props.radius,
}))<{ radius: number }>`
  width: 160px;
  height: 160px;
  border-radius: ${(p) => p.radius}px;
  backdrop-filter: blur(35px) saturate(50%);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export default OSWidget;
