import styled from "styled-components";

export const Grid = styled.div`
  margin-left: 10vw;
  margin-right: 10vw;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 1.5rem;
`;

export const Wide = styled.div`
  grid-column: 2 / span 10;
`;

export const Center = styled.div`
  grid-column: 3 / span 8;
`;
