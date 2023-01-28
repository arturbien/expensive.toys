import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 1.5rem;

  max-width: 1024px;
`;

export const Normal = styled.div`
  grid-column: 3 / span 8;
  @media only screen and (max-width: 1050px) {
    grid-column: 1 / span 12;
    padding: 0 16px;
  }
`;
