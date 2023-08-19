import styled from "styled-components";

const ReflectiveWidget = styled.div.attrs<{
  radius: number;
  reflectiveness: number;
  width: number;
  height: number;
}>((props) => ({
  "data-reflective": true,
  "data-radius": props.radius,
  "data-reflectiveness": props.reflectiveness,
}))<{
  radius: number;
  reflectiveness: number;
  width: number;
  height: number;
}>`
  position: relative;
  overflow: hidden;
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  border-radius: ${(p) => p.radius}px;
  outline: 0.5px solid rgba(0, 0, 0, 0.3);
`;

export const GlassWidget = styled(ReflectiveWidget)`
  backdrop-filter: blur(1px) saturate(80%);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const MirrorWidget = styled(ReflectiveWidget)`
  border: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    /* border: 2px solid rgba(255, 255, 255, 0.1); */
    border-radius: ${(p) => p.radius}px;
  }
`;
